import React, { useState } from 'react';
import heartIcon from '../images/Heart.png';
import commentIcon from '../images/Chat.png';
import shareIcon from '../images/Paper-plane.png';

interface Message {
  user: string;
  content: string;
  reactions: { type: string; count: number }[];
  comments: string[]; // Added comments field to store comments
}

interface CommunityTalk {
  communityName: string;
  communityOwner?: string;
  messages: Message[];
}

const CommunityTalkItem: React.FC<CommunityTalk> = ({ communityName, communityOwner, messages }) => {
  // Initialize state for all reactions and messages
  const [messagesState, setMessagesState] = useState(messages); // Local state for messages
  const [reactionCounts, setReactionCounts] = useState(
    messages.map((message) =>
      message.reactions.map((reaction) => reaction.count)
    )
  );
  const [showCommentInput, setShowCommentInput] = useState(
    messages.map(() => false) // Initialize showCommentInput for each message
  );
  const [newComments, setNewComments] = useState(messages.map(() => ''));

  const handleReactionClick = (messageIndex: number, reactionIndex: number) => {
    if (reactionIndex === 1) { // If the comment reaction is clicked (assuming it's the second index)
      setShowCommentInput((prev) => {
        const updated = [...prev];
        updated[messageIndex] = !updated[messageIndex]; // Toggle the comment input visibility
        return updated;
      });
    } else {
      setReactionCounts((prevCounts) => {
        const updatedCounts = [...prevCounts];
        updatedCounts[messageIndex][reactionIndex] += 1;
        return updatedCounts;
      });
    }
  };

  const handleAddComment = (messageIndex: number) => {
    if (!newComments[messageIndex].trim()) return;

    // Update the comments for the message
    const updatedMessages = [...messagesState];
    updatedMessages[messageIndex].comments.push(newComments[messageIndex]);

    // Update the state with the modified messages
    setMessagesState(updatedMessages);

    // Clear the new comment input
    const updatedComments = [...newComments];
    updatedComments[messageIndex] = '';
    setNewComments(updatedComments);
  };

  return (
    <div className="flex flex-col grow pt-7 pb-14 w-full text-base text-white rounded-3xl bg-stone-900 max-md:mt-3.5 max-md:max-w-full">
      <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full">
        <h3 data-layername="communityName" className="self-start text-2xl font-bold">
          {communityName}
        </h3>
        <div data-layername="communityOwner" className="self-start mt-2">
          {communityOwner}
        </div>
        {messagesState.map((message, messageIndex) => (
          <div key={messageIndex} className="mt-7 max-md:max-w-full">
            <p data-layername={`user${messageIndex + 1}Message`}>
              {message.user}: {message.content}
            </p>
            <div className="flex gap-5 items-start self-end mt-2 whitespace-nowrap">
              {message.reactions.map((reaction, reactionIndex) => {
                // Determine the reaction icon
                let reactionImage;
                switch (reaction.type) {
                  case 'heart':
                    reactionImage = heartIcon;
                    break;
                  case 'comment':
                    reactionImage = commentIcon;
                    break;
                  case 'share':
                    reactionImage = shareIcon;
                    break;
                  default:
                    reactionImage = '';
                }

                return (
                  <div
                    key={reactionIndex}
                    className="flex gap-1 items-center cursor-pointer"
                    onClick={() => handleReactionClick(messageIndex, reactionIndex)}
                  >
                    {reactionImage && (
                      <img
                        loading="lazy"
                        src={reactionImage}
                        className="object-contain shrink-0 aspect-square w-[30px]"
                        alt={reaction.type}
                      />
                    )}
                    <div data-layername="reactionCount" className="self-start">
                      {reactionCounts[messageIndex][reactionIndex]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show comment input when the comment reaction is clicked */}
            {showCommentInput[messageIndex] && (
              <div className="mt-3 flex flex-col gap-2">
                <textarea
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={newComments[messageIndex]}
                  onChange={(e) => {
                    const updatedComments = [...newComments];
                    updatedComments[messageIndex] = e.target.value;
                    setNewComments(updatedComments);
                  }}
                  placeholder="Write a comment..."
                />
                <button
                  className="self-end p-2 bg-blue-600 rounded text-white hover:bg-blue-700"
                  onClick={() => handleAddComment(messageIndex)}
                >
                  Post Comment
                </button>

                {/* Display posted comments */}
                <div className="mt-3">
                  {message.comments.map((comment, idx) => (
                    <div key={idx} className="text-gray-300">
                      <p>userhelloWorld: {comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityTalks: React.FC = () => {
  const communityTalks: CommunityTalk[] = [
    {
      communityName: 'Indie talks',
      communityOwner: '',
      messages: [
        {
          user: 'Linaw111',
          content: 'Just finished listening to an amazing indie album! If you are into raw, heartfelt music, you have to check out Clairos latest release.',
          reactions: [
            { type: 'heart', count: 5 },
            { type: 'comment', count: 3 },
            { type: 'share', count: 2 },
          ],
          comments: [], // Added an empty array for comments
        },
        {
          user: 'voodieBara',
          content: ' Skibidi doo wop, Sigma grindset, indie playlist on repeat 🎧💀 Just hit a Sigma level while listening to that obscure indie band nobody’s ever heard of, and now I’m questioning my entire existence. 😎🔥 #RizzVibes #SkibidiIndie #SigmaInTheStreets',
          reactions: [
            { type: 'heart', count: 4 },
            { type: 'comment', count: 2 },
            { type: 'share', count: 1 },
          ],
          comments: [], // Added an empty array for comments
        },
      ],
    },
    {
      communityName: 'TAYLOR NATION',
      communityOwner:'',
      messages: [
        {
          user: 'TTMYLOVE',
          content: 'Taylor Swift releasing another album like: "No, I didn’t just get over my breakup... I got a Grammy out of it." 💅 Me, crying at 2 AM while pretending to be the main character in a music video for the 100th time. 🎶😭 #TaylorSwiftEra #MainCharacterEnergy #SwiftieVibes #IndieHeart #EmotionalDamage',
          reactions: [
            { type: 'heart', count: 6 },
            { type: 'comment', count: 2 },
            { type: 'share', count: 3 },
          ],
          comments: [], // Added an empty array for comments
        },
      ],
    },
  ];

  return (
    <section className="mt-16 max-md:mt-10">
      <h2 data-layername="communityTalks" className="self-start ml-11 text-4xl font-bold text-black max-md:ml-2.5">
        Community Talks
      </h2>
      <div className="self-center mt-5 w-full max-w-[1517px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {communityTalks.map((talk, index) => (
            <div key={index} data-layername="column" className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <CommunityTalkItem {...talk} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityTalks;
