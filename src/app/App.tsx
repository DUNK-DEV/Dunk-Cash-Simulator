import "./App.css";
import { LoanDetailsForm } from "../components/LoanDetailsForm";
import { LoanSummary } from "../components/LoanSummary";

import iconCash from "../assets/img/icon.png";
import { CONSTANTS } from "../common/constants";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [fee, setFee] = useState("");
  return (
    <>
      <div className="simulator-header">
        <img className="simulator-icon" src={iconCash} alt="icon Cash" />
        <h1 className="simulator-title">{CONSTANTS.TITLE}</h1>
        <img className="simulator-icon" src={iconCash} alt="icon Cash" />
      </div>
      <h3 className="simulator-slogan">{CONSTANTS.SLOGAN}</h3>
      <div className="simulator-container">
        <LoanDetailsForm
          amount={amount}
          month={month}
          fee={fee}
          setAmount={setAmount}
          setMonth={setMonth}
          setFee={setFee}
        />
        <LoanSummary amount={amount} month={month} fee={fee} />
      </div>
    </>
  );
}

export default App;
