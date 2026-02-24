import React, { useContext } from "react";
import styled from "styled-components";

export function HeaderLinks() {
    return (
        <>
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
        </>
    )
}

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
    font-size: 18px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    // avoid link goes down when hover
    border-top: 2px solid transparent;
    transition: all 220mx ease-in-out;

    // add animation to link
    //&:hover {
    //    border-top: 2px solid #2ecc71
    //}
`;

const Link = styled.a`
    text-decoration: none;
    color: #fff;
    font-size: inherit;
  
   &:hover {
      color: #17BC5A;
   } ;
  
`;