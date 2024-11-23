import { Toaster } from 'react-hot-toast';

import Router from "~/router";

import { Header } from "./components/";
import { StatusUpdateProvider } from './contexts/statusUpdateContext';

function App() {
  return (
    <>
      <StatusUpdateProvider>
        <Header />
        <Router />
        <Toaster />
      </StatusUpdateProvider>
    </>
  );
}

export default App;
