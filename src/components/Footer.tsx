import { LogoIcon } from "./Icons";
import { useEffect, useState } from "react";
import axios from "axios"; // Usa useNavigate de react-router-dom

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];
const defaultFonts = [
  "http://localhost:3000/public/fonts/Altone-Trial-Oblique.ttf",
  "http://localhost:3000/public/fonts/Neka-Laurent.ttf"
];

export const Footer = () => {
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
  <footer
    id="footer"
    style={{
      background: colors[0], // negro
      color: colors[1],      // texto blanco
      transition: "background 0.5s, color 0.5s",
      fontFamily: "CustomFont2"
    }}
  >
    <hr className="w-11/12 mx-auto" style={{ borderColor: colors[1] }} />

    <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
      <div className="col-span-full xl:col-span-2">
        <a
          rel="noreferrer noopener"
          href="/"
          className="font-bold text-xl flex"
          style={{
            color: colors[1],
            fontFamily: "CustomFont1",
            fontSize: `${sizes.title}px`
          }}
        >
          <LogoIcon />
          Gonzalez-Molina-Escalona
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="font-bold text-lg"
          style={{
            color: colors[1],
            fontFamily: "CustomFont1",
            fontSize: `${sizes.subtitle}px`
          }}
        >
          Follow US
        </h3>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Github
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Twitter
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Dribbble
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="font-bold text-lg"
          style={{
            color: colors[1],
            fontFamily: "CustomFont1",
            fontSize: `${sizes.subtitle}px`
          }}
        >
          Platforms
        </h3>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Web
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Mobile
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Desktop
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="font-bold text-lg"
          style={{
            color: colors[1],
            fontFamily: "CustomFont1",
            fontSize: `${sizes.subtitle}px`
          }}
        >
          About
        </h3>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Features
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Pricing
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            FAQ
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="font-bold text-lg"
          style={{
            color: colors[1],
            fontFamily: "CustomFont1",
            fontSize: `${sizes.subtitle}px`
          }}
        >
          Community
        </h3>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Youtube
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Discord
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 hover:opacity-100"
            style={{
              color: colors[1],
              fontFamily: "CustomFont2",
              fontSize: `${sizes.paragraph}px`
            }}
          >
            Twitch
          </a>
        </div>
      </div>
    </section>

    <section className="container pb-14 text-center">
      <h3
        style={{
          fontFamily: "CustomFont2",
          fontSize: `${sizes.paragraph}px`
        }}
      >
        &copy; 2024 Landing page made by Gonzalez - Molina - Escalona.{" "}
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://www.linkedin.com/in/leopoldo-miranda/"
          className="transition-all border-primary hover:border-b-2"
          style={{
            color: colors[2],
            fontWeight: "bold",
            fontFamily: "CustomFont2",
            fontSize: `${sizes.paragraph}px`
          }}
        >
          Leo Miranda
        </a>
      </h3>
    </section>
  </footer>
);
};
