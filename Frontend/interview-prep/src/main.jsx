import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'//The library that provides the bridge to connect our React components to the Redux store.
import {store} from './app/store.js'
import './index.css'
import App from './App.jsx'

   /* //BrowserRouter is a component from the React Router library that connects your React application to the browser's URL. It uses the browser's built-in History API to keep your user interface in sync with the address bar, enabling navigation without full page reloads
    //listen for any changes to the URL and then inform the rest of your application about that change
--------------------------------------------------------------------------------------------------------------
    //How It Actually Works: The History API
To understand BrowserRouter, you need to know about the problem it solves. A standard HTML <a> tag, when clicked, tells the browser to make a brand new request to the server to fetch a new HTML document. This causes a full-page refresh, which is slow and what Single Page Applications (SPAs) are designed to avoid.

BrowserRouter cleverly uses a modern web feature called the HTML5 History API. This API allows developers to manipulate the browser's URL and session history programmatically without triggering a page refresh.

Here’s the step-by-step process:

1)A User Clicks a <Link>: In your app, you don't use <a href="/about">. You use <Link to="/about">.

2)React Router Intercepts the Click: When the <Link> is clicked, React Router prevents the browser's default behavior (which would be a full reload).

3)The History API is Used: Instead, React Router uses a function from the History API called history.pushState(). This function does two crucial things:

It changes the URL in the browser's address bar to http://yoursite.com/about.

It pushes a new entry onto the browser's session history stack, so the back button will work as expected.

Crucially, it does not make a network request.

4)BrowserRouter Detects the Change: The BrowserRouter component is always listening for these history changes. When it sees the URL has changed to /about, it updates its internal state.

5)Components Re-render: This state update triggers a re-render in your React application. Your <When> component sees the new path (/about) and renders the component you've associated with that path (e.g., <Route path="/about" element={<AboutPage />} />).

6)When the user clicks the browser's back or forward buttons, the browser fires a popstate event. BrowserRouter listens for this event, gets the new URL, and repeats the process to render the correct component. 
---------------------------------------------------------------------------------------------------------------
By wrapping <App /> with <BrowserRouter>, you are making the routing "context" available to every component inside <App />, no matter how deeply nested it is. This context is an object containing crucial information and functions, such as:

The current location (e.g., { pathname: '/about', ... }).

The history object to programmatically navigate (e.g., history.push('/contact')).
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
