import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import server from './environment.js';
import { AuthProvider } from './contexts/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Authentication from './pages/authentication';
function App() {
  const [message, setMessage] = useState('');
  useEffect(()=>{
    axios.get(server)
    .then(response => setMessage(response.data))
            .catch(error => console.error(error));
    }, []);
  return (
    <div className="App">
    
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<Authentication />} />
        </Routes>
      </AuthProvider>
    </Router>

    </div>
  );
}

export default App;
