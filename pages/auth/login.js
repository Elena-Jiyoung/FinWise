import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {checkUserBankStatus, login, loginWithGoogle, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Layout/Navbar'

const Login = () => {

  const { user, userId, setUser , setUserId} = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()



  async function handleLogin(){
    try{
        const response = await login(email, password, setUser, setUserId);
        
        if (response.error === "auth/user-not-found") {
          const shouldSignUp = confirm("No account found with this email. Would you like to sign up?");
            if (shouldSignUp) {
                return router.push("/auth/signup"); // ✅ Redirect to sign-up
            } else {
                return;
            }
        } else if (response.error === "auth/wrong-password") {
          alert("Incorrect password. Please try again.");
          return;
        } else if (response.error === "auth/invalid-credential") {
          alert("Invalid credentials. Please check your email and password.");
          return;
        } else if (response.error) {
          alert(`Error logging in: ${response.error}`);
          return;
        }
        const result = await checkUserBankStatus(user);
        console.log("User Bank Status:", result);

        if (result.success) {
          console.log("User has connected their bank:", result.tellerUserId);
          router.push('/loading')
        } else {
          console.error("Bank not connected or error:", result.error);
          router.push('/connect-bank');

        }
        alert("Logged in successfully!");
    }catch(err){
        console.log('Error Logging In', err)
    }
  }
  async function handleGoogleLogin() {
    try {
        const response = await loginWithGoogle();

        if (response.error) {
            alert(`❌ Error logging in: ${response.message}`);
            return;
        }

        // Store user data in state
        setUser(response.user);
        setUserId(response.user.uid);
        print(userId)
        // Check user's bank connection
        const result = await checkUserBankStatus(response.user);
        console.log("User Bank Status:", result);

        if (result.success) {
            console.log("User has connected their bank:", result.tellerUserId);
            router.push("/loading");
        } else {
            console.warn("⚠ No bank connected.");
            router.push("/connect-bank");
        }

        alert("✅ Logged in successfully!");
    } catch (err) {
        console.error("❌ Error Logging In:", err);
        alert("Google Sign-In failed.");
    }
}

  

  return (
    <>
    <Navbar/>
    <Section>
        <Header>Login</Header>
        <Input type="email" placeholder="Enter your Email." value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" placeholder="Enter your password." value={password} onChange={(e) => setPassword(e.target.value)}/>

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='#' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='#' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

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
  font-size: 30px; /* Adjusted for better scalability */
  margin-top: 150px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  font-size: 18px;
  width: 280px;
  height: 40px;
  margin: 5px;
  border-radius: 8px;
`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 18px;
  color: #666;
  margin: 10px;
`;

const MainButton = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: #2CB57C;
  border-radius: 5px;
  color: black;
  border: 1px solid transparent;

  &:hover {
    background-color:rgb(2, 126, 74);
    color: white;
  }
`;

const GoogleButton = styled.button`
margin: 10px;
padding: 10px;
background-color: #b4d7fc;
color: black;
border-radius: 5px;
border: 1px solid transparent;
&:hover {
  background-color:rgb(83, 165, 253);
  color: white;
}
`;

const UserAgreementText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 30px;
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