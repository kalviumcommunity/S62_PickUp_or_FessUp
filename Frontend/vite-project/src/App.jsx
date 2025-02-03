import {Routes, Route} from 'react-router-dom';
import PickupLine from "./components/PickupLine"
import HomePage from './components/HomePage';
import Regret from './components/Regret';
import AddPickUpLine from './components/PickupLineAdd';
import AddRegret from './components/RegretAdd';

function App(){
  return (
    <>

      <Routes>
        <Route path="/pickup" element={<PickupLine />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/regret" element={<Regret />} />
        <Route path="/add-pickup-line" element={<AddPickUpLine/>}/>
        <Route path="/add-regret" element={<AddRegret/>}/>
        {/* <Route path="/users" element={<PickupRegretsApp />} />  */}
      </Routes>
    </>
  )
}

export default App
