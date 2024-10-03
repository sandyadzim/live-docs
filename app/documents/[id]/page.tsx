import { Button } from '@/components/ui/button'

export default function DocumentDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <Button>Click me euy</Button>
      <div>My Post: {params.id}</div>
    </div>
  )
}
