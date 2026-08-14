import type { Interest } from "@/content/types";

export const interests = [
  {
    title: "Gaming",
    description: "Exploring systems, stories and strategy.",
    image: {
      src: "/images/interests/gaming-v2.webp",
      alt: "A gaming setup showing expansive fantasy and city environments",
    },
    placement: "bottom-left",
    tone: "blue",
  },
  {
    title: "Technology and gadgets",
    description: "Following useful tools and thoughtful product design.",
    image: {
      src: "/images/interests/technology-gadgets-v2.webp",
      alt: "A dark desktop arrangement of personal technology and gadgets",
    },
    placement: "bottom-left",
    tone: "blue",
  },
  {
    title: "Cars",
    description: "Enjoying automotive engineering and design.",
    image: {
      src: "/images/interests/cars-v2.webp",
      alt: "A dark SUV shown alongside mechanical engineering drawings",
    },
    placement: "top-left",
    tone: "slate",
  },
  {
    title: "Food",
    description: "Discovering new dishes and local favourites.",
    image: {
      src: "/images/interests/food-travel.webp",
      alt: "A plated dish overlooking an atmospheric coastal city",
    },
    placement: "bottom-left",
    tone: "amber",
  },
  {
    title: "AI experimentation",
    description: "Testing how modern AI tools improve engineering workflows.",
    image: {
      src: "/images/interests/ai-experimentation-v2.webp",
      alt: "An AI workflow connecting inputs, evaluation paths and verified results",
    },
    placement: "top-left",
    tone: "green",
  },
  {
    title: "Movies and television",
    description: "Unwinding with strong stories and memorable characters.",
    image: {
      src: "/images/interests/movies-television-v2.webp",
      alt: "A film projector illuminating a sequence of cinematic worlds",
    },
    placement: "top-right",
    tone: "amber",
  },
  {
    title: "Travel",
    description: "Experiencing new places and perspectives.",
    image: {
      src: "/images/interests/travel.webp",
      alt: "A winding path toward an unbranded coastal town",
    },
    placement: "bottom-left",
    tone: "green",
  },
  {
    title: "Side projects",
    description: "Learning by building, testing and refining practical ideas.",
    image: {
      src: "/images/interests/side-projects-v2.webp",
      alt: "A maker workbench with an electronics prototype and engineering tools",
    },
    placement: "top-right",
    tone: "burgundy",
  },
] satisfies readonly Interest[];
