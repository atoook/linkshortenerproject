"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Link } from "@/db/schema";
import { updateLinkAction } from "./actions";

export function EditLinkDialog({ link }: { link: Link }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [originalUrl, setOriginalUrl] = useState(link.originalUrl);
  const [customSlug, setCustomSlug] = useState(link.shortCode);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const result = await updateLinkAction({
      id: link.id,
      originalUrl,
      customSlug,
    });

    setPending(false);

    if ("error" in result) {
      setError(result.error);
    } else {
      setOpen(false);
      router.refresh();
    }
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setOriginalUrl(link.originalUrl);
      setCustomSlug(link.shortCode);
      setError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Edit link">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit short link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-originalUrl">Destination URL</Label>
            <Input
              id="edit-originalUrl"
              type="url"
              placeholder="https://example.com/long-url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-customSlug">Custom slug</Label>
            <Input
              id="edit-customSlug"
              placeholder="my-link"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
