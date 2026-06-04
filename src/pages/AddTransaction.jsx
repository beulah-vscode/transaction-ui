import {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
export default function AddTransaction() {
    const navigate = useNavigate();
    const [form, setFormData] = useState({
        txnType: 'CREDIT',
        amount: '',
        description: ''
    });
    const handleChange = async () => {
        if(!form.amount && !form.description) {
            alert("Please fill all the fields")
            return;
        }
        await axios.post('http://localhost:3000/api/transactions/', form)
        navigate('/');
    };
    return (
        <div style={{padding: '20px'}}>
            <h2>Add Transaction</h2>
            <select 
                value={form.txnType} 
                onChange={(e) => setFormData({...form, txnType: e.target.value})}>
                    <option value="CREDIT">CREDIT</option>
                    <option value="DEBIT">DEBIT</option>
            </select>
            <input 
                type="number" 
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setFormData({...form, amount: e.target.value})}
            />
            <input 
                type="text" 
                placeholder="Description"
                value={form.description}
                onChange={(e) => setFormData({...form, description: e.target.value})}
            />
            <button onClick={handleChange}>Add</button>
        </div>
    )
}