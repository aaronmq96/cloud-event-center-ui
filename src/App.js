import './App.css';
import Signup from './Pages/Reg-Login/Signup';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Login from './Pages/Reg-Login/Login';
import LandingPage from './Pages/Landing/LandingPage';
import EventHome from './Pages/EventPage/EventHome';
import EventForm from './Pages/CreateEvent/EventForm';
import UpdateUserInfo from './Pages/Reg-Login/UpdateUserInfo';
import TopNav from './components/TopNav';

function App() {

  const location = useLocation()

  return (
    <div className="App">
      {
        location.pathname !== '/login'
        && location.pathname !== '/signup'
        && <TopNav />
      }
      {/* <Router> */}
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/updateUser' element={<UpdateUserInfo />} />
        <Route path='/event/:id' element={<EventHome />} />
        <Route path='/createEvent' element={<EventForm />} />
      </Routes>
      {/* </Router > */}
    </div >
  );
}

export default App;
