import { DUMMY_ARTICLES } from '../constant';

// debug
export async function fetchArticles(limit: number) {
  return DUMMY_ARTICLES.sort((a, b) => b.createdAt - a.createdAt);
}

// debug
export async function fetchArticlesByUid(uid: string) {
  const articles = DUMMY_ARTICLES.filter((item) => item.uid === uid).sort(
    (a, b) => b.createdAt - a.createdAt
  );
  return articles;
}
