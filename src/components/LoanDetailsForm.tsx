import { CONSTANTS, formatCurrency } from "../common/constants";
import "./LoanDetailsForm.css";
import money from "../assets/img/money.svg";
import launch from "../assets/img/launch.svg";
import restart from "../assets/img/restart.svg";
import { useEffect, useState } from "react";

export const LoanDetailsForm = ({
  amount,
  month,
  days,
  fee,
  setShowComponent,
  setAmount,
  setMonth,
  setDays,
  setFee,
}) => {
  const [activeButtonGenerate, setActiveButtonGenerate] = useState(false);
  const [activeButtonRestart, setActiveButtonRestart] = useState(false);

  useEffect(() => {
    if (amount && month && fee) {
      setActiveButtonGenerate(true);
    }
    if (amount || month || days || fee) {
      setActiveButtonRestart(true);
    }
  }, [amount, month, days, fee]);
  const resetForm = () => {
    setShowComponent(false);
    setActiveButtonGenerate(false);
    setActiveButtonRestart(false);
    setAmount("");
    setMonth("");
    setDays("");
    setFee("");
  };

  const handleShowComponent = () => {
    setShowComponent(true);
  };
  return (
    <div className="loan-details-container">
      <div className="loan-details-group">
        <img src={money} alt="Money icon"></img>
        <h2 className="loan-details-title">{CONSTANTS.DATA_LOAN}</h2>
      </div>
      <form className="loan-details-form">
        <div className="form-group">
          <label className="loan-details-label">{CONSTANTS.LOAN_AMOUNT}</label>
          <input
            className="loan-details-input"
            type="text"
            id="amount"
            name="amount"
            value={amount}
            maxLength={12}
            onChange={(e) => setAmount(formatCurrency(e.target.value))}
            placeholder="$0"
            required
          />
        </div>
        <div className="form-group-month-days">
          <div className="form-group">
            <label className="loan-details-label">{CONSTANTS.LOAN_TERM}</label>
            <input
              className="loan-details-input"
              type="number"
              id="month"
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min={1}
              max={24}
              placeholder="Máximo 24 meses"
              required
            />
          </div>
          <div className="form-group">
            <label className="loan-details-label">
              {CONSTANTS.DAYS_ADITIONAL}
            </label>
            <input
              className="loan-details-input"
              type="number"
              id="days"
              name="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min={1}
              max={30}
              placeholder="Máximo 30 días"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="loan-details-label">
            {CONSTANTS.WITHDRAWAL_FEE}
          </label>
          <input
            className="loan-details-input"
            type="text"
            id="fee"
            name="fee"
            value={fee}
            maxLength={8}
            onChange={(e) => setFee(formatCurrency(e.target.value))}
            placeholder="$0"
            required
          />
        </div>
      </form>
      <div className="loan-details-buttons">
        <button
          className={
            activeButtonGenerate
              ? "button-generate"
              : "button-generate-disabled"
          }
          onClick={handleShowComponent}
        >
          <img src={launch} alt="Whatsapp icon" />
          Simular tu préstamo
        </button>
        <button
          className={
            activeButtonRestart ? "button-restart" : "button-restart-disabled"
          }
          onClick={resetForm}
        >
          <img src={restart} alt="Restart icon" />
          Reiniciar simulación
        </button>
      </div>
    </div>
  );
};
