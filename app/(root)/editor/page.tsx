import Header from '@/components/custom/Header'
import AddDocumentBtn from '@/components/custom/AddDocumentBtn'
import DeleteModal from '@/components/custom/DeleteModal'
import Notifications from '@/components/custom/Notifications'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getDocuments } from '@/lib/actions/room.action'
import { dateConverter } from '@/lib/utils'

export default async function EditorPage() {
  const clerkUser = await currentUser()

  if (!clerkUser) redirect('/sign-in')

  const roomDocuments = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  )

  return (
    <main className="home-container relative">
      <Header isHome className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container z-20">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                <Link
                  href={`/documents/${id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="hidden rounded-md bg-g shadow-light p-2 sm:block">
                    <Image
                      src="/assets/icons/paper-note.svg"
                      alt="file"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg text-white">
                      {metadata.title}
                    </p>
                    <p className="text-sm font-light text-y">
                      Created about {dateConverter(createdAt)}
                    </p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty z-20">
          <Image
            src="/assets/icons/empty.svg"
            alt="Document"
            width={150}
            height={100}
            className="mx-auto"
          />

          <div className="text-center text-white">
            <h5 className="text-2xl font-medium">There are no items here!</h5>
            <p className="text-y">Start adding your documents.</p>
          </div>

          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}

      <Image
        src="/assets/icons/flower.svg"
        alt="flower"
        width={75}
        height={75}
        className="moving-custom left-[15%] top-[200px] hidden md:block"
      />
      <Image
        src="/assets/icons/triangle.svg"
        alt="triangle"
        width={75}
        height={75}
        className="moving-vertical left-[18%] top-[400px] hidden md:block"
      />
      <Image
        src="/assets/icons/union.svg"
        alt="union"
        width={75}
        height={75}
        className="moving-rotate right-[15%] top-[250px] hidden md:block"
      />
      <Image
        src="/assets/icons/stair.svg"
        alt="stair"
        width={75}
        height={75}
        className="moving-horizontal right-[18%] top-[450px] hidden md:block"
      />
    </main>
  )
}
