import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Link2, BarChart2, LayoutDashboard } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1 text-sm text-muted-foreground">
            <Link2 className="size-4" />
            Fast &amp; free link shortening
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Shorten links. Track results.{" "}
            <span className="text-muted-foreground">All in one place.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Turn long, unwieldy URLs into clean, shareable short links in
            seconds. Monitor every click and manage all your links from a
            single dashboard.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg" className="h-11 px-8 text-base">
              Get started for free
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="outline" size="lg" className="h-11 px-8 text-base">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/40 px-6 py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything you need to manage your links
            </h2>
            <p className="max-w-lg text-muted-foreground">
              A simple yet powerful toolkit for anyone who shares links online.
            </p>
          </div>
          <div className="grid w-full gap-6 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Link2 className="size-5" />
                </div>
                <CardTitle>Shorten any URL</CardTitle>
                <CardDescription>
                  Paste any long URL and instantly get a short, shareable link
                  that&apos;s easy to remember and send.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart2 className="size-5" />
                </div>
                <CardTitle>Track every click</CardTitle>
                <CardDescription>
                  See real-time click counts for each link so you always know
                  how your content is performing.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LayoutDashboard className="size-5" />
                </div>
                <CardTitle>Manage with ease</CardTitle>
                <CardDescription>
                  Your personal dashboard keeps all your short links organised.
                  Copy, delete, or inspect them whenever you need.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to shorten your first link?
          </h2>
          <p className="text-muted-foreground">
            Create a free account and start shortening links in under a minute.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="h-11 px-8 text-base">
              Create free account
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
