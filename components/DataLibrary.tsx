"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/retroui/ButtonCustom";
import { Card, CardContent } from "@/components/retroui/CardCustom";
import { Menu } from "@/components/retroui/MenuCustom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousela";
import { useLanguage } from "@/lib/i18n/context";

import { useState, useMemo } from "react";

export function DataLibrary({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { t } = useLanguage();

  // State untuk filter kategori
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const dataLibraryItems = [
    {
      category: "Database",
      source : "RUMAHPETAni",
      title: "Kumpulan Data: Lahan dan Petani",
      subtitle: "Akses Terbatas 🔐",
      year: "",
      author: "",
      cover: "",
      image: "/logoRP.svg",
      alt: "RUMAHPETAni Logo",
      Url: "/auth/admin"
    },
     {
      category: "Database",
      source : "RUMAHPETAni",
      title: "Kumpulan Data: Monitoring Penanaman",
      subtitle: "Akses Terbatas 🔐",
      year: "",
      author: "",
      cover: "",
      image: "/logoRP.svg",
      alt: "RUMAHPETAni Logo",
      Url: "/auth/admin"
    },
      {
      category: "Database",
      source : "KLHK",
      title: "Kumpulan Data: Daftar Kelompok Tani Hutan",
      subtitle: "Akses Terbuka",
      year: "",
      author: "",
      cover: "",
      image: "/lib/klhk-logo.png",
      alt: "KLHK Logo",
      Url: "/library/farmer-group"
    },
    {
      category: "Ensiklo",
      source : "RUMAHPETAni",
      title: "Ensiklo: Hama, Penyakit dan Gulma Pada Tanaman Kopi",
      subtitle: "Akses Terbuka",
      year: "",
      author: "",
      cover: "",
      image: "/logoRP.svg",
      alt: "RUMAHPETAni Logo",
      Url: "/library/ensiklo"
    },
     {
      category: "Ensiklo",
      source : "RUMAHPETAni",
      title: "Ensiklo: Pohon Penaung Kebun Agroforestri",
      subtitle: "Akses Terbuka",
      year: "",
      author: "",
      cover: "",
      image: "/logoRP.svg",
      alt: "RUMAHPETAni Logo",
      Url: "/library/ensiklo-pohon"
    },
    {
      category: "Materi",
      source : "CIFOR-ICRAF",
      title: "Materi Pelatihan: Agroforestri Kopi",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00540-25.pdf"
    },
    {
      category: "Materi",
      source : "CIFOR-ICRAF",
      title: "Materi Pelatihan: Agroforestri Kakao",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00542-25.pdf"
    },
    {
      category: "Materi",
      source : "CIFOR-ICRAF",
      title: "Materi Pelatihan: Agroforestri Karet",
      subtitle: "Publikasi - 2025",    
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00541-25.pdf"
    },
    {
      category: "Materi",
      source : "CIFOR-ICRAF",
      title: "Materi Pelatihan: Agroforestri Sawit",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00538-25.pdf"
    },
    {
      category: "Materi",
      source : "CIFOR-ICRAF",
      title: "Materi Pelatihan: Pertanian Cerdas Iklim",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00543-25.pdf"
    },
    {
      category: "Materi",
      source : "CIFOR-ICRAF",
      title: "Materi Pelatihan: Strategi Penyuluhan Agroforestri",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00539-25.pdf"
    },
    {
      category: "Materi",
      source : "CIFOR-ICRAF",
      title: "Pedoman Budidaya Pohon Penaung Kakao & Kopi",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00400-23.pdf"
    },
       {
      category: "Materi",
      source : "CIFOR-ICRAF",
      title: "Pedoman Membangun Kebun Agroforestri Kopi",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/region/sea/publications/softcopy/BL00059-17.pdf"
    },
    {
      category: "Panduan",
      source : "CIFOR-ICRAF",
      title: "Panduan Pelatihan: Agroforestri Kopi",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/manual/MN00547-25.pdf"
    },
    {
      category: "Panduan",
      source : "CIFOR-ICRAF",
      title: "Panduan Pelatihan: Agroforestri Kakao",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/manual/MN00549-25.pdf"
    },
    {
      category: "Panduan",
      source : "CIFOR-ICRAF",
      title: "Panduan Pelatihan: Agroforestri Karet",
      subtitle: "Publikasi - 2025",    
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/manual/MN00548-25.pdf"
    },
    {
      category: "Panduan",
      source : "CIFOR-ICRAF",
      title: "Panduan Pelatihan: Agroforestri Sawit",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/manual/MN00546-25.pdf"
    },
    {
      category: "Panduan",
      source : "CIFOR-ICRAF",
      title: "Panduan Pelatihan: Pertanian Cerdas Iklim",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/manual/MN00545-25.pdf"
    },
    {
      category: "Panduan",
      source : "CIFOR-ICRAF",
      title: "Panduan Pelatihan: Strategi Penyuluhan Agroforestri",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/manual/MN00544-25.pdf"
    },
     {
      category: "Poster",
      source : "CIFOR-ICRAF",
      title: "Kumpulan Poster: Agroforestri Kopi",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00535-25.pdf"
    },
    {
      category: "Poster",
      source : "CIFOR-ICRAF",
      title: "Kumpulan Poster: Agroforestri Kakao",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00537-25.pdf"
    },
    {
      category: "Poster",
      source : "CIFOR-ICRAF",
      title: "Kumpulan Poster: Agroforestri Karet",
      subtitle: "Publikasi - 2025",    
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00536-25.pdf"
    },
    {
      category: "Poster",
      source : "CIFOR-ICRAF",
      title: "Kumpulan Poster: Agroforestri Sawit",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00534-25.pdf"
    },
    {
      category: "Panduan",
      source : "CIFOR-ICRAF",
      title: "Kumpulan Poster: Pertanian Cerdas Iklim",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00533-25.pdf"
    },
    {
      category: "Poster",
      source : "CIFOR-ICRAF",
      title: "Kumpulan Poster: Strategi Penyuluhan Agroforestri",
      subtitle: "Publikasi - 2025",
      image: "/cifor-icraf-logo.png",
      alt: "CIFOR-ICRAF Logo",
      Url: "https://www.cifor-icraf.org/publications/sea/Publications/files/booklet/BL00532-25.pdf"
    }

  ];

  // Dapatkan daftar kategori unik
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(dataLibraryItems.map(item => item.category)));
  }, [dataLibraryItems]);

  // Filter data berdasarkan kategori yang dipilih
  const filteredItems = useMemo(() => {
    if (!selectedCategory) {
      return dataLibraryItems;
    }
    return dataLibraryItems.filter(item => item.category === selectedCategory);
  }, [dataLibraryItems, selectedCategory]);

  const handleOpenClick = (item: typeof dataLibraryItems[0]) => {
    if (item.Url !== "#") {
      window.open(item.Url, "_blank");
    }
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto overflow-hidden", className)} {...props}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">{t('dataLibrary.title')}</h1>
      </div>
      <div className="px-12">
        {/* Menu filter */}
        <div className="my-6 flex items-center gap-3">
          <label className="text-gray-700 dark:text-gray-300 font-medium">
            {t('dataLibrary.selectCategory')}:
          </label>
          <Menu>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="min-w-[150px] max-w-xs"
              >
                {selectedCategory ? t(`dataLibrary.category.${selectedCategory.toLowerCase()}`) : t('dataLibrary.allItems')}
              </Button>
            </Menu.Trigger>
            <Menu.Content className="min-w-[150px] max-w-xs">
              <Menu.Item
                onClick={() => setSelectedCategory(null)}
                className="cursor-pointer"
              >
                {t('dataLibrary.allItems')}
              </Menu.Item>
              {uniqueCategories.map((category) => (
                <Menu.Item
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer"
                >
                  {t(`dataLibrary.category.${category.toLowerCase()}`)}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu>
        </div>

        <Carousel className="w-full" opts={{ align: "start", loop: true }} key={`carousel-${selectedCategory}`}>
          <CarouselContent key={`content-${selectedCategory}`}>
            {filteredItems.map((item, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-3/4 md:basis-1/3 ">
                <Card className="w-full shadow-none hover:shadow-md h-full flex flex-col relative overflow-hidden ">
                  
                  <CardContent className="flex flex-col items-start p-3 sm:p-4 md:p-5 relative z-10 h-full justify-between">
                    <div className="w-full">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm">{item.subtitle}</p>
              
                    </div>

                    <div className="w-full flex flex-col items-center">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-30 h-30  md:w-40 md:h-40 object-contain mx-auto"
                      />
                      <div className="w-full flex justify-end mt-auto pt-4">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleOpenClick(item)}
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
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </div>
    </div>
  );
}