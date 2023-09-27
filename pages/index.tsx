import Form from "@/components/Form";
import Header from "@/components/Header";
import PostsFeed from "@/components/posts/PostsFeed";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
      </Head>
      <Header label="Home" />
      <Form placeholder="What are you thinking ?" />
      <PostsFeed />
    </>
  );
}
