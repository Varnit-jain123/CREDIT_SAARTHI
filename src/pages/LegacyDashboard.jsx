//LegacyDashboard.jsx
import React, { useState } from 'react';
import DashboardPage from './DashboardPage';

const INCOME_THRESHOLD = 300000;

const repaymentScore = (pdProb) => {
  const prob = Math.max(0, Math.min(1, pdProb));
  return (1 - prob) * 100;
};

const chooseDynamicWeights = (data) => {
  const repay = data.repayment_score;
  const income = data.income_need_score;
  const loans = parseInt(data.number_of_loans_taken_before || 0);
  const everDefaulted = parseInt(data.ever_defaulted_flag || 0);
  
  const veryLowIncome = income >= 70;
  const highIncome = income <= 20;
  const strongRepay = repay >= 80;
  const weakRepay = repay <= 50;
  
  if (everDefaulted) return [0.9, 0.1];
  if (loans === 0) return [0.5, 0.5];
  if (strongRepay && highIncome) return [0.8, 0.2];
  if (veryLowIncome && !weakRepay) return [0.6, 0.4];
  return [0.7, 0.3];
};

const calculateCreditScore = (incomeScore, repayScore, wRepay, wIncome) => {
const total = wRepay + wIncome;
const wR = wRepay / total;
const wI = wIncome / total;
const composite = wI * incomeScore + wR * repayScore;
const score0to800 = Math.round((composite / 100) * 800);
return Math.max(400, Math.min(700, score0to800));
};


const computeScores = (applicant) => {
const incomePred = estimateIncome(applicant);
const incScore = incomeNeedScore(incomePred);
const repScore = repaymentScore(applicant.repay_default_prob);
const [wRepay, wIncome] = chooseDynamicWeights({
...applicant,
income_need_score: incScore,
repayment_score: repScore
});
const creditScore = calculateCreditScore(incScore, repScore, wRepay, wIncome);
return {
income_need_score: Math.round(incScore * 100) / 100,
repayment_score: Math.round(repScore * 100) / 100,
credit_score: creditScore
};
};

const estimateIncome = (data) => {
  const numEarners = parseInt(data.number_of_earners) || 1;
  const baseMonthly = numEarners * 9000;
  
  const lpgRefills = Math.min(parseInt(data.lpg_refills_per_year) || 0, 24);
  const lpgMonthly = lpgRefills * 800 / 12;
  
  const assetWeights = { car: 30000, two_wheeler: 8000, fridge: 6000, phone: 2000 };
  const assetYearly = Object.keys(assetWeights).reduce((sum, key) => 
    sum + (data[key] ? assetWeights[key] : 0), 0);
  
  const houseFactor = data.house_type === 'pucca' ? 1.05 : 0.95;
  const landYearly = parseFloat(data.landholding_in_hectares || 0) * 30000;
  const seasonal = parseFloat(data.seasonal_income || 0);
  
  const yearly = (baseMonthly + lpgMonthly) * 12;
  const total = yearly + assetYearly + landYearly + seasonal;
  
  return Math.round(total * houseFactor);
};

const incomeNeedScore = (income) => {
  const need = 1 - Math.min(income / INCOME_THRESHOLD, 1);
  return Math.max(0, Math.min(100, need * 100));
};


