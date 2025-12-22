import styled from "styled-components";

function NoArticlePrompt({targetLists, message}) {
    return (
        <NoArticleContainer>
            <NoArticleWrapper>
                <NoArticleTitle>Wow, this is awkward</NoArticleTitle>

                {targetLists.length === 0 && (
                    <NoArticleText>{message}</NoArticleText>
                )}

            </NoArticleWrapper>

        </NoArticleContainer>
    )

}

const NoArticleContainer = styled.div`
  background-color: #212121;
  border-radius: 16px;
  color: #fff;
  display: flex;

`
const NoArticleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 2.5rem;
`
const NoArticleTitle = styled.h2`
  text-align: center;
`
const NoArticleText = styled.p`
  font-size: 1.2rem;
`

export default NoArticlePrompt