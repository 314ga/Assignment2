const Bank = artifacts.require("Bank.sol");

contract("Bank", (accounts) => {
  it("Create account", async () => {
    const accounts = await Bank.new();
    const account = await accounts.createAccount(
      "0x616Ce0F4bA78D936625fB8432bc7AD4dDF93f681",
      "Jakub Piga",
      "Horsens"
    );
    console.log(accounts);

    assert.equal(account.receipt.status, true, "Account not created");
  });
  it("Create 2 accounts", async () => {
    const accounts = await Bank.new();
    await accounts.createAccount(
      "0x616Ce0F4bA78D936625fB8432bc7AD4dDF93f681",
      "Jakub Piga",
      "Horsens"
    );
    await accounts.createAccount(
      "0x616Ce0F4bA78D936625fB8432bc7AD4dDF93f681",
      "Jakub Piga 2",
      "Horsens 2"
    );
    const accountNr = await accounts.accountNumber();
    console.log(accountNr);

    assert.equal(accountNr, 2, "Account number does not match");
  });
});
