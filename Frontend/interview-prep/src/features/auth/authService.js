const API_URL = "http://localhost:3000/api/users/"

const register = async(userData) => {
  
         const response = await fetch(API_URL + 'register',{
        method :'POST',
        headers :{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(userData)
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || 'Registration failed')
        }

        if(data){
            localStorage.setItem('user',JSON.stringify(data));
//localStorage = browser storage for key–value pairs, persists even after refresh/close.
// Only stores strings, so objects are saved with JSON.stringify.
// Example:
// localStorage.setItem("user", JSON.stringify(data));
// const user = JSON.parse(localStorage.getItem("user"));
// Good for non-sensitive data (preferences, theme, user info).
// Not safe for sensitive data (like tokens) since JS can read it (XSS risk).
// Difference: sessionStorage clears on tab close, localStorage persists.
// 👉 Use HttpOnly cookies for secure tokens, localStorage for general app data.
        }

        return data;
}

const authService = {
    register
}

export default authService

