import { Toaster } from 'react-hot-toast';

import Router from "~/router";

import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Router />
      <Toaster />
    </>
  );
}

export default App;
