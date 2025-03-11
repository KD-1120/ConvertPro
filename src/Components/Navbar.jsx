import React from "react";
import styled from "styled-components";

// Styled Components
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #333;
  padding: 5px;
  
  &:hover {
    color: #6c5ce7;
  }
`;

const RightNav = styled.div`
  display: flex;
  gap: 15px;
`;

const HelpLink = styled.a`
  color: #6c5ce7;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
`;

const UpgradeButton = styled.button`
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #5a4ad1;
  }
`;

const NavBar = ({ logoText, navItems, onUpgradeClick }) => {
  return (
    <Header>
      <Logo>{logoText}</Logo>
      <Navigation>
        {navItems.map((item, index) => (
          <NavItem key={index} href={item.url}>
            {item.icon && item.icon}
            {item.label}
          </NavItem>
        ))}
      </Navigation>
      <RightNav>
        <HelpLink href="#">Help</HelpLink>
        <UpgradeButton onClick={onUpgradeClick}>Upgrade Plan</UpgradeButton>
      </RightNav>
    </Header>
  );
};

export default NavBar;