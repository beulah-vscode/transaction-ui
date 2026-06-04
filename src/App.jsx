import {Routes, Route} from 'react-router-dom'
import ListTransactions from './pages/ListTransactions.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
function App() {
  // return <h1>Transaction App</h1>
  return (
    <Routes>
      <Route path="/" element={<ListTransactions />} />
      <Route path="/add" element={<AddTransaction />} />
    </Routes>
  )
}

export default App
