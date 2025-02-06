import { useRef, useState } from "react";
import { BsFillImageFill, BsSearch, BsSendFill } from "react-icons/bs";
import { AiOutlineUpload } from "react-icons/ai";

import useSocket from "../../hooks/useSocket";
import {
  AuthenticationHeader,
  generateUUID,
  getAccessToken,
} from "../../utils/helper.js";
import { AUTH_REQUEST } from "../../utils/axiosConfig.js";
import { MESSAGE_TYPE } from "../../utils/constants.js";
import useUploadMessageImage from "../../hooks/useUploadMessageImage.jsx";
import useSendMessage from "../../hooks/useSendMessage.jsx";
import toast from "react-hot-toast";

// id : {
//   url:
//   obj:
// }

function MessageInput({ chatRoomId }) {
  const { stompClient } = useSocket();
  const [selectedImgs, setSelectedImgs] = useState({});
  const { isLoading, uploadImages, processFormData } = useUploadMessageImage();
  const { sendMessage } = useSendMessage();

  const isSelectedImage = Object.keys(selectedImgs).length != 0;
  const message = useRef();

  function handleSendImages() {
    const files = Object.values(selectedImgs).map((img) => img.obj);
    const processedFormData = processFormData(files, chatRoomId);
    toast.success("sending");
    uploadImages(processedFormData, {
      onSuccess: (data) => {
        sendMessage(
          {
            messageType: MESSAGE_TYPE.IMAGE,
            imageUrl: data,
          },
          chatRoomId
        );
        setSelectedImgs({});
      },
    });
  }

  function handleSendMessage() {
    if (!message.current.value || message.current.value == null) return;
    sendMessage(
      {
        messageType: MESSAGE_TYPE.TEXT,
        content: message.current.value,
      },
      chatRoomId
    );
    message.current.value = "";
  }

  function handleImageChange(e) {
    const files = Object.values(e.target.files);

    const fileObjects = files.reduce((acc, file) => {
      const uuid = generateUUID(); // Assume generateUUID() exists
      acc[uuid] = {
        url: URL.createObjectURL(file),
        obj: file,
      };
      return acc;
    }, {});

    setSelectedImgs((img) => ({
      ...img,
      ...fileObjects,
    }));
    message.current.value = "";
  }

  function removeImage(e) {
    setSelectedImgs((img) => {
      const updatedImgs = { ...img };
      delete updatedImgs[e.target.getAttribute("id")];
      return updatedImgs;
    });
    message.current.value = "";
  }

  return (
    <>
      {isSelectedImage && (
        <>
          <div className="flex shrink-0 border-2 border-black overflow-x-auto w-full space-x-2 p-2">
            {Object.entries(selectedImgs).map((image) => (
              <img
                onClick={removeImage}
                key={image[0]}
                id={image[0]}
                className="object-contain W-[5rem] h-[5rem] cursor-pointer"
                src={image[1].url}
                alt=""
              />
            ))}
          </div>
        </>
      )}

      <div className="flex shrink-0 justify-center items-center rounded-full border focus-within:border my-5">
        <span
          className="text-4xl px-4 cursor-pointer"
          onClick={(e) => e.currentTarget.querySelector("#uploadFile")?.click()}
        >
          <BsFillImageFill />
          <input
            id="uploadFile"
            onChange={handleImageChange}
            hidden
            multiple
            type="file"
            accept="image/*"
          />
        </span>

        <input
          ref={message}
          onChange={(e) => {
            stompClient.publish({
              destination: `/app/chatRoom/${chatRoomId}/typing`,
              headers: AuthenticationHeader(),
            });
          }}
          disabled={isSelectedImage}
          type="text"
          className={`text-2xl mr-7 p-4 focus-within:outline-none w-full rounded`}
          placeholder="Chat..."
        />
        <span
          className="text-4xl cursor-pointer"
          onClick={() =>
            isSelectedImage ? handleSendImages() : handleSendMessage()
          }
        >
          <BsSendFill />
        </span>
      </div>
    </>
  );
}

export default MessageInput;
