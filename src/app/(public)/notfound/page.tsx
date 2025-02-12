import { NewsletterForm } from "@/components/forms/newsletter-form";

export default function NotFound() {
  return (
    <div className="container flex  h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex flex-col h-max mb-4">
        <h1
          className="text-4xl font-semibold  bg-clip-text text-transparent bg-gradient-to-r dark:from-slate-200/60 dark:via-slate-200 dark:to-slate-200/60 from-black via-gray-950 to-blue-950 pb-4"
          data-aos="fade-down"
        >
          Not found...
        </h1>
        <h3 className="font-medium  text-center bg-clip-text text-transparent bg-gradient-to-r dark:from-slate-200/60 dark:via-slate-200 dark:to-slate-200/60 from-black via-gray-950 to-blue-950 pb-4">
          Contact us so we can solve it.
          <br />
        </h3>
      </div>
      <div className="w-full flex justify-center p-8">
        <NewsletterForm />
      </div>
    </div>
  );
}
