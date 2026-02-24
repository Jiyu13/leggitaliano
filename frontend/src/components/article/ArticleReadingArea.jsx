import ArticlePagination from "./ArticlePagination";
import styled from "styled-components";
import ArticleParagraph from "./ArticleParagraph";



function ArticleReadingArea({
    paragraphs, isLoading, divRef, pages, setClickedWordIndex, clickedWordIndex, handleWordClicked, sentence, setSentence,
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
                            paragraphIndex={index}
                            setClickedWordIndex={setClickedWordIndex}
                            clickedWordIndex={clickedWordIndex}
                            handleWordClicked={handleWordClicked}
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
    font-size: 24px;
    line-height: 1.6;
`

const PagesContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const ReadableArea = styled.div`
    display: block;
    //max-width: 825px;
    width: 100%;
    //background-color: #333;
    color: #ddd;
    overflow: auto;
    border-radius: 8px;
    padding: 16px;

`

export default ArticleReadingArea