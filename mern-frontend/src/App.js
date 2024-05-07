// App.js

/*
App.js, is the main React component that sets up the application's routing using react-router-dom.

The App component performs the following steps:

1. Imports the necessary modules: React for the component, BrowserRouter, Route, and Routes from react-router-dom for routing, Register from './pages/Register' for the registration page, and './App.css' for styles.

2. Defines the App function component, which returns a Router component that wraps the entire application.

3. Inside the Router, it defines a div with a class of 'App', which serves as the main container for the application.

4. Inside this div, it defines Routes, which is a container for Route components.

5. Inside Routes, it defines a Route with a path of '/register' and an element of <Register/>, which means that when the user navigates to '/register', the Register component will be rendered.

6. It exports the App component as the default export, which means it can be imported in other files without using curly braces.

This file is the entry point of my React application, and is responsible for setting up the routing and rendering the main layout of the application.
*/

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    {/* Define other routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
