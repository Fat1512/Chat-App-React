export const SIDEBAR = {
  SETTING: "SETTING",
  CHAT: "CHAT",
  CHATLIST: "CHATLIST",
  CONTACT: "CONTACT",
  CREATEGROUP: "CREATEGROUP",
};
export const MESSAGE_STATUS = {
  DELIVERD: "Delivered",
  READ: "Seen",
  SENT: "Sent",
};
export const MODAL = {
  VIDEOCALL: "VIDEOCALL",
  ADD_CONTACT: "ADD_CONTACT",
  CHATLIST_MENU: "CHATLIST_MENU",
  SETTING_MENU: "SETTING_MENU",
  CREATE_GROUP: "CREATE_GROUP",
  LOGOUT: "LOGOUT",
  USERINFO: "USERINFO",
};
export const VIDEOCALL_STATUS = {
  RINGING: "Ringing...",
  CALLING: "Calling...",
  END: "End..",
};
export const MESSAGE_TYPE = {
  TEXT: "TEXT",
  VIDEOCALL: "VIDEOCALL",
  VOICECALL: "VOICECALL",
  IMAGE: "IMAGE",
  FILE: "FILE",
};
export const REJECT_REASON = {
  MISSED: "MISSED",
  BUSY: "BUSY",
};

export const IMAGE_LIMIT_SIZE = 20000000; //20MB
export const MESSAGE_PAGE_SIZE = 20;
export const MESSAGE_PAGE = 1;
export const MESSAGE_PADDING_OFFSET = 0;

export const INIT_CHATBOT_CHATLIST_INFO = {
  chatRoomId: "129ma-ddk202kdlld02202l",
  roomType: "CHATBOT",
  lastestMessage: {},
  totalUnreadMessages: 0,
  roomInfo: {
    id: "dasdodk29d2d2d20d2d",
    name: "Gemini Bot",
    username: "Gemini Bot",
    status: {
      online: true,
    },
    bio: "Gemini Chat Bot",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpjvG5Qm9NAn1C-ZPRu4PCooJsWBqlH5wy5A&s",
    roomType: "CHATBOT",
  },
};

export const INIT_CHATBOT_CHAT_INFO = {
  chatRoomId: "129ma-ddk202kdlld02202l",
  roomType: "CHATBOT",
  messageHistory: [],
  members: [
    {
      id: "dasdodk29d2d2d20d2d",
      name: "Gemini Bot",
      username: "Gemini Bot",
      status: {
        online: true,
        lastSeen: 1.738052608572e12,
      },
      bio: "Gemini Chat Bot",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpjvG5Qm9NAn1C-ZPRu4PCooJsWBqlH5wy5A&s",
    },
  ],
};
