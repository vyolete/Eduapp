import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:ml-64">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
