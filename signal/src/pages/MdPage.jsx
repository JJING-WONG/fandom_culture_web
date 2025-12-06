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
  height: 270px;

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

// ⭐ 실제 이미지 포함된 상품 리스트
const items = [
  { id: 1, name: "무전기", image: radioImg },
  { id: 2, name: "공무원증", image: cardImg },
  { id: 3, name: "경찰 수첩", image: notebookImg },
  { id: 4, name: "사건 파일", image: fileImg },
  { id: 5, name: "OST 패키지", image: ostImg },
  { id: 6, name: "5종 세트", image: packageImg },
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
            <ItemCard key={item.id} onClick={() => navigate(`/md/${item.id}`)}>
              <ImageBox>
                <img src={item.image} alt={item.name} />
              </ImageBox>
              <ItemName>{item.name}</ItemName>
            </ItemCard>
          ))}
        </Grid>
      </PageContainer>

      <Footer />
    </>
  );
}