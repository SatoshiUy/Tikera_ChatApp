import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRecipient } from '../hooks/useRecipient'
import RecipientAvatar from './RecipientAvatar.component'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useRouter } from 'next/router';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState } from 'react';


const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  cursor: pointer;
  word-break: break-all;
  color: white;
`

const ConversationSelect = ({id, conversationUsers, selectedRecipientEmail, handleRecipientEmailClick}) => {
  const {recipientData, recipientEmail} = useRecipient(conversationUsers);
  return (
    <>
      <ListItemButton
        selected={selectedRecipientEmail === id}
        onClick={(event) => handleRecipientEmailClick(event, id, requirementUsers.randomNumber)}
        sx={{
          color: 'white',
          "&.Mui-selected": {
            backgroundColor: 'rgb(135,116,225)',
            '&:hover': {
              backgroundColor: 'rgb(135,116,225)',
            }
          }
        }}
        >
        <ListItemIcon>
          <StyledContainer>
            <RecipientAvatar recipientData={recipientData} recipientEmail={recipientEmail} />
          </StyledContainer>
        </ListItemIcon>
        <ListItemText primary={recipientEmail} 
        sx={{wordBreak: 'break-all'}}
        />
      </ListItemButton>
    </>
  )
}

export default ConversationSelect