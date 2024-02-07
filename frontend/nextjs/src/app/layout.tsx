import { Box } from '@mui/material'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Navbar } from '@/components'
import { Providers } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'The ecommerce project developed in the 17th full-cycle immersion',
  title: 'Code commerce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Box
            component="main"
            sx={{
              bgcolor: 'background.default',
              flexGrow: 1,
              mt: ['122px', '135px', '146px'],
              p: 3,
            }}>
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  )
}
