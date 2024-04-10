import { DUMMY_ARTICLES } from '../constant';

export async function fetchArticles(uid: string) {
  const articles = DUMMY_ARTICLES.filter((item) => item.uid === uid).sort(
    (a, b) => b.createdAt - a.createdAt
  );
  return articles;
}
