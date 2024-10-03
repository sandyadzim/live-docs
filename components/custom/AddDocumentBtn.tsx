'use client'

import { createDocument } from '@/lib/actions/room.action'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const addDocumentHandler = async () => {
    try {
      setIsLoading(true)
      const room = await createDocument({ userId, email })

      if (room) router.push(`/documents/${room.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        <>
          <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />
          <p className="hidden sm:block">Start a blank document</p>
        </>
      )}
    </Button>
  )
}

export default AddDocumentBtn
