import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const defaultFonts = [
  "http://localhost:3000/public/fonts/Altone-Trial-Oblique.ttf",
  "http://localhost:3000/public/fonts/Neka-Laurent.ttf"
];

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://i.pravatar.cc/150?img=35",
    name: "Emma Smith",
    position: "Product Manager",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=60",
    name: "John Doe",
    position: "Tech Lead",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=36",
    name: "Ashley Ross",
    position: "Frontend Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },

      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=17",
    name: "Bruce Rogers",
    position: "Backend Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
    ],
  },
];

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];

export const Team = () => {
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
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
    }
  };

 return (
  <section
    id="team"
    className="container py-24 sm:py-32"
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
      <span style={{ color: colors[0], fontFamily: "CustomFont2" }}>Our Dedicated </span>
      Crew
    </h2>

    <p
      className="mt-4 mb-10 text-xl"
      style={{
        color: colors[0], // negro
        background: colors[1], // blanco
        borderRadius: 8,
        padding: "0.5rem 1rem",
        fontFamily: "CustomFont2",
        fontSize: `${sizes.paragraph}px`
      }}
    >
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
      dolor pariatur sit!
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
      {teamList.map(
        ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
          <Card
            key={name}
            className="relative mt-8 flex flex-col justify-center items-center"
            style={{
              background: colors[3], // amarillo
              color: colors[0], // negro
              border: `2px solid ${colors[4]}`,
              boxShadow: `0 4px 32px 0 ${colors[4]}44`,
              fontFamily: "CustomFont2"
            }}
          >
            <CardHeader className="mt-8 flex justify-center items-center pb-2">
              <img
                src={imageUrl}
                alt={`${name} ${position}`}
                className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                style={{
                  border: `3px solid ${colors[2]}`,
                  background: colors[1]
                }}
              />
              <CardTitle
                className="text-center"
                style={{
                  color: colors[2],
                  fontFamily: "CustomFont1",
                  fontSize: `${sizes.subtitle}px`
                }}
              >
                {name}
              </CardTitle>
              <CardDescription
                className="text-primary"
                style={{
                  color: colors[0],
                  fontFamily: "CustomFont2",
                  fontSize: `${sizes.paragraph}px`
                }}
              >
                {position}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-2">
              <p
                style={{
                  color: colors[0],
                  fontFamily: "CustomFont2",
                  fontSize: `${sizes.paragraph}px`
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </CardContent>

            <CardFooter>
              {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                <div key={name}>
                  <a
                    rel="noreferrer noopener"
                    href={url}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm"
                    })}
                    style={{
                      color: colors[2],
                      fontFamily: "CustomFont2",
                      fontSize: `${sizes.paragraph}px`
                    }}
                  >
                    <span className="sr-only">{name} icon</span>
                    {socialIcon(name)}
                  </a>
                </div>
              ))}
            </CardFooter>
          </Card>
        )
      )}
    </div>
  </section>
);
}
