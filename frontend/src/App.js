import {Routes,Route} from 'react-router-dom'
import Login from './pages/loginpage/login'
import Profile from './pages/profilepage/profile'
import Home from './pages/homepage/home'
function App() {
  return <div>
    <Routes>
      <Route path="/login" element={<Login/>} exact/>
      <Route path="/profile" element={<Profile/>} exact/>
      <Route path="/" element={<Home/>} exact/>
    </Routes>
  </div>;
}

export default App;
