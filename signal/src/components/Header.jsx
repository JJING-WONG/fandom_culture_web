// src/components/Header.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import policeLogo from "../assets/police.png";

/* ======================
      Styled Components
======================= */

const HeaderWrap = styled.header`
  width: 100%;
  background-color: #003976;
  padding: 16px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 30, 0.2);
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoArea = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const LogoText = styled.span`
  color: white;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Nav = styled.nav``;

const NavList = styled.ul`
  display: flex;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

/* ======================
      Component
======================= */

export default function Header() {
  return (
    <HeaderWrap>
      <HeaderInner>

        <LogoArea to="/">
          <LogoImg src={policeLogo} alt="경찰 마크" />
          <LogoText>Signal 서울지방경찰청</LogoText>
        </LogoArea>

        <Nav>
          <NavList>
            <li><NavItem to="/">메인</NavItem></li>
            <li><NavItem to="/team">팀 조직도</NavItem></li>
            <li><NavItem to="/lab">사건분석연구소</NavItem></li>
            <li><NavItem to="/notice">공지사항</NavItem></li>
            <li><NavItem to="/archive">기록저장실</NavItem></li>
            <li><NavItem to="/petition">국민신문고</NavItem></li>
            <li><NavItem to="/md">MD</NavItem></li>
          </NavList>
        </Nav>

      </HeaderInner>
    </HeaderWrap>
  );
}