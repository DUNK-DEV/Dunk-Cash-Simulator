import "./App.css";
import { LoanDetailsForm } from "../components/LoanDetailsForm";
import { LoanSummary } from "../components/LoanSummary";

import iconCash from "../assets/img/icon.png";
import { CONSTANTS } from "../common/constants";
import { useState } from "react";
import { TableSimulation } from "../components/TableSimulation";

function App() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [days, setDays] = useState("");
  const [fee, setFee] = useState("");
  const [showComponent, setShowComponent] = useState(false);
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
          days={days}
          fee={fee}
          setShowComponent={setShowComponent}
          setAmount={setAmount}
          setMonth={setMonth}
          setDays={setDays}
          setFee={setFee}
        />
        {showComponent && (
          <LoanSummary amount={amount} month={month} days={days} fee={fee} />
        )}
      </div>
      {showComponent && (
        <TableSimulation amount={amount} month={month} days={days} fee={fee} />
      )}
    </>
  );
}

export default App;
