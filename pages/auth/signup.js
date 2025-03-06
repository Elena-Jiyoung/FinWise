import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import { isEmailInUse, register} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Layout/Navbar'

const Signup = () => {

  const { user, setUser, setUserId } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(undefined)
  const [isValidPassword, setIsValidPassword] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

//   async function validateEmail(){
//     const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     if(emailRegex.test(email) == false ){
//         return false;
//     }
//     console.log('so far so good...')
//     // const emailResponse = await isEmailInUse(email)
//     // console.log('email response', emailResponse)
//     // if(emailResponse.length == 0 ){
//     //     return false;
//     // }
//     try {
//       const emailResponse = await isEmailInUse(email);
//       console.log('email response', emailResponse);
      
//       if (!emailResponse) {
//           console.log("Email check failed, response is null or undefined");
//           return false;
//       }
//       return emailResponse; // Only return true if the email exists
//   } catch (error) {
//       console.error("Error validating email", error);
//       return false;
//   }
//     // return true;
// }

async function handleSignup() {
  try {

    // const isValidEmail = await validateEmail();
    // if (!isValidEmail) {
    //   console.log('Your Email is invalid');
    //   return;
    // }
    // console.log('Your Email is valid');
    // Validate Email Format Before Registering
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format. Please enter a valid email.");
      return;
    }

    console.log('Your Email is valid');

    await register(email, password, setUser, setUserId);
    router.push('/connect-bank'); // Redirect only on successful signup
  } catch (err) {
    if (err.message.includes("auth/email-already-in-use")) {
      alert("This email is already registered. Please log in instead.");
    } else {
      alert("Error signing up: " + err.message);
    }
  }
}


  return (
    <>
      <Navbar />
      <Section>
        <Header>Signup</Header>
        <Input type="email" placeholder="Enter your Email." value={email} onChange={(e) => setEmail(e.target.value)} />
        {isValidEmail === false && <p style={{ fontSize: '14px', color: 'red' }}>Email is invalid or already in use</p>}
        <Input type="password" placeholder="Enter your password." value={password} onChange={(e) => setPassword(e.target.value)} />
        {isValidPassword === false && errorMessage != 'Email is already in use' && <p style={{ fontSize: '14px', color: 'red' }}>Error signing up due to this: {errorMessage}. Please try again.</p>}
        {isValidPassword === false && errorMessage === 'Email is already in use' && <p style={{ fontSize: '14px', color: 'red' }}>Email is already in use. Please login instead.</p>}
        <UserAgreementText>Already have an account? <Link href="/auth/login">Login</Link></UserAgreementText>
        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='#' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='#' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>
        <MainButton onClick={handleSignup}>Signup</MainButton>
      </Section>
    </>
  )
}

const Section = styled.section`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 30px; /* Adjusted for better scalability */
  margin-top: 100px;
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
  font-size: 14px;
`;

const MainButton = styled.button`
  font-size: 16px;
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

const UserAgreementText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 30px;
  text-align: center;`;

const UserAgreementSpan = styled(Link)` 
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-of-type)::after {
    content: ', '; /* Adds comma between links */
  }`;


export default Signup