import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./components/Landing";
import StockPrice from './components/StockPrice';
import StockHistory from './components/StockHistory';
import StockComparison from './components/StockComparison';

function App() {
  return (
    <div>
     <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/stock_price" element={<StockPrice/>} />
                <Route path="/stock_history" element={<StockHistory/> } />
                <Route path="/stock_comparison" element={  <StockComparison/> } />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
