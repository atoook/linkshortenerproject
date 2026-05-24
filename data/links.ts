import dbModule from "@/db";
const { db } = dbModule;
import { links } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import type { Link, NewLink } from "@/db/schema";

export async function getLinksByUserId(userId: string): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function createLink(
  data: Pick<NewLink, "userId" | "originalUrl"> & { shortCode?: string },
): Promise<Link> {
  const MAX_RETRIES = 3;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const shortCode = data.shortCode ?? nanoid(8);
    try {
      const [link] = await db
        .insert(links)
        .values({ ...data, shortCode })
        .returning();
      return link;
    } catch (err) {
      // Only retry on unique constraint violations for auto-generated codes
      const isUnique = err instanceof Error && err.message.includes("unique");
      if (!isUnique || data.shortCode !== undefined) {
        throw err;
      }
      if (attempt === MAX_RETRIES - 1) {
        throw new Error(
          "Failed to generate a unique short code. Please try again.",
        );
      }
    }
  }
  throw new Error("Unexpected error creating link.");
}

export async function updateLink(
  id: number,
  userId: string,
  data: { originalUrl: string; shortCode: string },
): Promise<Link> {
  const [link] = await db
    .update(links)
    .set({
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
      updatedAt: new Date(),
    })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link;
}

export async function deleteLink(id: number, userId: string): Promise<void> {
  await db.delete(links).where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function getLinkByShortCode(
  shortCode: string,
): Promise<Link | undefined> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link;
}
