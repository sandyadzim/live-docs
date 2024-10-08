import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className, isHome = false }: HeaderProps) => {
  return (
    <div className={cn('header z-30', className)}>
      <Link
        href={isHome ? '/' : '/editor'}
        className="md:flex-1 flex items-center space-x-2"
      >
        <div>
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo with name"
            width={50}
            height={30}
            className="hidden md:block"
          />
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2 md:hidden"
          />
        </div>

        <div className="text-xl font-bold">LiveDocs</div>
      </Link>

      {children}
    </div>
  )
}

export default Header
