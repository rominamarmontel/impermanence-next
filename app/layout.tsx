import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/app/Providers'
import { Toaster } from 'react-hot-toast'
import styles from './styles.module.css'
import { LanguageProvider } from '@/app/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'impermanence films',
  description:
    'Basée à Paris depuis 2011, Impermanence Films est une structure œuvrant pour la production, la diffusion et la programmation du cinéma documentaire, privilégiant les regards à hauteur humaine et les films produits dans un contexte de liberté formelle. En soutien aux œuvres indépendantes, Impermanence Films mutualise et met à disposition des outils de production et de diffusion.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <LanguageProvider>
            <div className="lg:max-w-[100%] lg:px-16 mx-auto py-8 min-h-screen flex flex-col px-4">
              <Navbar />
              <div className={styles.Children}>{children}</div>
            </div>
          </LanguageProvider>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
