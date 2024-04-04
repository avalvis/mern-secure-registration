// App.js

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import './App.css'; // Assuming you have styles here

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    {/* Define other routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
