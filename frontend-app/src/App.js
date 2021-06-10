import './App.css';
import AppRouter from "./AppRouter";
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import { AppContextProvider } from './AppContext';

const queryClient = new QueryClient()

function getLibrary(provider) {
  console.log("get library")
  console.log("get library")
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <QueryClientProvider client={queryClient}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Router >
                  <AppRouter />
                </Router>
              </Web3ReactProvider>
          </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
