"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createLinkAction } from "./actions";

export function CreateLinkDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const result = await createLinkAction({
      originalUrl,
      customSlug: customSlug || undefined,
    });

    setPending(false);

    if ("error" in result) {
      setError(result.error);
    } else {
      setOpen(false);
      setOriginalUrl("");
      setCustomSlug("");
      router.refresh();
    }
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setOriginalUrl("");
      setCustomSlug("");
      setError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new short link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="originalUrl">Destination URL</Label>
            <Input
              id="originalUrl"
              type="url"
              placeholder="https://example.com/long-url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customSlug">
              Custom slug{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="customSlug"
              placeholder="my-link"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to auto-generate a short code
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={pending} className="mt-2">
            {pending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
