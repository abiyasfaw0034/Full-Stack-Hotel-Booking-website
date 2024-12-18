import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  border-radius: 50%;
`;

function Logo() {
  //   const { isDarkMode } = useDarkMode();
  //   const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return <StyledLogo>{<Img src="/bed.jpeg" alt="Logo" />}</StyledLogo>;
}

export default Logo;
