import {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function ListTransactions() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3000/api/transactions/list');
        console.log(response.data);
        setData(response.data.data);
    }
    return (
        <div style={{padding: '20px'}}>
            <h2>Transactions</h2>
            <button onClick={() => navigate('/add')}>Add Transaction</button>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead> 
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Running Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((txn) => (
                        <tr key={txn.id}>
                            <td>{new Date(txn.date).toLocaleDateString()}</td>
                            <td>{txn.description}</td>
                            <td>{txn.creditAmount}</td>
                            <td>{txn.debitAmount}</td>
                            <td>{txn.balanceAfterTxn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}