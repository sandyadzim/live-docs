import Header from '@/components//custom/Header'
import { Button } from '@/components/ui/button'

// import { Editor } from '@/components/editor/Editor'

export default function Home() {
  return (
    <div>
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <div>haha</div>
          <div>haha</div>
          {/* <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </div>
      </Header>
      <Button>Click me</Button>
    </div>
  )
}
