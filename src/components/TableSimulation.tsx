export const TableSimulation = () => {
  return (
    <table className="simulation-table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Payment</th>
          <th>Principal</th>
          <th>Interest</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {/* Example row, replace with dynamic data */}
        <tr>
          <td>1</td>
          <td>$500.00</td>
          <td>$400.00</td>
          <td>$100.00</td>
          <td>$9,600.00</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  );
};
