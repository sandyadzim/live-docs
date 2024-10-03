'use client'

import {
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense'
import Loader from '@/components/custom/Loader'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      // publicApiKey={
      //   'pk_dev_LmHCq9psKhdQcQhdzr04FmN_2CPmwEEbKbniokvpkKddAkdmo1Y7d9dKM5vJgRlx'
      // }
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  )
}
