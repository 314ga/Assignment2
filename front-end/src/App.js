import "./App.css";
import NavbarComp from "./components/NavbarComp";
import { Routes, Route } from "react-router-dom";
import AccountDetails from "./components/AccountDetails";
import CreateAccount from "./components/CreateAccount";
import DisplayAccounts from "./components/DisplayAccounts";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <NavbarComp />
      <Routes>
        <Route exact path="/create" element={<CreateAccount />}></Route>
        <Route exact path="/" element={<DisplayAccounts />}></Route>
        <Route exact path="/accounts/:id" element={<AccountDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
