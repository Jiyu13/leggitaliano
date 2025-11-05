import {useContext} from "react";
import {UserContext} from "../user-content/UserContent";
import styled from "styled-components";

function ArticleList() {
    const { articles, setArticles } = useContext(UserContext)

    return (
        <ArticlesListContainer className="article-list-container">
            <ListWrapper className="aArticle-list-wrapper">
                {articles?.map(each =>
                    <ArticleItemContainer className="article-item-container" key={each.id}>
                         <Link href={`article/${each.title.replaceAll(" ", "-")}/${each.id}`} key={each.id}>
                            <ArticleItem className="article-item">
                                {each.title}
                            </ArticleItem>
                          </Link>
                    </ArticleItemContainer>
                )}

                {articles?.length === 0 && (<ArticleItemContainer>You don't have any articles.</ArticleItemContainer>)}
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
  border-bottom: 1px solid #ddd;
  padding: 16px 0;
  //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    cursor: pointer;
  }
`

const Link = styled.a`
    text-decoration: none;
    color: rgba(0, 0, 0, 0.5);
    font-size: inherit;
  
  &:hover {
    color: #000000;
  }
`;
export default ArticleList