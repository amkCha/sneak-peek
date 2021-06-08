import './App.css';
import AppRouter from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router >
          <AppRouter />
        </Router>
      </header>
    </div>
  );
}

export default App;
