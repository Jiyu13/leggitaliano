import styled from "styled-components"
import visibility_dark_24 from "../assets/icons/visibility_dark_24dp.svg"
import visibility_off_dark_24 from "../assets/icons/visibility_off_dark_24dp.svg"

export function VisibilityIcon( {ToggleIcon, visible} ) {

    return (
        <EyeIconButton  onClick={ToggleIcon}>
            {visible ?
                <img src={visibility_dark_24} alt="visibility icon"/>
                :
                <img src={visibility_off_dark_24} alt="visibility off icon"/>
            }
        </EyeIconButton>
    )
}

export const EyeIconButton  = styled.div`
    position: absolute;
    right: 20px;   // the right margin edge to the right edge of it's container block is 8px
    top: 12px;
`