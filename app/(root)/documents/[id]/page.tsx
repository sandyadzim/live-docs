import Collaborative from '@/components/custom/Collaborative'
import { getDocument } from '@/lib/actions/room.action'
import { getClerkUsers } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DocumentDetail({
  params: { id },
}: SearchParamProps) {
  const clerkUser = await currentUser()

  if (!clerkUser) redirect('/sign-in')

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  })

  if (!room) redirect('/editor')

  const userIds = Object.keys(room.usersAccesses)
  const users = await getClerkUsers({ userIds })

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer',
  }))

  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ]?.includes('room:write')
    ? 'editor'
    : 'viewer'

  return (
    <main className="flex w-full flex-col items-center">
      <Collaborative
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  )
}
