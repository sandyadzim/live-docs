'use client'

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/custom/Header'
import Loader from '@/components/custom/Loader'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import ActiveCollaborators from '@/components/custom/ActiveCollaborators'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { useEffect, useRef, useState } from 'react'
import { updateDocument } from '@/lib/actions/room.action'

const Collaborative = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setIsLoading(true)

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle)

          if (updatedDocument) {
            setIsEditing(false)
          }
        }
      } catch (error) {
        console.error(error)
      }

      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = async (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        // setIsLoading(true)

        await updateDocument(roomId, documentTitle)

        // setIsEditing(false)
        // setIsLoading(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [roomId, documentTitle])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {isEditing && !isLoading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disable={!isEditing}
                  className="document-title-input"
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}

              {currentUserType === 'editor' && !isEditing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                  onClick={() => setIsEditing(true)}
                  className="pointer"
                />
              )}

              {currentUserType !== 'editor' && !isEditing && (
                <p className="view-only-tag">View only</p>
              )}

              {isLoading && <p className="text-sm text-gray-400">saving...</p>}
            </div>

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
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default Collaborative
