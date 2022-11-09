export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

// =============>>>>>  Logics for ScrollableChat
// 1 Logic:  if it's same sender the place the profile pic
export const isSameSender = (messages, m, i, userId) => {
  // messages=all messages ; m= current message; i=current message's index
  return (
    // if this message doesn't exceed the array length
    i < messages.length - 1 &&
    // if the next message is not equal to the current sender, then proceed (different sender)
    (messages[i + 1].sender._id !== m.sender._id ||
      // if next message is undefined
      messages[i + 1].sender._id === undefined) &&
    // it means message is from the other user not the logged in user
    messages[i].sender._id !== userId
  );
};
// 2 Logic
export const isLastMessage = (messages, i, userId) => {
  return (
    // check if it's the las message of user
    i === messages.length - 1 &&
    // id of the last messages array is not equal to current logged in user's Id
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

// Logic for chats locating on the left and right
export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

// returns true (if it's same users chat create no space between lines)
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
