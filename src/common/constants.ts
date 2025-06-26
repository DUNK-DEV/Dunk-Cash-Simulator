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
  TABLE_AMORTIZATION: "Simulación de cuotas",
  TOTAL_FINISH: "Total",
};

export const redirectToWhatsApp = () => {
  window.open(
    "https://api.whatsapp.com/send?phone=+573012880707&text=Quiero%20solicitar%20un%20pr%C3%A9stamo%20con%20ustedes!"
  );
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

export const capitalPayment = (amount, months) => {
  const parseAmount = parseCurrency(amount);
  return parseAmount / months;
};

export const pendingAmount = (
  amount: string,
  months: number,
  cuota: number
): number => {
  const parseAmount = parseCurrency(amount);
  return parseAmount - capitalPayment(amount, months) * cuota;
};

export const generateInterestByMonth = (
  amount: string,
  months: number,
  days: number = 0,
  fee: string
): number[] => {
  const parseAmount = parseCurrency(amount);
  const parseFee = parseCurrency(fee);
  const interestRate = 0.0668; // mensual
  const dailyRate = interestRate / 30;
  const capitalPayment = parseAmount / months;

  let balance = parseAmount;
  const interests: number[] = [];

  for (let i = 1; i <= months; i++) {
    let interest = balance * interestRate;

    // Si es el primer mes, sumamos la cuota del retiro y el interés por días adicionales
    if (i === 1) {
      if (days > 0) {
        const extraInterest = balance * dailyRate * days;
        interest += extraInterest;
      }
      interest += parseFee;
    }

    interests.push(Math.round(interest));
    balance -= capitalPayment;
  }

  return interests;
};

export const generateTax4x1000ByMonth = (
  amount: string,
  months: number,
  interests: number[]
): number[] => {
  const parseAmount = parseCurrency(amount);
  const capital = capitalPayment(amount, months);
  const taxes: number[] = [];

  for (let i = 1; i <= months; i++) {
    if (i === 1) {
      // Primer mes: se cobra el 4x1000 sobre el monto total
      taxes.push(Math.round(parseAmount * 0.004));
    } else {
      // Meses siguientes: se cobra sobre capital + interés del mes
      const interest = interests[i - 1]; // interés correspondiente
      const base = capital + interest;
      taxes.push(Math.round(base * 0.004));
    }
  }

  return taxes;
};
