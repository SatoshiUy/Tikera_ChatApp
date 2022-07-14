import styled from "styled-components"

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateIcon from '@mui/icons-material/Create';

import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from 'email-validator';
import { addDoc, collection, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import ListOfConversation from "./ListOfConversation.component";

const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  width: 40vw;
  max-width: 400px;
  background-color: rgb(33,33,33);
  color: rgb(170,170,170);
  overflow-y: scroll;
  /* border-right: 1px solid whitesmoke; */
  position: relative;
  z-index: 10;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`
const StyledHeader = styled.div`
  display: flex;
  position: sticky;
  width: 100%;
  height: 60px;
  top: 0;
  background-color: rgb(33,33,33);
  z-index: 1;
`

const StyledSearch = styled.div``

const StyledSidebarCreateButton = styled.button`
  padding: 15px;
  border-radius: 50%;
  background-color: rgb(135,116,225);
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(5rem);
  transition: transform .25s cubic-bezier(0.34, 1.56, 0.64, 1);
  ${StyledContainer}:hover & {
      transform: translateY(0rem);
  }
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`


const Sidebar = () => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] = useState(false);
  
  const [recipientEmail, setRecipientEmail] = useState('')
  const open = Boolean(isOpenNewConversationDialog);
  
  const handleClick = (event) => {
    setIsOpenNewConversationDialog(event.currentTarget);
  };
  const handleClose = () => {
    setIsOpenNewConversationDialog(false);
    setRecipientEmail('');
  };
  // Check the conversation already exist in Firebase
  const queryGetConversationsForCurrentUser = query(collection(db,'conversations'), where('users', 'array-contains', loggedInUser.email))
  
  const [conversationsSnapshot] = useCollection(queryGetConversationsForCurrentUser)
  
  const isConversationAlreadyExisted = (recipientEmail) => {
      return conversationsSnapshot?.docs.find(conversation => (conversation.data().users.includes(recipientEmail)))
  }

  const createConversation = async () => {
    if (!recipientEmail) return

    const isInvitingSelf = recipientEmail === loggedInUser?.email;
    
    if (EmailValidator.validate(recipientEmail) && !isInvitingSelf && !isConversationAlreadyExisted(recipientEmail)){
      // Add conversation to Firebase ("conversation collection")
      await addDoc(collection(db, 'conversations'), {
        users: [loggedInUser?.email, recipientEmail]
      })
    }
    setIsOpenNewConversationDialog(false);
    setRecipientEmail('');
  };

  

  return (
    <StyledContainer>
      <StyledHeader>
        <ProfileMenu />
      </StyledHeader>
      <ListOfConversation conversationsSnapshot={conversationsSnapshot}/>

      <StyledSidebarCreateButton onClick={handleClick}>
        <CreateIcon style={{ color: "white" }}/>
      </StyledSidebarCreateButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address of someone you want to contact with
            E.g: uylqse172445@fpt.edu.vn
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={(e) => {
              setRecipientEmail(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>Create</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  )
}

export default Sidebar