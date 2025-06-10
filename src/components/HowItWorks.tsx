import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import Card08 from "../components/Card08";

interface FeatureProps {
  title: string;
  subtitle: string;
  image: string;
  badge: {
    text: string;
    variant: "pink" | "indigo" | "orange";
  };
  href: string;
}

const features: FeatureProps[] = [
  {
    title: "Modern UI Design",
    subtitle: "Explore the latest trends in user interface design and create stunning experiences",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
    badge: { text: "Design", variant: "pink" },
    href: "#design"
  },
  {
    title: "Web Development",
    subtitle: "Master the art of building responsive and performant web applications",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
    badge: { text: "Code", variant: "indigo" },
    href: "#development"
  },
  {
    title: "Mobile Apps",
    subtitle: "Create beautiful and functional mobile applications for iOS and Android",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000",
    badge: { text: "Mobile", variant: "orange" },
    href: "#mobile"
  },
  {
    title: "Cloud Solutions",
    subtitle: "Leverage the power of cloud computing for scalable applications",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    badge: { text: "Cloud", variant: "pink" },
    href: "#cloud"
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Implement cutting-edge AI solutions to enhance your applications",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
    badge: { text: "AI", variant: "indigo" },
    href: "#ai"
  }
];

export const HowItWorks = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Discover our comprehensive solutions and services designed to help you succeed
      </p>

      <div className="relative">
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-background/90 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] px-2"
              >
                <Card08 {...feature} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-background/90 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};
