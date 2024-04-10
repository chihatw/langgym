type Props = {
  params: { id: string };
};

const ArticlePage = ({ params: { id } }: Props) => {
  return <div>{`ArticlePage - ${id}`}</div>;
};

export default ArticlePage;
