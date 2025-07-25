import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import AddTransaction from './pages/AddTransaction';
import TransactionList from './pages/TransactionList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/add" element={<AddTransaction />} />
      <Route path="/list" element={<TransactionList />} />
    </Routes>
  );
}

export default App;
