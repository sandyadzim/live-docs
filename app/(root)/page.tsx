import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Header from '@/components/custom/Header'
import Notifications from '@/components/custom/Notifications'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const clerkUser = await currentUser()

  return (
    <main className="home-container relative">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          {clerkUser && (
            <>
              <Notifications />

              <Link href="/editor">
                <Button>My Documents</Button>
              </Link>
            </>
          )}

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button>Sign In / Sign Up</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </Header>
    </main>
  )
}
