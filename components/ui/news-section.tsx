"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import Image from "next/image"; // Using next/image for potential optimization

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

// import required modules
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { cn } from "@/lib/utils/format-datetime";

// Sample news data structure (replace with actual data fetching later)
const newsItems = [
  {
    title: "[Góc nhìn FiNart] Cổ phiếu lao dốc, nhiều lãnh đạo ...",
    imageUrl: "/images/news-1.jpg",
    alt: "Stock market down",
  },
  {
    title: "[Góc nhìn FiNart] TNH: Liên minh cổ đông ngoại giúp ...",
    imageUrl: "/images/news-2.jpg",
    alt: "Building exterior",
  },
  {
    title: "Đợt phá mới – Nebula Ultra AI ra mắt",
    imageUrl: "/images/news-1.jpg",
    alt: "Nebula Ultra AI launch",
  },
  {
    title: "[Thông báo] Thay đổi chính sách tặng credit từ 01/04/2025",
    imageUrl: "/images/news-1.jpg",
    alt: "Policy change announcement",
  },
  {
    title: "[Thông báo] Dừng hoạt động Nebula Gen 2 từ 01/05/2025",
    imageUrl: "/images/news-2.jpg",
    alt: "Nebula Gen 2 shutdown",
  },
  {
    title: "[Góc nhìn FiNart] TNH: Liên minh cổ đông ngoại giúp ...",
    imageUrl: "/images/news-2.jpg",
    alt: "Building exterior",
  },
  {
    title: "[Thông báo] Thay đổi chính sách tặng credit từ 01/04/2025",
    imageUrl: "/images/news-1.jpg",
    alt: "Policy change announcement",
  },
  // Add more items as needed
];

export function NewsSection(props: {className?: string}) {
  return (
    <div className={cn("w-full", props.className)}>
      <Swiper
        modules={[Autoplay]} // Enable Autoplay module
        spaceBetween={16} // Space between slides
        slidesPerView={"auto"} // Show partial next slide, adjust as needed
        loop={true} // Enable continuous loop
        autoplay={{
          delay: 3000, // Delay between transitions (in ms)
          disableOnInteraction: false, // Keep autoplaying even after user interaction
          pauseOnMouseEnter: true, // Pause autoplay on mouse hover
        }}
        className="pb-4" // Add padding bottom if needed
      >
        {newsItems.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "280px" }}>
            <Card className="h-full border shadow-sm overflow-hidden py-0">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="max-h-30 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    width={280}
                    height={100}
                    className="object-cover h-30"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <CardTitle className="text-sm font-medium line-clamp-2">
                    {item.title}
                  </CardTitle>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
