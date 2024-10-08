'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'
import { deleteDocument } from '@/lib/actions/room.action'

const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const deleteDocumentHandler = async () => {
    setIsLoading(true)

    try {
      await deleteDocument(roomId)
      setIsOpen(false)
    } catch (error) {
      console.log('Error notif:', error)
    }

    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-9 rounded-xl bg-r p-2 transition-all">
          <Image
            src="/assets/icons/trash-bin.svg"
            alt="delete"
            width={20}
            height={20}
            className="mt-1"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader className="items-center">
          <Image
            src="/assets/icons/delete-modal.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle>Delete document</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete this document? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="w-full" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={deleteDocumentHandler}
            className="bg-r w-full mb-3 md:mb-0"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
