import './App.css';
import AppRouter from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QueryClientProvider client={queryClient}>
          <Router >
            <AppRouter />
          </Router>
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
