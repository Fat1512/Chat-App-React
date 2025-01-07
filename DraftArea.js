/*

if currentActiveChat = chatRoomId
  do not listen on newMessages
else 
  Listen on newMessages


if currentActiveChat != chatRoomId
  emit: markAsDelivered
  listen: status, newMessages

chatList: [
  currentActiveChatRoom: {

  },
  chatRoom: {
    chatRoomId: ,
    roomType,
    userProfile: {
      id,
      name,
      username,
      status: {
        online: true,
        lastSeen
      }
      bio:..
      avatar  :...
    },
    unreadMessages: [
      ...
    ]
    lastestMessage: {
        messageId:
        messageType:
        content:
        senderId:
        ...
      },
  },
  ...
];

emit: sendMessage, markAsRead
listen: status, newMessages

chat: {
  currentActiveRoom: {
    chatRoomId,
    profile,
    onlineStatus: ,
    messages: [
        {
            messageId:
            content:
            type:
            sender:
            status:
        }
    ]
  },
  roomHistory: [],
}

SideBar
  Setting
  Contact
  ChatList
Chat
  ...
Profile
  ---









*/
