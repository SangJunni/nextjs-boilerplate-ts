// app/page.tsx
import { auth, signIn, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle>Next.js Boilerplate</CardTitle>
          <CardDescription>
            Sign in with your Google account to start using the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {session ? (
            <>
              <p className="text-sm text-muted-foreground">
                Signed in as {session.user?.email}
              </p>
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }}
              >
                <Button type="submit" variant="outline" className="w-full">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/" })
              }}
            >
              <Button type="submit" className="w-full">
                Sign in with Google
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
