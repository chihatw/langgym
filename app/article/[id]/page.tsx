type Props = {
  params: { id: string };
};

const ArticlePage = async ({ params: { id } }: Props) => {
  return <div>{`ArticlePage - ${id}`}</div>;
};

export default ArticlePage;
