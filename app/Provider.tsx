'use client'

import {
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense'
import Loader from '@/components/custom/Loader'
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.action'
import { useUser } from '@clerk/nextjs'

export function Provider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser } = useUser()

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds })

        return users
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        })

        return roomUsers
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  )
}
