import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
      <img src="/images/hero_desktop.png" className="hidden md:block absolute inset-0 w-full h-full object-cover" alt="Abdulrahamn Ibrahim" />
      <img src="/images/hero_mobile.png" className="block md:hidden absolute inset-0 w-full h-full object-cover" alt="Abdulrahamn Ibrahim" />

      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-10 md:px-20 text-white">
        <h1 className="text-5xl font-bold mb-2">Abdulrahamn Ibrahim</h1>
        <p className="text-xl text-gray-300 mb-6">Software Engineer</p>
        <Button variant="default" className="px-8 py-6 w-fit border-white text-white hover:bg-white hover:text-black">
          CONTACT ME
        </Button>
      </div>
    </section>
  );
}
