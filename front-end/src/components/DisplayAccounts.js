import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import InitContractsWeb from "../InitContractsWeb";

const DisplayAccounts = () => {
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line
  const [bankAccounts, setBankAccounts] = useState([]);

  const [web3, account, contract] = InitContractsWeb();

  useEffect(() => {
    const getContractDetails = async () => {
      const accountNumber = await contract.methods.accountNumber().call();

      for (let i = 1; i <= accountNumber; i++) {
        await contract.methods
          .accounts(i)
          .call()
          .then((res) => {
            var bankAcc = bankAccounts;
            if (res.creator === account) {
              bankAcc.push({
                name: res.name,
                location: res.location,
                accountNumber: res.serial,
                balance: res.balance,
              });
            }
            setBankAccounts(bankAcc);
            console.log(bankAccounts);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setLoading(false);
    };
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      getContractDetails();
    }
    // eslint-disable-next-line
  }, [web3, account, contract]);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <>
      <h3>YOUR REGISTERED ACCOUNTS</h3>
      {!loading
        ? bankAccounts.map((account) => {
            return (
              <Card style={{ width: "100rem" }}>
                <Card.Body>
                  <Card.Title>{account.name}</Card.Title>
                  <Card.Text>{account.accountNumber}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      (window.location = `/accounts/${account.accountNumber}`)
                    }
                  >
                    Go to account
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        : null}
    </>
  );
};

export default DisplayAccounts;
