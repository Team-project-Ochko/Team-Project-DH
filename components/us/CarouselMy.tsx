"use client";
import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HallType {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
}

export const CarouselMy = ({ halls }: { halls: HallType[] }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[calc(100vh-5rem)]">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-full shadow-none border-0"
      >
        <CarouselContent className="w-full h-full shadow-none border-0 ml-0">
          {halls.slice(0, 5).map((el: HallType) => (
            <CarouselCard key={el.id} el={el} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="lg:left-10 left-6 sm:flex items-center justify-center hidden" />
        <CarouselNext className="lg:right-10 right-6 sm:flex items-center justify-center hidden" />
      </Carousel>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30">
        <div className="flex gap-2 justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <button
              onClick={() => api?.scrollTo(index)}
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full h-3 w-3 sm:h-4 sm:w-4 ${
                index + 1 === current ? "bg-white" : "bg-[#FFFFFFCC]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselCard = ({ el }: { el: HallType }) => {
  return (
    <CarouselItem className="shadow-none w-full h-full p-0">
      <div className="w-full h-full">
        <Card
          className={`rounded-none h-full w-full p-0 border-0 shadow-none items-center flex`}
        >
          <CardContent className="flex relative items-center justify-center p-0 w-full h-full">
            <Image
              className="object-cover h-full w-full"
              src={el.backdrop_path}
              alt={el.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              style={{ objectFit: "cover" }}
            />

            <div className="absolute text-white lg:left-[12%] left-[6%] top-1/4 hidden sm:block">
              <p className="text-white lg:text-base text-sm mb-0 font-medium">
                Now Playing:
              </p>
              <h1 className="lg:text-[50px] font-extrabold text-2xl sm:text-3xl">
                {el.title}
              </h1>
              <div className="flex items-center text-base">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                >
                  <path
                    d="M12.9999 1.33337L16.6049 8.63671L24.6666 9.81504L18.8333 15.4967L20.2099 23.5234L12.9999 19.7317L5.78992 23.5234L7.16658 15.4967L1.33325 9.81504L9.39492 8.63671L12.9999 1.33337Z"
                    fill="#FDE047"
                    stroke="#FDE047"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="ml-1">{el.vote_average}</p>
                <p className="text-muted-foreground">/10</p>
              </div>
              <p className="lg:w-[500px] w-[320px] lg:text-lg text-base lg:mt-5 mt-3">
                {el.overview}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="sm:hidden flex">
        <CardContent
          key={el.id}
          className="items-center justify-center p-0 w-full h-full sm:mt-0 sm:hidden ml-5 mr-5 z-10 mt-5"
        >
          <div className="text-accent-foreground flex justify-between mt-0">
            <div className="">
              <p className=" sm:text-[16px] text-[14px] mb-0 font-medium">
                Now Playing:
              </p>
              <h1 className="font-bold lg:text-[24px] w-fit text mt-[-3] h-fit">
                {el.title}
              </h1>
            </div>
            <div className="flex items-center text-[18px]">
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="25"
                viewBox="0 0 26 25"
                fill="none"
              >
                <path
                  d="M12.9999 1.33337L16.6049 8.63671L24.6666 9.81504L18.8333 15.4967L20.2099 23.5234L12.9999 19.7317L5.78992 23.5234L7.16658 15.4967L1.33325 9.81504L9.39492 8.63671L12.9999 1.33337Z"
                  fill="#FDE047"
                  stroke="#FDE047"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="ml-1">{el.vote_average}</p>
              <p className="text-muted-foreground">/10</p>
            </div>
          </div>
          <p className="w-fit mt-2 overflow-hidden text-clip">{el.overview}</p>
        </CardContent>
      </div>
    </CarouselItem>
  );
};
