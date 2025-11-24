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
    <div className="relative w-screen h-screen">
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
      <div className="relative justify-center flex sm:mt-[-50px] mt-[-305px] m-auto">
        <div className="flex gap-2 justify-center m-auto ">
          {Array.from({ length: count }).map((_, index) => (
            <div
              onClick={() => {
                api?.scrollTo(index);
              }}
              key={index}
              className={`rounded-full sm:size-3 size-2 ${
                index + 1 === current ? "bg-white" : "bg-[#FFFFFFCC]"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselCard = ({ el }: { el: HallType }) => {
  return (
    <CarouselItem className="shadow-none w-full h-full p-0">
      <div className="w-screen h-screen">
        <Card
          className={`rounded-none h-screen w-screen p-0 border-0 shadow-none items-center flex`}
        >
          <CardContent className="flex relative  items-center justify-center p-0   w-full h-screen sm:mt-0 mt-4">
            <Image
              className="object-cover h-full w-full"
              src={el.backdrop_path}
              alt={el.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              style={{ objectFit: "cover" }}
            />

            <div className="absolute text-white lg:left-[12%] left-[10%] lg:mt-[-10%] mt-[-5%]  sm:block hidden">
              <p className="text-white lg:text-[16px] text-[14px] mb-0 font-medium">
                Now Playing:
              </p>
              <h1 className="lg:text-[50px] font-extrabold text-[30px] mt-[-2.5]">
                {el.title}
              </h1>
              <div className="flex items-center text-[18px]">
                <svg
                  className="mr-[0.5]"
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
              <p className="lg:w-[500px] w-[400px] lg:text-[20px] text-[16px] lg:mt-5 mt-[13px]">
                {el.overview}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="sm:hidden flex">
        <CardContent
          key={el.id}
          className="items-center justify-center p-0   h-100%  w-full h-full sm:mt-0  sm:hidden ml-5 mr-5 z-10 mt-5"
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
                className="mr-[0.5]"
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
          <p className="w-fit mt-[5]  overflow-hidden text-clip... h-30">
            {el.overview}
          </p>
        </CardContent>
      </div>
    </CarouselItem>
  );
};
