import { Helmet } from 'react-helmet';
import { Spotlight } from './Spotlight';
import Layout from './Chat/app-sidebar';

export const ChatPage = () => {
  return (
    <>
      <Helmet>
        <title>floww | Chat</title>
      </Helmet>{' '}
      <div className="flex h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Spotlight />
        </div>
        <Layout>
          <div className="flex h-screen w-screen flex flex-col justify-center items-center">
            <h1>Hello from chat page</h1>
          </div>
        </Layout>
      </div>
    </>
  );
};
