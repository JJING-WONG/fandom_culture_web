// src/components/Banner.jsx
import React from "react";
import "./Banner.css";

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-overlay">
        <h2 className="banner-title">
          국민에게 신뢰받는 경찰
        </h2>
        <p className="banner-sub">
          안전하고 정의로운 사회를 위해 최선을 다하겠습니다.
        </p>
      </div>
    </div>
  );
}