import styled from "styled-components";

export function HeaderMenuItem(props) {

    const {icon, icon_info, text, handleClick, goTo} = props

    return (
        <MenuItem>
            <Link href={goTo} onClick={handleClick}>
                {/*<img src={icon} alt={icon_info} style={{width: "24px", height: "24px"}}/>*/}
                <div>{text}</div>
            </Link>
        </MenuItem>
    )
}

const MenuItem = styled.div`
    box-sizing: border-box;
    display: block;
    font-size: 1rem;
    line-height: 1.5;
    position: relative;
    //border-radius: 20px;
    color: #3e3e3e;
    padding: 10px 50px;
    &:hover {
        background-color: #f1f2f6;
        color: black;
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    display: grid;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    padding: 3px;
    gap: 1rem;
`;