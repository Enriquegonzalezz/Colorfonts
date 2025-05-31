import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom"; // Usa useNavigate de react-router-dom

export const Hero = () => {
  const navigate = useNavigate();

  const gotocolors = () => {
    navigate("/colors");
  };

  const gotoFonts = () => {
    navigate("/fonts");
  };

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                ColorFonts
            </span>{" "}
           interactua{" "}
          </h1>{" "}
          tus{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              assets
            </span>{" "}
            con nosotros
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          interactua con tu app de react los colores y fuentes que quieras 
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
          <Button className="w-full md:w-1/3" onClick={gotocolors}>
            Go to colors
          </Button>

          <Button
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
            onClick={gotoFonts}
            variant="outline"
          >
            Go to Fonts
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </Button>
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