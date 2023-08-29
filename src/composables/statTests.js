const jStat = require("jstat");

const formatPercentage = (num, floatingPoint = 2) =>
  (num * 100).toFixed(floatingPoint);

const ABTest = (
  aVisitor,
  bVisitor,
  aConversion,
  bConversion,
  confidence = 95,
  twoTailed = true
) => {
  console.log("confidence and twoTailed", confidence, twoTailed);

  // Conversion rates
  let aRate = aConversion / aVisitor;
  let bRate = bConversion / bVisitor;

  // Calculate pooled probability
  let pooledProb = (aConversion + bConversion) / (aVisitor + bVisitor);

  // Calculate pooled standard error
  let pooledSE = Math.sqrt(
    pooledProb * (1 - pooledProb) * (1 / aVisitor + 1 / bVisitor)
  );

  // Calculate z-score
  let zScore = (aRate - bRate) / pooledSE;

  // Calculate p-value
  let pValue = jStat.ztest(zScore, twoTailed ? 2 : 1); // two-tailed or one-tailed test

  // Calculate power
  let effectSize = Math.abs(aRate - bRate);
  let nonInferiorityMargin = 0; // Assume no non-inferiority margin
  let alpha = (100 - confidence) / 100; // Convert confidence to alpha
  let power = jStat.normal.cdf(
    effectSize / Math.sqrt(pooledSE),
    nonInferiorityMargin,
    alpha
  );
  console.log("power", power);
  console.log("pvalue", pValue);

  // interpret results
  let testSummary = "";
  let details = "";
  let testResult = "";

  let better = aRate > bRate ? "A" : "B";
  let worse = aRate > bRate ? "B" : "A";
  let betterRate = formatPercentage(aRate > bRate ? aRate : bRate);
  let worseRate = formatPercentage(aRate > bRate ? bRate : aRate);
  let delta = formatPercentage(betterRate / worseRate - 1, 1);

  details = `Variant ${better}’s conversion rate (${betterRate}%) was ${delta}% higher than variant ${worse}’s conversion rate (${worseRate}%). `;

  let notSigSummary = "Result not significant";
  let notSigMsg = `But you cannot say, with ${confidence}% confidence, that variant ${better} will perform better than variant ${worse}.`;

  let sigSummary = "SignificantResult!";
  let sigMsg = `You can be ${confidence}% confident that variant ${better} will perform better than variant ${worse}.`;

  let isStatSig = (pValue < 0.05) & (power > 0.8);
  if (isStatSig) {
    // stat sig
    testSummary = sigSummary;
    testResult = sigMsg;
  } else {
    testSummary = notSigSummary;
    testResult = notSigMsg;
  }

  return {
    power: (power * 100).toFixed(2),
    pvalue: pValue.toFixed(2),
    testSummary,
    testResult,
    details,
    isStatSig,
  };
};

export default ABTest;
