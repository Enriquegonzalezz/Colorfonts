import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Usa useNavigate de react-router-dom

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];
const defaultFonts = [
  "http://localhost:3000/public/fonts/Altone-Trial-Oblique.ttf",
  "http://localhost:3000/public/fonts/Neka-Laurent.ttf"
];

export const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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

  useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    setIsLoggedIn(false);
    setIsAdmin(false);
    return;
  }

  axios
    .get("http://localhost:3000/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setIsLoggedIn(true);
      setIsAdmin(res.data.admin === 1); // Ajusta según la respuesta de tu backend
    })
    .catch(() => {
      setIsLoggedIn(false);
      setIsAdmin(false);
    });
}, []);

  const gotocolors = () => {
    navigate("/colors");
  };

  const gotoFonts = () => {
    navigate("/fonts");
  };

 // ...existing imports and code...

  return (
    <section
      className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10"
      style={{
        background: colors[1],
        transition: "background 0.5s"
      }}
    >
      <div
        className="text-center lg:text-start space-y-6"
        style={{
          background: colors[3],
          borderRadius: 24,
          boxShadow: `0 4px 32px 0 ${colors[4]}44`,
          padding: 24,
          color: colors[0],
          transition: "background 0.5s, color 0.5s"
        }}
      >
        <main
          className="font-bold"
          style={{
            color: colors[0],
            fontFamily: "CustomFont1",
            fontSize: `${sizes.title}px`
          }}
        >
          <h1 className="inline">
            <span
              className="inline"
              style={{
                color: colors[2],
                background: colors[1],
                padding: "0 0.5rem",
                borderRadius: 8,
                fontFamily: "CustomFont1"
              }}
            >
              ColorFonts
            </span>{" "}
            interactua{" "}
          </h1>{" "}
          tus{" "}
          <h2
            className="inline"
            style={{
              fontFamily: "CustomFont1",
              fontSize: `${sizes.subtitle}px`
            }}
          >
            <span
              className="inline"
              style={{
                color: colors[1],
                background: colors[2],
                padding: "0 0.5rem",
                borderRadius: 8,
                fontFamily: "CustomFont1"
              }}
            >
              assets
            </span>{" "}
            con nosotros
          </h2>
        </main>

        <p
          className="md:w-10/12 mx-auto lg:mx-0"
          style={{
            color: colors[0],
            background: colors[1],
            borderRadius: 12,
            padding: "0.5rem 1rem",
            boxShadow: `0 2px 8px 0 ${colors[2]}33`,
            transition: "background 0.5s, color 0.5s",
            fontFamily: "CustomFont2",
            fontSize: `${sizes.paragraph}px`
          }}
        >
          interactua con tu app de react los colores y fuentes que quieras
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
          {isLoggedIn && isAdmin && (
            <>
              <Button
                className="w-full md:w-1/3"
                style={{
                  background: colors[2],
                  color: colors[1],
                  border: `2px solid ${colors[0]}`,
                  fontFamily: "CustomFont2",
                  fontSize: `${sizes.paragraph}px`
                }}
                onClick={gotocolors}
              >
                Go to colors
              </Button>

              <Button
                className={`w-full md:w-1/3 ${buttonVariants({
                  variant: "outline"
                })}`}
                style={{
                  background: colors[1],
                  color: colors[2],
                  border: `2px solid ${colors[2]}`,
                  fontFamily: "CustomFont2",
                  fontSize: `${sizes.paragraph}px`
                }}
                onClick={gotoFonts}
                variant="outline"
              >
                Go to Fonts
                <GitHubLogoIcon className="ml-2 w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};