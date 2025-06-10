import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import Card08 from "../components/Card08";
import { useEffect, useState } from "react";
import axios from "axios"; // Usa useNavigate de react-router-dom

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];
const defaultFonts = [
  "http://localhost:3000/public/fonts/Altone-Trial-Oblique.ttf",
  "http://localhost:3000/public/fonts/Neka-Laurent.ttf"
];

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
  const [colors, setColors] = useState<string[]>(defaultColors);
  const [fonts, setFonts] = useState<string[]>(defaultFonts);
  const [sizes, setSizes] = useState({
  title: 48,
  subtitle: 32,
  paragraph: 18,
});

useEffect(() => {
  const fetchFonts = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("http://localhost:3000/fonts/predeterminado", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setFonts([
          `http://localhost:3000/public/fonts/${res.data.fuente_1}`,
          `http://localhost:3000/public/fonts/${res.data.fuente_2}`,
        ]);
        setSizes({
          paragraph: res.data.tamano_1,
          subtitle: res.data.tamano_2,
          title: res.data.tamano_3,
        });
      }
    } catch (error) {
      console.error("Error al obtener las fuentes y tamaños:", error);
    }
  };

  fetchFonts();
}, []);

useEffect(() => {
  if (fonts[0]) {
    const font1 = new FontFace("CustomFont1", `url(${fonts[0]})`);
    font1.load().then((loaded) => {
      document.fonts.add(loaded);
    });
  }
  if (fonts[1]) {
    const font2 = new FontFace("CustomFont2", `url(${fonts[1]})`);
    font2.load().then((loaded) => {
      document.fonts.add(loaded);
    });
  }
}, [fonts]);
    // Cuando obtienes los colores del backend:
    useEffect(() => {
      const fetchColors = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const res = await axios.get("http://localhost:3000/colors/predeterminado", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(res.data);
          if (res.data) {
            console.log("entre");
            setColors([
              res.data.color_1,
              res.data.color_2,
              res.data.color_3,
              res.data.color_4,
              res.data.color_5,
            ]);
            console.log(res.data.color_1);
            console.log(res.data.color_2);
            console.log(res.data.color_3);
            console.log(res.data.color_4);
            console.log(res.data.color_5);
          }
        } catch (error) {
          console.error("Error al obtener los colores:", error);
        }
      };
  
      fetchColors();
    }, []);
  

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
    style={{
      background: colors[1], // blanco
      transition: "background 0.5s"
    }}
  >
    <h2
      className="text-3xl md:text-4xl font-bold"
      style={{
        color: colors[2], // azul
        background: colors[3], // amarillo
        borderRadius: 12,
        padding: "0.5rem 1rem",
        display: "inline-block",
        fontFamily: "CustomFont1",
        fontSize: `${sizes.title}px`
      }}
    >
      How It{" "}
      <span
        style={{
          color: colors[1], // blanco
          background: colors[2], // azul
          borderRadius: 8,
          padding: "0 0.5rem",
          fontFamily: "CustomFont1"
        }}
      >
        Works
      </span>{" "}
      Step-by-Step Guide
    </h2>
    <p
      className="md:w-3/4 mx-auto mt-4 mb-8 text-xl"
      style={{
        color: colors[0], // negro
        background: colors[1], // blanco
        borderRadius: 8,
        padding: "0.5rem 1rem",
        fontFamily: "CustomFont2",
        fontSize: `${sizes.paragraph}px`
      }}
    >
      Discover our comprehensive solutions and services designed to help you succeed
    </p>

    <div className="relative">
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow-lg transition-colors"
        style={{
          background: colors[2], // azul
          color: colors[1], // blanco
          borderRadius: "50%",
          padding: 8,
          border: `2px solid ${colors[3]}`, // amarillo
          fontFamily: "CustomFont2",
          fontSize: `${sizes.paragraph}px`
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" style={{ color: colors[1] }} />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] px-2"
            >
              <Card08
                {...feature}
                colors={colors}
                fonts={fonts}
                sizes={sizes}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow-lg transition-colors"
        style={{
          background: colors[2], // azul
          color: colors[1], // blanco
          borderRadius: "50%",
          padding: 8,
          border: `2px solid ${colors[3]}`, // amarillo
          fontFamily: "CustomFont2",
          fontSize: `${sizes.paragraph}px`
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" style={{ color: colors[1] }} />
      </button>
    </div>
  </section>
);
};
