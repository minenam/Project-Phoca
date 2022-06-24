import Head from "next/head";

function Seo(props: { title: string }) {
  const { title } = props;
  return (
    <Head>
      <title>{title} | 포카</title>
    </Head>
  );
}

export default Seo;
