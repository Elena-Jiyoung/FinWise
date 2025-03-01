import { db, auth } from "./Firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
// const email = "user@example.com" // User's email address
// const password = "password123" // User's password

export async function login(email, password, setUser) {
    try {
      // Check if the email is registered before attempting login
      const existingMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log(existingMethods);
      if (!existingMethods) {
        return { error: "auth/user-not-found" }; // Return an error response instead of throwing
    }

    // Proceed with login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    console.log(`User ${userCredential.user.email} signed in successfully!`);
    return { success: true };
  } catch (err) {
    console.error("Error Logging In:", err);
    return { error: err.code }; // ✅ Return the Firebase error code
  }
}

export async function register(email, password, setUser) {
    try {
      // Check if the email is already registered before signing up
      const existingMethods = await fetchSignInMethodsForEmail(auth, email);
      if (existingMethods.length > 0) {
        throw new Error("auth/email-already-in-use"); // Custom error handling
      }
  
      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("User created:", user.uid);
  
      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        savings: 0, // Initial savings amount
        categoryBreakdown: [],
        monthlySpending: [],
      });
  
      setUser(user);
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        console.error("Error: Email is already in use. Redirecting to login...");
      } else {
        console.error("Error Signing Up:", error);
      }
      throw error;
    }
}


export async function loginWithGoogle(){


    const provider = new GoogleAuthProvider();
    try{
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(`User ${user.email} signed in with Google successfully!`);
    } catch (err){
        console.error(`Error ${err.code}: ${err.message}`);
        throw err;
    }

}

export async function logOut(setUser){
    try{
        await auth.signOut();
        setUser(null)
        console.log('User signed out successfully');
    }
    catch(err){
        console.error(`Error ${err.code}: ${err.message}`);
        throw err;
    }
}

