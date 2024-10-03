'use client'

import {
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense'
import Loader from '@/components/custom/Loader'
import { getClerkUsers } from '@/lib/actions/user.action'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds })

        return users
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  )
}
