import {Routes, Route} from 'react-router-dom';
import PickupLine from "./components/PickupLine"
import "./App.css"
function App(){
  return (
    <>
      <Routes>
        <Route path="/pickup" element={<PickupLine />} />
      </Routes>
    </>
  )
}

export default App
