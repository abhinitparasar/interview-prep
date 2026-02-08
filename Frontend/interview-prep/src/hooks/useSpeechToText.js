import {useState, useEffect, useRef} from 'react'

const useSpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcriptSp, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;// web API that provides a contract or way in which we can interact with the mic and convert speech to text
        
        if(!SpeechRecognition) {
            console.error("Brower does not support speech Recognition");
            alert("Brower does not support speech Recognition");
            return 
        }

        const recognition = new SpeechRecognition();// constructor function 

        recognition.continuous = false;// keep listening even if the users pauses briefly
        recognition.interimResults = true;// show result while the user is still talking
        recognition.lang = 'en-IN';// language setting

        recognition.onresult = (event) => {// event.results is cummulative it contains everything recognized what you said since recognition.start().Thats why it doesn,t matter if onresult gets triggered multiple times text will be build from the start
            let text = '';
            for(let i=0; i<event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            setTranscript(text);
        }

        recognition.onerror = (event) => {
            console.error('Speech Recognition error', event.error);
            setIsListening(false);
        }

        recognition.onend = () => {
            setIsListening(false);
        }

        recognitionRef.current = recognition; // reference will be lost on re-render if we use a normal variable coz it will be outside useEffect and useEffect will only run once.
    },[]);

    const startListening = () => {
        if(recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if(recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return {
        transcriptSp,
        startListening,
        stopListening,
        isListening,
        resetTranscript: () => setTranscript(''),
    }
}

export default useSpeechToText;