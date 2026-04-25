/**
 * Calculates Future Value of a Systematic Investment Plan (SIP)
 * @param {number} p Monthly investment amount
 * @param {number} r Annual interest rate in percentage
 * @param {number} n Number of years
 * @returns {number} Future value
 */
export const calculateSIP = (p, r, n) => {
  const i = r / 12 / 100
  const months = n * 12
  const m = p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i)
  return Math.round(m)
}

/**
 * Calculates Equated Monthly Installment (EMI) for a loan
 * @param {number} p Principal loan amount
 * @param {number} r Annual interest rate in percentage
 * @param {number} n Number of years
 * @returns {number} Monthly EMI
 */
export const calculateEMI = (p, r, n) => {
  const i = r / 12 / 100
  const months = n * 12
  const emi = p * i * (Math.pow(1 + i, months) / (Math.pow(1 + i, months) - 1))
  return Math.round(emi)
}

/**
 * Calculates Compound Interest
 * @param {number} p Principal amount
 * @param {number} r Annual interest rate
 * @param {number} t Time in years
 * @param {number} n Number of times interest applied per year
 * @returns {number} Final amount
 */
export const calculateCompoundGrowth = (p, r, t, n = 1) => {
  const amount = p * Math.pow(1 + (r / 100 / n), n * t)
  return Math.round(amount)
}
