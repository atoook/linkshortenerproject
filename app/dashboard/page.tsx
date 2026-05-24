import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateLinkDialog } from "./create-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getLinksByUserId(userId);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Links</h1>
        <CreateLinkDialog />
      </div>
      {links.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t created any links yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base truncate">
                      {link.shortCode}
                    </CardTitle>
                    <div className="flex shrink-0 gap-1">
                      <EditLinkDialog link={link} />
                      <DeleteLinkDialog link={link} />
                    </div>
                  </div>
                  <CardDescription className="truncate">
                    {link.originalUrl}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Created {link.createdAt.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
