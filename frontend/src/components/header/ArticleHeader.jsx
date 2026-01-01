import styled from "styled-components";
import close_icon from "../../assets/icons/close_24dp.svg"

function ArticleHeader({articleTitle}) {

    return (
        <HeaderContainer className="heading-container">
            <HeaderWrapper>

                <MiddleSection>
                    <a href ="/" style={{textDecoration:'none', color: "inherit"}}>
                        <LogoWrapper>
                            <LogoImg>
                                <img src={close_icon} alt="close icon" style={{backgroundColor: "transparent"}}/>
                            </LogoImg>

                            <LogoText>{articleTitle}</LogoText>
                        </LogoWrapper>
                    </a>
                </MiddleSection>

            </HeaderWrapper>
        </HeaderContainer>
    )

}


const HeaderContainer = styled.header`
    //width: 100%;
    height: 60px;
    //box-shadow: 0 0.5px 3px rgba(15, 15, 0.13);
    display: flex;
    align-items: center;
    //justify-content: center;
    //padding: 0 1.5em;
    // prevent padding from making 100% width extend beyond screen
    box-sizing: border-box;
    position: fixed;
    z-index: 1000;   // make navbar on top of articleList when scrolling down
    top: 1.5rem;
    left: 1rem;
    right: 1rem;
    color: #fff;
    background-color: #1b1b1b;
    border-radius: 16px;
`
const HeaderWrapper = styled.div`
  width: 100%;
  padding: 0 1.5em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: space-between;
`

const LeftSection = styled.div`
    display: flex;
`;
const MiddleSection = styled.div`
    display: flex;
    //flex: 2;
    //height: 100%;
    //justify-content: center;
`;
const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Logo Wrapper
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
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
    margin: 0 4px;
    color: inherit;
    font-weight: 500;
`

export default ArticleHeader;
