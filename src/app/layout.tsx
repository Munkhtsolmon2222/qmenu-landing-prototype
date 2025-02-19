import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import { AuthProvider } from "@/lib/providers/auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/providers/theme";
import { UpointProvider } from "@/lib/providers/upoint.context";
import { NotificationProvider } from "@/lib/providers/notification.context";
import { CustomApolloProvider } from "@/lib/providers/client";
import { FilterProvider } from "@/lib/providers/filter.context";
import { OrderProvider } from "@/lib/providers/order.context";
import { TranslateProvider } from "@/lib/providers/translate";
import ClientOnly from "@/components/ui/client-only";
import Script from "next/script";
import { Buffer } from "buffer";
import "@/lib/providers/i18";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QMenu | Ресторан удирдлагын цогц систем",
  description:
    "Ухаалаг QR цэс нь хэрэглэгчдэд гар утаснаасаа цэс рүү нэвтрэх боломжийг олгодог Quick Response (QR) кодыг ашигладаг дижитал цэс юм.",
  keywords: ["ресторан", "Ухаалаг QR цэс", "систем", "qr menu"],
  openGraph: {
    title: "QMenu | Ресторан удирдлагын цогц систем",
    description:
      "Ухаалаг QR цэс нь хэрэглэгчдэд гар утаснаасаа цэс рүү нэвтрэх боломжийг олгодог.",
    url: "https://qmenu.mn",
    siteName: "QMenu",
    images: [
      {
        url: "https://qmenu.mn/banner.png",
        width: 1200,
        height: 630,
        alt: "QMenu Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QMenu | Ресторан удирдлагын цогц систем",
    description:
      "Ухаалаг QR цэс нь хэрэглэгчдэд гар утаснаасаа цэс рүү нэвтрэх боломжийг олгодог.",
    images: ["https://qmenu.mn/banner.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (typeof window !== "undefined") {
    window.Buffer = Buffer;
  }
  return (
    <html lang="mn">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.placename" content="Mongolia" />
        <meta name="language" content="mn" />
        <meta name="author" content="QMenu" />
        <link rel="canonical" href="https://qmenu.mn" />
        <Script
          id="google-analytics-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-JXL5W43FVQ');
          `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <React.StrictMode>
          <CustomApolloProvider>
            <AuthProvider>
              <ThemeProvider defaultTheme="light">
                <ClientOnly>
                  <Toaster />
                  <FilterProvider>
                    <UpointProvider>
                      <NotificationProvider>
                        <OrderProvider>
                          <TranslateProvider
                            googleApiKey={process.env.GOOGLE_TRANSLATE_KEY}
                          >
                            {children}
                          </TranslateProvider>
                        </OrderProvider>
                      </NotificationProvider>
                    </UpointProvider>
                  </FilterProvider>
                </ClientOnly>
              </ThemeProvider>
            </AuthProvider>
          </CustomApolloProvider>
        </React.StrictMode>

        {/* <Script type="module" src="/src/main.tsx" />
        <Script type="module" id="buffer-script">
          {`import {Buffer} from "buffer/"; window.Buffer = Buffer;`}
        </Script> */}

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-JXL5W43FVQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
