import * as React from "react";
import { useContext, useLayoutEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
  const [isConnectedWallet, setIsConnectedWallet] = useState("");
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  const checkWallet = () => {
    if (currentAccount) {
      setIsConnectedWallet("ウォレット接続済み");
    } else {
      setIsConnectedWallet("ウォレット接続");
    }
  };

  useLayoutEffect(() => {
    checkWallet();
    console.log(`アカウント取得${currentAccount}`);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ハッカソンDapps
          </Typography>
          <Button color="inherit" onClick={connectWallet}>
            {currentAccount[0] ? "接続済み" : "接続"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
