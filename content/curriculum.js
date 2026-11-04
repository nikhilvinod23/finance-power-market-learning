/* Original explanations adapted from the cited MIT OCW course; see SOURCES.md. */
(function(root){
'use strict';
const modules = [
 ['foundations','Foundations','Tools to read the course with confidence.'],
 ['l1','01 · Arbitrage-free pricing','Replication, state prices, factors, and futures.'],
 ['l2','02 · Stochastic calculus & options','From random paths to pricing equations.'],
 ['l3','03 · Simulation methods','Estimate expectations efficiently.'],
 ['l4','04 · Portfolio choice I','Objectives, utility, and the static approach.'],
 ['l5','05 · Portfolio choice II','Make decisions backward through time.'],
 ['l6','06 · Numerical dynamic programming','Turn a continuous problem into a computable one.'],
 ['l7','07 · Parameter estimation','Learn model parameters from observations.'],
 ['l8','08 · Standard errors & tests','Measure uncertainty in what you estimate.'],
 ['l9','09 · Small samples & bootstrap','Understand where large-sample intuition breaks.'],
 ['l10','10 · Volatility models','Model changing risk and joint exposures.'],
 ['review','Course reviews & practice','Connect pricing, optimization, and inference.'],
 ['coding','Programming for markets','Read code and build reliable research habits.'],
 ['power','Power & energy connections','Apply the course to physical market decisions.']
].map(([id,title,description])=>({id,title,description}));
const lessons=[];
const mc=(prompt,options,answer,explanation)=>({type:'mc',prompt,options,answer,explanation});
const num=(prompt,answer,tolerance,explanation,unit='')=>({type:'number',prompt,answer,tolerance,explanation,unit});
function L(id,title,module,tags,summary,sections,example,deeper,pitfall,questions,challenge,terms,extra={}) {
 lessons.push({id,title,module,tags,summary,sections:sections.map(([title,body])=>({title,body})),example,deeper,pitfall,questions,challenge,terms,...extra});
}
L('algebra','Algebra, sums, and financial notation','foundations',['Math'],
 'Translate the symbols before trying to solve the problem.',[
 ['Read a formula as a sentence','A subscript labels an observation or time: Pₜ is the price at time t; Pₜ₊₁ is the next price. A superscript can mean a power, as in x², but a prime (′) means transpose in this course. A hat, θ̂, means an estimate made from data. Greek letters are names for quantities, not new operations.'],
 ['Sums and products','Σ means add the listed terms. Σᵢ wᵢrᵢ is a weighted sum: multiply each return by its portfolio weight and add. Π means multiply. Compounding uses a product because each period changes the base on which the next return is earned.'],
 ['Solve and check units','Rearrange both sides of an equality with the same operation. If revenue = price × energy, then energy = revenue / price. Dollars divided by dollars per MWh gives MWh. Dimensional checks often catch errors before a numerical test does.']
 ],'A portfolio holds 60% in an asset returning 10% and 40% in one returning −5%. Its simple return is 0.6 × 0.10 + 0.4 × (−0.05) = 0.04, or 4%.',
 'A constraint written g(w) = 0 is a rule expressed as a zero. For fully invested weights, use g(w) = Σᵢwᵢ − 1. The expression equals zero exactly when the weights sum to one.',
 'A return of 5% is 0.05 in a calculation. Five percentage points and a 5% relative increase are different changes.',
 [num('Weights are 0.25 and 0.75; returns are 8% and 4%. What is the portfolio return in percent?',5,0.001,'0.25 × 8 + 0.75 × 4 = 5%.','%'),mc('What does θ̂ usually indicate?',['A parameter estimate','A time derivative','A probability equal to one'],0,'A hat distinguishes an estimate from the underlying unknown parameter.')],
 'Write a budget constraint for three assets, then explain why negative weights can still sum to one.',
 {'Constraint':'A rule limiting allowable decisions, such as weights summing to one.','Estimator':'A rule that converts observed data into an estimate of an unknown parameter.'},{initialUnderstood:true});
L('probability','Probability and combinatorics refresher','foundations',['Math'],
 'Keep the experiment, the possible outcomes, and the event separate.',[
 ['Define the event','A probability attaches to an event within a defined experiment. Ordered draws and unordered groups have different sample spaces. Either approach gives the same event probability if you count numerator and denominator consistently.'],
 ['Conditioning changes the information','P(A | B) means the chance of A given that B is known. Conditional probabilities need not match unconditional probabilities. Independence means learning B does not change the probability of A.'],
 ['Expectation is a weighted average','For discrete outcomes xᵢ with probabilities pᵢ, E[X] = Σᵢpᵢxᵢ. Expected value is an average across repetitions, not a guaranteed outcome. Variance E[(X − E[X])²] measures dispersion; standard deviation is its square root, in the original units.']
 ],'A payoff is $100 with probability 0.3 and −$20 with probability 0.7. Its expected payoff is 0.3 × 100 − 0.7 × 20 = $16. It still loses money 70% of the time.',
 'The tower rule says E[E[X | information]] = E[X]. Average within each scenario first, then average across scenarios. Dynamic programming and multi-period pricing repeatedly use this idea.',
 'A profitable expected value is not an arbitrage: some outcomes may still lose money.',
 [num('A payoff is 10 with probability 0.4 and −2 otherwise. What is its expected value?',2.8,0.001,'0.4 × 10 + 0.6 × (−2) = 2.8.'),mc('If A and B are independent, P(A | B) is…',['P(A)','P(B)','Always zero'],0,'Conditioning on B leaves A’s probability unchanged, assuming P(B) > 0.')],
 'Give two different payoff distributions with the same mean and explain why you might prefer one.',
 {'Expectation':'The probability-weighted average of a random variable.','Conditional expectation':'An average computed using the information currently available.','Variance':'Expected squared distance from the mean.','Standard deviation':'Square root of variance; dispersion measured in the original units.'},{initialUnderstood:true});
L('time-value','Cash flows, compounding, and returns','foundations',['Finance','Math'],
 'Put money at different dates on a common basis.',[
 ['Why discount?','A dollar today can be invested, so it is not equivalent to a dollar delivered later. With a known per-period rate r, a certain future cash flow C paid in n periods has present value C/(1+r)ⁿ. Risky cash flows need a risk adjustment as well as a time adjustment.'],
 ['Simple, gross, and log returns','Simple return is (Pₜ₊₁ + dividend − Pₜ)/Pₜ. Gross return is one plus simple return. Log return is ln(gross return); log returns add over time, while gross returns multiply. A continuously compounded rate r grows wealth by exp(rT).'],
 ['Investment value','Net present value is discounted incoming cash flows minus discounted costs. A positive NPV means the project exceeds the chosen required return under the assumptions. The discount rate must match the cash-flow currency, timing, inflation treatment, and risk.']
 ],'$100 invested at 5% annually becomes $110.25 after two years. Conversely, $110.25 received in two years has a $100 present value at that rate. A +20% year followed by −20% leaves 1.2 × 0.8 = 0.96 of the initial wealth.',
 'For a continuously compounded rate, the discount factor is exp(−rT). With a time-varying short rate, it becomes exp(−∫rₛ ds). The integral adds the rates experienced through time.',
 'Adding simple returns across periods ignores compounding. Do not mix an annual rate with a monthly period without converting it.',
 [num('What is the present value of $105 paid in one year at a 5% annual rate?',100,0.01,'105 / 1.05 = 100.','$'),num('After +20% then −20%, what is the total return in percent?',-4,0.001,'1.2 × 0.8 − 1 = −0.04.','%')],
 'Value a project costing $1,000 now and paying $600 at each of the next two year-ends at a 10% discount rate. Explain what that rate assumes.',
 {'Discount factor':'A multiplier converting a future cash flow into present value.','Net present value':'Present value of benefits minus present value of costs.','Log return':'The natural logarithm of a gross return.','Gross return':'One plus the simple return; the multiplier applied to wealth.'},{widget:'discount'});
L('calculus','Derivatives, integrals, and Taylor approximations','foundations',['Math','Financial math'],
 'Use slopes for sensitivity and integrals for accumulation.',[
 ['Derivatives','A derivative measures the local rate of change. If f(x) = x², then f′(x) = 2x. At x = 3, a small change of 0.01 changes f by about 6 × 0.01 = 0.06. This is an approximation because the slope itself changes.'],
 ['Partial derivatives','For a function of several inputs, a partial derivative changes one input while holding the others fixed. For V(P,q) = Pq, ∂V/∂P = q. Option delta is a partial derivative of value with respect to the underlying price.'],
 ['Integrals and curvature','An integral sums small contributions. A second derivative measures curvature: how the slope changes. A second-order Taylor approximation is f(x+h) ≈ f(x) + f′(x)h + ½f″(x)h². Curvature is essential for both option risk and Itô’s lemma.']
 ],'For f(x) = x² at x = 3 with h = 0.1, the linear approximation gives 9 + 6 × 0.1 = 9.6. The curvature term is ½ × 2 × 0.1² = 0.01, giving the exact 9.61.',
 'The gradient collects partial derivatives into a vector. The Hessian collects second partial derivatives into a matrix. For a small vector change h, the quadratic approximation is f(x+h) ≈ f(x) + ∇f′h + ½h′Hh. Stochastic calculus keeps a curvature term even over very short intervals.',
 'A derivative is a local approximation. A large move may require revaluing the whole function.',
 [num('For f(x) = x², what is f′(4)?',8,0.001,'The derivative is 2x, so at x = 4 it is 8.'),mc('A partial derivative changes…',['One input, holding other inputs fixed','All inputs by the same amount','Only time'],0,'The other arguments of the function are held constant.')],
 'Use a second-order Taylor approximation for ln(1+x) near x = 0 and explain when the approximation might fail.',
 {'Partial derivative':'Sensitivity to one input while holding other inputs fixed.','Taylor approximation':'A local polynomial approximation using derivatives.','Gradient':'A vector of first partial derivatives.','Hessian':'A matrix of second partial derivatives.'});
L('matrices','Vectors, matrices, and portfolio risk','foundations',['Math','Financial math'],
 'Matrices keep multi-asset calculations organized.',[
 ['Dimensions first','A column vector with n entries is n × 1. Its transpose is 1 × n. A matrix A of size m × n can multiply a vector x of size n × 1 to produce m × 1. Each output entry is a row of A dotted with x.'],
 ['Mean and risk','For portfolio weights w and expected returns μ, portfolio expected return is w′μ. If Σ is the covariance matrix, portfolio variance is w′Σw. Its diagonal contains individual variances; its off-diagonal entries capture co-movement.'],
 ['The vector of ones','The symbol 1 often denotes a column vector of ones, not an identity matrix. Then 1′w = 1 expresses full investment. I denotes the identity matrix, which leaves a vector unchanged when multiplying it.']
 ],'Two assets each have 10% volatility and equal weights. With zero correlation, variance is 0.5² × 0.1² + 0.5² × 0.1² = 0.005, so volatility is about 7.07%. At correlation 1, volatility is 10%.',
 'For two assets the covariance term is 2w₁w₂σ₁σ₂ρ. A valid covariance matrix must be positive semidefinite: w′Σw cannot be negative for any w. Near singular matrices make optimized weights unstable; numerical linear solves are usually preferable to explicitly calculating an inverse.',
 'Portfolio volatility is generally not the weighted average of asset volatilities. Correlation affects the result.',
 [num('Compute [2, 3] dotted with [4, 5].',23,0.001,'2 × 4 + 3 × 5 = 23.'),mc('What is stored on the diagonal of a covariance matrix?',['Variances','Means','Portfolio weights'],0,'The covariance of a variable with itself is its variance.')],
 'Expand w′Σw for two assets and show exactly where correlation enters.',
 {'Covariance':'A measure of how two variables move together.','Correlation':'Covariance scaled by the two standard deviations; between −1 and 1.','Transpose':'An operation swapping rows and columns.','Covariance matrix':'A matrix of all pairwise covariances in a vector of variables.'},{widget:'portfolio'});
L('optimization','Optimization and constraints','foundations',['Math','Financial math'],
 'An optimum depends on both the objective and the feasible choices.',[
 ['Specify the problem','An objective says what you want to maximize or minimize. A feasible set says what actions are allowed. Maximize expected profit, maximize expected utility, and minimize volatility are different problems; they need not select the same trade.'],
 ['Lagrange multipliers','For max f(w) subject to g(w) = 0, form L(w,λ) = f(w) − λg(w). Solve the first-order conditions with respect to w and λ. The multiplier measures the local value of relaxing the constraint, with its sign depending on the convention used.'],
 ['Check the candidate','A zero derivative can be a minimum, maximum, or flat point. Check curvature and the boundary. Inequality constraints such as w ≥ 0 can bind: an optimum at zero need not have a zero unconstrained derivative.']
 ],'Choose x to maximize f(x) = 6x − x². The derivative 6 − 2x is zero at x = 3, and the second derivative −2 confirms a maximum. If x ≤ 2, the best feasible choice becomes x = 2.',
 'The Karush–Kuhn–Tucker conditions extend multipliers to inequality constraints. Complementary slackness means either the constraint is slack and its multiplier is zero, or it binds and may have a nonzero shadow value. Concavity makes local first-order conditions much more informative about global optimality.',
 'A mathematically optimal answer can be unusable if the model omits leverage, liquidity, transaction costs, or operational constraints.',
 [num('Maximize 8x − x² without constraints. What is x?',4,0.001,'8 − 2x = 0 gives x = 4; curvature is negative.'),mc('If the unconstrained optimum is x = 4 but 0 ≤ x ≤ 3, the optimum for 8x − x² is…',['3','4','0'],0,'The objective is still increasing up to 4, so the upper feasible boundary is best.')],
 'Set up a two-asset variance-minimization problem with full investment and no shorting. Identify the objective and both kinds of constraints.',
 {'Objective function':'The numerical quantity a decision rule seeks to maximize or minimize.','Lagrange multiplier':'A variable pricing the local effect of a constraint.','Feasible set':'The set of decisions satisfying all imposed constraints.'});
L('statistics','Distributions, sampling, and statistical uncertainty','foundations',['Math','Trading'],
 'Separate the variability of outcomes from uncertainty in an estimate.',[
 ['Population and sample','A population distribution is the model generating outcomes. A sample is the finite set you observe. A sample mean estimates a population mean. Even if the population is unchanged, a new sample produces a different estimate.'],
 ['Law of large numbers and CLT','The law of large numbers says averages approach the population mean under suitable assumptions. The central limit theorem describes the approximately normal distribution of a scaled sample mean. In the basic IID, finite-variance case, the standard error of the mean is approximately s/√n.'],
 ['Normal and lognormal','A normal variable can take negative values and is symmetric. If ln(X) is normal, X is lognormal and strictly positive. Asset prices in geometric Brownian motion are lognormal; returns over a short interval can often be approximated as normal, subject to tail limitations.']
 ],'Individual daily P&L has standard deviation $200. For 100 independent days, the sample average has standard error about $20. The next day’s P&L still has standard deviation $200; averaging did not make each individual day safer.',
 'IID means independent and identically distributed. Financial observations often violate both parts: volatility changes over time and observations can be dependent. A large row count is not automatically a large amount of independent information.',
 'Standard deviation describes outcomes; standard error describes an estimator. Increasing sample size reduces the latter under appropriate conditions.',
 [num('With s = 30 and 100 IID observations, what is the standard error of the mean?',3,0.001,'30 / √100 = 3.'),mc('Which variable must be strictly positive?',['A lognormal variable','A normal variable','A simple return'],0,'A lognormal variable is exp(Z), which is always positive.')],
 'Explain why 1,000 highly correlated observations can provide less information than 200 independent ones.',
 {'Standard error':'Estimated standard deviation of an estimator across repeated samples.','IID':'Independent and identically distributed.','Central limit theorem':'A result giving an approximately normal sampling distribution under suitable conditions.','Lognormal distribution':'A distribution whose logarithm is normally distributed.'});
L('time-series','Time series, beta, and information timing','foundations',['Math','Trading','Programming'],
 'A timestamp is part of the observation.',[
 ['Levels, changes, and lags','A time series is an ordered sequence. A lag is a past observation: xₜ₋₁ means the previous period. Price levels can drift without a stable mean; returns or differences may behave more stably. Regressing unrelated trending levels can produce misleading relationships.'],
 ['Beta is not a delay','Contemporaneous market beta is Cov(rᵢ, rₘ)/Var(rₘ), computed using aligned returns over the same intervals. It measures co-movement, not a rule telling an asset to move after the market. To study delays, specify lagged market returns separately and account for asynchronous timestamps.'],
 ['Autoregression','An AR(1) model is xₜ₊₁ = a + ρxₜ + εₜ₊₁. If |ρ| < 1, its stationary mean is a/(1−ρ). A conditional forecast uses today’s xₜ, while the shock εₜ₊₁ represents tomorrow’s unpredicted part.']
 ],'If a = 2, ρ = 0.8, and today’s x is 15, tomorrow’s conditional mean is 2 + 0.8 × 15 = 14. The long-run mean is 2/(1−0.8) = 10. The forecast moves partway back toward 10.',
 'A research signal must use the information available at the decision time. Align publication time, timezone, delivery interval, and later revisions. A day-ahead forecast cannot use realized load or prices from its delivery day. This is a data-design constraint, not a detail to repair after a backtest.',
 'High beta does not imply a predictable delayed reaction. Observed lead–lag can come from stale prices or mismatched trading hours.',
 [num('For xₜ₊₁ = 1 + 0.5xₜ + ε, with xₜ = 6 and zero conditional mean ε, what is the forecast?',4,0.001,'1 + 0.5 × 6 = 4.'),mc('A beta of 1.5 directly specifies…',['Same-interval covariance exposure','A 1.5-second reaction delay','Guaranteed market outperformance'],0,'The regression interval defines beta; a lag requires a separate model.')],
 'Design a test of whether yesterday’s gas-price move predicts today’s power-price change. State when each input becomes known.',
 {'Beta':'Covariance exposure to a specified factor, usually divided by that factor’s variance.','Autocorrelation':'Correlation between a time series and a lagged copy of itself.','Stationarity':'A stability property of a process’s distribution; weak stationarity fixes mean and lag covariances.','Look-ahead bias':'Using information that would not have been available at the simulated decision time.'});
L('replication','Arbitrage and replication','l1',['Finance','Financial math','Trading'],
 'Identical future cash flows must have consistent prices.',[
 ['Law of one price','If two tradable strategies generate identical cash flows in every state and at every relevant date, their prices should agree. Otherwise buy the cheaper payoff and sell the more expensive one. This argument needs trades, funding, and settlement to be feasible.'],
 ['Replicate a call','A call gives the right to buy at a fixed strike K; its terminal payoff is max(Sₜ − K, 0). In a one-period two-state model, choose stock holdings Δ and a bond position so the portfolio matches both possible payoffs. The portfolio’s initial cost gives the call price.'],
 ['Where uniqueness stops','A complete market spans every state-contingent payoff using traded instruments. In an incomplete market, several prices can be compatible with no arbitrage. Additional assumptions about risk prices or preferences are then needed.']
 ],'A stock costs 100 and ends at 120 or 80. A call with strike 100 pays 20 or 0. With zero interest, hold 0.5 shares and borrow 40: the payoff is 0.5 × 120 − 40 = 20 or 0.5 × 80 − 40 = 0. The call costs 50 − 40 = 10.',
 'An arbitrage has no net initial cost (or provides an initial inflow), no negative final payoff, and a strictly positive payoff with positive probability in the elementary setting. Replication is stronger than matching an expected payoff: it matches each state. Real-world funding constraints and bid–ask spreads can prevent the textbook trade.',
 'A high win rate or positive expected return is not risk-free arbitrage.',
 [num('In the worked example, how many shares replicate the call?',0.5,0.001,'Δ = (20 − 0)/(120 − 80) = 0.5.'),mc('What does replication match?',['Cash flows in every state','Only average cash flow','Only the best possible payoff'],0,'State-by-state matching supports the law-of-one-price argument.')],
 'Reprice the call when the bond earns 5% over the period. Find Δ, the amount borrowed today, and the initial call value.',
 {'Arbitrage':'A feasible trading strategy with no net cost, no possible loss, and a positive gain in at least one possible state in the elementary model.','Replication':'Constructing a portfolio with the same cash flows as another claim.','Complete market':'A market in which every state-contingent claim can be replicated.','Call option':'A right to buy an underlying asset at a specified strike under contractual terms.'},{prerequisites:['time-value','probability'],source:'lec01',pages:'3–13',widget:'binomial'});
L('state-prices','State prices and the stochastic discount factor','l1',['Finance','Financial math'],
 'A dollar can be worth more when it arrives in a bad state.',[
 ['Price each state','A state price qₛ is today’s cost of receiving $1 only if state s occurs. A payoff Xₛ across states has price ΣₛqₛXₛ. Positive state prices rule out elementary arbitrage in a finite model. They already incorporate discounting and risk valuation.'],
 ['From state prices to an SDF','If physical state probability is pₛ, define mₛ = qₛ/pₛ. Then price = Eᴾ[mX]. This one-period stochastic discount factor assigns greater weight to payoffs that are especially valuable. The course uses a state-price density process πₜ, with one-period SDF mₜ₊₁ = πₜ₊₁/πₜ.'],
 ['Risk premium','For gross return R, 1 = E[mR]. Since E[m] = 1/Rf, E[R] − Rf = −Rf Cov(m,R). Assets that perform poorly when m is high need greater expected returns to compensate investors.']
 ],'Two states are equally likely. Their state prices are 0.6 and 0.35. A claim paying 100 only in the first state costs 60. Its SDF values are 1.2 and 0.7. A sure 100 costs 95, so the gross risk-free return is 100/95.',
 'Under completeness the positive pricing SDF is unique up to the process normalization used. Under incompleteness there may be multiple SDFs that agree on traded assets but value unspanned claims differently. The finite-state fundamental theorem connects no arbitrage to a positive pricing kernel, with technical qualifications in more general markets.',
 'A state price is not a physical probability. State prices generally sum to a discount factor, not one.',
 [num('State prices are 0.4 and 0.5. A claim pays 10 and 20. What is its price?',14,0.001,'0.4 × 10 + 0.5 × 20 = 14.'),mc('If Cov(m,R) is negative, the expected excess return is…',['Positive','Negative','Necessarily zero'],0,'E[R] − Rf = −Rf Cov(m,R), with Rf positive.')],
 'Construct two positive SDFs pricing one risk-free bond in a three-state market, and explain why another claim might not have a unique price.',
 {'State price':'Today’s price of a claim paying one unit only in a specified future state.','Stochastic discount factor':'A state-dependent multiplier m used in price = E[m × payoff].','State-price density':'A process whose ratios provide stochastic discount factors.','Risk premium':'Expected return above a specified risk-free benchmark.'},{prerequisites:['replication'],source:'lec01',pages:'9–17'});
L('risk-neutral','Risk-neutral probability without the mystery','l1',['Finance','Financial math','Trading'],
 'Change the weighting of outcomes so you can discount at the risk-free rate.',[
 ['Forecasting versus pricing','P denotes physical probabilities used to model real-world outcomes. Q denotes risk-neutral pricing probabilities consistent with observed traded prices. Q is a mathematical reweighting; it does not assert that investors are indifferent to risk.'],
 ['Derive the two-state probability','For a non-dividend stock with up and down multipliers u and d and per-period risk-free rate r, require qu + (1−q)d = 1+r. Solving gives q = ((1+r)−d)/(u−d). No arbitrage requires d < 1+r < u so q lies strictly between zero and one.'],
 ['Price the payoff','For this complete one-period model, value = [qXᵤ + (1−q)X_d]/(1+r). Starting with state prices, the equivalent relation is Qₛ = Rf qₛ. With an SDF it is Qₛ = Rf pₛmₛ.']
 ],'A $100 stock ends at $120 or $80, and the risk-free rate is 5%. The pricing up probability is (1.05−0.8)/(1.2−0.8) = 0.625. The strike-100 call is worth (0.625 × 20)/1.05 = $11.90. This equals the replication cost.',
 'Under Q, discounted total-gain processes are martingales under the appropriate assumptions. With dividends, the ex-dividend price alone need not grow at r. In incomplete markets, Q need not be unique. Forecasting P&L and valuing derivatives are therefore distinct modeling tasks.',
 'Do not use a risk-neutral probability as your estimate of a real-world event’s chance.',
 [num('With u = 1.2, d = 0.8, r = 0, what is the risk-neutral up probability?',0.5,0.001,'(1 − 0.8)/(1.2 − 0.8) = 0.5.'),mc('Q is primarily a tool for…',['Pricing consistently with traded assets','Predicting the actual up frequency','Removing all investment risk'],0,'It reweights outcomes for no-arbitrage valuation.')],
 'Explain why the same option price can be consistent with investors having different physical forecasts.',
 {'Risk-neutral probability':'A pricing probability measure under which discounted traded gains have zero conditional drift.','Physical probability':'A probability model for actual outcomes, often denoted P.','Martingale':'A process whose conditional expected future value equals its current value under a specified measure.'},{prerequisites:['state-prices'],source:'lec01',pages:'18–26',widget:'binomial'});
L('factors-futures','Factor models, volatility smiles, and futures','l1',['Finance','Trading','Energy finance'],
 'Different instruments expose you to different priced risks.',[
 ['Factor pricing','A factor model links excess expected returns to exposures: E[rᵢ] − rf = βᵢλ in a one-factor version. CAPM uses the market factor. Multi-factor models use several exposures and risk prices. Statistical co-movement and compensation for bearing risk are related but distinct questions.'],
 ['The smile as a model clue','Implied volatility is the Black–Scholes volatility that matches an observed option price. Different strikes often imply different volatilities. This smile or smirk signals that one constant-volatility model does not fit all observed option prices. Stochastic volatility provides a richer pricing model.'],
 ['Futures and mean reversion','Futures settle gains through marking to market. Under deterministic rates in the course model, Fₜ,T = Eᑫₜ[S_T]. For AR(1) spot dynamics, iterate conditional expectations to derive a maturity curve. Physical and risk-neutral long-run means can differ because risk is priced.']
 ],'If Q dynamics are Sₜ₊₁ − 50 = 0.8(Sₜ − 50) + ε, and today’s spot is 70, the one-step futures price is 66 and the two-step price is 62.8. These are pricing expectations, not necessarily physical forecasts.',
 'For storable assets, funding, storage costs, and convenience yield enter cost-of-carry relations. Electricity delivery cannot generally be replicated with unrestricted storage, so do not mechanically apply equity-style spot-and-carry pricing. Futures and forward prices can also differ with stochastic interest rates because settlement timing matters.',
 'A futures quote is a contract price, not a cash investment of that amount. Zero initial value does not mean zero margin or zero risk.',
 [num('In the example, what is the two-step futures price?',62.8,0.001,'50 + 0.8² × (70−50) = 62.8.'),mc('A volatility smile means…',['Implied volatility differs across strikes','All options have equal prices','Actual volatility is known exactly'],0,'The observed prices imply different Black–Scholes σ values.')],
 'Explain how a positive physical expected gain on a futures position can coexist with zero expected gain under Q.',
 {'Implied volatility':'The volatility input that makes a specified option model match a market price.','Factor model':'A model expressing returns or expected returns using shared risk exposures.','Futures contract':'A standardized contract whose gains and losses are settled through marking to market.','Convenience yield':'An economic benefit from physically holding a commodity beyond its sale price.'},{prerequisites:['risk-neutral','time-series'],source:'lec01',pages:'16–17, 27–40'});
L('brownian','Brownian motion and stochastic integrals','l2',['Math','Financial math'],
 'Random shocks shrink with the square root of the time step.',[
 ['Build the process','Standard Brownian motion W starts at zero, has continuous paths, and has independent normal increments. Over length Δt, the increment has mean zero and variance Δt. Therefore simulate it as √Δt × Z, with Z a standard normal draw.'],
 ['Drift and diffusion','An Itô process has dX = μ dt + σ dW. Drift μ gives the expected rate of change. Diffusion σ scales the unpredictable part. Over a small interval, ΔX ≈ μΔt + σ√Δt Z. σ may depend on time and the state.'],
 ['No future knowledge','An Itô integral accumulates exposures times shocks using information available before each shock. In a discrete approximation, sum σₜᵢ(Wₜᵢ₊₁ − Wₜᵢ). Adapted exposure cannot use the next increment to choose today’s position. Under suitable integrability, the stochastic integral has zero conditional mean.']
 ],'Annual volatility is 20% and one trading day is 1/252 years. The daily shock standard deviation is 0.20/√252 ≈ 1.26%. The annual drift contribution of 8% becomes about 0.08/252 ≈ 0.032% per day.',
 'Brownian paths are not differentiable in the ordinary sense. Their quadratic variation over [0,T] is T: sums of squared small increments do not vanish. The Itô isometry relates E[(∫σ dW)²] to E[∫σ²dt]. These facts explain why ordinary calculus needs a correction.',
 'Multiply noise by √Δt, not Δt. Rescaling time incorrectly changes the total modeled risk.',
 [num('What is the standard deviation of a standard Brownian increment over Δt = 0.25?',0.5,0.001,'Brownian increment standard deviation is the square root of elapsed time: √0.25 = 0.5.'),mc('An adapted trading exposure may depend on…',['Past and present information','The next random shock','The entire realized future path'],0,'The exposure must be selected before the future increment is observed.')],
 'Explain why a continuous path can have nonzero quadratic variation even as each individual increment shrinks.',
 {'Brownian motion':'A continuous stochastic process with independent normal increments and increment variance equal to elapsed time.','Drift':'The conditional expected instantaneous rate of change in a stochastic process.','Diffusion':'The shock-loading component of a continuous stochastic process.','Adapted process':'A process whose current value depends only on currently available information.','Quadratic variation':'The limit of sums of squared increments along increasingly fine time partitions.'},{prerequisites:['calculus','statistics'],source:'lec02',pages:'4–11',widget:'brownian'});
L('ito','Itô’s lemma, one step at a time','l2',['Math','Financial math'],
 'Curvature turns random variation into a drift adjustment.',[
 ['Start with a Taylor expansion','For dX = μdt + σdW and smooth f(t,X), expand in time and X. Ordinary first-order terms are fₜdt and fₓdX. The second-order term ½fₓₓ(dX)² also survives because Brownian squared increments accumulate at order dt.'],
 ['The formula','Itô’s lemma gives df = (fₜ + μfₓ + ½σ²fₓₓ)dt + σfₓdW. Subscripts denote partial derivatives. The extra curvature term is not an optional approximation: it is part of the continuous-time formula under its smoothness assumptions.'],
 ['Geometric Brownian motion','For dS = μSdt + σSdW and f(S) = ln S, fₓ = 1/S and fₓₓ = −1/S². Thus d ln S = (μ−½σ²)dt + σdW. The expected log-growth rate is lower than the expected simple instantaneous growth rate.']
 ],'For f(W) = W², Itô gives d(W²) = dt + 2W dW. Taking expectations over time from W₀ = 0 yields E[W_T²] = T. Ordinary calculus would miss the dt term.',
 'For multiple state variables, add a cross-curvature term for correlated shocks. With dXᵢdXⱼ = covarianceᵢⱼ dt, the drift correction is ½Σᵢⱼ fᵢⱼ covarianceᵢⱼ dt. For X/Y, covariance between numerator and denominator affects the expected growth rate of the ratio.',
 'The statement (dW)² = dt is shorthand for the stochastic calculus rule; it is not an ordinary pointwise equality of numbers.',
 [num('For GBM with μ = 0.08 and σ = 0.20, what is expected annual log growth as a decimal?',0.06,0.0001,'0.08 − 0.5 × 0.20² = 0.06.'),mc('The extra drift term depends on…',['Curvature and variance','Only the current price','The sign of the last return'],0,'The Itô correction is ½σ²fₓₓ for an additive scalar process.')],
 'Derive d(exp(a t + bWₜ)) and identify its drift and diffusion coefficients.',
 {'Itô’s lemma':'The stochastic chain rule, including a curvature correction from quadratic variation.','Geometric Brownian motion':'A positive process whose proportional changes have constant drift and diffusion in the basic model.'},{prerequisites:['brownian','calculus'],source:'lec02',pages:'12–14, 28–31'});
L('black-scholes','Delta hedging and the Black–Scholes equation','l2',['Finance','Financial math','Trading'],
 'Choose a hedge to cancel the local shock, then price the remaining cash flow.',[
 ['A self-financing hedge','Let a European derivative have value f(t,S). Hold Δ = fₛ shares and finance the rest in the risk-free asset. Self-financing means changes in the strategy’s value come from its existing positions, with no external cash injection.'],
 ['Match the drift','Apply Itô to f and match its diffusion with ΔdS. Matching the remaining drift gives fₜ + rSfₛ + ½σ²S²fₛₛ − rf = 0, with terminal boundary f(T,S) = H(S). The stock’s physical drift μ cancels because the local risk has been replicated.'],
 ['The call formula','For a non-dividend stock and constant r and σ, C = SN(d₁) − Ke^(−rτ)N(d₂), where d₁ = [ln(S/K) + (r+σ²/2)τ]/(σ√τ), d₂ = d₁−σ√τ, and τ is time remaining. N is the standard normal cumulative distribution function.']
 ],'If a call’s delta is 0.6, holding one short call and 0.6 shares approximately cancels its first-order exposure to a small price move. It does not cancel curvature, time decay, changing volatility, or discrete hedging error.',
 'The derivation assumes continuous trading, frictionless funding at r, known model dynamics, and a replicable payoff. Gamma is fₛₛ and measures how delta changes with S. Vega measures sensitivity to volatility. A priced option under the model is also the discounted Q expectation of its payoff; the PDE and expectation approaches solve the same valuation problem under suitable conditions.',
 'Delta hedging is local. It does not guarantee a riskless realized trade when hedges are discrete or the model is wrong.',
 [mc('Why does μ disappear from the Black–Scholes pricing PDE?',['Replication cancels the local risky shock','Stocks have no expected return','All forecasts are identical'],0,'A replicating portfolio and the option have the same local exposure and funding requirement.'),num('A short position in 10 calls has delta −6 shares in total. How many shares offset first-order delta?',6,0.001,'Buy 6 shares to offset −6 share-equivalents.')],
 'Derive the pricing PDE by writing both the option’s Itô dynamics and a self-financing replicating portfolio’s dynamics.',
 {'Delta':'The derivative of an instrument’s value with respect to its underlying price.','Gamma':'The derivative of delta with respect to the underlying price.','Self-financing strategy':'A strategy whose value changes arise from its holdings without external cash additions or withdrawals.','PDE':'A partial differential equation involving derivatives with respect to several inputs.'},{prerequisites:['ito','risk-neutral'],source:'lec02',pages:'16–20'});
L('sde-models','Mean reversion, stochastic volatility, and pricing measures','l2',['Math','Financial math','Energy finance'],
 'Choose dynamics that fit both the asset and the purpose.',[
 ['Common processes','Arithmetic Brownian motion has additive shocks and can be negative. Geometric Brownian motion is multiplicative and positive. The Ornstein–Uhlenbeck process dX = κ(θ−X)dt + σdW pulls toward θ at speed κ. Its conditional mean is θ + (Xₜ−θ)e^(−κh).'],
 ['More than one source of risk','In a stochastic-volatility model, both the asset price and its variance evolve. Heston uses dS/S = μdt + √v dW₁ and dv = κ(θ−v)dt + ξ√v dW₂, with correlated shocks. An asset plus a bond may not span both risks, leaving a volatility risk price to specify.'],
 ['From P to Q','A change of measure adjusts drift to account for risk prices while preserving the diffusion structure under the standard framework. Interest-rate models such as Vasicek lead to bond-pricing PDEs. Feynman–Kac links suitable PDE solutions to discounted conditional expectations under the chosen pricing dynamics.']
 ],'An OU state is 80, its long-run mean is 50, and κ = ln 2 per year. The expected state one year later is 50 + 30 × 0.5 = 65. This is a conditional mean, not a guaranteed trajectory.',
 'For an OU process, conditional variance at horizon h is σ²(1−e^(−2κh))/(2κ). A variance swap exchanges realized variance against a fixed strike; valuation depends on Q expected integrated variance, while expected trading P&L depends on P. Brownian crossing probabilities in Handout 1 address hitting barriers: continuous monitoring and endpoint-only tests give different events. Nonnegative square-root processes require care in simulation near zero; naive Euler steps can make variance negative.',
 'A GBM price cannot be negative. Applying it directly to power spot prices excludes a real class of possible outcomes.',
 [num('An OU state is 90, long-run mean 50, and its deviation halves over the horizon. What is the conditional mean?',70,0.001,'50 + 0.5 × (90−50) = 70.'),mc('Adding stochastic variance can make the market…',['Incomplete if its risk is unspanned','Automatically arbitrageable','Risk-free'],0,'An additional shock need not be hedgeable using only a stock and bond.')],
 'Compare a one-factor Vasicek rate model with a two-factor stochastic-volatility equity model. Which sources of risk can existing assets span?',
 {'Mean reversion':'A tendency for a state’s conditional expectation to move toward a long-run level.','Ornstein–Uhlenbeck process':'An additive Gaussian mean-reverting diffusion.','Stochastic volatility':'A model in which conditional variance evolves randomly.','Market price of risk':'Compensation per unit of risk exposure; links physical and pricing drifts.','Variance swap':'A contract exchanging realized variance over a specified period against a fixed variance strike.'},{prerequisites:['ito','black-scholes','time-series'],source:'lec02',pages:'21–73; Handout 1'});
root.CURRICULUM={modules,lessons}; root.AUTHOR={L,mc,num};
})(typeof window!=='undefined'?window:globalThis);
