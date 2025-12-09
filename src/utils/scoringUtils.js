// Scoring utilities - now using hardcoded data from Application objects

export const calculateCompositeScore = (application) => {
  // Use hardcoded scores directly from application object
  const credit_score = application.credit_score || 550;
  const income_need_score = application.income_need_score || 60;
  const repayment_score = application.repayment_score || 70;

  // Determine lending decision based on credit_score
  let lending_decision;
  if (credit_score >= 650) {
    lending_decision = "Auto-Approve";
  } else if (credit_score >= 550) {
    lending_decision = "Manual Review";
  } else {
    lending_decision = "Reject";
  }

  // Determine risk band
  let risk_band;
  if (credit_score >= 650) {
    risk_band = "Low Risk";
  } else if (credit_score >= 550) {
    risk_band = "Medium Risk";
  } else {
    risk_band = "High Risk";
  }

  return {
    income_pred: 0,
    income_need_score,
    repayment_score,
    composite_score: Math.round((income_need_score + repayment_score) / 2),
    credit_score,
    w_repay: 0.7,
    w_income: 0.3,
    lending_decision,
    risk_band
  };
};

export const generateScoreHistory = (creditScore) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const baseScore = Math.max(400, creditScore - 50);
  
  return months.map((month, index) => ({
    month,
    score: Math.min(700, Math.max(400, baseScore + Math.random() * 30 + Math.sin(index) * 15))
  }));
};