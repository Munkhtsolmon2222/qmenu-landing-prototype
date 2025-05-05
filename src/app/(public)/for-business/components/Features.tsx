import { Check } from 'lucide-react';

const FeatureSection = ({ header, imageSrc, altText, title, description, advantages, index }) => (
  <div className="mb-12">
    <div className="grid grid-cols-1 gap-12 items-center max-w-6xl mt-6 md:grid-cols-2">
      {index % 2 === 0 ? (
        <>
          <div>
            <header className="pt-4 pb-6">
              <h1 className="text-xl md:text-2xl font-bold uppercase text-black">{header}</h1>
            </header>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-black">{title}</h3>

            <p className="text-black mb-8">{description}</p>

            <div className="mb-8">
              <h4 className="font-medium mb-4 text-black">Давуу талууд:</h4>

              <ul className="space-y-4">
                {advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-black p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-black">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="order-last md:order-none">
            <img src={imageSrc} alt={altText} className="w-[560px] h-[400px] mt-[-30px]" />
          </div>
        </>
      ) : (
        <>
          <div className="order-last md:order-none md:order-first">
            <img src={imageSrc} alt={altText} className="w-[560px] h-[400px] mt-[-30px]" />
          </div>

          <div>
            <header className="pt-4 pb-6">
              <h1 className="text-xl md:text-2xl font-bold uppercase text-black">{header}</h1>
            </header>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-black">{title}</h3>

            <p className="text-black mb-8">{description}</p>

            <div className="mb-8">
              <h4 className="font-medium mb-4 text-black">Давуу талууд:</h4>

              <ul className="space-y-4">
                {advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-black p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-black">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
    {/* <div className="text-right">
      <Link
        href="#"
        className="inline-block px-6 py-2 bg-black text-white rounded-full font-medium text-sm"
      >
        Дэлгэрэнгүй
      </Link>
    </div> */}
  </div>
);

export const Features = () => {
  const featureData = [
    {
      header: 'Кассын систем',
      imageSrc: './features/feature_1.0beff9d4.svg',
      altText: 'Restaurant management system on multiple devices',
      title: 'Зөвхөн ЗОЧЛОХ ҮЙЛЧИЛГЭЭНИЙ САЛБАРТ зориулан бүтээсэн ЦОГЦ КАССЫН СИСТЕМ',
      description:
        'Нэг систем ашиглан бизнесээ цогцоор нь удирдаж, зочид болон ажлчидынхаа үнэт цагийг хэмнэх, орлогоо нэмж зардалаа бууруулах боломжтой.',
      advantages: [
        'Ухаалаг QR цэстэй холбогдож ажиллана',
        'Гарахгүй хоолыг түр хаах, нээхэд ганцхан товшилт',
        'Хоолны үнэ болон бусад мэдээлэл өөрчлөхөд ганцхан товшилт',
      ],
    },
    {
      header: 'Ухаалаг Qr цэс',
      imageSrc: './features/feature_2.d2c77da1.svg',
      altText: 'QR code and mobile app interface',
      title: 'Зайнаас захиалж, Зайнаас төлье',
      description:
        'Ресторан дотроос болон гаднаас захиалга илгээх боломжтой цахим цэс. Хүссэн үедээ меню дээрх үнийг өөрчлөх мөн тухайн өдөр борлуулах боломжгүй бүтээгдэхүүнүүдийг меню дээрээс түр нуух боломжтой.',
      advantages: [
        'Цаасан меню хэвлэх шаардлагагүй',
        'Зөөгч цаасан меню барьж олон дахин явах шаардлагагүй',
        'Зочид төлбөрөө төлөх гэж касс дээр дугаарлаж хүлээх шаардлагагүй',
      ],
    },
    {
      header: 'КИОСК - Өөрөө өөртөө үйлчлэх систем',
      imageSrc: './features/Kiosk.226b5430.svg',
      altText: 'Kiosk self ordering system',
      title: 'Зочид өөрөө өөртөө үйлчлэх боломжтой ухаалаг КИОСК програм',
      description:
        'Касс дээр дугаарлах үйлчилүүлэгчдийн тоог бууруулж, Очерлох дургүй хэрэглэгчдийн “алдагдсан боломж”-ийг бууруулж орлогыг тань нэмэгдүүлнэ.',
      advantages: [
        'Төлбөрийн олон шийдлүүдтэй холбогдсон',
        'Захиалга таних кодтой',
        'Хэрэглэгчийн билл, и-баримт хэвлэнэ',
      ],
    },
    {
      header: 'Гал тогоо удирдлага',
      imageSrc: './features/KDS.1f0ad8d8.svg',
      altText: 'Kitchen display system',
      title: 'Захиалгыг хянаж, гал тогооны ажлыг ухаалгаар зохион байгуулах систем',
      description:
        'Гал тогоо удирдлагын систем нь танай рестораны амин зүрх болсон гал тогоог цэгцтэй, хялбар удирдахад тусална. Захиалга бүрд цаас хэвлэж, тогооч нар цаасан дунд төөрдөг үе дууслаа.',
      advantages: [
        'Тогооч, зөөгч нарын цагийг хэмнэнэ',
        'Хоолны явцыг мэдэгдэнэ',
        'Цаас хэвлэлт багасна',
        'Тогоочийн ачаалал, гүйцэтгэлийг тодорхойлно',
      ],
    },
    {
      header: 'Мобайл КАСС',
      imageSrc: './features/cass.b64a5e87.svg',
      altText: 'Mobile cashier system',
      title: '',
      description:
        'Цайны газрын кассын систем маш энгийн, авсаархан байх ёстой. Тэгвэл карт уншдаг банкны ПОС төхөөрөмж тань тэр чигтээ ухаалаг кассын систем шиг ажиллаж таны ажлыг хөнгөвчлөхөөс гадна хүссэн үедээ хаанаас ч борлуулалтаа хянах боломжийг Qmenu Mobile олгож байна',
      advantages: [
        'Орлого, зарлагаа хянаж, үйл ажиллагаагаа удирд',
        'Тайлан тооцоогоо хаанаас ч хялбар хийх',
        'Нэмэлт төхөөрөмж шаардлагагүй',
      ],
    },
    {
      header: 'Караоке Ном',
      imageSrc: './features/karoake.0b7e61bc.svg',
      altText: 'Karaoke book system',
      title: 'Дууны жагсаалтаа хялбархан үзэж, хүссэн дуугаа түргэн хайж олоорой',
      description:
        'Уг шийдэл нь Караоке бизнес эрхлэгч нарт зориулсан бөгөөд өдөр тутамд тулгардаг жижиг мэт боловч төвөгтэй олон асуудлыг шийдэхэд туслана.',
      advantages: [
        'Хэрэглэгч аппликешн суулгах шаардлагагүй',
        'Сар бүр шинэ дуунууд санд нэмэгдэнэ',
        'Дуучин, дууны нэрээр хайлт хийнэ',
        'Некст, Соёмбо бүх төрлийн кодтой дуу',
        'Зөөгч дуудах, захиалга өгөх боломжтой',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col w-fit mx-auto">
      <div className="flex-1 pl-6 pr-6 md:pr-0">
        <div>
          {featureData.map((feature, index) => (
            <FeatureSection
              key={index}
              header={feature.header}
              imageSrc={feature.imageSrc}
              altText={feature.altText}
              title={feature.title}
              description={feature.description}
              advantages={feature.advantages}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
