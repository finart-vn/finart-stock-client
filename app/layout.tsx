import type { Metadata } from 'next';
import { Geist, Geist_Mono, Work_Sans } from 'next/font/google';
import './globals.css';
import ReduxProvider from './providers';
import { cn } from '@/lib/utils/format-datetime';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/sidebar';
import { AuthProvider } from './auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FinArt Stock',
  description: 'Stock analysis platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${workSans.className} antialiased`}
      suppressHydrationWarning
    >
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          workSans.className
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              <div className="flex min-h-screen w-full flex-col bg-background">
                {/* Sidebar */}
                <Sidebar />

                {/* Main content with margin to accommodate the sidebar */}
                <Header />
                <div className="container mx-auto flex flex-col">
                  {/* Header */}
                  {children}
                </div>
              </div>
            </ReduxProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
