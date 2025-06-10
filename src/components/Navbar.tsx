import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import axios from "axios"; // Usa useNavigate de react-router-dom

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];
const defaultFonts = [
  "http://localhost:3000/public/fonts/Altone-Trial-Oblique.ttf",
  "http://localhost:3000/public/fonts/Neka-Laurent.ttf"
];

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
    setIsLoggedIn(!!localStorage.getItem("access_token"));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    window.location.href = "/"; // o "/" si prefieres ir al home
  };
  return (
  <header
    className="sticky border-b-[1px] top-0 z-40 w-full"
    style={{
      background: colors[0], // negro
      color: colors[1],      // blanco
      borderBottom: `1px solid ${colors[1]}`,
      transition: "background 0.5s, color 0.5s"
    }}
  >
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
        <NavigationMenuItem className="font-bold flex">
          <a
            rel="noreferrer noopener"
            href="/"
            className="ml-2 font-bold text-xl flex"
            style={{
              color: colors[2],
              fontFamily: "CustomFont1",
              fontSize: `${sizes.title}px`
            }}
          >
            <LogoIcon />
            ShadcnUI/React
          </a>
        </NavigationMenuItem>

        {/* mobile */}
        <span className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2">
              <Menu className="flex md:hidden h-5 w-5" onClick={() => setIsOpen(true)}>
                <span className="sr-only">Menu Icon</span>
              </Menu>
            </SheetTrigger>

            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle
                  className="font-bold text-xl"
                  style={{
                    color: colors[2],
                    fontFamily: "CustomFont1",
                    fontSize: `${sizes.subtitle}px`
                  }}
                >
                  Shadcn/React
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                {routeList.map(({ href, label }: RouteProps) => (
                  <a
                    rel="noreferrer noopener"
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={buttonVariants({ variant: "ghost" })}
                    style={{
                      color: colors[1],
                      fontFamily: "CustomFont2",
                      fontSize: `${sizes.paragraph}px`
                    }}
                  >
                    {label}
                  </a>
                ))}
                <a
                  rel="noreferrer noopener"
                  href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                  target="_blank"
                  className={`w-[110px] border ${buttonVariants({ variant: "secondary" })}`}
                  style={{
                    color: colors[1],
                    borderColor: colors[2],
                    fontFamily: "CustomFont2",
                    fontSize: `${sizes.paragraph}px`
                  }}
                >
                  <GitHubLogoIcon className="mr-2 w-5 h-5" style={{ color: colors[2] }} />
                  Administrador
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </span>

        {/* desktop */}
        <nav className="hidden md:flex gap-2">
          {routeList.map((route: RouteProps, i) => (
            <a
              rel="noreferrer noopener"
              href={route.href}
              key={i}
              className={`text-[17px] ${buttonVariants({ variant: "ghost" })}`}
              style={{
                color: colors[1],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.paragraph}px`
              }}
            >
              {route.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex gap-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`border ${buttonVariants({ variant: "secondary" })}`}
              style={{
                color: colors[1],
                borderColor: colors[2],
                background: colors[0],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.paragraph}px`
              }}
            >
              Logout
            </button>
          ) : (
            <a
              rel="noreferrer noopener"
              href="/login"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
              style={{
                color: colors[1],
                borderColor: colors[2],
                background: colors[0],
                fontFamily: "CustomFont2",
                fontSize: `${sizes.paragraph}px`
              }}
            >
              Log In
            </a>
          )}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
);
};
