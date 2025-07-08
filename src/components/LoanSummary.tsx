import "./LoanSummary.css";
import {
  CONSTANTS,
  formatCurrency,
  parseCurrency,
  calculate4x1000,
  calculateTotalInterest,
} from "../common/constants";
import finance from "../assets/img/finance.svg";

export const LoanSummary = ({ amount, month, days, rate, fee }) => {
  const interestAmount = calculateTotalInterest(amount, month, days, rate);
  const calc4x1000 = calculate4x1000(amount, month, rate);
  const totalToPay =
    parseCurrency(amount) + parseCurrency(fee) + interestAmount + calc4x1000;

  return (
    <div className="loan-summary-container">
      <div className="loan-summary-group">
        <img src={finance} alt="Money icon"></img>
        <h2 className="loan-summary-title">{CONSTANTS.LOAN_SUMMARY}</h2>
      </div>
      <div className="loan-summary-details">
        <div className="card-summary amount">
          <label>
            {CONSTANTS.AMOUNT_SOLICITED}
            <h2 className="value-loan-summary">{formatCurrency(amount)}</h2>
          </label>
        </div>
        <div className="card-summary fee">
          <label>
            {CONSTANTS.WITHDRAWAL_FEE}
            <h2 className="value-loan-summary">{formatCurrency(fee)}</h2>
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
            <h2 className="value-loan-summary">
              {rate != "" ? rate + "%" : "0%"}
            </h2>
          </label>
        </div>
      </div>
      <div className="loan-summary-details">
        <div className="card-summary four-fee">
          <label>
            {CONSTANTS.FOUR_1000}
            <h2 className="value-loan-summary">{formatCurrency(calc4x1000)}</h2>
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
