import React, { useState } from "react";

interface Post {
  id: number;
  username: string;
  content: string;
  topic: string;
  likes: number;
  comments: string[];
  shares: number;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "Linaw111",
      content:
        "Just finished listening to an amazing indie album! If you are into raw, heartfelt music, you have to check out Clairo's latest release.",
      topic: "Indie Talks",
      likes: 5,
      comments: ["I love Clairo's new album!", "Agreed, it's so emotional!"],
      shares: 2,
    },
    {
      id: 2,
      username: "voodieBara",
      content:
        "Skibidi doo wop, Sigma grindset, indie playlist on repeat 🎧💀 Just hit a Sigma level while listening to that obscure indie band nobody’s ever heard of, and now I’m questioning my entire existence. 😎🔥 #RizzVibes #SkibidiIndie",
      topic: "Indie Talks",
      likes: 4,
      comments: ["Sigma grindset is real!", "Haha, totally relatable!"],
      shares: 1,
    },
    {
      id: 3,
      username: "TTMYLOVE",
      content:
        'Taylor Swift releasing another album like: "No, I didn’t just get over my breakup... I got a Grammy out of it." 🎸 Me, crying at 2 AM while pretending to be the main character in a music video for the 100th time. 🎶😭 #TaylorSwiftEra #MainCharacterEnergy #SwiftieVibes',
      topic: "Taylor Nation",
      likes: 6,
      comments: ["Taylor Swift always delivers!", "Swiftie for life 💕"],
      shares: 3,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  const [newTopic, setNewTopic] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostMentions, setNewPostMentions] = useState("");

  const handleOpenModal = (postId: number) => {
    setCurrentPostId(postId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewComment("");
  };

  const handleAddComment = () => {
    if (newComment.trim() === "" || currentPostId === null) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === currentPostId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setNewComment("");
    setShowModal(false);
  };

  const handleAddPost = () => {
    if (newTopic.trim() === "" || newPostContent.trim() === "") return;

    const newPost: Post = {
      id: posts.length + 1,
      username: "You",
      content: newPostContent,
      topic: newTopic,
      likes: 0,
      comments: [],
      shares: 0,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setNewTopic("");
    setNewPostContent("");
    setNewPostMentions("");
  };

  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold mb-2">Community Talks</h3>
        Share your thoughts, music recommendations, and more with the community! 🎶
      <p className="mb-6"></p>

      {/* Community Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Indie Talks", "Taylor Nation"].map((topic) => (
          <div key={topic} className="bg-zinc-800 p-4 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4">{topic}</h2>
            {posts
              .filter((post) => post.topic === topic)
              .map((post) => (
                <div key={post.id} className="mb-4">
                  <p>
                    <strong>{post.username}:</strong> {post.content}
                  </p>
                  <div className="flex justify-start items-center space-x-4 mt-2 text-sm">
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => handleOpenModal(post.id)}
                    >
                      💬 <span>{post.comments.length}</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      ❤️ <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      🔗 <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Comment Modal */}
      {showModal && currentPostId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-2xl font-bold"
              onClick={handleCloseModal}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            <div className="mb-4 space-y-2 max-h-48 overflow-y-auto">
              {posts
                .find((post) => post.id === currentPostId)
                ?.comments.map((comment, index) => (
                  <p key={index} className="bg-gray-100 p-2 rounded">
                    {comment}
                  </p>
                ))}
            </div>
            <textarea
              className="w-full p-2 border rounded mb-4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              className="bg-zinc-800 text-white px-4 py-2 rounded"
              onClick={handleAddComment}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Add New Community Talk */}
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Create a New Community Talk</h2>
        <input
          className="w-full p-2 border rounded mb-4"
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Community Topic (e.g., Indie Talks)"
        />
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <input
          className="w-full p-2 border rounded mb-4"
          type="text"
          value={newPostMentions}
          onChange={(e) => setNewPostMentions(e.target.value)}
          placeholder="Mention albums or names (optional)"
        />
        <button
          className="bg-zinc-800 text-white px-4 py-2 rounded"
          onClick={handleAddPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Community;