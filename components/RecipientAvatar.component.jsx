import Avatar from "@mui/material/Avatar"
import styled from "styled-components"

const StyledAvatar = styled(Avatar)`
  
`

const RecipientAvatar = ({recipientData, recipientEmail}) => {
  return (
    recipientData?.photoURL ? (
      <StyledAvatar src={recipientData.photoURL}/>
    ) : (
      <StyledAvatar>
        {recipientEmail[0].toUpperCase()}
      </StyledAvatar>
    )
  )
}

export default RecipientAvatar