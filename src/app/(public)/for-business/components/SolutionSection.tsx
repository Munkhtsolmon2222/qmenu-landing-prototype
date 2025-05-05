import Image from 'next/image';
import SolutionIcon from './SolutionIcon';

export const SolutionSection = () => {
  return (
    <section className="relative overflow-hidden mt-16 mb-16">
      <h3 className="text-center text-2xl font-bold mb-4 mx-auto w-fit">
        Таны эрхэлж буй бизнест яг тохирсон ШИЙДЛИЙГ бид санал болгоно
      </h3>
      <div className="">
        <section id="solution" className="pb-8 md:pb-16 mt-8 md:mt-16 relative overflow-hidden">
          <div className="container mx-auto sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="hidden lg:block space-y-8 w-full lg:w-1/4">
                <SolutionIcon title="Ресторан, Кафе" position="left" imgSrc="./other/image1.svg" />
                <SolutionIcon title="Караоке" position="left" imgSrc="./other/image3.svg" />
                <SolutionIcon
                  title="Түргэн хоол, Пизза"
                  position="left"
                  imgSrc="./other/image5.svg"
                />
                <SolutionIcon
                  title="Кофе шоп, Бейкери"
                  position="left"
                  imgSrc="./other/image7.svg"
                />
                <SolutionIcon
                  title="Ажилчдын хоолны газар"
                  position="left"
                  imgSrc="./other/image9.svg"
                />
                <SolutionIcon
                  title="Зочид буудлын ресторан"
                  position="left"
                  imgSrc="./other/image11.svg"
                />
              </div>
              <div className="mx-auto mb-12 lg:mb-0 w-[80%] lg:w-2/4">
                <Image src={'./other/Banner.svg'} alt="device showcase" width={1000} height={600} />
              </div>

              <div className="hidden lg:block space-y-8 w-full lg:w-1/4">
                <SolutionIcon title="Лоунж, Паб" position="right" imgSrc="./other/image2.svg" />
                <SolutionIcon title="Шөнийн клуб" position="right" imgSrc="./other/image4.svg" />
                <SolutionIcon title="Цайны газар" position="right" imgSrc="./other/image6.svg" />
                <SolutionIcon
                  title="Хүргэлтийн хоол"
                  position="right"
                  imgSrc="./other/image8.svg"
                />
                <SolutionIcon
                  title="Фүүд коурт, Буфет"
                  position="right"
                  imgSrc="./other/image10.svg"
                />
                <SolutionIcon
                  title="Амралтын газар, гэр кэмп"
                  position="right"
                  imgSrc="./other/image12.svg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 lg:hidden">
              <SolutionIcon title="Ресторан, Кафе" imgSrc="./other/image1.svg" />
              <SolutionIcon title="Караоке" imgSrc="./other/image3.svg" />
              <SolutionIcon title="Түргэн хоол, Пизза" imgSrc="./other/image5.svg" />
              <SolutionIcon title="Кофе шоп, Бейкери" imgSrc="./other/image7.svg" />
              <SolutionIcon title="Ажилчдын хоолны газар" imgSrc="./other/image9.svg" />
              <SolutionIcon title="Зочид буудлын ресторан" imgSrc="./other/image11.svg" />
              <SolutionIcon title="Лоунж, Паб" imgSrc="./other/image2.svg" />
              <SolutionIcon title="Шөнийн клуб" imgSrc="./other/image4.svg" />
              <SolutionIcon title="Цайны газар" imgSrc="./other/image6.svg" />
              <SolutionIcon title="Хүргэлтийн хоол" imgSrc="./other/image8.svg" />
              <SolutionIcon title="Фүүд коурт, Буфет" imgSrc="./other/image10.svg" />
              <SolutionIcon title="Амралтын газар, гэр кэмп" imgSrc="./other/image12.svg" />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
