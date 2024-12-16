import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import {auth } from './firebaseConfig'
import { use } from 'react'
import Shop from './components/Shop'
import Tictactoe from './components/games/tictactoe'
import Snake from './components/games/snake'
import MatchTwo from './components/games/matchtwo'

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
  const unsubscribe=auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  });
  return () => {
    unsubscribe();
  }

  }, []);

  console.log(user);



  return (
    <>
      <Router>
        <Navbar user={user} />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/game/1" element={<Tictactoe />} />
        <Route path="/game/2" element={<Snake />} />
        <Route path="/game/4" element={<MatchTwo />} />
        </Routes>
      </Router>

      
    </>
  )
}

export default App
