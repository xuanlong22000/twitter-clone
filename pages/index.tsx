import Form from "@/components/Form";
import Header from "@/components/Header";
import PostsFeed from "@/components/posts/PostsFeed";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What are you thinking ?" />
      <PostsFeed />
    </>
  );
}
