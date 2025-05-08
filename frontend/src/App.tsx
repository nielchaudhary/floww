import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Landing } from '../components/Landing';
import { FeaturePage } from '../components/FeaturePage';
import { GetStarted } from '../components/GetStarted';
import { ChatPage } from '../components/Chat';
import { LoginForm } from '../components/LoginForm';
import { Toaster } from 'sonner';
import { PricingSection } from '../components/PricingSection';
import { NewPrompt } from '../components/NewPrompt';
import { PaymentPage } from '../components/PaymentPage';
import { UserVerification } from '../components/UserVerification';

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/signup" element={<GetStarted />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/pricing" element={<PricingSection />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/new" element={<NewPrompt />} />
        <Route path="/user/verify" element={<UserVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
