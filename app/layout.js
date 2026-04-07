import "./globals.css";
import "semantic-ui-css/semantic.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppContextProvider from "@/components/AppContextProvider";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import FloatingButtons from "@/components/ScrollToTop";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, menus } from "@/lib/constants";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Đông Y ${SITE_NAME} - Nhà Thuốc & Phòng Chẩn Trị Y Học Cổ Truyền`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "đông y",
    "y học cổ truyền",
    "nhà thuốc đông y",
    "Hoà Thuận Đường",
    "thuốc đông y",
    "châm cứu",
    "vật lý trị liệu",
    "Long Khánh",
    "Đồng Nai",
    "thuốc gia truyền",
    "thực phẩm chức năng",
  ],
  authors: [{ name: `Đông Y ${SITE_NAME}` }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: `Đông Y ${SITE_NAME}`,
    title: `Đông Y ${SITE_NAME} - Nhà Thuốc & Phòng Chẩn Trị Y Học Cổ Truyền`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/hoa-thuan-duong-logo.png",
        width: 200,
        height: 200,
        alt: `Logo ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `Đông Y ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: ["/images/hoa-thuan-duong-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/images/hoa-thuan-duong-logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#008080",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
      </head>
      <body>
        <AppContextProvider>
          <div className="app-container">
            <Header menus={menus} />
            <main>{children}</main>
            <Footer menus={menus} />
            <FloatingButtons />
          </div>
        </AppContextProvider>
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
