"use client";

import { Button } from "@/components/retroui/ButtonCustom";
import { Card, CardContent } from "@/components/retroui/CardCustom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousela";
import { useLanguage } from "@/lib/i18n/context";

import { useState } from "react";


export default function DataLibrary() {
  const { t } = useLanguage();
  const dataLibraryItems = [
    {
      title: "Materi Pelatihan Agroforestri Kopi",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      pdfUrl: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00540-25.pdf"
    },
    {
      title: "Materi Pelatihan Agroforestri Kakao",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      pdfUrl: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00542-25.pdf"
    },
    {
      title: "Materi Pelatihan Agroforestri Karet",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      pdfUrl: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00541-25.pdf"
    },
    {
      title: "Materi Pelatihan Agroforestri Sawit",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      pdfUrl: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00538-25.pdf"
    },
    {
      title: "Materi Pelatihan Pertanian Cerdas Iklim",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      pdfUrl: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00543-25.pdf"
    },
    {
      title: "Materi Pelatihan Strategi Penyuluhan Agroforestri",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      pdfUrl: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00539-25.pdf"
    },
    {
      title: "Pedoman Budidaya Pohon Penaung Kakao & Kopi",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      pdfUrl: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00400-23.pdf"
    }
  ];

  const handleOpenClick = (index: number) => {
    if (dataLibraryItems[index].pdfUrl !== "#") {
      window.open(dataLibraryItems[index].pdfUrl, "_blank");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-8 overflow-hidden">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent >
          {dataLibraryItems.map((item, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-3/4 md:basis-1/3 ">
              <Card className="w-full shadow-none hover:shadow-md h-full flex flex-col relative overflow-hidden ">
                {/* Background image as a separate div to better control responsiveness */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                  style={{
                    backgroundImage: `url('/lib/cover${(index % 8) + 1}.png')`,
                  }}
                >
                  
                </div>

                <CardContent className="flex flex-col items-start p-3 sm:p-4 md:p-5 relative z-10 h-full justify-between">
                  <div className="w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm">Publikasi - {index < 6 ? "2025" : "2023"}</p>
                  </div>

                  <div className="w-full flex flex-col items-center mt-1">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain mb-2 mx-auto"
                    />
                    <div className="w-full flex justify-end mt-auto pt-1">
                      <Button
                        type="button"
                        variant="default"
                        onClick={() => handleOpenClick(index)}
                        className="text-xs sm:text-sm px-2 py-1"
                      >
                        {t('general.open')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  />
        <CarouselNext  />
      </Carousel>


    </div>
  );
}