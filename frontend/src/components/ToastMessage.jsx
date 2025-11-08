import styled from "styled-components";
import check_circle_fill_icon from "../assets/icons/check_circle_fill_24dp.svg"

function ToastMessage({ message }) {
    return (
        <ToastContainer>
            <img
                src={check_circle_fill_icon}
                alt="check icon"
                style={{width: "1.3rem", margin: "0 0.5rem"}}
            />
            <div>{message}</div>
        </ToastContainer>
    )
}

const ToastContainer = styled.div`
  background-color: #CBF3BB;
  color: #222;
  font-size: 1rem;
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  border-radius: 8px;
  margin-top: 0.5rem;
  //position: fixed;
`
export default ToastMessage