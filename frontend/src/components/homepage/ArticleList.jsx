import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent";
import styled from "styled-components";
import NoArticlePrompt from "./NoArticlePrompt";

function ArticleList({filterArticles}) {

    const {articles} = useContext(UserContext)

    return (
        <ArticlesListContainer className="article-list-container">
            <ListWrapper className="aArticle-list-wrapper">
                {filterArticles?.map(each =>
                    <ArticleItemContainer className="article-item-container" key={each.id}>
                         <Link href={`article/${each.title.replaceAll(" ", "-")}/${each.id}`} key={each.id}>
                            <ArticleItem className="article-item">
                                {each.title}
                            </ArticleItem>
                          </Link>
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
    margin: 12px 0;
    //height: calc(100% - 200px);
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;    /* center items inside each grid cell */
  width: 100%;
`
const ArticleItemContainer = styled.div`
  padding: 16px 0;
`
const ArticleItem = styled.div`
  background-color: #f6f6f6;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: rgb(151, 253, 138);
  }
`

const Link = styled.a`
    text-decoration: none;
    color: rgba(0, 0, 0);
    font-size: inherit;
  
  &:hover {
    color: #000000;
  }
`;
export default ArticleList