import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";

export default function AddTransaction() {
  const navigate = useNavigate();

  const [form, setFormData] = useState({
    txnType: "CREDIT",
    amount: "",
    description: "",
  });

  const handleChange = async () => {
    if (!form.amount || !form.description) {
      alert("Please fill all the fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/transactions",
        form
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Transaction
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            select
            label="Transaction Type"
            value={form.txnType}
            onChange={(e) =>
              setFormData({
                ...form,
                txnType: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="CREDIT">
              CREDIT
            </MenuItem>

            <MenuItem value="DEBIT">
              DEBIT
            </MenuItem>
          </TextField>

          <TextField
            type="number"
            label="Amount"
            value={form.amount}
            onChange={(e) =>
              setFormData({
                ...form,
                amount: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            label="Description"
            value={form.description}
            onChange={(e) =>
              setFormData({
                ...form,
                description: e.target.value,
              })
            }
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleChange}
          >
            Add Transaction
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}