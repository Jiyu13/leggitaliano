import styled from "styled-components";
import {Link} from "react-router-dom";
import {HeaderMenu} from "./HeaderMenu";
import logo from "../assets/logo/leggitaliano.svg"
import {HeaderLinks} from "./HeaderLinks";


function Header() {

    return (
        <HeaderContainer className="heading-container">
            <LeftSection>
                <a href ="/" style={{textDecoration:'none', color: "inherit"}}>
                    <LogoWrapper>
                        <LogoImg>
                            <img src={logo} alt="Leggitaliano Logo"/>
                        </LogoImg>

                        <LogoText>Leggitaliano</LogoText>
                    </LogoWrapper>
                </a>
            </LeftSection>

            {/* call NavLinks component */}
            <MiddleSection>
                <HeaderLinks/>
            </MiddleSection>

            {/* call Accessibility component */}
            <RightSection>
                <HeaderMenu/>
            </RightSection>


        </HeaderContainer>
    )

}


const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
    box-shadow: 0 0.5px 3px rgba(15, 15, 0.13);
    display: flex;
    align-items: center;
    padding: 0 1.5em;
    // prevent padding from making 100% width extend beyond screen
    box-sizing: border-box;
    position: fixed;
    z-index: 1000;   // make navbar on top of articleList when scrolling down
    top: 0;
    background-color: #fff;
`

const LeftSection = styled.div`
    display: flex;
`;
const MiddleSection = styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    justify-content: center;
`;
const RightSection = styled.div`
  display: flex;
`;

// Logo Wrapper
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
`

const LogoImg = styled.div`
    width: 36px;
    height: 36px;

    img {
        width: 100%;
        height: 100%
    }
`

const LogoText = styled.h2`
    font-size: 28px;
    margin: 0 0 0 4px;
    color: inherit;
    font-weight: 500;
`

export default Header;
