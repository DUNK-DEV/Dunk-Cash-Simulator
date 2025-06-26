import { CONSTANTS, formatCurrency } from "../common/constants";
import "./LoanDetailsForm.css";
import money from "../assets/img/money.svg";
import launch from "../assets/img/launch.svg";
import restart from "../assets/img/restart.svg";

export const LoanDetailsForm = ({
  amount,
  month,
  fee,
  setAmount,
  setMonth,
  setFee,
}) => {
  return (
    <div className="loan-details-container">
      <label className="loan-details-group-label">
        <img src={money} alt="Money icon"></img>
        <h2 className="loan-details-title">{CONSTANTS.DATA_LOAN}</h2>
      </label>
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
            {CONSTANTS.WITHDRAWAL_FEE}
          </label>
          <input
            className="loan-details-input"
            type="text"
            id="fee"
            name="fee"
            value={fee}
            maxLength={6}
            onChange={(e) => setFee(formatCurrency(e.target.value))}
            placeholder="$0"
            required
          />
        </div>
      </form>
      <div className="loan-details-buttons">
        <button className="button-generate">
          <img src={launch} alt="Cohete icon" />
          Simular préstamo
        </button>
        <button className="button-restart">
          <img src={restart} alt="Restart icon" />
          Reiniciar simulación
        </button>
      </div>
    </div>
  );
};
