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
    <div className="w-full max-w-5xl p-6">
      <Carousel className="w-full">
        <CarouselContent>
          {dataLibraryItems.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              {index === 0 ? (
                <Card 
                  className="w-full shadow-none hover:shadow-md h-full flex flex-col"
                  style={{ 
                    backgroundImage: `url('/lib/cover1.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2025</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                          {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : index === 1 ? (
                <Card 
                  className="w-full shadow-none hover:shadow-md h-full flex flex-col"
                  style={{ 
                    backgroundImage: `url('/lib/cover2.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2025</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                          {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : index === 2 ? (
                <Card 
                  className="w-full shadow-none hover:shadow-md h-full flex flex-col"
                  style={{ 
                    backgroundImage: `url('/lib/cover3.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2025</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                         {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : index === 3 ? (
                <Card 
                  className="w-full shadow-none hover:shadow-md h-full flex flex-col"
                  style={{ 
                    backgroundImage: `url('/lib/cover4.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2025</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                          {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : index === 4 ? (
                <Card 
                  className="w-full shadow-none hover:shadow-md h-full flex flex-col"
                  style={{ 
                    backgroundImage: `url('/lib/cover5.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2025</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                         {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : index === 5 ? (
                <Card 
                  className="w-full shadow-none hover:shadow-md h-full flex flex-col"
                  style={{ 
                    backgroundImage: `url('/lib/cover6.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2025</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                          {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : index === 6 ? (
                <Card 
                  className="w-full shadow-none hover:shadow-md h-full flex flex-col"
                  style={{ 
                    backgroundImage: `url('/lib/cover7.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2025</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                          {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : index === 7 ? (
                <Card 
                  className="w-full shadow-none hover:shadow-md h-full flex flex-col"
                  style={{ 
                    backgroundImage: `url('/lib/cover8.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2025</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                          {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="w-full shadow-none hover:shadow-md h-full flex flex-col">
                  <CardContent className="flex flex-col items-center p-6 grow">
                    <div className="text-left mb-4 grow w-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Publikasi - 2023</p>
                    </div>
                    <div className="mt-auto w-full">
                      <img 
                        src={item.image} 
                        alt={item.alt} 
                        className="w-32 h-32 object-contain mb-4 mx-auto"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(index)}
                        >
                          {t('general.open')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
      
    </div>
  );
}