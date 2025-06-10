import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowUpToLine } from "lucide-react";

import axios from "axios"; // Usa useNavigate de react-router-dom

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
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
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      {showTopBtn && (
        <Button
          onClick={goToTop}
          className="fixed bottom-4 right-4 opacity-90 shadow-md"
          size="icon"
          style={{
            background: colors[2], // azul
            color: colors[1],      // blanco
            border: `2px solid ${colors[0]}` // negro
          }}
        >
          <ArrowUpToLine className="h-4 w-4" style={{ color: colors[1] }} />
        </Button>
      )}
    </>
  );
};
