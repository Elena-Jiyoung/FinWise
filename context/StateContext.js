import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../backend/Firebase';
const Context = createContext();

export const StateContext = ({ children }) => {

  // Variables to Carry Across Multiple Pages
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)
  const [accessToken, setAccessToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [manualTransactions, setManualTransactions] = useState([])
  const router = useRouter()
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserId(firebaseUser.uid);
      } else {
        setUser(null);
        setUserId(null);
        router.push("/auth/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("manualTransactions");
    if (savedTransactions) {
      setManualTransactions(JSON.parse(savedTransactions));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("manualTransactions", JSON.stringify(manualTransactions));
  }, [manualTransactions]);
  


return(
    <Context.Provider
    value={{
        user,
        setUser,
        userId,
        setUserId,
        accessToken,
        setAccessToken,
        dashboardData, 
        setDashboardData,
        manualTransactions,
        setManualTransactions,
        accountId,
        setAccountId
    }}
    >
      {children}
    </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
