import { Metadata } from 'next';
import StructuredData from './components/StructuredData';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Qmenu Бизнест | Ресторан удирдлагын иж бүрэн шийдэл',
  description:
    'QMenu-тэй ресторан бизнесийнхээ үр ашгийг нэмэгдүүлээрэй. Дижитал цэс, захиалгын удирдлага, POS систем, нэгдсэн бараа материалын хяналт болон хүчирхэг тайлан, дүн шинжилгээ - бүгд нэг дор.',
  keywords: [
    'kassiin system',
    'кассийн систем',
    'кассийн программ',
    'kassiin program',
    'ресторан удирдлагын систем',
    'дижитал цэс',
    'QR цэс',
    'POS систем',
    'ресторан бараа материал',
    'ресторан шинжилгээ',
    'Qmenu бизнес',
    'киоск',
  ],
  openGraph: {
    title: 'Qmenu Бизнест | Ресторан удирдлагын цогц систем',
    description:
      'Qmenu-н ухаалаг системээр рестораны үйл ажиллагаагаа автоматжуулаарай. Дижитал цэс, хурдан үйлчилгээ болон цогц шинжилгээгээр борлуулалт, үйлчлүүлэгчдийн сэтгэл ханамжийг нэмэгдүүлээрэй.',
    url: 'https://qmenu.mn/for-business',
    siteName: 'QMenu',
    images: [
      {
        url: 'https://qmenu.mn/banner.png',
        width: 1200,
        height: 630,
        alt: 'QMenu Banner',
      },
    ],
    locale: 'mn_MN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qmenu Бизнест | Ресторан удирдлагын шийдэл',
    description:
      'QMenu-тэй ресторан бизнесийнхээ үр ашгийг нэмэгдүүлээрэй. Дижитал цэс, захиалгын удирдлага, POS систем болон хүчирхэг шинжилгээ.',
    images: ['https://qmenu.mn/banner.png'],
  },
  alternates: {
    canonical: 'https://qmenu.mn/for-business',
  },
};

interface Props extends React.PropsWithChildren {}

const Layout: React.FC<Props> = async ({ children }) => {
  return (
    <>
      <Head>
        <StructuredData />
      </Head>
      <div className="flex flex-col h-max w-full justify-between z-0 gap-3 bg-whitesmoke">
        {children}
      </div>
    </>
  );
};

export default Layout;
