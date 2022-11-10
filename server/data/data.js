const chats = [
  {
    isGroupChat: true,
    users: [
      {
        name: "sara",
        email: "sara@example.com",
      },
      {
        name: "Madonna",
        email: "madonna@example.com",
      },
    ],
    _id: "63453513f0ab0d82cd874272",
    chatName: "SaraMadoona",
  },
  {
    isGroupChat: true,
    users: [],
    _id: "6345358df0ab0d82cd87429f",
    chatName: "BugsMira",
  },

  {
    isGroupChat: true,
    users: [
      {
        name: "Bugsi",
        email: "bugs@example.com",
      },
      {
        name: "mira",
        email: "mira@example.com",
      },
    ],
    _id: "6345358df0ab0d82cd87429f",
    chatName: "BugsMira",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
];
module.exports = chats;
