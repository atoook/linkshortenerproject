"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink, deleteLink, updateLink } from "@/data/links";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  customSlug: z
    .string()
    .max(32, "Slug must be 32 characters or fewer")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Slug can only contain letters, numbers, hyphens, and underscores",
    )
    .optional(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(
  data: CreateLinkInput,
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be logged in to create a link." };
  }

  const parsed = createLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await createLink({
      userId,
      originalUrl: parsed.data.originalUrl,
      shortCode: parsed.data.customSlug,
    });
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create link.";
    if (message.includes("unique")) {
      return {
        error: "That short code is already taken. Please choose another.",
      };
    }
    return { error: "Failed to create link. Please try again." };
  }
}

const updateLinkSchema = z.object({
  id: z.number().int(),
  originalUrl: z.string().url("Please enter a valid URL"),
  customSlug: z
    .string()
    .min(1, "Slug is required")
    .max(32, "Slug must be 32 characters or fewer")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Slug can only contain letters, numbers, hyphens, and underscores",
    ),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(
  data: UpdateLinkInput,
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be logged in to update a link." };
  }

  const parsed = updateLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await updateLink(parsed.data.id, userId, {
      originalUrl: parsed.data.originalUrl,
      shortCode: parsed.data.customSlug,
    });
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update link.";
    if (message.includes("unique")) {
      return {
        error: "That short code is already taken. Please choose another.",
      };
    }
    return { error: "Failed to update link. Please try again." };
  }
}

const deleteLinkSchema = z.object({ id: z.number().int() });

export async function deleteLinkAction(data: {
  id: number;
}): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be logged in to delete a link." };
  }

  const parsed = deleteLinkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await deleteLink(parsed.data.id, userId);
    return { success: true };
  } catch {
    return { error: "Failed to delete link. Please try again." };
  }
}
