import React, { useState } from "react";
import { Backdrop, SvgIcon } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface AchievementCarouselProps {
  achievements: React.ReactNode[];
  initialActiveIndex: number;
  open: boolean;
  hlandleClose: () => void;
}

const AchievementCarousel: React.FC<AchievementCarouselProps> = ({
  achievements,
  initialActiveIndex,
  open,
  hlandleClose,
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(initialActiveIndex);
  const isMobile = useSelector((state: RootState) => state.screen.isMobile);

  return (
    <Backdrop
      open={open}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1300,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <SvgIcon
        component={CloseOutlinedIcon}
        onClick={hlandleClose}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          margin: "1em",
          color: "white",
          cursor: "pointer",
          fontSize: "2rem",
        }}
      />

      <Swiper
        slidesPerView={isMobile ? 1 : 4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => setCurrentItemIndex(swiper.activeIndex)}
        modules={[Pagination]}
        className="mySwiper"
      >
        {achievements.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{
              transition: "transform 0.3s ease",
              transform: currentItemIndex === index ? "scale(1.3)" : "scale(1)", 
              zIndex: currentItemIndex === index ? 10 : 1, 
              opacity: currentItemIndex === index ? 1 : 0.8, 
              marginRight: "30px", 
            }}
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </Backdrop>
  );
};

export default AchievementCarousel;
