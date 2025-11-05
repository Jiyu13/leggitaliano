import {FilledButton} from "../styles/buttonStyles";
import styled from "styled-components";

function PopupModal({
    isOpen, title = "Notice",
    handleNoClick, handleConfirmClick, modalText
}) {

    if (!isOpen) return null;

    return (
            <ModalContainer className="modal-container darkBG" onClick={(e) => e.stopPropagation()}>

            <ModalDialog className="modal-dialog centered"
                // style={{width: isMobile || isTablet ? "90%" : "50%"}}
            >
                <ModalContent className="modal-content modal">
                    <ModalHeader className="modal-header">
                        <HeaderText>{title}</HeaderText>
                    </ModalHeader>
                    <ModalBody style={{textAlign: "center"}} className="modalContent">
                        <BodyText>{modalText}</BodyText>
                    </ModalBody>
                    <ModalActions style={{textAlign: "end"}} className="modalActions">
                        <ActionsContainer className="actionsContainer">
                            <FilledButton onClick={handleNoClick}>Close</FilledButton>
                            {/*<FilledButton onClick={handleConfirmClick}>Confirm</FilledButton>*/}
                        </ActionsContainer>

                    </ModalActions>
                </ModalContent>
            </ModalDialog>
        </ModalContainer>

    )
}

const ModalContainer = styled.div`
  position: fixed;
  background: rgba(83, 92, 104, 0.5);
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;  
`
const ModalDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const ModalContent = styled.div`
  width: 250px;
  height: 170px;
  background: #fff;
  color: white;
  z-index: 10;
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
`

const ModalHeader = styled.div`
  height: 50px;
  background: white;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`
const HeaderText = styled.h3`
  margin: 0;
  padding: 10px;
  color: #6d6e70;;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
`
const ModalBody = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #6d6e70;
  text-align: center;
`
const BodyText = styled.p`
  margin: 0 0 10px;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  font-size: 1em;
`

const ModalActions = styled.div`
  position: absolute;
  bottom: 2px;
  margin-bottom: 10px;
  width: 100%;
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export default PopupModal
