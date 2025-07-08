import {
  calculate4x1000,
  calculateTotalInterest,
  capitalPayment,
  CONSTANTS,
  formatCurrency,
  generateInterestByMonth,
  generateTax4x1000ByMonth,
  parseCurrency,
  pendingAmount,
} from "../common/constants";
import "./TableSimulation.css";
import chart from "../assets/img/chart.svg";

export const TableSimulation = ({ amount, month, days, rate, fee }) => {
  const interestAmount = calculateTotalInterest(amount, month, days, rate);
  const convertFee = parseCurrency(fee);
  const totalInterest = interestAmount + convertFee;
  const interests = generateInterestByMonth(amount, month, days, rate, fee);
  const taxes4x1000 = generateTax4x1000ByMonth(amount, month, interests);
  const calc4x1000 = calculate4x1000(amount, month, rate);
  return (
    <>
      <div className="simulation-table-container">
        <div className="simulation-table-group">
          <div className="simulation-table-title-container">
            <img src={chart} alt="Chart icon"></img>
            <h2 className="simulation-table-title">
              {CONSTANTS.TABLE_AMORTIZATION}
            </h2>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered text-center table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Cuota</th>
                  <th>Abono capital</th>
                  <th>Resta por pagar</th>
                  <th>Intereses</th>
                  <th>4x1000</th>
                  <th>Total a pagar mensual</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: month }, (_, index) => {
                  const abonoCapital = capitalPayment(amount, month);
                  const cuota = index + 1;
                  const restaPorPagar = pendingAmount(amount, month, cuota);
                  const interes = interests[index];
                  const tax4x1000 = taxes4x1000[index];
                  return (
                    <>
                      <tr key={index}>
                        <td>{cuota}</td>
                        <td>{formatCurrency(abonoCapital)}</td>
                        <td>{formatCurrency(restaPorPagar)}</td>
                        <td>{formatCurrency(interes)}</td>
                        <td>{formatCurrency(tax4x1000)}</td>
                        <td>
                          {formatCurrency(abonoCapital + interes + tax4x1000)}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
              <tfoot className="table-info">
                <tr>
                  <th>{CONSTANTS.TOTAL_FINISH}</th>
                  <th>{formatCurrency(amount)}</th>
                  <th>-</th>
                  <th>{formatCurrency(totalInterest)}</th>
                  <th>{formatCurrency(calc4x1000)}</th>
                  <th>
                    {formatCurrency(
                      parseCurrency(amount) + totalInterest + calc4x1000
                    )}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
