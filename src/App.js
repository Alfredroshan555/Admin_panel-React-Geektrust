import "bulma/css/bulma.min.css";
import './App.css';
import Home from './Home';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
