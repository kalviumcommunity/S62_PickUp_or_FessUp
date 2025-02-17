import {Routes, Route} from 'react-router-dom';
import PickupLine from "./components/PickupLine"
import HomePage from './components/HomePage';
import Regret from './components/Regret';
import AddPickUpLine from './components/PickupLineAdd';
import AddRegret from './components/RegretAdd';
import EditPickupLine from './components/EditPickupLine';
import EditRegret from './components/EditRegret';
import Login from './components/User/Login';
import Signup from './components/User/Singup';

function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/pickup" element={<PickupLine />} />
        <Route path="/regret" element={<Regret />} />
        <Route path="/add-pickup-line" element={<AddPickUpLine/>}/>
        <Route path="/add-regret" element={<AddRegret/>}/>
        <Route path="/edit-pickup-line/:id" element={<EditPickupLine />} />  
        <Route path="/edit-regret/:id" element={<EditRegret/>}/>
      </Routes>
    </>
  )
}

export default App
