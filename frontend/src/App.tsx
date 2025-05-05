import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Landing } from '../components/Landing';
import { FeaturePage } from '../components/FeaturePage';
import { GetStarted } from '../components/GetStarted';
import {  ChatPage } from '../components/Chat';
import { LoginForm } from '../components/LoginForm';
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<FeaturePage />} />
      <Route path="/signup" element={<GetStarted />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
