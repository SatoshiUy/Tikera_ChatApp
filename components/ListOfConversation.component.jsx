import { useEffect, useState } from 'react'
import ConversationSelect from "./ConversationSelect.component";

import Box from '@mui/material/Box';
import List from '@mui/material/List';

import { useRouter } from 'next/router';

import Image from 'next/image'
import EmptyChats from '../assets/EmptyChats.svg'
import styled from 'styled-components';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const StyledEmptyChats = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 76px);
  color: white;
  > h3 {
    font-size: 1.25rem;
    margin-bottom: 5px;
  }
  > span {
    font-size: 0.875rem;
    color: #aaa;
  }
`

const ListOfConversation = ({conversationsSnapshot}) => {
  const [selectedRecipientEmail, setSelectedRecipientEmail] = useState(null);

  console.log(conversationsSnapshot?.docs.length)
  const router = useRouter();
  const conversationId = router.query.id;

  const handleRecipientEmailClick = (event, id) => {
    setSelectedRecipientEmail(id);
    if(id == undefined){
      router.push('/')
    }
    else router.push(`/conversations/${id}`)
  };
  useEffect(() =>  {
    return handleRecipientEmailClick(event, conversationId);
  },[conversationId])

  return (
    <List>
      {conversationsSnapshot?.docs.length !== 0 || (
        <StyledEmptyChats>
          <Image
              src={EmptyChats}
              alt="Empty Chats"
              layout='intrinsic'
              objectFit='cover'
              sx={{sx: '1'}}
          />
          <h3>Your chat will appear here</h3>
          <span>Add contact at the bottom of this box</span>
        </StyledEmptyChats>
      )}
      {conversationsSnapshot?.docs.map(conversation => {
        return <ConversationSelect
          key={conversation.id} 
          id={conversation.id} 
          conversationUsers = {conversation.data().users}
          selectedRecipientEmail = {selectedRecipientEmail}
          handleRecipientEmailClick = {handleRecipientEmailClick}
          />
      })}
    </List>
  )
}

export default ListOfConversation