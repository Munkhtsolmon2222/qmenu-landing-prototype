import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
}

export default function FAQSection({
  title = 'Түгээмэл асуултууд',
  faqs = defaultFAQs,
}: FAQSectionProps) {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-8 md:mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base md:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'Q-Menu гэж юу вэ?',
    answer:
      'Ресторан, бар, зочид буудал, амралтын газруудад зориулсан дижитал меню юм. Үйлчлүүлэгчид өөрсдийн гар утасны камераар тухайн байгууллагын ширээн дээр байрлах QR кодыг уншуулсанаар тухайн байгууллагын меню гарч ирнэ. Үйлчлүүлэгч дижитал меню дээрээс захиалгаа илгээх, төлбөр тооцоогоо онлайн төлөх боломжтой.',
  },
  {
    question: 'Кассын системтэй юу?',
    answer:
      'Рестораны кассын програмыг сайжруулан боловсруулсан системтэй. Зөөгчийн шаардлагагүйгээр захиалга автоматаар системд бүртгэгдэнэ. Мөн бараа материалын удирлагын модультай тул байгууллагын үйл ажиллагаа, тайлан бүртгэлийг хөнгөвчилнө.',
  },
  {
    question: 'Таблет меню байгаа юу?',
    answer:
      'Байгууллага хүсвэл рестораны ширээ бүр дээр таблет меню байрлуулж болох бөгөөд заавал QR код уншуулах шаардлагагүйгээр захиалгаа илгээх болон төлбөр тооцоогоо хийх боломжтой систем юм.',
  },
  {
    question: 'Хэрхэн харилцагч болох вэ?',
    answer:
      '77772040 info@qmenu.mn имэйл хаягаар бидэнтэй холбогдож гэрээ байгуулсанаар тус системүүдийг ашиглах боломжтой.',
  },
];
