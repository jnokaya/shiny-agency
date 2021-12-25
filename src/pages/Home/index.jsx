import { Link } from "react-router-dom"
import styled from "styled-components"
import HomeImage from "../../assets/home-illustration.svg"
const HomeContainer = styled.div.attrs(props => ({ className: 'page borderBoxSizing' }))`
  padding: 5% 5% 0% 5%;
  display:flex;
  flex-direction: row;
  justify-content: space-around;
`

const HomeLeftContainer = styled.div.attrs(props => ({ className: 'borderBoxSizing' }))`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const HomeRightContainer = styled.div.attrs(props => ({ className: 'borderBoxSizing' }))`
  width: 35%;
  align-items: center;
  display: flex;
  justify-content: center;
`
const HomeText = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 160.5%;
  color: black;
  width: 100%;
`
const HomeLink = styled(Link).attrs(props => ({ className: 'navItem fullLink' }))`
  padding: 20px 50px 20px 50px;
  width: fit-content;
`
export default function Home() {
  return (
    <HomeContainer>
      <HomeLeftContainer>
        <HomeText>
          Repérez vos besoins, on s'occupe du reste, avec les meilleurs talents
        </HomeText>
        <HomeLink to="/survey/1">Faire le test</HomeLink>
      </HomeLeftContainer>
      <HomeRightContainer>
        <img src={HomeImage} alt="Repérez vos besoins, on s'occupe du reste, avec les meilleurs talents" />
      </HomeRightContainer>
    </HomeContainer>
  );
}

