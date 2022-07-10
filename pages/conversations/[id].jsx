import { doc, getDoc, getDocs } from "firebase/firestore"
import Head from "next/head"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import styled from "styled-components"
import CoversationScreen from "../../components/CoversationScreen.component"
import Sidebar from "../../components/Sidebar.component"
import { auth, db } from "../../config/firebase"
import { generateQueryGetMessages, tranformMessage } from "../../utils/getMessagesInConversationId"
import { getRecipientEmail } from "../../utils/getRecipientEmail"

import Image from 'next/image'
import Background from '../../assets/background.png'


const StyledContainer = styled.div`
  display: flex;
`
const StyledConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  z-index: 10;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const Conversation = ({conversation, messages}) => {
  const [loggedInUser, loading, error] = useAuthState(auth);

  return (
    <StyledContainer>
      <Head>
        <title>Conversation with {getRecipientEmail(conversation.users, loggedInUser)}</title>
      </Head>
      <Sidebar />
      <div>
        <Image
          src={Background}
          alt="Background"
          layout='fill'
          objectFit='cover'
          sx={{sx: '1'}}
        />
      </div>
      <StyledConversationContainer>
        <CoversationScreen conversation={conversation} messages={messages} />
      </StyledConversationContainer>
    </StyledContainer>
  )
}

export default Conversation

export const getServerSideProps = async (context) => {
  const conversationId = context.params?.id;

  // get conversationId to know who you contact with someone
  const conversationRef = doc(db, 'conversations', conversationId);
  const conversationSnapshot = await getDoc(conversationRef);

  // Get all messages in conversationId
  const queryMessages = generateQueryGetMessages(conversationId);
  const messagesSnapshot = await getDocs(queryMessages);
  
  // Change format documents snapshot into document data
  const messages = messagesSnapshot.docs.map(messageSnapshot => tranformMessage(messageSnapshot))

  return {
    props: {
      conversation: conversationSnapshot.data(),
      messages
    }
  }
}