export const getMessagesSelector=(state)=>state.messages.messages;

// export const getConversationSummaries=(state, currentUserId)=>{
//     const messages = state.messages.messages;
//     const summaries = {};
    
//     messages.forEach(msg => {
//         const otherUserId = msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
    
//         if (!summaries[otherUserId]) {
//           summaries[otherUserId] = {
//             lastMessage: msg,
//             unreadCount: 0
//           };
//         }
    
//         // Update lastMessage if it's more recent
//         if (new Date(msg.createdAt) > new Date(summaries[otherUserId].lastMessage.createdAt)) {
//           summaries[otherUserId].lastMessage = msg;
//         }
    
//         if (msg.senderId === otherUserId && !msg.isRead) {
//           summaries[otherUserId].unreadCount += 1;
//         }
//       });
//       return summaries; 
// }