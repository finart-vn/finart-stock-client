'use client';

import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import Image from "next/image"; // Using next/image for potential optimization

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

// import required modules
import { Autoplay } from 'swiper/modules';

// Sample news data structure (replace with actual data fetching later)
const newsItems = [
  {
    title: "[Góc nhìn Simplize] Cổ phiếu lao dốc, nhiều lãnh đạo ...",
    imageUrl: "/placeholder-news-1.png", // Replace with actual image paths or URLs
    alt: "Stock market down",
  },
  {
    title: "[Góc nhìn Simplize] TNH: Liên minh cổ đông ngoại giúp ...",
    imageUrl: "/placeholder-news-2.png",
    alt: "Building exterior",
  },
  {
    title: "Đợt phá mới – Nebula Ultra AI ra mắt",
    imageUrl: "/placeholder-news-3.png",
    alt: "Nebula Ultra AI launch",
  },
  {
    title: "[Thông báo] Thay đổi chính sách tặng credit từ 01/04/2025",
    imageUrl: "/placeholder-news-4.png",
    alt: "Policy change announcement",
  },
  {
    title: "[Thông báo] Dừng hoạt động Nebula Gen 2 từ 01/05/2025",
    imageUrl: "/placeholder-news-5.png",
    alt: "Nebula Gen 2 shutdown",
  },
  // Add more items as needed
];

export function NewsSection() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]} // Enable Autoplay module
        spaceBetween={16} // Space between slides
        slidesPerView={'auto'} // Show partial next slide, adjust as needed
        loop={true} // Enable continuous loop
        autoplay={{
          delay: 3000, // Delay between transitions (in ms)
          disableOnInteraction: false, // Keep autoplaying even after user interaction
          pauseOnMouseEnter: true, // Pause autoplay on mouse hover
        }}
        className="pb-4" // Add padding bottom if needed
      >
        {newsItems.map((item, index) => (
          <SwiperSlide key={index} style={{ width: '280px' }}> {/* Set explicit width for slides */}
            <Card className="h-full border shadow-sm overflow-hidden"> {/* Ensure card takes full slide height */}
              <CardContent className="p-0 flex flex-col h-full">
                {/* Image placeholder - Using a div with background for now */}
                <div className="h-40 bg-muted flex items-center justify-center flex-shrink-0">
                  {/* If using actual images later:
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    width={280}
                    height={160}
                    className="object-cover"
                  />
                  */}
                  <span className="text-xs text-muted-foreground">Image Placeholder</span>
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