import React from 'react';
import { FiInfo, FiCheckCircle, FiAlertCircle, FiXCircle, FiDollarSign, FiTrendingUp, FiPieChart } from 'react-icons/fi';

const SummaryPanel = ({ scoreData, application }) => {
  const getIncomeScoreReason = () => {
    const income = scoreData.income_pred;
    const score = scoreData.income_need_score;
    
    const reasons = [];
    
    if (score >= 70) {
      reasons.push(`High Financial Need: Income (₹${income.toLocaleString()}/year) indicates significant need`);
      reasons.push(`Score: ${score}/100 - Priority for need-based lending`);
      reasons.push("Eligible for social welfare and priority lending programs");
    } else if (score >= 60) {
      reasons.push(`Moderate-High Financial Need: Income (₹${income.toLocaleString()}/year) shows substantial need`);
      reasons.push(`Score: ${score}/100 - Favorable for need assessment`);
      reasons.push("Strong case for approval based on financial need");
    } else if (score >= 50) {
      reasons.push(`Moderate Financial Need: Balanced income (₹${income.toLocaleString()}/year)`);
      reasons.push(`Score: ${score}/100 - Standard assessment profile`);
      reasons.push("Decision will depend more on repayment capacity");
    } else if (score >= 40) {
      reasons.push(`Low-Moderate Financial Need: Income (₹${income.toLocaleString()}/year) above average`);
      reasons.push(`Score: ${score}/100 - Lower financial need`);
      reasons.push("Repayment capacity becomes primary factor");
    } else {
      reasons.push(`Low Financial Need: High income (₹${income.toLocaleString()}/year)`);
      reasons.push(`Score: ${score}/100 - Minimal financial need`);
      reasons.push("Focus is entirely on creditworthiness and repayment history");
    }
    
    // Income categorization
    if (income <= 100000) {
      reasons.push("Income Category: Poverty Level");
    } else if (income <= 200000) {
      reasons.push("Income Category: Low Income");
    } else if (income <= 300000) {
      reasons.push("Income Category: Moderate Income");
    } else if (income <= 500000) {
      reasons.push("Income Category: Middle Class");
    } else if (income <= 1000000) {
      reasons.push("Income Category: Upper Middle Class");
    } else {
      reasons.push("Income Category: High Income");
    }
    
    return reasons;
  };

  const getRepaymentScoreReason = () => {
    const score = scoreData.repayment_score;
    const pd = application.repay_default_prob || 0;
    
    const reasons = [];
    
    reasons.push(`Default Probability: ${(pd * 100).toFixed(1)}%`);
    reasons.push(`Repayment Score: ${score}/100 (inverse of default probability)`);
    
    if (score >= 80) {
      reasons.push("Excellent Repayment Capacity: Very low default risk");
      reasons.push("Strong credit history and reliable payment patterns");
      reasons.push("Low risk - favorable for all lending products");
    } else if (score >= 70) {
      reasons.push("Good Repayment Capacity: Low default risk");
      reasons.push("Consistent payment behavior");
      reasons.push("Standard low-risk profile");
    } else if (score >= 60) {
      reasons.push("Moderate Repayment Capacity: Acceptable default risk");
      reasons.push("Some payment irregularities but overall reliable");
      reasons.push("Medium risk - standard lending conditions apply");
    } else if (score >= 50) {
      reasons.push("Fair Repayment Capacity: Elevated default risk");
      reasons.push("Requires careful assessment of payment history");
      reasons.push("Higher risk - may need collateral");
    } else if (score >= 40) {
      reasons.push("Poor Repayment Capacity: High default risk");
      reasons.push("Significant payment issues in history");
      reasons.push("High risk - strong collateral required");
    } else {
      reasons.push("Very Poor Repayment Capacity: Very high default risk");
      reasons.push("Multiple defaults or serious payment issues");
      reasons.push("Extreme risk - consider rejection");
    }
    
    if (application.ever_defaulted_flag) {
      reasons.push("⚠️ Previous Default History: Higher weighting on repayment score (90%)");
    }
    
    if (application.number_of_loans_taken_before === 0) {
      reasons.push("First-time Borrower: Balanced assessment (50/50 weighting)");
    } else if (application.number_of_loans_taken_before >= 3) {
      reasons.push("Multiple Previous Loans: Experience considered in assessment");
    }
    
    return reasons;
  };

  const getCreditScoreReason = () => {
    const creditScore = scoreData.credit_score;
    const incomeScore = scoreData.income_need_score;
    const repayScore = scoreData.repayment_score;
    const w_repay = (scoreData.w_repay * 100).toFixed(1);
    const w_income = (scoreData.w_income * 100).toFixed(1);
    const composite = scoreData.composite_score;
    
    const reasons = [];
    
    reasons.push(`Composite Calculation: (${w_repay}% × ${repayScore}) + (${w_income}% × ${incomeScore}) = ${composite}/100`);
    reasons.push(`Scaled to 800: ${composite} × 8 = ${Math.round(composite * 8)}/800`);
    reasons.push(`Final Credit Score: Clamped to ${creditScore}/700`);
    
    if (creditScore >= 650) {
      reasons.push(`Excellent Credit Score: ${creditScore}/700`);
      reasons.push("Exceeds auto-approval threshold (≥650)");
      reasons.push("Low risk with strong financial profile");
      reasons.push("Recommended for: Best interest rates, highest loan amounts");
    } else if (creditScore >= 600) {
      reasons.push(`Very Good Credit Score: ${creditScore}/700`);
      reasons.push("Strong candidate for approval");
      reasons.push("Good risk profile with minor concerns");
      reasons.push("Recommended for: Favorable rates, standard approval");
    } else if (creditScore >= 550) {
      reasons.push(`Good Credit Score: ${creditScore}/700`);
      reasons.push("Within manual review range");
      reasons.push("Moderate risk requiring verification");
      reasons.push("Recommended for: Standard rates, conditional approval");
    } else if (creditScore >= 500) {
      reasons.push(`Fair Credit Score: ${creditScore}/700`);
      reasons.push("Below preferred threshold");
      reasons.push("Elevated risk requiring careful review");
      reasons.push("Recommended for: Higher rates, collateral required");
    } else if (creditScore >= 450) {
      reasons.push(`Poor Credit Score: ${creditScore}/700`);
      reasons.push("High risk profile");
      reasons.push("Significant concerns requiring mitigation");
      reasons.push("Recommended for: Rejection or extreme conditions");
    } else {
      reasons.push(`Very Poor Credit Score: ${creditScore}/700`);
      reasons.push("Extremely high risk");
      reasons.push("Multiple risk factors present");
      reasons.push("Recommended: Rejection");
    }
    
    // Weight analysis
    if (scoreData.w_repay >= 0.8) {
      reasons.push("Assessment Focus: Heavy emphasis on repayment capacity (high-income or risky profile)");
    } else if (scoreData.w_repay <= 0.4) {
      reasons.push("Assessment Focus: Heavy emphasis on financial need (low-income profile)");
    } else {
      reasons.push("Assessment Focus: Balanced consideration of both repayment and need");
    }
    
    // Specific recommendations
    if (creditScore >= 650) {
      reasons.push("Action: Auto-approve with premium terms");
    } else if (creditScore >= 550) {
      reasons.push("Action: Manual review with standard terms");
    } else {
      reasons.push("Action: Reject or require exceptional collateral");
    }
    
    return reasons;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScoreSummaryCard
          title="Income Need Score"
          score={scoreData.income_need_score}
          reasons={getIncomeScoreReason()}
          icon={<FiDollarSign className="text-blue-600 text-xl" />}
          color="blue"
          min={25}
          max={80}
        />
        
        <ScoreSummaryCard
          title="Repayment Score"
          score={scoreData.repayment_score}
          reasons={getRepaymentScoreReason()}
          icon={<FiTrendingUp className="text-green-600 text-xl" />}
          color="green"
          min={0}
          max={100}
        />
        
        <ScoreSummaryCard
          title="Credit Score"
          score={scoreData.credit_score}
          reasons={getCreditScoreReason()}
          icon={<FiPieChart className="text-purple-600 text-xl" />}
          color="purple"
          min={400}
          max={700}
        />
      </div>

      <div className="glass-card rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiInfo className="mr-2 text-blue-600" />
          Credit Assessment & Final Recommendation
        </h4>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${
            scoreData.lending_decision === "Auto-Approve" ? "bg-green-50 border-green-200" :
            scoreData.lending_decision === "Manual Review" ? "bg-yellow-50 border-yellow-200" :
            "bg-red-50 border-red-200"
          }`}>
            <div className="flex items-start">
              {scoreData.lending_decision === "Auto-Approve" ? (
                <FiCheckCircle className="text-green-600 text-2xl mr-3 mt-1" />
              ) : scoreData.lending_decision === "Manual Review" ? (
                <FiAlertCircle className="text-yellow-600 text-2xl mr-3 mt-1" />
              ) : (
                <FiXCircle className="text-red-600 text-2xl mr-3 mt-1" />
              )}
              <div>
                <h5 className="font-bold text-gray-800 text-lg">{scoreData.lending_decision}</h5>
                <p className="text-gray-600 mt-1">
                  Based on comprehensive credit assessment, this application scores 
                  <span className={`font-bold ml-1 ${
                    scoreData.credit_score >= 650 ? 'text-green-700' : 
                    scoreData.credit_score >= 550 ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {scoreData.credit_score}/700
                  </span> and is classified as 
                  <span className="font-medium"> {scoreData.risk_band}</span>.
                </p>
                
                <div className="mt-3 p-3 bg-white/50 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-700">Income</div>
                      <div className="text-gray-900">₹{scoreData.income_pred.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Default Risk</div>
                      <div className="text-gray-900">{(application.repay_default_prob * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Previous Loans</div>
                      <div className="text-gray-900">{application.number_of_loans_taken_before}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Default History</div>
                      <div className={`font-medium ${application.ever_defaulted_flag ? 'text-red-600' : 'text-green-600'}`}>
                        {application.ever_defaulted_flag ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
            <h6 className="font-semibold text-gray-800 mb-3">Detailed Scoring Analysis</h6>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-gray-700 mb-2">1. Income Need Assessment</div>
                <div className="text-sm text-gray-600">
                  <p>• Estimated Annual Income: ₹{scoreData.income_pred.toLocaleString()}</p>
                  <p>• Income Need Score: {scoreData.income_need_score}/100 (Range: 25-80)</p>
                  <p>• Assessment: {scoreData.income_need_score >= 60 ? 'High need' : scoreData.income_need_score >= 40 ? 'Moderate need' : 'Low need'}</p>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-gray-700 mb-2">2. Repayment Capacity Assessment</div>
                <div className="text-sm text-gray-600">
                  <p>• Default Probability: {(application.repay_default_prob * 100).toFixed(1)}%</p>
                  <p>• Repayment Score: {scoreData.repayment_score}/100 (Range: 0-100)</p>
                  <p>• Assessment: {scoreData.repayment_score >= 70 ? 'Strong' : scoreData.repayment_score >= 50 ? 'Moderate' : 'Weak'}</p>
                  {application.ever_defaulted_flag && (
                    <p className="text-red-600">• Previous Default: Higher risk weighting applied</p>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-gray-700 mb-2">3. Credit Score Calculation</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Weight Distribution: Repayment ({Math.round(scoreData.w_repay * 100)}%) | Income Need ({Math.round(scoreData.w_income * 100)}%)</p>
                  <p>• Composite Score: ({scoreData.w_repay.toFixed(2)} × {scoreData.repayment_score}) + ({scoreData.w_income.toFixed(2)} × {scoreData.income_need_score}) = {scoreData.composite_score.toFixed(1)}/100</p>
                  <p>• Scaled to 800: {scoreData.composite_score.toFixed(1)} × 8 = {Math.round(scoreData.composite_score * 8)}/800</p>
                  <p>• Final Credit Score: Clamped to {scoreData.credit_score}/700</p>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-gray-700 mb-2">4. Final Recommendation</div>
                <div className="text-sm">
                  <p className="text-gray-600"><strong>Credit Score:</strong> {scoreData.credit_score}/700</p>
                  <p className="text-gray-600"><strong>Risk Category:</strong> {scoreData.risk_band}</p>
                  <p className="text-gray-600"><strong>Decision:</strong> {scoreData.lending_decision}</p>
                  {scoreData.lending_decision === "Auto-Approve" && (
                    <p className="text-green-600 font-medium mt-1">✓ Eligible for immediate approval with best terms</p>
                  )}
                  {scoreData.lending_decision === "Manual Review" && (
                    <p className="text-yellow-600 font-medium mt-1">⚠ Requires verification and standard approval process</p>
                  )}
                  {scoreData.lending_decision === "Reject" && (
                    <p className="text-red-600 font-medium mt-1">✗ High risk - recommend rejection or exceptional conditions</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScoreSummaryCard = ({ title, score, reasons, icon, color, min, max }) => {
  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
    purple: 'border-purple-200 bg-purple-50'
  };
  
  const percentage = ((score - min) / (max - min)) * 100;

  return (
    <div className={`glass-card rounded-xl p-6 border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colorClasses[color].replace('50', '100')}`}>
            {icon}
          </div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
        </div>
        <div className={`text-2xl font-bold ${
          (max === 700 && score >= 650) || (max === 100 && score >= 80) ? 'text-green-600' :
          (max === 700 && score >= 550) || (max === 100 && score >= 60) ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {score}/{max}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              color === 'blue' ? 'bg-blue-500' :
              color === 'green' ? 'bg-green-500' : 'bg-purple-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          {percentage.toFixed(1)}% of range ({min}-{max})
        </div>
      </div>
      
      <div className="space-y-3">
        {reasons.map((reason, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              color === 'blue' ? 'bg-blue-500' :
              color === 'green' ? 'bg-green-500' : 'bg-purple-500'
            }`}></div>
            <span className="text-gray-700 text-sm">{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryPanel;