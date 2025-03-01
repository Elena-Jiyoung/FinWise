import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {login, loginWithGoogle, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()


  async function handleLogin(){
    try{
        const response = await login(email, password, setUser);
        if (response.error === "auth/user-not-found") {
          alert("No account found with this email. Please sign up.");
          return;
        } else if (response.error === "auth/wrong-password") {
          alert("Incorrect password. Please try again.");
          return;
        } else if (response.error) {
          alert(`Error logging in: ${response.error}`);
          return;
        }
        alert("Logged in successfully!");
        router.push('/dashboard')
    }catch(err){
        console.log('Error Logging In', err)
    }
  }

  async function handleGoogleLogin(){
    try{
        await loginWithGoogle()
        router.push('/dashboard')
    }catch(err){
        console.log('Error Logging In', err)
    }
  }

  return (
    <>
    <Navbar/>
    <Section>
        <Header>Login</Header>
        <InputTitle>Email</InputTitle>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <InputTitle>Password</InputTitle>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

        <MainButton onClick={handleLogin}>Login</MainButton>
        <GoogleButton onClick={handleGoogleLogin}>Sign in with Google</GoogleButton>

    </Section>
    </>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
`;

const Header = styled.h1`
  font-size: 24px; /* Adjusted for better scalability */
  margin-top: 50px;
`;

const Input = styled.input`
  font-size: 16px;

`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 14px;
  color: #666;
`;

const MainButton = styled.button`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const GoogleButton = styled.button`
background-color: #007bff;
&:hover {
  background-color: #0056b3;
}
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-of-type)::after {
    content: ', '; /* Adds comma between links */
  }
`;


export default Login