// import React, { useState, useEffect } from 'react';
// import { getChatsByLoanId, createChat } from '../pages/api/chat';

// const ChatComponent = ({ loanId }) => {
//   const [chats, setChats] = useState([]);
//   const [newChat, setNewChat] = useState('');

//   const fetchChats = async () => {
//     try {
//       const fetchedChats = await getChatsByLoanId(loanId);
//       setChats(fetchedChats);
//     } catch (error) {
//       console.error('Error fetching chats:', error);
//     }
//   };

//   // Fetch chats on component mount
//   useEffect(() => {    
//     fetchChats();
//   }, [loanId]);

//   // Handle chat submission
//   const handleSendChat = async () => {
//     if (newChat.trim()) {
//       const chatData = {
//         loanId,
//         chat: newChat,
//         senderId: localStorage.getItem('_id'),
//       };

//       try {
//         const savedChat = await createChat(chatData);
//         fetchChats();
//         setNewChat('');
//       } catch (error) {
//         console.error('Error sending chat:', error);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col h-full p-4 bg-gray-100 border rounded-lg shadow-md">
//       <div className="flex flex-col overflow-y-auto p-4 bg-white rounded-md h-96 mb-4">
//         {chats.map(chat => (
//           <div key={chat._id} className="p-2 my-2">
//             <div className="flex items-center space-x-2">
//               <span className="font-bold text-blue-600">{chat?.senderId?.name || 'Unknown User'}</span>
//               <span className="text-gray-500 text-xs">{new Date(chat.createdAt).toLocaleTimeString()}</span>
//             </div>
//             <p className="text-gray-700">{chat.chat}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center">
//         <input
//           type="text"
//           value={newChat}
//           onChange={e => setNewChat(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSendChat}
//           className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;


import React, { useState, useEffect } from 'react';
import { getChatsByLoanId, createChat } from '../pages/api/chat';

const ChatComponent = ({ loanId }) => {
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState('');

  const fetchChats = async () => {
    try {
      const fetchedChats = await getChatsByLoanId(loanId);
      setChats(fetchedChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  // Fetch chats on component mount
  useEffect(() => {    
    fetchChats();
  }, [loanId]);

  // Handle chat submission
  const handleSendChat = async () => {
    if (newChat.trim()) {
      const chatData = {
        loanId,
        chat: newChat,
        senderId: localStorage.getItem('_id'),
      };

      try {
        await createChat(chatData);
        fetchChats();
        setNewChat('');
      } catch (error) {
        console.error('Error sending chat:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="flex flex-col h-full p-4 bg-gray-100 border rounded-lg shadow-md max-w-md w-full h-[500px]">
        <div className="flex flex-col overflow-y-auto p-4 bg-white rounded-md h-96 mb-4">
          {chats.map(chat => (
            <div key={chat._id} className="p-2 my-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-blue-600">{chat?.senderId?.name || 'Unknown User'}</span>
                <span className="text-gray-500 text-xs">{new Date(chat.createdAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-gray-700">{chat.chat}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={newChat}
            onChange={e => setNewChat(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={handleSendChat}
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;

