import Collaborative from '@/components/custom/Collaborative'
import { getDocument } from '@/lib/actions/room.action'
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

  if (!room) redirect('/')

  return (
    <main className="flex w-full flex-col items-center">
      <Collaborative roomId={id} roomMetadata={room.metadata} />
    </main>
  )
}
