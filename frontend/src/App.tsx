import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Landing } from '../components/Landing';
import { FeaturePage } from '../components/FeaturePage';
import { GetStarted } from '../components/GetStarted';
import { Chat } from '../components/Chat';
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<FeaturePage />} />
      <Route path="/start" element={<GetStarted />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
