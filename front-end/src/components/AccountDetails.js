import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InitContractsWeb from "../InitContractsWeb";
import Card from "react-bootstrap/Card";
const AccountDetails = () => {
  const [bankingAccount, setBankingAccount] = useState(undefined);
  const [createdDate, setCreatedDate] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [bankingAccountBalance, setBankingAccountBalance] = useState(undefined);
  const [balanceAdded, setBalanceAdded] = useState("");
  const [balanceWithdrawn, setBalanceWithdrawn] = useState("");

  //Use the same variable predefined after " :"
  const { id } = useParams();

  const [web3, account, contract, contractAddress] = InitContractsWeb();

  useEffect(() => {
    const getContractDetails = async () => {
      console.log(id);
      await contract.methods
        .accounts(id)
        .call()
        .then((res) => {
          console.log(res);
          setBankingAccount(res);
          setBankingAccountBalance(res.balance);
          setCreatedDate(new Date(res.createdAt * 1000).toLocaleString());
          console.log(createdDate);
          console.log(res);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      //Get the sender balance
      await contract.methods
        .getSenderBalance(account)
        .call()
        .then((res) => {
          console.log(account);
          console.log(web3.utils.fromWei(res, "ether"));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      console.log(contract);
      console.log(contract.options.address);
      console.log(contractAddress);
      getContractDetails();
    }
    // eslint-disable-next-line
  }, [web3, account, contract]);

  //Function handler on adding balance
  const addMoney = async (e) => {
    e.preventDefault();
    console.log(`${id}`);
    console.log(balanceAdded);
    console.log("add");
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      await contract.methods
        .addBalance(id, web3.utils.toWei(balanceAdded, "ether"), account)
        .send({ from: account, value: web3.utils.toWei(balanceAdded, "ether") })

        .then(async (res) => {
          await contract.methods
            .accounts(id)
            .call()
            .then((res) => {
              setBankingAccountBalance(res.balance);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Function handler on withdrawing balance
  const withdrawBalance = async (e) => {
    e.preventDefault();
    console.log(`${id}`);
    console.log(balanceWithdrawn);
    console.log("withdraw");
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      console.log(contract.options.address);

      await contract.methods
        .withdrawBalance(
          id,
          web3.utils.toWei(balanceWithdrawn, "ether"),
          account

          //Here from and to is only for sending gas from our deployed account to the contract to just call the method
          //In the contract the withdrawAmount is transferred from the contract to our specified ethereum account here
        )
        .send({ from: account, to: contract.options.address })
        .then(async (res) => {
          await contract.methods
            .accounts(id)
            .call()
            .then((res) => {
              setBankingAccountBalance(res.balance);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!web3) {
    return <div className="default">loading</div>;
  }
  return (
    <div>
      {!loading ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card style={{ width: "50vw" }}>
            <Card.Body>
              <Card.Title>Account name</Card.Title>
              <Card.Text>{bankingAccount.name}</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "50vw" }}>
            <Card.Body>
              <Card.Title>Account number</Card.Title>
              <Card.Text>{bankingAccount.serial}</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "50vw" }}>
            <Card.Body>
              <Card.Title>Account balance</Card.Title>
              <Card.Text>{bankingAccountBalance} ETH</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "50vw" }}>
            <Card.Body>
              <Card.Title>Account location</Card.Title>
              <Card.Text>{bankingAccount.location}</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "50vw" }}>
            <Card.Body>
              <Card.Title>Account creation</Card.Title>
              <Card.Text>{createdDate}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) : null}

      <div style={{ display: "flex", marginTop: "5vh" }}>
        <h3>Add money to account:</h3>
        <form onSubmit={addMoney}>
          <input
            type="number"
            placeholder="Add ETH"
            value={balanceAdded}
            onChange={(e) => {
              setBalanceAdded(e.target.value);
            }}
          />
          <button type="submit">ADD</button>
        </form>
      </div>
      <div style={{ display: "flex", marginTop: "5vh" }}>
        <h3>Withdraw money from account:</h3>
        <form onSubmit={withdrawBalance}>
          <input
            type="number"
            placeholder="Withdraw ETH"
            value={balanceWithdrawn}
            onChange={(e) => {
              setBalanceWithdrawn(e.target.value);
            }}
          />
          <button type="submit">Withdraw</button>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
