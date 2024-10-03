import Header from '@/components/custom/Header'
import AddDocumentBtn from '@/components/custom/AddDocumentBtn'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {
  const clerkUser = await currentUser()

  if (!clerkUser) redirect('/sign-in')

  const roomDocuments = []

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          {/* <Notifications />*/}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.length > 0 ? (
        <div>
          <div></div>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />

          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
      <Button>Click me</Button>
    </main>
  )
}