// --- Hardcoded users (copied from uploaded file) ---
const hardcodedUsers = [
  { id: '1', name: 'Aarav Sharma', loanAmount: 150000, tenure: 24, household_size: 4, number_of_earners: 2, lpg_refills_per_year: 12, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 1.5, seasonal_income: 45000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.15, status: 'pending' },
  { id: '2', name: 'Vihaan Patel', loanAmount: 250000, tenure: 36, household_size: 5, number_of_earners: 2, lpg_refills_per_year: 18, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.3, seasonal_income: 80000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.12, status: 'approved' },
  { id: '3', name: 'Arjun Gandhi', loanAmount: 80000, tenure: 12, household_size: 3, number_of_earners: 1, lpg_refills_per_year: 8, car: false, phone: true, two_wheeler: false, fridge: true, house_type: 'katcha', landholding_in_hectares: 0.5, seasonal_income: 20000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.25, status: 'approved' },
  { id: '4', name: 'Aditya Reddy', loanAmount: 320000, tenure: 48, household_size: 6, number_of_earners: 3, lpg_refills_per_year: 20, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 3.2, seasonal_income: 95000, number_of_loans_taken_before: 3, ever_defaulted_flag: 0, repay_default_prob: 0.08, status: 'approved' },
  { id: '5', name: 'Saanvi Singh', loanAmount: 45000, tenure: 6, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 6, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.2, seasonal_income: 15000, number_of_loans_taken_before: 1, ever_defaulted_flag: 1, repay_default_prob: 0.55, status: 'rejected' },
  { id: '6', name: 'Anaya Kumar', loanAmount: 180000, tenure: 30, household_size: 4, number_of_earners: 2, lpg_refills_per_year: 14, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 1.8, seasonal_income: 52000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.18, status: 'approved' },
  { id: '7', name: 'Ishaan Mehta', loanAmount: 95000, tenure: 18, household_size: 3, number_of_earners: 1, lpg_refills_per_year: 10, car: false, phone: true, two_wheeler: true, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.8, seasonal_income: 28000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.22, status: 'pending' },
  { id: '8', name: 'Riya Joshi', loanAmount: 280000, tenure: 42, household_size: 5, number_of_earners: 2, lpg_refills_per_year: 16, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.5, seasonal_income: 72000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.10, status: 'approved' },
  { id: '9', name: 'Karan Nair', loanAmount: 65000, tenure: 12, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 7, car: false, phone: true, two_wheeler: false, fridge: true, house_type: 'katcha', landholding_in_hectares: 0.4, seasonal_income: 18000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.32, status: 'pending' },
  { id: '10', name: 'Neha Gupta', loanAmount: 420000, tenure: 60, household_size: 7, number_of_earners: 3, lpg_refills_per_year: 22, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 4.1, seasonal_income: 110000, number_of_loans_taken_before: 4, ever_defaulted_flag: 0, repay_default_prob: 0.06, status: 'approved' },
  { id: '11', name: 'Rohan Desai', loanAmount: 125000, tenure: 24, household_size: 4, number_of_earners: 2, lpg_refills_per_year: 11, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 1.2, seasonal_income: 38000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.20, status: 'approved' },
  { id: '12', name: 'Priya Chopra', loanAmount: 55000, tenure: 9, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 5, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.3, seasonal_income: 12000, number_of_loans_taken_before: 2, ever_defaulted_flag: 1, repay_default_prob: 0.62, status: 'rejected' },
  { id: '13', name: 'Vikram Bose', loanAmount: 210000, tenure: 36, household_size: 5, number_of_earners: 2, lpg_refills_per_year: 15, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.0, seasonal_income: 65000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.14, status: 'approved' },
  { id: '14', name: 'Aditi Kapoor', loanAmount: 35000, tenure: 6, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 4, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.1, seasonal_income: 8000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.38, status: 'pending' },
  { id: '15', name: 'Kavya Brahmbhatt', loanAmount: 350000, tenure: 54, household_size: 6, number_of_earners: 3, lpg_refills_per_year: 19, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 3.5, seasonal_income: 88000, number_of_loans_taken_before: 3, ever_defaulted_flag: 0, repay_default_prob: 0.09, status: 'approved' },
  { id: '16', name: 'Sameer Rao', loanAmount: 145000, tenure: 27, household_size: 4, number_of_earners: 2, lpg_refills_per_year: 13, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 1.6, seasonal_income: 48000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.17, status: 'approved' },
  { id: '17', name: 'Meera Verma', loanAmount: 72000, tenure: 15, household_size: 3, number_of_earners: 1, lpg_refills_per_year: 9, car: false, phone: true, two_wheeler: false, fridge: true, house_type: 'katcha', landholding_in_hectares: 0.6, seasonal_income: 22000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.28, status: 'pending' },
  { id: '18', name: 'Anish Aggarwal', loanAmount: 295000, tenure: 45, household_size: 5, number_of_earners: 2, lpg_refills_per_year: 17, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.7, seasonal_income: 78000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.11, status: 'approved' },
  { id: '19', name: 'Tanvi Malhotra', loanAmount: 48000, tenure: 8, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 5, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.2, seasonal_income: 14000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.42, status: 'rejected' },
  { id: '20', name: 'Kunal Saxena', loanAmount: 385000, tenure: 56, household_size: 6, number_of_earners: 3, lpg_refills_per_year: 21, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 3.8, seasonal_income: 98000, number_of_loans_taken_before: 3, ever_defaulted_flag: 0, repay_default_prob: 0.07, status: 'approved' },
  { id: '21', name: 'Dev Singh', loanAmount: 115000, tenure: 21, household_size: 3, number_of_earners: 2, lpg_refills_per_year: 10, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 1.0, seasonal_income: 35000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.19, status: 'approved' },
  { id: '22', name: 'Ira Patel', loanAmount: 62000, tenure: 12, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 7, car: false, phone: true, two_wheeler: false, fridge: true, house_type: 'katcha', landholding_in_hectares: 0.4, seasonal_income: 19000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.30, status: 'pending' },
  { id: '23', name: 'Nikhil Kumar', loanAmount: 235000, tenure: 39, household_size: 5, number_of_earners: 2, lpg_refills_per_year: 16, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.2, seasonal_income: 68000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.13, status: 'approved' },
  { id: '24', name: 'Sana Sharma', loanAmount: 42000, tenure: 7, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 4, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.15, seasonal_income: 10000, number_of_loans_taken_before: 2, ever_defaulted_flag: 1, repay_default_prob: 0.68, status: 'rejected' },
  { id: '25', name: 'Raghav Mehta', loanAmount: 310000, tenure: 48, household_size: 6, number_of_earners: 3, lpg_refills_per_year: 19, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 3.0, seasonal_income: 85000, number_of_loans_taken_before: 3, ever_defaulted_flag: 0, repay_default_prob: 0.09, status: 'approved' },
  { id: '26', name: 'Mira Desai', loanAmount: 135000, tenure: 25, household_size: 4, number_of_earners: 2, lpg_refills_per_year: 12, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 1.4, seasonal_income: 42000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.16, status: 'approved' },
  { id: '27', name: 'Yash Reddy', loanAmount: 88000, tenure: 16, household_size: 3, number_of_earners: 1, lpg_refills_per_year: 9, car: false, phone: true, two_wheeler: true, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.7, seasonal_income: 25000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.26, status: 'pending' },
  { id: '28', name: 'Zoya Joshi', loanAmount: 265000, tenure: 42, household_size: 5, number_of_earners: 2, lpg_refills_per_year: 17, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.4, seasonal_income: 75000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.10, status: 'approved' },
  { id: '29', name: 'Hrithik Gupta', loanAmount: 52000, tenure: 10, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 6, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.25, seasonal_income: 16000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.36, status: 'pending' },
  { id: '30', name: 'Diya Nair', loanAmount: 405000, tenure: 58, household_size: 7, number_of_earners: 3, lpg_refills_per_year: 23, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 4.0, seasonal_income: 105000, number_of_loans_taken_before: 4, ever_defaulted_flag: 0, repay_default_prob: 0.05, status: 'approved' },
  { id: '31', name: 'Arnav Mishra', loanAmount: 175000, tenure: 28, household_size: 4, number_of_earners: 2, lpg_refills_per_year: 13, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 1.7, seasonal_income: 55000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.16, status: 'approved' },
  { id: '32', name: 'Kiara Iyer', loanAmount: 92000, tenure: 18, household_size: 3, number_of_earners: 1, lpg_refills_per_year: 9, car: false, phone: true, two_wheeler: false, fridge: true, house_type: 'katcha', landholding_in_hectares: 0.65, seasonal_income: 24000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.27, status: 'pending' },
  { id: '33', name: 'Ayaan Banerjee', loanAmount: 305000, tenure: 46, household_size: 6, number_of_earners: 3, lpg_refills_per_year: 19, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.9, seasonal_income: 82000, number_of_loans_taken_before: 3, ever_defaulted_flag: 0, repay_default_prob: 0.09, status: 'approved' },
  { id: '34', name: 'Myra Pillai', loanAmount: 58000, tenure: 11, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 6, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.3, seasonal_income: 17000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.34, status: 'pending' },
  { id: '35', name: 'Reyansh Agarwal', loanAmount: 225000, tenure: 37, household_size: 5, number_of_earners: 2, lpg_refills_per_year: 15, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.1, seasonal_income: 66000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.13, status: 'approved' },
  { id: '36', name: 'Aadhya Menon', loanAmount: 38000, tenure: 7, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 4, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.12, seasonal_income: 9000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.40, status: 'rejected' },
  { id: '37', name: 'Vivaan Bhatt', loanAmount: 340000, tenure: 52, household_size: 6, number_of_earners: 3, lpg_refills_per_year: 20, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 3.3, seasonal_income: 90000, number_of_loans_taken_before: 3, ever_defaulted_flag: 0, repay_default_prob: 0.08, status: 'approved' },
  { id: '38', name: 'Anvi Shetty', loanAmount: 105000, tenure: 20, household_size: 3, number_of_earners: 2, lpg_refills_per_year: 10, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 0.9, seasonal_income: 32000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.21, status: 'approved' },
  { id: '39', name: 'Shaurya Pandey', loanAmount: 68000, tenure: 13, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 7, car: false, phone: true, two_wheeler: false, fridge: true, house_type: 'katcha', landholding_in_hectares: 0.45, seasonal_income: 20000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.29, status: 'pending' },
  { id: '40', name: 'Pari Kapoor', loanAmount: 450000, tenure: 60, household_size: 7, number_of_earners: 3, lpg_refills_per_year: 24, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 4.5, seasonal_income: 115000, number_of_loans_taken_before: 4, ever_defaulted_flag: 0, repay_default_prob: 0.05, status: 'approved' },
  { id: '41', name: 'Kabir Chawla', loanAmount: 160000, tenure: 29, household_size: 4, number_of_earners: 2, lpg_refills_per_year: 13, car: false, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 1.65, seasonal_income: 50000, number_of_loans_taken_before: 1, ever_defaulted_flag: 0, repay_default_prob: 0.17, status: 'approved' },
  { id: '42', name: 'Aanya Rane', loanAmount: 47000, tenure: 8, household_size: 2, number_of_earners: 1, lpg_refills_per_year: 5, car: false, phone: true, two_wheeler: false, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.18, seasonal_income: 13000, number_of_loans_taken_before: 2, ever_defaulted_flag: 1, repay_default_prob: 0.58, status: 'rejected' },
  { id: '43', name: 'Darsh Trivedi', loanAmount: 275000, tenure: 43, household_size: 5, number_of_earners: 2, lpg_refills_per_year: 17, car: true, phone: true, two_wheeler: true, fridge: true, house_type: 'pucca', landholding_in_hectares: 2.6, seasonal_income: 76000, number_of_loans_taken_before: 2, ever_defaulted_flag: 0, repay_default_prob: 0.11, status: 'approved' },
  { id: '44', name: 'Navya Khurana', loanAmount: 78000, tenure: 14, household_size: 3, number_of_earners: 1, lpg_refills_per_year: 8, car: false, phone: true, two_wheeler: true, fridge: false, house_type: 'katcha', landholding_in_hectares: 0.55, seasonal_income: 23000, number_of_loans_taken_before: 0, ever_defaulted_flag: 0, repay_default_prob: 0.26, status: 'pending' }

]


const applicationsWithScores = hardcodedUsers.map(user => {
const scores = computeScores(user);
return {
...user,
...scores,
appliedDate: new Date().toISOString(),
documents: []
};
});


export default function LegacyDashboard() {
const [applications, setApplications] = useState(applicationsWithScores);


return <DashboardPage applications={applications} setApplications={setApplications} />;
}