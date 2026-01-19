import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent";
import styled from "styled-components";
import NoArticlePrompt from "./NoArticlePrompt";

function ArticleList({filterArticles}) {

    const {articles} = useContext(UserContext)
    // console.log(articles)
    return (
        <ArticlesListContainer className="article-list-container">
            <ListWrapper className="aArticle-list-wrapper">
                {filterArticles?.map(each =>
                    <ArticleItemContainer
                        key={each.id}
                        className="article-item-container"
                        href={`article/${each.title.replaceAll(" ", "-")}/${each.id}`}
                    >
                        <ArticleItem className="article-item">
                            {each.title}
                        </ArticleItem>
                    </ArticleItemContainer>
                )}

                {filterArticles?.length === 0 && (
                    <NoArticlePrompt
                        targetLists={filterArticles}
                        message="These's no article that matches the search right now."
                    />
                )}

                {articles?.length === 0 && (
                    <NoArticlePrompt
                        targetLists={articles}
                        message="You haven't added any articles right now. Why not add a new one and start reading?"
                    />
                )}
            </ListWrapper>
        </ArticlesListContainer>
    )

}

const ArticlesListContainer = styled.div`
    line-height: 1.6;
    display: flex;
    justify-content: center;
    margin-top: 48px;
    
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;    /* center items inside each grid cell */
  width: 100%;
`
const ArticleItemContainer = styled.a`
  padding: 32px;
  //border: 1px solid #fff;
  border-radius: 24px;
  background-color: rgb(33, 33, 33);
  font-weight: bold;
  transition: transform 0.2s;
  text-decoration: none;
  color: rgb(255, 255, 255);
  margin-bottom: 12px;

  &:hover {
    cursor: pointer;
    background-color: rgba(23,188,90, 1);
    color: rgb(0, 0, 0);
  }
`
const ArticleItem = styled.div`
  font-size: 1.2rem;
`

export default ArticleList