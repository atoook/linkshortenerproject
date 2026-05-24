---
name: links-monthly-chart
description: >
  Generates a bar chart PNG showing how many short links were created each
  month over the past 12 months. Use this skill whenever the user asks to
  visualise, chart, graph, or analyse link-creation trends, monthly stats,
  or "how many links were created" over time. Also trigger it when the user
  wants a report, dashboard snapshot, or any kind of "links over time" view,
  even if they don't say "chart" or "PNG" explicitly.
---

# Links Monthly Chart Skill

Generate a publication-ready bar chart (PNG) that shows the number of short
links created in each of the past 12 calendar months, reading live data
directly from the project's Neon Postgres database.

## What this skill does

1. Reads `DATABASE_URL` from the project's `.env` file (project root).
2. Queries the `links` table for rows whose `created_at` falls within the
   last 12 complete months (plus the current month up to today).
3. Groups results by month and counts them.
4. Renders a bar chart with months on the x-axis and link counts on the
   y-axis, then saves it as a PNG.

## How to invoke

Run the bundled script from the **project root**:

```bash
python .agents/skills/links-monthly-chart/scripts/plot_links.py
```

Optional flags:

| Flag            | Default                           | Description                                        |
| --------------- | --------------------------------- | -------------------------------------------------- |
| `--output PATH` | `reports/links_monthly_chart.png` | Where to save the PNG                              |
| `--env PATH`    | `.env`                            | Path to the env file (relative to cwd or absolute) |
| `--months N`    | `12`                              | How many months back to include                    |

The `reports/` directory is created automatically if it does not exist, and is
listed in `.gitignore` so generated images are never committed.

Example with custom output path:

```bash
python .agents/skills/links-monthly-chart/scripts/plot_links.py \
  --output reports/links_chart_q1.png
```

## Prerequisites

Required packages are listed in
`.agents/skills/links-monthly-chart/requirements.txt`:

```
psycopg2-binary>=2.9
matplotlib>=3.8
python-dotenv>=1.0
python-dateutil>=2.9
```

A dedicated virtual environment keeps these isolated from the rest of the
project. Run `bootstrap.sh` once to create it:

```bash
bash .agents/skills/links-monthly-chart/bootstrap.sh
```

This creates `.agents/skills/links-monthly-chart/.venv/` and installs all
dependencies into it automatically.

## Workflow

1. **First time only** — run the bootstrap script (see Prerequisites above).
2. Activate the virtual environment:
   ```bash
   source .agents/skills/links-monthly-chart/.venv/bin/activate
   ```
3. Run the script from the **project root**:
   ```bash
   python .agents/skills/links-monthly-chart/scripts/plot_links.py
   ```
4. Open the generated PNG — the path is printed to stdout on success.
5. Share or embed the PNG as needed.
6. Deactivate when done: `deactivate`

## Notes

- The script parses `.env` itself using `python-dotenv`; no need to export
  variables in your shell.
- `DATABASE_URL` must be a valid `postgresql://` (or `postgres://`) connection
  string. The Neon URL with `?sslmode=require` appended works as-is.
- If a month has zero links the bar is simply absent (the chart skips empty
  months by default). All 12 month labels are always shown on the x-axis so
  it's easy to spot gaps.
