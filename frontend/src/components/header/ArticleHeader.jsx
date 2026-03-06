import styled from "styled-components";
import close_icon from "../../assets/icons/close_24dp.svg"

function ArticleHeader({articleTitle}) {

    return (
        <HeaderContainer className="article-heading-container">
            <HeaderWrapper className="article-heading-wrapper">

                <MiddleSection className="article-heading-middle">
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
    height: 60px;
    display: flex;
    align-items: center;
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

const MiddleSection = styled.div`
    display: flex;
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
    font-size: 1.75rem;
    margin: 0 4px;
    color: inherit;
    font-weight: 500;
    white-space:nowrap;
`

export default ArticleHeader;
