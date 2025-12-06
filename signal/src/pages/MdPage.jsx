// src/pages/MdPage.jsx

import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ⭐ 이미지 import
import radioImg from "../assets/radio.png";
import cardImg from "../assets/card.png";
import fileImg from "../assets/file.png";
import notebookImg from "../assets/notebook.png";
import packageImg from "../assets/package.png";
import ostImg from "../assets/ost.jpeg";

/* ======================
      Styled Components
======================= */

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 32px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ItemCard = styled.div`
  background: white;
  border: 2px solid #e2e8f4;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  text-align: center;
  transition: 0.2s;
  min-height: 310px;

  &:hover {
    border-color: #003976;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-4px);
  }
`;

const ImageBox = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

const ItemName = styled.div`
  margin-top: 14px;
  font-size: 18px;
  font-weight: 600;
`;

// ⭐ 설명 (배열 표현)
const ItemDesc = styled.div`
  margin-top: 30px;
  font-size: 16px;
  color: #666;
  opacity: 0.85;

  div {
    line-height: 1.4;
  }
`;

// ⭐ 실제 이미지 + 설명(배열) 포함된 상품 리스트
const items = [
  { id: 1, name: "무전기", image: radioImg, desc: ["• 미니 키링 사이즈 → 3가지 색상 랜덤", "• 원본 사이즈 → 멤버십 키트"] },
  { id: 2, name: "공무원증", image: cardImg, desc: ["• 각 등장인물의 공무원증", "• 커스텀마이징용 공무원증"] },
  { id: 3, name: "경찰 수첩", image: notebookImg, desc: ["• 이스터에그가 담겨있는 내지 구성으로 흥미유발"] },
  { id: 4, name: "사건 파일", image: fileImg, desc: ["• 시즌1의 사건 정리", "• 백지 내지도 포함해 구매자가 사용할 수 있도록 구성"] },
  { id: 5, name: "OST 패키지", image: ostImg, desc: ["• 카세트 테이프", "• CD"] },
  { id: 6, name: "5종 세트", image: packageImg, desc: ["• '증거물품'처럼 포장한 굿즈 5종 패키지"] },
];

export default function MdPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <PageContainer>
        <Title>MD 상품</Title>

        <Grid>
          {items.map((item) => (
            <ItemCard
              key={item.id}
              onClick={() => navigate(`/md/${item.id}`)}
            >
              <ImageBox>
                <img src={item.image} alt={item.name} />
              </ImageBox>

              <ItemName>{item.name}</ItemName>

              {/* ⭐ 배열 방식으로 두 줄 표시 */}
              <ItemDesc>
                {item.desc.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </ItemDesc>
            </ItemCard>
          ))}
        </Grid>
      </PageContainer>

      <Footer />
    </>
  );
}