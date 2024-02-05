import { ReactNode } from 'react'

import { MuiProvider } from './mui'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <MuiProvider>{children}</MuiProvider>
}
