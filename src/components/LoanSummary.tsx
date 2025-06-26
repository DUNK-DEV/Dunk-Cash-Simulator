import "./LoanSummary.css";
import { CONSTANTS, formatCurrency } from "../common/constants";
import finance from "../assets/img/finance.svg";

export const LoanSummary = ({ amount, month, fee }) => {
  const parseCurrency = (value: string): number => {
    if (!value) return 0;
    return parseFloat(value.replace(/\./g, "").replace(/[^0-9]/g, "")) || 0;
  };

  const totalToPay = parseCurrency(amount) + parseCurrency(fee);

  return (
    <div className="loan-summary-container">
      <label className="loan-summary-group-label">
        <img src={finance} alt="Money icon"></img>
        <h2 className="loan-summary-title">{CONSTANTS.LOAN_SUMMARY}</h2>
      </label>
      <div className="loan-summary-details">
        <div className="card-summary amount">
          <label>
            {CONSTANTS.AMOUNT_SOLICITED}
            <h2 className="value-loan-summary">{amount}</h2>
          </label>
        </div>
        <div className="card-summary fee">
          <label>
            {CONSTANTS.WITHDRAWAL_FEE}
            <h2 className="value-loan-summary">{fee}</h2>
          </label>
        </div>
      </div>
      <div className="loan-summary-details">
        <div className="card-summary rate-bank">
          <label>
            {CONSTANTS.TIME_TO_PAY}
            <h2 className="value-loan-summary">
              {month != "" ? month + " meses" : ""}
            </h2>
          </label>
        </div>
        <div className="card-summary rate-loan">
          <label>
            {CONSTANTS.INTEREST_RATE_BANK}
            <h2 className="value-loan-summary">6.68%</h2>
          </label>
        </div>
      </div>
      <div className="loan-summary-details">
        <div className="card-summary four-fee">
          <label>
            {CONSTANTS.FOUR_1000}
            <h2 className="value-loan-summary">{amount}</h2>
          </label>
        </div>
        <div className="card-summary total-pay">
          <label>
            {CONSTANTS.TOTAL_TO_PAY}
            <h2 className="value-loan-summary">{formatCurrency(totalToPay)}</h2>
          </label>
        </div>
      </div>
    </div>
  );
};
