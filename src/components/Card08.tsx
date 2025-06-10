import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export interface Card08Props {
    title?: string;
    subtitle?: string;
    image?: string;
    badge?: {
        text: string;
        variant: "pink" | "indigo" | "orange";
    };
    href?: string;
    colors?: string[];
    fonts?: string[];
    sizes?: {
        title: number;
        subtitle: number;
        paragraph: number;
    };
}

export default function Card08({
    title = "Modern Design Systems",
    subtitle = "Explore the fundamentals of contemporary UI design",
    image = "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
    badge = { text: "New", variant: "orange" },
    href = "#",
    colors = ["#000000", "#FFFFFF", "#005CA1", "#facc15", "#61DAFB"],
    fonts = [
        "http://localhost:3000/public/fonts/Altone-Trial-Oblique.ttf",
        "http://localhost:3000/public/fonts/Neka-Laurent.ttf"
    ],
    sizes = {
        title: 48,
        subtitle: 32,
        paragraph: 18,
    }
}: Card08Props) {
    return (
        <a href={href} className="block w-full max-w-[280px] group">
            <div
                className={cn(
                    "relative overflow-hidden rounded-2xl",
                    "backdrop-blur-xl",
                    "shadow-xs",
                    "transition-all duration-300",
                    "hover:shadow-md"
                )}
                style={{
                    background: colors[3], // amarillo
                    border: `2px solid ${colors[2]}` // azul
                }}
            >
                <div className="relative h-[320px] overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div
                    className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                    )}
                />

                <div className="absolute top-3 right-3">
                    <span
                        className={cn(
                            "px-2.5 py-1 rounded-lg text-xs font-medium",
                            "backdrop-blur-md",
                            "shadow-xs"
                        )}
                        style={{
                            background: colors[2], // azul
                            color: colors[1], // blanco
                            border: `1px solid ${colors[4]}`,
                            fontFamily: "CustomFont2",
                            fontSize: `${sizes.paragraph}px`
                        }}
                    >
                        {badge.text}
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="space-y-1.5">
                            <h3
                                className="font-semibold leading-snug tracking-tighter"
                                style={{
                                    color: colors[2],
                                    fontFamily: "CustomFont1",
                                    fontSize: `${sizes.title}px`
                                }}
                            >
                                {title}
                            </h3>
                            <p
                                className="line-clamp-2 tracking-tight"
                                style={{
                                    color: colors[1],
                                    fontFamily: "CustomFont2",
                                    fontSize: `${sizes.paragraph}px`
                                }}
                            >
                                {subtitle}
                            </p>
                        </div>
                        <div
                            className={cn(
                                "p-2 rounded-full",
                                "backdrop-blur-md",
                                "transition-colors duration-300 group"
                            )}
                            style={{
                                background: colors[4], // azul claro
                                fontFamily: "CustomFont2"
                            }}
                        >
                            <ArrowUpRight
                                className="w-4 h-4 transition-transform duration-300"
                                style={{ color: colors[0] }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}