import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components";
import { auth } from "../config/firebase"

const StyledMessage = styled.p`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  min-width: 30%;
  padding: 15px 15px 30px;
  border-radius: 0.75rem;
  position: relative;
  color: white;
  margin-block-start: 0.5rem;
  margin-block-end: 0.5rem;
`

const StyledSenderMessage = styled(StyledMessage)`
  background-color: rgb(135,116,225);
  margin-left: auto;
  border-bottom-right-radius: 0;

  :after {
    content: "";
    display: block;
    position: absolute;
    right: -10px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgb(135,116,225);
    clear: both;
    z-index: 1;
  }

`
const StyledReceiverMessage = styled(StyledMessage)`
  background-color: rgb(33,33,33);
  margin-right: auto;
  border-bottom-left-radius: 0;
  :after {
    content: "";
    display: block;
    position: absolute;
    left: -10px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgb(33,33,33);
    clear: both;
    z-index: 1;
  }
`

const StyledTimestamp = styled.span`
  color: rgba(255,255,255,0.5);
  padding: 10px;
  font-size: x-small;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
  z-index: 10;
`

const Message = ({message}) => {
  const [loggedInUser, loading, error] = useAuthState(auth);

  const MessageHTMLType = loggedInUser?.email === message.user ? StyledSenderMessage : StyledReceiverMessage;
  return (
    <MessageHTMLType>{message.text_message}
      <StyledTimestamp>{message.sent_at}</StyledTimestamp>
    </MessageHTMLType>
  )
}

export default Message