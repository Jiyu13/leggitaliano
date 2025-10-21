import ArticlePagination from "./ArticlePagination";
import styled from "styled-components";
import ArticleParagraph from "./ArticleParagraph";



function ArticleReadingArea({
    paragraphs, isLoading, divRef, pages, sentence, setSentence,
   currentPage, handlePrevPage, handleNextPage, handleFinishReading,
}) {
    return (
        <ReadableArea ref={divRef} className="readable-area">

            {!isLoading && (
                <>
                    <PagesContainer>
                        <ArticlePagination
                            currentPage={currentPage}
                            pages={pages}
                            handlePrevPage={handlePrevPage}
                            handleNextPage={handleNextPage}
                            handleFinishReading={handleFinishReading}
                        />
                    </PagesContainer>

                    <ReadableContent>
                    {paragraphs?.map((p, index) =>
                        <ArticleParagraph
                            key={index}
                            words={p.split(" ")}
                            // updateDictionaryWord={updateDictionaryWord}
                            // setWordExistError={setWordExistError}
                            setSentence={setSentence}
                        />
                    )}
                    </ReadableContent>
                </>
            )}
        </ReadableArea>
    )
}

const ReadableContent = styled.div`
    font-size: 20px;
    line-height: 1.6;
    padding: 0 8px 8px;
`

const PagesContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const ReadableArea = styled.div`
    display: block;
    max-width: 725px;
    width: 100%;
    background-color: #333;
    color: #ddd;
    overflow: auto;
    border-radius: 8px;
`

export default ArticleReadingArea