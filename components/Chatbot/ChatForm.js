import React, { useRef } from 'react'
const ChatForm = () => {
    const inputRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = ""
    }
    return (
        <form action="#" className="chat-form" onSubmit={handleSubmit}> 
            <input ref={inputRef} type="text" placeholder="Write your message here..." className="message-input" required/>
            <button className="material-symbols-outlined">send</button>           
        </form>
    )
}