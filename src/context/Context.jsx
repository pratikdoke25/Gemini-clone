import React, { createContext, useState } from "react"; // Importing React and createContext
import runChat from "../Config/gemini"; // Importing runChat function from Config/gemini

// Creating a context
export const MyContext = createContext();

// Defining the ContextProvider component
const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false); // Corrected 'bool' to 'false'
    const [resultData, setResultData] = useState("");

    // Function to send a prompt to runChat
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response= await runChat(input)
        setResultData(response)
        setLoading(false)
        setInput("")
    };

    // Invoking onSent function with a prompt (commented out for now)
    // onSent("What is next JS");

    // Context value
    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        resultData,
        input,
        setInput
    };

    return (
        // Providing the context value to the children components
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    );
};

export default ContextProvider; // Exporting the ContextProvider component
