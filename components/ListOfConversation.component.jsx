import React, { useEffect } from 'react'
import ConversationSelect from "./ConversationSelect.component";

import Box from '@mui/material/Box';
import List from '@mui/material/List';

import { useRouter } from 'next/router';

const ListOfConversation = ({conversationsSnapshot}) => {
  const [selectedRecipientEmail, setSelectedRecipientEmail] = React.useState(null);

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
    return handleRecipientEmailClick(event, conversationId)
  },[conversationId])

  return (
    <List>
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