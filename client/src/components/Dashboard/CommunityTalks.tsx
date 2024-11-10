  import React from 'react';
  import heartIcon from '../images/Heart.png';
  import commentIcon from '../images/Chat.png';
  import shareIcon from '../images/Paper-plane.png';

  interface CommunityTalk {
    communityName: string;
    communityOwner: string;
    messages: {
      user: string;
      content: string;
      reactions: { type: string; count: number }[];
    }[];
  }

  const CommunityTalkItem: React.FC<CommunityTalk> = ({ communityName, communityOwner, messages }) => (
    <div className="flex flex-col grow pt-7 pb-14 w-full text-base text-white rounded-3xl bg-stone-900 max-md:mt-3.5 max-md:max-w-full">
      <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full">
        <h3 data-layername="communityName" className="self-start text-2xl font-bold">
          {communityName}
        </h3>
        <div data-layername="communityOwner" className="self-start mt-2">
          {communityOwner}
        </div>
        {messages.map((message, index) => (
          <div key={index} className="mt-7 max-md:max-w-full">
            <p data-layername={`user${index + 1}Message`}>
              {message.user}: {message.content}
            </p>
            <div className="flex gap-5 items-start self-end mt-2 whitespace-nowrap">
            {message.reactions.map((reaction, reactionIndex) => {
                // Conditionally render image based on reaction type
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
                    reactionImage = ''; // Default to no image
                }

                return (
                  <div key={reactionIndex} className="flex gap-1">
                    {reactionImage && (
                      <img
                        loading="lazy"
                        src={reactionImage}
                        className="object-contain shrink-0 aspect-square w-[30px]"
                        alt={reaction.type}
                      />
                    )}
                    <div data-layername="reactionCount" className="self-start">
                      {reaction.count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CommunityTalks: React.FC = () => {
    const communityTalks: CommunityTalk[] = [
      {
        communityName: "Community Name",
        communityOwner: "Community Owner",
        messages: [
          {
            user: "User_01",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            reactions: [{ type: "heart", count: 5 }, { type: "comment", count: 3 }, { type: "share", count: 2 }]
          },
          {
            user: "User_02",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            reactions: [{ type: "heart", count: 4 }, { type: "comment", count: 2 }, { type: "share", count: 1 }]
          },
          {
            user: "User_03",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            reactions: [{ type: "heart", count: 3 }, { type: "comment", count: 1 }, { type: "share", count: 1 }]
          }
        ]
      },
      // Duplicate the above object for the second community talk
      {
        communityName: "Community Name",
        communityOwner: "Community Owner",
        messages: [
          {
            user: "User_01",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            reactions: [{ type: "heart", count: 5 }, { type: "comment", count: 3 }, { type: "share", count: 2 }]
          },
          {
            user: "User_02",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            reactions: [{ type: "heart", count: 4 }, { type: "comment", count: 2 }, { type: "share", count: 1 }]
          },
          {
            user: "User_03",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            reactions: [{ type: "heart", count: 3 }, { type: "comment", count: 1 }, { type: "share", count: 1 }]
          }
        ]
      }
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