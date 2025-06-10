import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Usa useNavigate de react-router-dom

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];

export const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [colors, setColors] = useState<string[]>(defaultColors);

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

  return (
    <section
  className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10"
  style={{
    background: colors[1], // #61DAFB
    transition: "background 0.5s"
  }}
>
  <div
    className="text-center lg:text-start space-y-6"
    style={{
      background: colors[3], // #facc15
      borderRadius: 24,
      boxShadow: `0 4px 32px 0 ${colors[4]}44`, // antes era colors[2]
      padding: 24,
      color: colors[0], // #000000
      transition: "background 0.5s, color 0.5s"
    }}
  >
    <main className="text-5xl md:text-6xl font-bold" style={{ color: colors[0] }}>
      <h1 className="inline">
        <span
          className="inline"
          style={{
            color: colors[2], // #005CA1
            background: colors[1], // #FFFFFF
            padding: "0 0.5rem",
            borderRadius: 8
          }}
        >
          ColorFonts
        </span>{" "}
        interactua{" "}
      </h1>{" "}
      tus{" "}
      <h2 className="inline">
        <span
          className="inline"
          style={{
            color: colors[1], // #FFFFFF
            background: colors[2], // #005CA1
            padding: "0 0.5rem",
            borderRadius: 8
          }}
        >
          assets
        </span>{" "}
        con nosotros
      </h2>
    </main>

    <p
      className="text-xl md:w-10/12 mx-auto lg:mx-0"
      style={{
        color: colors[0], // #000000
        background: colors[1], // #FFFFFF
        borderRadius: 12,
        padding: "0.5rem 1rem",
        boxShadow: `0 2px 8px 0 ${colors[2]}33`,
        transition: "background 0.5s, color 0.5s"
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
              background: colors[2], // #005CA1
              color: colors[1], // #FFFFFF
              border: `2px solid ${colors[0]}` // #000000
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
              background: colors[1], // #FFFFFF
              color: colors[2], // #005CA1
              border: `2px solid ${colors[2]}`
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