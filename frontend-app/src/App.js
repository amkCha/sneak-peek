import './App.css';
import AppRouter from "./AppRouter";
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";

const queryClient = new QueryClient()

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
          <Router >
            <AppRouter />
          </Router>
        </Web3ReactProvider>
    </QueryClientProvider>
  );
}

export default App;
