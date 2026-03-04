import styled from "styled-components";

export default function MobileMenu({ isOpenMenu }) {
    return (
        <ModalContainer $isOpenMenu={isOpenMenu} className="modal-container">
            <ModalDialog
                className='modal-dialog'
                $isOpenMenu={isOpenMenu}
            >
                <MenuItem>
                    <Link href="/">Home</Link>
                </MenuItem>

                <MenuItem>
                    <Link href="/">Word Decks</Link>
                </MenuItem>

                <MenuItem>
                    <Link className="recent-reading" >
                        Currently Reading
                    </Link>
                </MenuItem>

                {/*<MenuItem>*/}
                {/*    <Link className="recent-reading" >*/}
                {/*        Profile*/}
                {/*    </Link>*/}
                {/*</MenuItem>*/}

            </ModalDialog>

            <ModalFooter>
                <LogoutButton
                    className="profile button"
                    style={{backgroundColor: "rgb(33,33,33)", marginBottom: "1rem", color: "#fff", border: "1px solid #939393"}}
                >
                    Profile
                </LogoutButton>
                <LogoutButton className="log out" >
                    Logout
                </LogoutButton>
            </ModalFooter>


        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    background: rgba(41, 41, 41, .3);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;

    backdrop-filter: blur(40px);
  
    opacity: ${({ $isOpenMenu }) => ($isOpenMenu ? 1 : 0)};
    pointer-events: ${({ $isOpenMenu }) => ($isOpenMenu ? "auto" : "none")};
    transition: opacity 240ms ease;
`
const ModalDialog = styled.div`
    padding: 0 1.25rem;
    display: flex;
    flex-direction: column;
    margin-top: 120px;
    margin-bottom: 40px;
  
    transform: ${({ $isOpenMenu }) => ($isOpenMenu ? "translateX(0)" : "translateX(100%)")};
    transition: transform 320ms cubic-bezier(.645, .045, .355, 1);
    will-change: transform;
`
const MenuItem = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
`
const Link = styled.a`
    text-decoration: none;
    color: #fff;
    margin-bottom: 2rem;
    font-size: 1.25rem;
    font-weight: bolder;
    width: 100%;
`

export const ModalFooter = styled.div`
  box-sizing: border-box;
  margin: 0 8px;
  position: absolute;
  bottom: 1rem;
  width: calc(100% - 1rem);
`
const LogoutButton = styled.button`
  text-decoration: none;
  border: none;
  font-size: 1.2rem;
  background-color: rgb(23,188,90);
  color: #000;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.25rem;
  border-radius: 45px;
  cursor: pointer;
`