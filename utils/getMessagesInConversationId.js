import { collection, orderBy, query, Timestamp, where  } from "firebase/firestore";
import { db } from "../config/firebase";

export const generateQueryGetMessages = (conversationId) => {
  return query(
    collection(db, 'messages'), 
    where('conversation_id', '==', conversationId),
    orderBy('sent_at', 'asc')
  )
}

export const tranformMessage = (message) => ({
  id: message.id,
  ...message.data(),
  sent_at: message.data().sent_at ? convertFirestoreTimestampToString(message.data().sent_at) : null
})

export const convertFirestoreTimestampToString = (timestamp) => new Date(timestamp.toDate().getTime()).toLocaleString()