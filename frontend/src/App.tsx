import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Landing } from '../components/Landing';
import { FeaturePage } from '../components/FeaturePage';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<FeaturePage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
