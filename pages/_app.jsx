import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import '../styles/globals.css'
import Loading from '../components/Loading.component';
import LoginPage from './login';
import { useEffect } from 'react';
import { collection, doc, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

function MyApp({ Component, pageProps }) {
  const [loggedInUser, loading, error] = useAuthState(auth);

  useEffect(() => {
    const setUserInFirebase = async () => {
      try {
        await setDoc(
          doc(db, 'users', loggedInUser.uid),
          {
            email: loggedInUser.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInUser.photoURL
          },
          {merge: true}
        )
      } catch(error) {
        console.log("ERROR SETTING USER INFO IN FIREBASE", error)
      }
    }
    if (loggedInUser){
      setUserInFirebase();
    }
    // Check the conversation already exist in Firebase
    // const queryGetConversationsForCurrentUser = query(collection(db,'conversations'), where('users', 'array-contains', loggedInUser.email))
    // const [conversationsSnapshot] = useCollection(queryGetConversationsForCurrentUser)
    // const isConversationAlreadyExisted = (recipientEmail) => {
    //     return conversationsSnapshot?.docs.find(conversation => (conversation.data().users.includes(recipientEmail)))
    // }
    // const createConversation = async () => {
    //   if (!isConversationAlreadyExisted("uylqse172445@fpt.edu.vn")){
    //     // Add conversation to Firebase ("conversation collection")
    //     await addDoc(collection(db, 'conversations'), {
    //       users: [loggedInUser?.email, "uylqse172445@fpt.edu.vn"]
    //     })
    //   }
    // };
    // createConversation();
  }
  , [loggedInUser])

  

  if (loading) return <Loading />
  
  if (!loggedInUser) return <LoginPage />

  return <Component {...pageProps} />
}

export default MyApp
