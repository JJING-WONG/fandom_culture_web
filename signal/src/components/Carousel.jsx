// src/components/Carousel.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// ⭐ 이미지 import
import slide1 from "../assets/main1.jpeg";
import slide2 from "../assets/main2.jpeg";
import slide3 from "../assets/main3.jpeg";

const CarouselWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 650px;
  margin: 40px auto;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  transition: opacity 0.6s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideText = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  color: #222;
  background: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.2s;

  &:hover {
    opacity: 1;
  }

  &.left {
    left: 20px;
  }

  &.right {
    right: 20px;
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.div`
  width: ${({ active }) => (active ? "28px" : "10px")};
  height: 10px;
  background: ${({ active }) => (active ? "white" : "#bbb")};
  border-radius: ${({ active }) => (active ? "8px" : "50%")};
  cursor: pointer;
  transition: 0.2s;
`;

// ⭐ 이미지 기반 슬라이드 배열
const slides = [
  { id: 1, image: slide1, text: "" },
  { id: 2, image: slide2, text: "" },
  { id: 3, image: slide3, text: "" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  // 자동 넘어가기
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <CarouselWrap>
      <ArrowButton
        className="left"
        onClick={() =>
          setIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
      >
        ‹
      </ArrowButton>

      <Slide image={slides[index].image}>
        {slides[index].text && <SlideText>{slides[index].text}</SlideText>}
      </Slide>

      <ArrowButton
        className="right"
        onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
      >
        ›
      </ArrowButton>

      <Indicators>
        {slides.map((_, i) => (
          <Dot key={i} active={i === index} onClick={() => setIndex(i)} />
        ))}
      </Indicators>
    </CarouselWrap>
  );
}