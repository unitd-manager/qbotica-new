import 'bootstrap/dist/css/bootstrap.min.css'
import Script from 'next/script';
import { Inter, Roboto } from 'next/font/google';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/default.css';
import './styles/style.css';
import './styles/responsive.css';
import './styles/custom.css';
import './styles/custom-responsive.css';
import { fetchThemeSettings, fetchMenus, fetchPageBySlug } from '@/lib/wordpress'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import BackToTopButton from '@/components/Common/BackToTopButton'
import ClientScripts from '@/components/Common/ClientScripts'

const inter = Inter({
  subsets: ['latin'],
  // Added 700, 800, 900 to support bold headings, kicker, and buttons
  weight: ['100', '200', '400', '500', '600', '700', '800', '900'], 
  variable: '--font-inter',
  display: 'swap'
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap'
});

// Add error handling for data fetching
async function getThemeData() {
  try {
 
    
    const [
      themeSettings,
      primaryMenu,
      firstFooterMenu,
      secondFooterMenu,
      thirdFooterMenu,
      fourthFooterMenu
    ] = await Promise.allSettled([
      fetchThemeSettings(),
      fetchMenus('primary-menu'),
      fetchMenus('solutions'),
      fetchMenus('services'),
      fetchMenus('company'),
      fetchMenus('resources'),
    ]);

    return {
      themeSettings: themeSettings.status === 'fulfilled' ? themeSettings.value : {},
      primaryMenu: primaryMenu.status === 'fulfilled' ? primaryMenu.value : [],
      firstFooterMenu: firstFooterMenu.status === 'fulfilled' ? firstFooterMenu.value : [],
      secondFooterMenu: secondFooterMenu.status === 'fulfilled' ? secondFooterMenu.value : [],
      thirdFooterMenu: thirdFooterMenu.status === 'fulfilled' ? thirdFooterMenu.value : [],
      fourthFooterMenu: fourthFooterMenu.status === 'fulfilled' ? fourthFooterMenu.value : []
    };
  } catch (error) {
    console.error('Error fetching theme data:', error);
    return {
      themeSettings: {},
      primaryMenu: [],
      firstFooterMenu: [],
      secondFooterMenu: [],
      thirdFooterMenu: [],
      fourthFooterMenu: []
    };
  }
}

export default async function RootLayout({ children }) {
  const {
    themeSettings,
    primaryMenu,
    firstFooterMenu,
    secondFooterMenu,
    thirdFooterMenu,
    fourthFooterMenu
  } = await getThemeData();
  const headerClass = 'navbar navbar-expand-lg navbar-light bg-white primary-menu bottom-dashed';
  const headerStyle = { backgroundColor: '#ffffff' };

  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
     <head>
  {/* Google Analytics GA4 */}
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-QTNWWK8EFF"
    strategy="lazyOnload"
  />
  <Script
    id="google-analytics"
    strategy="lazyOnload"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QTNWWK8EFF');
      `,
    }}
  />

{/* Meta Pixel */}
<Script
  id="meta-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;
      n.loaded=!0;
      n.version='2.0';
      n.queue=[];
      t=b.createElement(e);
      t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}
      (window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', '1407086373836161');
      fbq('track', 'PageView');
    `,
  }}
/>

  {/* Apollo Tracker */}
  <Script
    id="apollo-tracker"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        function initApollo() {
          var n = Math.random().toString(36).substring(7),
              o = document.createElement("script");

          o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
          o.async = true;
          o.defer = true;

          o.onload = function() {
            if (window.trackingFunctions) {
              window.trackingFunctions.onLoad({
                appId: "6a15c6dab7f2d3001cd073f2"
              });
            }
          };

          document.head.appendChild(o);
        }

        initApollo();
      `,
    }}
  />

  {themeSettings?.site_icon && (
    <>
      <link rel="icon" href={themeSettings.site_icon} />
      <link rel="apple-touch-icon" href={themeSettings.site_icon} />
      <link rel="shortcut icon" href={themeSettings.site_icon} />
    </>
  )}
     {/* {themeSettings?.header_script && (
         <ClientScripts headerScript={themeSettings?.header_script} />
        )} */}
     
</head>
     
      <body className="" suppressHydrationWarning>
        <Header
          themeSettings={themeSettings}
          navigationData={primaryMenu}
          headerClass={headerClass}
          headerStyle={headerStyle}
        />
        <noscript>
  <img
    height="1"
    width="1"
    style={{ display: "none" }}
    src="https://www.facebook.com/tr?id=1407086373836161&ev=PageView&noscript=1"
    alt=""
  />
</noscript>
        <main className="flex-grow-1">{children}</main>
        <Footer
          themeSettings={themeSettings} 
          footerMenus={{
            first: firstFooterMenu,
            second: secondFooterMenu,
            third: thirdFooterMenu,
            fourth: fourthFooterMenu
          }}
        />
        <BackToTopButton />
        <ClientScripts footerScript={themeSettings?.footer_script} />
      </body>
    </html>
  )
}