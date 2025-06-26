export const CONSTANTS = {
  TITLE: "Dunkify",
  SLOGAN: "La forma más simple de simular tu préstamo en segundos",
  DATA_LOAN: "Datos del préstamo",
  LOAN_AMOUNT: "Monto del préstamo:",
  LOAN_TERM: "Plazo en meses:",
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
