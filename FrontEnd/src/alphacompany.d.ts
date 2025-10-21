// company.d.ts

// --- Company Search ---
export interface CompanySearch {
  symbol: string;
  name: string;
  type?: string;          // e.g., "Equity"
  region?: string;        // e.g., "US"
  marketOpen?: string;
  marketClose?: string;
  timezone?: string;
  currency?: string;
  matchScore?: string;
}

// --- Company Profile ---
export interface CompanyProfileType {
  symbol: string;
  assetType?: string;      // e.g., "Common Stock"
  name: string;
  description?: string;
  cik?: string;
  exchange?: string;
  currency?: string;
  country?: string;
  sector?: string;
  industry?: string;
  address?: string;
  fiscalYearEnd?: string;
  latestQuarter?: string;
  marketCapitalization?: string;
  EBITDA?: string;
  PERatio?: string;
  PEGRatio?: string;
  bookValue?: string;
  dividendPerShare?: string;
  dividendYield?: string;
  eps?: string;
  revenuePerShareTTM?: string;
  profitMargin?: string;
  operatingMarginTTM?: string;
  returnOnAssetsTTM?: string;
  returnOnEquityTTM?: string;
  beta?: string;
  fiftyTwoWeekHigh?: string;
  fiftyTwoWeekLow?: string;
  sharesOutstanding?: string;
  dividendDate?: string;
  exDividendDate?: string;
  lastSplitFactor?: string;
  lastSplitDate?: string;
  logo?: string;
}

// --- Income Statement ---
export interface IncomeStatementType {
  symbol: string;
  annualReports: IncomeReport[];
  quarterlyReports: IncomeReport[];
}

export interface IncomeReport {
  fiscalDateEnding: string;   // "2023-12-31"
  reportedCurrency?: string;
  grossProfit?: string;
  totalRevenue?: string;
  costOfRevenue?: string;
  costofGoodsAndServicesSold?: string;
  operatingIncome?: string;
  sellingGeneralAndAdministrative?: string;
  researchAndDevelopment?: string;
  operatingExpenses?: string;
  investmentIncomeNet?: string;
  netInterestIncome?: string;
  interestIncome?: string;
  interestExpense?: string;
  nonInterestIncome?: string;
  otherNonOperatingIncome?: string;
  depreciation?: string;
  depreciationAndAmortization?: string;
  incomeBeforeTax?: string;
  incomeTaxExpense?: string;
  interestAndDebtExpense?: string;
  netIncome?: string;
  netIncomeApplicableToCommonShares?: string;
}

// --- Balance Sheet ---
export interface BalanceSheetType {
  symbol: string;
  annualReports: BalanceReport[];
  quarterlyReports: BalanceReport[];
}

export interface BalanceReport {
  fiscalDateEnding: string;
  reportedCurrency?: string;
  totalAssets?: string;
  totalCurrentAssets?: string;
  cashAndCashEquivalentsAtCarryingValue?: string;
  cashAndShortTermInvestments?: string;
  inventory?: string;
  currentNetReceivables?: string;
  totalNonCurrentAssets?: string;
  propertyPlantEquipment?: string;
  accumulatedDepreciationAmortizationPPE?: string;
  intangibleAssets?: string;
  intangibleAssetsExcludingGoodwill?: string;
  goodwill?: string;
  investments?: string;
  longTermInvestments?: string;
  shortTermInvestments?: string;
  otherCurrentAssets?: string;
  otherNonCurrentAssets?: string;
  totalLiabilities?: string;
  totalCurrentLiabilities?: string;
  currentDebt?: string;
  shortTermDebt?: string;
  totalCurrentLiabilities?: string;
  currentAccountsPayable?: string;
  totalNonCurrentLiabilities?: string;
  longTermDebt?: string;
  totalLiabilities?: string;
  commonStock?: string;
  retainedEarnings?: string;
  treasuryStock?: string;
  totalStockholdersEquity?: string;
}

// --- Cash Flow ---
export interface CashFlowType {
  symbol: string;
  annualReports: CashFlowReport[];
  quarterlyReports: CashFlowReport[];
}

export interface CashFlowReport {
  fiscalDateEnding: string;
  reportedCurrency?: string;
  operatingCashflow?: string;
  paymentsForOperatingActivities?: string;
  proceedsFromOperatingActivities?: string;
  changeInOperatingLiabilities?: string;
  changeInOperatingAssets?: string;
  depreciationDepletionAndAmortization?: string;
  capitalExpenditures?: string;
  changeInReceivables?: string;
  changeInInventory?: string;
  profitLoss?: string;
  cashflowFromInvestment?: string;
  cashflowFromFinancing?: string;
  proceedsFromRepaymentsOfShortTermDebt?: string;
  paymentsForRepurchaseOfCommonStock?: string;
  paymentsForRepurchaseOfEquity?: string;
  paymentsForRepurchaseOfPreferredStock?: string;
  dividendPayout?: string;
  dividendPayoutCommonStock?: string;
  dividendPayoutPreferredStock?: string;
  proceedsFromIssuanceOfCommonStock?: string;
  proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet?: string;
  proceedsFromIssuanceOfPreferredStock?: string;
  proceedsFromRepurchaseOfEquity?: string;
  proceedsFromSaleOfTreasuryStock?: string;
  changeInCashAndCashEquivalents?: string;
  changeInExchangeRate?: string;
  netIncome?: string;
}

// --- Historical Dividends ---
export interface DividendHistory {
  symbol: string;
  annualReports: DividendReport[];
  quarterlyReports: DividendReport[];
}

export interface DividendReport {
  fiscalDateEnding: string;
  dividendAmount?: string;
  dividendDate?: string;
  recordDate?: string;
  declarationDate?: string;
  paymentDate?: string;
}
