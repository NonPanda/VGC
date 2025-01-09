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
import Pong from './components/games/pong'
import Maze from './components/games/maze'
import Breakout from './components/games/breakout'
import Games from './components/GamesPurchased'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }
  , []);
    

  return (
    <>
      <Router>
        <Navbar user={user} />
        <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/shop" element={<Shop user={user} />} />
        <Route path="/game/1" element={<Tictactoe user={user} />} />
        <Route path="/game/2" element={<Snake user={user} />} />
        <Route path= "/game/3" element={<Pong user={user} />} />
        <Route path="/game/4" element={<MatchTwo user={user}/>} />
        <Route path="/game/5" element={<Maze user={user} />} />
        <Route path="/game/6" element={<Breakout user={user} />} />
        <Route path="/games" element={<Games user={user} />} />
      

        </Routes>
      </Router>

      
    </>
  )
}

export default App
