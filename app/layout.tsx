import { Syne } from 'next/font/google'

import { cn } from '@/lib/utils'
import './globals.css'
import { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
import { Provider } from './Provider'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'LiveDocs',
  description: 'Your go-to collaborative editor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        variables: {
          colorPrimary: '#74247A',
          fontSize: '16px',
        },
      }}
    >
      <html lang="en">
        <body
          className={cn(
            'min-h-screen font-sans antialiased',
            syne.variable
          )}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
