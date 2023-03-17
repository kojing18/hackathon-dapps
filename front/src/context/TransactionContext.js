import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/connect";

export const TransactionContext = createContext();

const { ethereum } = window;

//スマートコントラクトを取得
const getSmartContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const [inputFormData, setInputFormData] = useState({
    addressTo: "",
    amount: "",
  });

  const handleChange = (e, name) => {
    setInputFormData((prevInputFormData) => ({
      ...prevInputFormData,
      [name]: e.target.value,
    }));
  };

  //メタマスクウォレットと連携しているか
  const checkMetamaskWalleConnected = async () => {
    if (!ethereum) return alert("メタマスクをインストールしてください");

    //メタマスクのアカウントIDを取得
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // if (accounts.length > 0) {
    //   console.log("isConnect");
    //   setIsConnectedWallet(true);
    // } else {
    //   console.log("isUnConnect");
    //   setIsConnectedWallet(false);
    // }

    // console.log(`ウォレット接続しているか ${isConnectedWallet}`);
  };

  //メタマスクウォレットと連携する
  const connectWallet = async () => {
    if (!ethereum) return alert("メタマスクをインストールしてください");

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    setCurrentAccount(accounts[0]);
  };

  //通貨を送金する
  const sendTransaction = async () => {
    if (!ethereum) return alert("メタマスクをインストールしてください");
    console.log("sendTransaction");
    const { addressTo, amount } = inputFormData;

    const transactionContract = getSmartContract();
    const parsedAmount = ethers.utils.parseEther(amount);

    const transactionParameters = {
      gas: "0x2710",
      to: addressTo,
      from: currentAccount,
      value: parsedAmount._hex,
    };

    const txHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    const transactionHash = await transactionContract.addToBlockChain(
      addressTo,
      parsedAmount
    );
    console.log(`ロード中・・・${transactionHash}`);
    await transactionHash.wait();
    console.log(`送金に成功!${transactionHash.hash}`);
  };

  useEffect(() => {
    checkMetamaskWalleConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        sendTransaction,
        handleChange,
        inputFormData,
        currentAccount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
