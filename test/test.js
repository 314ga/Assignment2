const Bank = artifacts.require("Bank.sol");

contract("Bank", (accounts) => {
  it("Create account", async () => {
    const accounts = await Bank.new();
    const account = await accounts.createAccount(
      "0x616Ce0F4bA78D936625fB8432bc7AD4dDF93f681",
      "Jakub Piga",
      "Horsens"
    );
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
    assert.equal(accountNr, 2, "Account number does not match");
  });
  it("Get balance of an account", async () => {
    const accounts = await Bank.new();
    const account = await accounts.createAccount(
      "0x616Ce0F4bA78D936625fB8432bc7AD4dDF93f681",
      "Jakub Piga",
      "Horsens"
    );
    const balance = await accounts.getBalance(1);
    assert.equal(balance, 2, "Account do not have default balance of 2ETH");
  });
});
