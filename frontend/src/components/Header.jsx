import styled from "styled-components";
import {Link} from "react-router-dom";
import {HeaderMenu} from "./HeaderMenu";

function Header() {

    return (
        <HeaderContainer className="heading-container">
            <LeftSection>
                Leggitaliano
            </LeftSection>

            {/* call NavLinks component */}
            <MiddleSection>

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
    z-index: 1;   // make navbar on top of articleList when scrolling down
    top: 0;
  
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

export default Header;
