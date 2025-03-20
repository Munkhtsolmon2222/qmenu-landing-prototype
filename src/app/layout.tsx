import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/lib/config/globals.css';
import {
  FavouriteProvider,
  LocationProvider,
  NavbarProvider,
  NotificationProvider,
  ThemeProvider,
  TranslateProvider,
} from '@/lib/providers';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui';
import { GoogleProvider } from '@/components/general';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'QMenu | Ресторан удирдлагын цогц систем',
  description:
    'Ухаалаг QR цэс нь хэрэглэгчдэд гар утаснаасаа цэс рүү нэвтрэх боломжийг олгодог Quick Response (QR) кодыг ашигладаг дижитал цэс юм.',
  keywords: ['ресторан', 'Ухаалаг QR цэс', 'систем', 'qr menu'],
  openGraph: {
    title: 'QMenu | Ресторан удирдлагын цогц систем',
    description: 'Ухаалаг QR цэс нь хэрэглэгчдэд гар утаснаасаа цэс рүү нэвтрэх боломжийг олгодог.',
    url: 'https://qmenu.mn',
    siteName: 'QMenu',
    images: [
      {
        url: 'https://qmenu.mn/banner.png',
        width: 1200,
        height: 630,
        alt: 'QMenu Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QMenu | Ресторан удирдлагын цогц систем',
    description: 'Ухаалаг QR цэс нь хэрэглэгчдэд гар утаснаасаа цэс рүү нэвтрэх боломжийг олгодог.',
    images: ['https://qmenu.mn/banner.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0 box-border min-h-screen max-w-[100vw] flex flex-col`}
      >
        <NextTopLoader showSpinner color="#AD1F28" height={6} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Toaster />
          <LocationProvider>
            <ThemeProvider defaultTheme="light">
              <NotificationProvider>
                <TranslateProvider googleApiKey={process.env.GOOGLE_TRANSLATE_KEY ?? ''}>
                  <GoogleProvider>
                    <FavouriteProvider>
                      <NavbarProvider>{children}</NavbarProvider>
                    </FavouriteProvider>
                  </GoogleProvider>
                </TranslateProvider>
              </NotificationProvider>
            </ThemeProvider>
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
