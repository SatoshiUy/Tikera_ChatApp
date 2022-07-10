import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../config/firebase'
import {getRecipientEmail} from '../utils/getRecipientEmail'
export const useRecipient = (conversationUsers) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth)
  
  // Get recipient email
  const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser);

  // Get recipient avatar
  const queryGetRecipientEmail = query(collection(db, 'users'), where('email', '==', recipientEmail))
  const [recipientSnapshot, loading, error] = useCollection(queryGetRecipientEmail);

  // recipient Snapshot "?." mean if data is not have => undifined
  const recipientData = recipientSnapshot?.docs[0]?.data();

  return {
    recipientEmail,
    recipientData
  }
}
