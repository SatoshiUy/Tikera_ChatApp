import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import ChatAppLogo from '../assets/logo.jpg'

import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

import { auth } from '../config/firebase'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from 'next/router'

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: rgb(33,33,33);
`
const StyledLoginContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 100px;
  background-color: white;
`
const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`

const LoginPage = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const router = useRouter()

  const signIn = () => {
    signInWithGoogle();
  }
  return (
    <StyledContainer>
      <Head>
        <title>Login Page</title>
      </Head>
      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image 
            src={ChatAppLogo} 
            alt='Telegram Logo' 
            height='200px' 
            width='200px'
          />
        </StyledImageWrapper>
        <Button 
          variant='contained' 
          onClick={signIn} 
          startIcon={<GoogleIcon />}
        >
          Sign In With Google
        </Button>
        <Button variant="outlined" startIcon={<GitHubIcon />} sx={{marginTop: '50px'}}>
          <a href='https://github.com/SatoshiUy'>SatoshiUy</a>
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  )
}

export default LoginPage