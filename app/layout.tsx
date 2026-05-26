import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'AEDIA - Avaliacao Educacional com IA',
  description: 'Plataforma de avaliacao e gestao educacional com inteligencia artificial para escolas brasileiras.',
  openGraph: {
    title: 'AEDIA - Avaliacao Educacional com IA',
    description: 'Plataforma de avaliacao e gestao educacional com inteligencia artificial para escolas brasileiras.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-ink-950 text-ink-100 antialiased">{children}</body>
    </html>
  )
}
