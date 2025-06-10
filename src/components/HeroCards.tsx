import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import axios from "axios"; 
import { useEffect, useState } from "react";


const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];
const defaultFonts = [
  "http://localhost:3000/public/fonts/Altone-Trial-Oblique.ttf",
  "http://localhost:3000/public/fonts/Neka-Laurent.ttf"
];

export const HeroCards = () => {
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
   return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card
        className="absolute w-[340px] -top-[15px] drop-shadow-xl"
        style={{
          background: colors[3],
          color: colors[0],
          boxShadow: `0 4px 32px 0 ${colors[4]}44`,
          border: `2px solid ${colors[2]}`,
          fontFamily: "CustomFont2"
        }}
      >
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="https://github.com/" />
            <AvatarFallback style={{
              background: colors[2],
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.subtitle}px`
            }}>EG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle
              className="text-lg"
              style={{
                color: colors[2],
                fontFamily: "CustomFont1",
                fontSize: `${sizes.title}px`
              }}
            >
              Enrique Gonzalez
            </CardTitle>
            <CardDescription
              style={{
                color: colors[0],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.subtitle}px`
              }}
            >
              @kikegonza
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent
          style={{
            color: colors[0],
            fontFamily: "CustomFont2",
            fontSize: `${sizes.paragraph}px`
          }}
        >
          Funciona perfecto!
        </CardContent>
      </Card>

      {/* Team */}
      <Card
        className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl"
        style={{
          background: colors[1],
          color: colors[0],
          boxShadow: `0 4px 32px 0 ${colors[4]}44`,
          border: `2px solid ${colors[2]}`,
          fontFamily: "CustomFont2"
        }}
      >
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <CardTitle
            className="text-center"
            style={{
              color: colors[2],
              fontFamily: "CustomFont1",
              fontSize: `${sizes.title}px`
            }}
          >
            samuel molina
          </CardTitle>
          <CardDescription
            className="font-normal"
            style={{
              color: colors[0],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.subtitle}px`
            }}
          ></CardDescription>
        </CardHeader>
        <CardContent
          className="text-center pb-2"
          style={{
            color: colors[0],
            fontFamily: "CustomFont2",
            fontSize: `${sizes.paragraph}px`
          }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </CardContent>
        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              style={{
                color: colors[2],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.paragraph}px`
              }}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              style={{
                color: colors[2],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.paragraph}px`
              }}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground w-5 h-5"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/leopoldo-miranda/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              style={{
                color: colors[2],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.paragraph}px`
              }}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card
        className="absolute top-[150px] left-[50px] w-72 drop-shadow-xl"
        style={{
          background: colors[3],
          color: colors[0],
          boxShadow: `0 4px 32px 0 ${colors[4]}44`,
          border: `2px solid ${colors[2]}`,
          fontFamily: "CustomFont2"
        }}
      >
        <CardHeader>
          <CardTitle
            className="flex item-center justify-between"
            style={{
              color: colors[2],
              fontFamily: "CustomFont1",
              fontSize: `${sizes.title}px`
            }}
          >
            Gratis
            <Badge
              variant="secondary"
              className="text-sm"
              style={{
                background: colors[2],
                color: colors[1],
                border: `1px solid ${colors[4]}`,
                fontFamily: "CustomFont2",
                fontSize: `${sizes.paragraph}px`
              }}
            >
              el mas popular
            </Badge>
          </CardTitle>
          <div>
            <span
              className="text-3xl font-bold"
              style={{
                color: colors[0],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.title}px`
              }}
            >
              $0
            </span>
            <span
              className="text-muted-foreground"
              style={{
                color: colors[2],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.subtitle}px`
              }}
            >
              {" "}
              /month
            </span>
          </div>
          <CardDescription
            style={{
              color: colors[0],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.subtitle}px`
            }}
          >
            Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            style={{
              background: colors[2],
              color: colors[1],
              border: `2px solid ${colors[0]}`,
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            empezar prueba ahora
          </Button>
        </CardContent>
        <hr className="w-4/5 m-auto mb-4" style={{ borderColor: colors[4] }} />
        <CardFooter className="flex">
          <div className="space-y-4">
            {["4 Team member", "4 GB Storage", "Upto 6 pages"].map(
              (benefit: string) => (
                <span key={benefit} className="flex">
                  <Check style={{ color: colors[2] }} />{" "}
                  <h3
                    className="ml-2"
                    style={{
                      color: colors[0],
                      fontFamily: "CustomFont2",
                      fontSize: `${sizes.paragraph}px`
                    }}
                  >
                    {benefit}
                  </h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};