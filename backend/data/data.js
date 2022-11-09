const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest User",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Anthony",
        email: "anthony@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Anthony",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "jon@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        email: "jane@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jane Doe",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "jon@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
];
module.exports = chats;

// const chats = [
//   {
//     isGroupChat: true,
//     users: [
//       {
//         name: "sara",
//         email: "sara@example.com",
//       },
//       {
//         name: "Madonna",
//         email: "madonna@example.com",
//       },
//     ],
//     _id: "63453513f0ab0d82cd874272",
//     chatName: "SaraMadoona",
//   },
//   {
//     isGroupChat: true,
//     users: [],
//     _id: "6345358df0ab0d82cd87429f",
//     chatName: "BugsMira",
//   },

//   {
//     isGroupChat: true,
//     users: [
//       {
//         name: "Bugsi",
//         email: "bugs@example.com",
//       },
//       {
//         name: "mira",
//         email: "mira@example.com",
//       },
//     ],
//     _id: "6345358df0ab0d82cd87429f",
//     chatName: "BugsMira",
//     groupAdmin: {
//       name: "Guest User",
//       email: "guest@example.com",
//     },
//   },
// ];
// module.exports = chats;
