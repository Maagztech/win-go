import { Inter } from "next/font/google";
import "./globals.css";
import "./font.css"
import { SpinProvider } from '@/contexts/spinContext';
import { GlobalProvider } from "@/contexts/globalContext";
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import Script from "next/script";
import ReactGA from "react-ga4";

ReactGA.initialize("G-ECM3YKQBD3");
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Komet Bitcoin Cashout",
  description: "Play and win free WBTC,Berry and many more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ECM3YKQBD3" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ECM3YKQBD3');
        `}
        </Script>
      </Head>
      <GoogleOAuthProvider clientId="277296107198-d50chhens1hleigr5kdi9evbpv99oacg.apps.googleusercontent.com">
        <GlobalProvider>
          <SpinProvider>
            <Toaster />
            <body className={inter.className}>{children}</body>
          </SpinProvider>
        </GlobalProvider>
      </GoogleOAuthProvider>
    </html>
  );
}
