import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Footer from "../Footer/Footer";
import { AxiosUser } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { ServerPort } from "../../../Api/ServerPort";

const Chats = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const usertoken = localStorage.getItem("token");
  const headers = { authorization: usertoken };
  
  const socket = io(ServerPort);

  useEffect(() => {
    getmessage();
    const socket = io(ServerPort);
    socket.on("connect", () => {
      console.log("User connected to socket.io");
    });

    socket.on("message", (newMessage) => {
      console.log("New message received:", newMessage);
      setMessages((prevMessages) => [
        ...(prevMessages?.length ? prevMessages : []),
        newMessage,
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const sender = "User";
      const response = await AxiosUser.post(
        `postmessege`,
        { text: message, sender },
        { headers }
      );
      socket.emit("message", { text: message, sender }, { headers });
      setMessage("");
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error  chating");
    }
  };

  const getmessage = async () => {
    try {
      const response = await AxiosUser.get(`getmessage`, { headers });
      if (response.data.messages) {
        const sortedMessages = response.data.messages.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setMessages(sortedMessages);
        toast.success(response.data.message);
      } else {
        setMessages([]);
        toast.error(response.data.message);
      }
    } catch (error) {
      setMessages([]);
      toast.error("Something went wrong");
    }
  };



  return (
    <div className="overflow-y-hidden">
      <Header />

      <body className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex  flex-grow h-0 p-4 overflow-y-auto flex-wrap-reverse">
            {messages
              .slice()
              .reverse()
              .map((chat, index) => (
                <div
                  key={index}
                  className={`flex w-[100%] mt-2 space-x-3 ${
                    chat.senter === "Admin"
                      ? "justify-start "
                      : "justify-end"
                  }`}
                >
                  {chat.senter === "Admin" && (
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  )}

                  <div>
                    <div
                      className={` p-3 ${
                        chat.senter === "Admin"
                          ? "rounded-r-lg rounded-bl-lg bg-gray-300"
                          : " bg-blue-300 rounded-l-lg rounded-br-lg text-white"
                      }  `}
                    >
                      <p className="text-sm ">{chat?.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none"></span>
                  </div>
                </div>
              ))}
          </div>
          <form action="">
            <div className="bg-gray-300 p-4 flex items-center">
              <input
                className="flex-grow h-10 rounded px-3 text-sm"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message…"
              />
              <button
                onClick={handlesubmit}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </body>

      <Footer />
    </div>
  );
};

export default Chats;
