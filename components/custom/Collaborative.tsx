'use client'

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/custom/Header'
import Loader from '@/components/custom/Loader'
import ActiveCollaborators from '@/components/custom/ActiveCollaborators'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Collaborative = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>

          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default Collaborative
