import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import leggitaliano_grey_border from "../../assets/logo/leggitaliano-grey-border.svg"
import {UserContext} from "../../user-content/UserContent";
import api from "../../api";
import {useContext, useEffect, useRef, useState} from "react";


function FloatingHeaderNoBackground() {

    const { setIsLogin, currentUser, setCurrentUser } = useContext(UserContext)

   const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()


    function handleClick() {setIsOpen(!isOpen)}

    let menuRef = useRef()
    useEffect(() => {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handler)

      return() =>{
        document.removeEventListener("mousedown", handler);
      }
    })

    return (
        <HeaderContainer className="heading-container">
            <HeaderWrapper>
                <LeftSection>
                    <a href ="/" style={{textDecoration:'none', color: "inherit"}}>
                        <LogoWrapper>
                            <LogoImg>
                                <img src={leggitaliano_grey_border} alt="Leggitaliano Logo" style={{backgroundColor: "transparent"}}/>
                            </LogoImg>

                            <LogoText>Leggitaliano</LogoText>
                        </LogoWrapper>
                    </a>
                </LeftSection>

                {/* call NavLinks component */}
                <MiddleSection>

                    <NavLinksContainer>
                        <LinksWrapper>

                            <LinkItem>
                                <Link href="/">Home</Link>
                            </LinkItem>

                            <LinkItem>
                                <Link href="/">Word Decks</Link>
                            </LinkItem>

                            <LinkItem>
                                <Link className="recent-reading" style={{cursor: "pointer"}}>
                                    Currently Reading
                                    <HideTitle className="last-open-title">No current reading.</HideTitle>
                                </Link>
                            </LinkItem>

                        </LinksWrapper>
                    </NavLinksContainer>
                </MiddleSection>

                {/* call Accessibility component */}
                <RightSection>
                    {/*<HeaderAccountMenu/>*/}
                    <RightMenuContainer ref={menuRef}>
                        <RightMenuTrigger onClick={handleClick} >
                            <UserName>{currentUser?.username}</UserName>
                        </RightMenuTrigger>


                    </RightMenuContainer>
                </RightSection>
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
    top: 2rem;
    left: .5rem;
    right: .5rem;
    color: #fff;
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
    flex: 2;
    height: 100%;
    justify-content: center;
`;
const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
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
    
    &:hover {
      color: #17BC5A;
    } 
`
const HideTitle = styled.div`
    font-size: 13px;
    box-sizing: border-box;
    display: none;
    text-align: center;
    width: 115px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
`

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const LinksWrapper = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
`;

// render a single link, click and redirect to a specific page
const LinkItem = styled.li`
  height: 100%;
  margin: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #212121;
  border-radius: 45px;
  width: 100%;
  white-space: nowrap;


  // avoid link goes down when hover
  transition: all 220 mx ease-in-out;

  // add animation to link
  &:hover {
    background-color: rgba(143, 143, 143, 0.5);
  }
`;

const Link = styled.a`
    text-decoration: none;
    color: #fff;
    font-size: inherit;
    padding: 1rem  1.5rem;

  
  &:hover {
    color: #fff;
    //color: #000000;
  }
`;

const UserName = styled.div`
    height: 100%;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  color: #000000;
`

const MenuDropdownList = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 55px;
  right: 50px;
  background-color: #ced6e0;
  border-radius: 8px;
  //padding: 10px 0;
  // height: 250px;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19) !important;

  &:before {
    content: "";
    position: absolute;
    top: -5px;
    right: 8px;
    height: 20px;
    width: 20px;
    background: var(--secondary-bg);
    transform: rotate(45deg);
  }
`
const RightMenuTrigger = styled.div``

const RightMenuContainer = styled.div`
  background-color: #e3e3e3;
  border-radius: 45px;
  padding: 1rem 2rem;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #17BC5A;
  }
`;


export default FloatingHeaderNoBackground;
