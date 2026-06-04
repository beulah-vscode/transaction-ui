import {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
       <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/add")}
        sx={{ mb: 3 }}
      >
        Add Transaction
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Credit</TableCell>
              <TableCell>Debit</TableCell>
              <TableCell>Running Balance</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 ? (
              data.map((txn) => (
                <TableRow key={txn._id || txn.id}>
                  <TableCell>
                    {new Date(txn.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{txn.description}</TableCell>

                  <TableCell>
                    {txn.creditAmount || "-"}
                  </TableCell>

                  <TableCell>
                    {txn.debitAmount || "-"}
                  </TableCell>

                  <TableCell>
                    {txn.balanceAfterTxn}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Transactions Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    )
}