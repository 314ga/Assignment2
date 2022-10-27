import React, { useState, useEffect } from "react";

import InitContractsWeb from "../InitContractsWeb";

const CreateAccount = () => {
  const [accountHolder, setAccountHolder] = useState("");
  const [accountLocation, setAccountLocation] = useState("");

  const [web3, account, contract] = InitContractsWeb();

  useEffect(() => {
    const getContractDetails = async () => {};
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      console.log(contract);
      console.log(account);
      web3.eth.defaultAccount = account;
      getContractDetails();
    }
  }, [web3, account, contract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contract.methods);
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      await contract.methods
        .createAccount(account, accountHolder, accountLocation)
        .send({
          from: account,
          to: contract.options.address,
          value: web3.utils.toWei("2", "ether"),
        })
        .then((res) => {
          console.log(res);
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div>
      <h3>Register Account(Cost=2ETH)</h3>
      <form onSubmit={handleSubmit} style={{ display: "block" }}>
        <input
          type="text"
          placeholder="Name of the account holder"
          value={accountHolder}
          onChange={(e) => {
            setAccountHolder(e.target.value);
          }}
        ></input>

        <input
          value={accountLocation}
          onChange={(e) => {
            setAccountLocation(e.target.value);
          }}
          type="text"
          placeholder="Home Address of account holder"
        ></input>

        <button className="submit-button" type="submit">
          Create a new account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
