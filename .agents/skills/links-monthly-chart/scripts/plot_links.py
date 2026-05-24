#!/usr/bin/env python3
"""
plot_links.py — Bar chart of links created per month (past N months).

Usage (from project root):
    python .agents/skills/links-monthly-chart/scripts/plot_links.py

Required packages:
    pip install psycopg2-binary matplotlib python-dotenv
"""

import argparse
import os
import sys
from datetime import date, datetime, timezone

import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import psycopg2
from dateutil.relativedelta import relativedelta
from dotenv import load_dotenv


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Plot a bar chart of links created per month."
    )
    p.add_argument(
        "--output",
        default="reports/links_monthly_chart.png",
        help="Destination PNG file (default: reports/links_monthly_chart.png)",
    )
    p.add_argument(
        "--env",
        default=".env",
        help="Path to the .env file (default: .env relative to cwd)",
    )
    p.add_argument(
        "--months",
        type=int,
        default=12,
        help="How many months back to include (default: 12)",
    )
    return p.parse_args()


# ---------------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------------

def load_database_url(env_path: str) -> str:
    """Load DATABASE_URL from a .env file, raising clearly if not found."""
    load_dotenv(dotenv_path=env_path, override=False)
    url = os.getenv("DATABASE_URL")
    if not url:
        sys.exit(
            f"Error: DATABASE_URL not found in '{env_path}'.\n"
            "Make sure the file exists and contains a DATABASE_URL entry."
        )
    # psycopg2 requires the postgresql:// scheme; Neon sometimes uses postgres://
    return url.replace("postgres://", "postgresql://", 1)


def fetch_monthly_counts(
    database_url: str, months: int
) -> dict[str, int]:
    """
    Query the links table and return a dict mapping 'YYYY-MM' -> count
    for each of the past `months` calendar months (including the current one).
    """
    today = date.today()
    # First day of the current month
    start_of_current_month = today.replace(day=1)
    # First day `months - 1` months ago (so we get `months` buckets total)
    window_start = start_of_current_month - relativedelta(months=months - 1)

    query = """
        SELECT
            TO_CHAR(DATE_TRUNC('month', created_at AT TIME ZONE 'UTC'), 'YYYY-MM') AS month,
            COUNT(*) AS link_count
        FROM links
        WHERE created_at >= %s
        GROUP BY month
        ORDER BY month;
    """

    conn = psycopg2.connect(database_url)
    try:
        with conn.cursor() as cur:
            cur.execute(query, (window_start,))
            rows = cur.fetchall()
    finally:
        conn.close()

    return {row[0]: int(row[1]) for row in rows}


# ---------------------------------------------------------------------------
# Chart
# ---------------------------------------------------------------------------

def build_month_labels(months: int) -> list[str]:
    """Return a list of 'YYYY-MM' strings for the past `months` months."""
    today = date.today()
    start = today.replace(day=1) - relativedelta(months=months - 1)
    return [
        (start + relativedelta(months=i)).strftime("%Y-%m")
        for i in range(months)
    ]


def plot_chart(counts: dict[str, int], labels: list[str], output_path: str) -> None:
    values = [counts.get(label, 0) for label in labels]

    # Human-friendly x-tick labels: "Jan 2025"
    tick_labels = [
        datetime.strptime(m, "%Y-%m").strftime("%b %Y") for m in labels
    ]

    fig, ax = plt.subplots(figsize=(max(10, len(labels) * 0.9), 5))

    bars = ax.bar(tick_labels, values, color="#4f86c6", edgecolor="#2c5f9e", width=0.6)

    # Annotate bars with their count if non-zero
    for bar, val in zip(bars, values):
        if val > 0:
            ax.text(
                bar.get_x() + bar.get_width() / 2,
                bar.get_height() + max(values) * 0.01,
                str(val),
                ha="center",
                va="bottom",
                fontsize=9,
            )

    ax.set_title("Links Created per Month (Past 12 Months)", fontsize=14, pad=14)
    ax.set_xlabel("Month", fontsize=11)
    ax.set_ylabel("Links Created", fontsize=11)
    ax.yaxis.set_major_locator(ticker.MaxNLocator(integer=True))
    ax.set_ylim(bottom=0)
    plt.xticks(rotation=35, ha="right", fontsize=9)
    plt.tight_layout()

    fig.savefig(output_path, dpi=150, bbox_inches="tight")
    plt.close(fig)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    args = parse_args()

    database_url = load_database_url(args.env)
    labels = build_month_labels(args.months)

    print(f"Querying database for the past {args.months} months …")
    counts = fetch_monthly_counts(database_url, args.months)

    total = sum(counts.values())
    print(f"Found {total} link(s) across {len(counts)} month(s) with data.")

    os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
    plot_chart(counts, labels, args.output)
    print(f"Chart saved to: {os.path.abspath(args.output)}")


if __name__ == "__main__":
    main()
