import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransactionContext } from "../context/TransactionContext";
import { useContext } from "react";

function createData(name, calories, eth, carbs, protein) {
  return { name, calories, eth, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 0.1, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const [open, setOpen] = React.useState(false);
  const [isConfirmModalopen, setIsConfirmModalopen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsConfirmModalopen(false);
  };

  const { sendTransaction, handleChange, inputFormData } =
    useContext(TransactionContext);

  const handleSubmit = () => {
    const { addressTo, amount } = inputFormData;
    if (addressTo === "" || amount === "") {
      return;
    } else {
      sendTransaction();
    }
    setOpen(true);
  };

  const handleClickModalOpen = () => {
    setIsConfirmModalopen(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>募集内容</TableCell>
            <TableCell align="right">募集人数</TableCell>
            <TableCell align="right">報酬(ETH)</TableCell>
            <TableCell align="right">活動期間</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.eth}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={handleClickModalOpen}>
                  応募する
                </Button>
                <Dialog
                  open={isConfirmModalopen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    このプロジェクトに応募しますか
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      応募条件は以下の条件です
                      <br />
                      ・アウトプットを最後まで出せる方
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={handleClose} autoFocus>
                      応募する
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={handleClickOpen}>
                  ETHを送る
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>感謝を贈る</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      プロジェクトに貢献してくれたメンバーに感謝の言葉と少しのETHを送って健闘を讃えましょう
                    </DialogContentText>
                    <br />
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": {
                          h: 3,
                          width: "50ch",
                        },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="outlined-multiline-static"
                          label="Multiline"
                          multiline
                          rows={4}
                          defaultValue="感謝を伝えてみよう"
                          margin="dense"
                        />
                      </div>
                      <br />
                      <div>
                        <TextField
                          name="addressTo"
                          label="ウォレットアドレス"
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          onChange={(e) => handleChange(e, "addressTo")}
                        />
                      </div>
                      <br />
                      <div>
                        <TextField
                          name="amount"
                          label="数量(ETH)"
                          margin="dense"
                          type="number"
                          variant="outlined"
                          step="0.001"
                          onChange={(e) => handleChange(e, "amount")}
                        />
                      </div>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={handleSubmit}>贈る</Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
