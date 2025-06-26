export const CONSTANTS = {
  TITLE: "Dunkify",
  SLOGAN: "La forma más simple de simular tu préstamo en segundos",
  DATA_LOAN: "Datos del préstamo",
  LOAN_AMOUNT: "Monto del préstamo:",
  LOAN_TERM: "Plazo en meses:",
  DAYS_ADITIONAL: "Días adicionales:",
  LOAN_SUMMARY: "Resumen del préstamo",
  AMOUNT_SOLICITED: "Monto solicitado:",
  WITHDRAWAL_FEE: "Comisión del retiro:",
  TIME_TO_PAY: "Tiempo para pagar:",
  INTEREST_RATE_BANK: "Tasa de interés:",
  FOUR_1000: "4x100:",
  TOTAL_TO_PAY: "Total a pagar:",
};

export const formatCurrency = (value: string | number): string => {
  let number: number;

  if (typeof value === "string") {
    const clean = value.replace(/\./g, "").replace(/[^0-9]/g, "");
    number = parseFloat(clean);
  } else {
    number = value;
  }

  if (isNaN(number) || number === undefined || number === null) {
    number = 0;
  }

  return number.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
};

export const parseCurrency = (value: string): number => {
  if (!value) return 0;
  return parseFloat(value.replace(/\./g, "").replace(/[^0-9]/g, "")) || 0;
};

export const calculate4x1000 = (amount: string, months: number): number => {
  const parseAmount = parseCurrency(amount);
  const capitalPayment = parseAmount / months;

  let pendingAmount = parseAmount;
  let totalTax = 0;

  for (let i = 1; i <= months; i++) {
    if (i === 1) {
      totalTax += parseAmount * 0.004; // 4x1000 on the total amount
    } else {
      const interestMonthly = pendingAmount * 0.0668; // 6.68% interest rate
      const base = capitalPayment + interestMonthly;
      totalTax += Math.round(base * 0.004);
    }
    pendingAmount -= capitalPayment;
  }

  return totalTax;
};

export const calculateTotalInterest = (
  amount: string,
  months: number,
  days: number = 0
): number => {
  const parseAmount = parseCurrency(amount);
  const interestRate = 0.0668;
  const dailyRate = interestRate / 30;
  const capitalPayment = parseAmount / months;

  let balance = parseAmount;
  let totalInterest = 0;

  // Interés por días adicionales antes del primer abono
  if (days > 0) {
    const initialInterest = balance * dailyRate * days;
    totalInterest += initialInterest;
  }

  // Interés mensual por cada mes
  for (let i = 1; i <= months; i++) {
    const monthlyInterest = balance * interestRate;
    totalInterest += monthlyInterest;
    balance -= capitalPayment;
  }

  return Math.round(totalInterest);
};
