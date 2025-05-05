import { Footer } from './components/Footer';
import { Features } from './components/Features';
import PlatformInfo from './components/PlatformInfo';
import FAQSection from './components/FaqSection';
import { SolutionSection } from './components/SolutionSection';
import PricingWrapper from './components/PricingWrapper';
import PartnersWrapper from './components/PartnersWrapper';
import { FeatureCard } from './components/FeatureCard';
import HeaderWrapper from './components/HeaderWrapper';
import BackgroundRevealWrapper from './components/BackgroundRevealWrapper';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWrapper />
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center text-center px-4 md:px-8 h-[80vh] reveal-text">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              #1 Ресторан удирдлагын цогц систем
            </h1>
            <p className="text-base md:text-lg mb-8">
              Таны бизнест зориулсан энгийн, уян хатан, хүчирхэг удирдлагын программ хангамж
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <a href="tel:77772040">
                <button className="bg-black text-white px-6 py-3 rounded-full">Бүртгүүлэх</button>
              </a>
            </div>
          </div>
        </section>
        <section id="products" className="">
          <div className="pt-4 pb-6">
            <h1 className="text-xl font-bold w-fit mx-auto reveal-text">БҮТЭЭГДЭХҮҮН</h1>
            <p className="text-sm text-gray-700 w-fit mx-auto reveal-text">
              Ресторан удирдлагын цогц систем
            </p>
          </div>
          <Features />
        </section>
        <SolutionSection />

        <PartnersWrapper />

        <PlatformInfo />

        <section id="benefits" className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <section
              id="knowledge"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <FeatureCard
                icon="trending-up"
                title="Орчин үеийн ресторанд бизнесийг амжилттай удирдах"
                description="Ресторан болон хоолны салбарын амин зүрх бол амт чанартай хоол, эелдэг үйлчилгээ, тухтай орчин юм. Гэхдээ орчин үеийн үйлчлүүлэгчид эдгээрээс гадна нэмээд өөр нэг зүйлийг чухалчилдаг болсон нь технологийн дэвшилтэй уялдан бий болсон хялбар, шуурхай, ухаалаг үйлчилгээ юм."
                bulletPoints={[
                  'Ресторан цогц удирдлага',
                  'Төлбөрийн олон сонголт',
                  'Захиалга таних код',
                  'Тайлан, дүн шинжилгээ',
                  'Бараа материалын хяналт',
                  'Кассийн систем',
                ]}
                ctaText="Дэлгэрэнгүй"
                ctaLink="#"
              />

              <FeatureCard
                icon="rocket"
                title="Бид харилцагчидтайгаа байнга хамт байж, хамтдаа хөгжихийг эрмэлздэг"
                description="Бидэнтэй холбогдож, хамтран ажиллах боломжийг нээгээрэй. Таны санал хүсэлт, асуулт бүрийг бид хүндэтгэн үзэж, бизнесийн тань хөгжилд үргэлж дэмжлэг үзүүлэхэд бэлэн байна."
                bulletPoints={[
                  'Та шинээр захиалга өгөх бол',
                  'Системийн талаар илүү мэдээлэл хэрэгтэй бол',
                  'Манай систем дээр асуудал тулгарсан бол',
                  'Сургалт авмаар байвал',
                  'Санал хүсэлт өгмөөр байвал',
                ]}
                ctaText="Дэлгэрэнгүй"
                ctaLink="#"
                contactNumber="77772040"
              />

              <FeatureCard
                icon="pie-chart"
                title="Qmenu олон улсын хөрөнгө оруулалттай PROFIT нэвтрүүлэгт"
                description="PROFIT нэвтрүүлэгт оролцох үеэрээ Qmenu олон улсын хөрөнгө оруулалт татсан, зах зээлийн тэлэлт, дижитал шийдлүүдийн нөлөө, хамт олны хөгжлийн талаар хуваалцсан. Нэвтрүүлгийн үеэр Qmenu-ийн дараах онцлог давуу талуудыг тодотгон үзүүлсэн"
                bulletPoints={[
                  'Qmenu-ийн олон талт хэрэглээ',
                  'Технологийн дэвшил, бизнесийн цогц шийдлүүд',
                  'Экосистемийн нэг хэсэг, бусад системтэй хялбар интеграци',
                  'Бизнесийн стратегийг сайжруулах',
                ]}
                ctaText="Дэлгэрэнгүй"
                ctaLink="#"
              />
            </section>
          </div>
        </section>

        <section id="pricing">
          <PricingWrapper />
        </section>
        <FAQSection />
      </main>
      <Footer />
      <BackgroundRevealWrapper />
    </div>
  );
}
