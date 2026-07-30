import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Quize from './component/Quize';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quize/:id/:difficulty' element={<Quize />} />
      </Routes>
    </div>
  );
}

export default App;
