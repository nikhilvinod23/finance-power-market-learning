(function(root){'use strict';const lessons=root.CURRICULUM.lessons;
const deep={
 'state-prices':[
 ['Why a positive SDF rules out arbitrage','Suppose a self-financing strategy starts with zero wealth and ends with X≥0 in every state and X>0 with positive probability. A strictly positive pricing SDF gives its initial value E[mX]>0. But it started at zero: contradiction. This proves the easy direction of the finite-state theorem. The converse—constructing such a positive SDF from no arbitrage—requires a separation argument. Positivity matters: a zero or negative weight could fail to penalize a gain in a particular state.'],
 ['State price versus density','A state price is already probability-weighted: qₛ=pₛmₛ. The SDF mₛ is the value per unit physical probability. Risk-neutral probability is Qₛ=Rf qₛ=Rf pₛmₛ. Summing Q gives one because the risk-free asset requires E[m]=1/Rf. These are three related objects, not three names for the same number.']
 ],
 'ito':[
 ['Why the second-order term survives','For a small interval h, a Brownian increment has size roughly √h. Squaring it produces order h, the same scale as a time increment. A third power is order h^(3/2) and disappears relative to h. In a Taylor expansion, keep fₜh, fₓΔX, and ½fₓₓ(ΔX)². The quadratic-variation limit replaces the accumulated squared shock by σ²dt. That is why the curvature correction survives while ordinary higher-order terms vanish.'],
 ['A two-variable product','Let dX=aₓdt+bₓdW₁ and dY=aᵧdt+bᵧdW₂ with dW₁dW₂=ρdt. For f=XY, fₓ=Y, fᵧ=X, and fₓᵧ=1. Thus d(XY)=YdX+XdY+ρbₓbᵧdt. The final term is the covariance correction. A ratio X/Y adds both denominator curvature and a covariance term, so dividing expected values does not generally give the expected ratio.']
 ],
 'black-scholes':[
 ['Derive the equation','By Itô, df=(fₜ+μSfₛ+½σ²S²fₛₛ)dt+σSfₛdW. A replicating portfolio W=f holds Δ shares and f−ΔS dollars in the bond. Self-financing gives dW=[ΔμS+r(f−ΔS)]dt+ΔσSdW. Match shocks to get Δ=fₛ. Match drifts and cancel μSfₛ on both sides: fₜ+½σ²S²fₛₛ=rf−rSfₛ. Move terms to one side to obtain the pricing PDE. The terminal payoff is still required to select the relevant solution.'],
 ['Delta is not the complete risk','A finite price move changes value by approximately ΔΔS+½Γ(ΔS)², before time and volatility effects. A delta-neutral book can retain positive or negative gamma. Discrete rebalancing leaves exposure between hedge times; transaction costs also make infinitely frequent hedging infeasible. The model result is a benchmark for understanding hedge error, not a promise to eliminate it.']
 ],
 'sde-models':[
 ['Moments and a PDE','For dX=a(X)dt+b(X)dW and smooth g, define the generator Lg=a gₓ+½b²gₓₓ. Itô implies dE[g(Xₜ)]/dt=E[Lg(Xₜ)] under suitable conditions. For g=X and g=X², this produces moment equations, sometimes a closed system. Under Q, a discounted pricing function satisfies fₜ+Lᑫf−rf=0 with the payoff as terminal condition. The source uses this bridge for interest rates and square-root diffusion moments.'],
 ['A variance-swap expectation','For risk-neutral mean-reverting variance dv=κ(θ−v)dt+ξ√v dW, Eᑫ[vₜ₊ₛ|vₜ]=θ+(vₜ−θ)e^(−κs). Integrating from 0 to τ and dividing by τ gives the model’s expected average variance: θ+(vₜ−θ)(1−e^(−κτ))/(κτ). Ignoring contract-specific monitoring details, this is the continuous-variance fair strike with deterministic discounting. Physical κ and θ can differ, so expected real-world P&L need not be zero.'],
 ['Hitting a barrier','For standard driftless Brownian motion starting at zero and a>0, the reflection principle gives P(max₀≤s≤T Wₛ≥a)=2[1−Φ(a/√T)]. The probability that the endpoint alone exceeds a is only 1−Φ(a/√T). Some paths hit the barrier and return below it. This explains why checking only coarse sampled points can miss crossings. Drift, moving barriers, and other processes require different formulas or methods.']
 ],
 'merton':[
 ['Recover the tradeoff','For a constant risky fraction w and dS/S=μdt+σdW, wealth follows dW/W=[r+w(μ−r)]dt+wσdW. For CRRA, Itô adds utility curvature to the expected utility drift. After factoring out positive terms, the choice maximizes w(μ−r)−½γw²σ². Differentiate: μ−r−γwσ²=0, yielding w*=(μ−r)/(γσ²). In multiple assets, the same quadratic penalty uses w′Σw and the first-order condition is μ−r1−γΣw=0.'],
 ['Horizon and changing opportunities','The constant-opportunity solution is myopic: today’s fraction solves a local tradeoff. If a state forecasts future expected returns and its innovations correlate with current returns, today’s positions can hedge a worsening future opportunity set. Then the continuation value depends on that state and can alter the allocation. The course’s independent-state example shows that predictability alone does not always create hedging demand.']
 ],
 'bellman':[
 ['Why the recursion works','Take an optimal strategy at a state. If its continuation were inferior to another feasible strategy after a reachable next state, replace only that continuation. The replacement raises the initial expected objective, contradicting optimality. Therefore optimize the continuation first, then select the current action. The reasoning assumes the chosen state stores everything relevant and the objective is dynamically consistent.'],
 ['A concrete two-date table','At the last date, suppose an empty battery at price 80 has value 0, while a full battery can discharge for 80. At the previous date with price 20 and charge efficiency 0.9, empty-state actions have values wait=0 and charge=−20/0.9+80=57.78. The value is 57.78 and the action is charge. If the next price were only 15, the charge value becomes −7.22, so waiting wins. The continuation table, not the latest price alone, determines the decision.']
 ],
 'gmm':[
 ['A regression moment step by step','For y=x′β+u, assume E[xu]=0. Replace the expectation by the sample average: gₙ(β)=n⁻¹Σxₜ(yₜ−xₜ′β). Setting it to zero gives (Σxₜxₜ′)β=Σxₜyₜ. If the design has full rank, solve this linear system for β. The equation is the OLS normal equation. It follows from the orthogonality assumption; it is not evidence that the assumption itself is true.'],
 ['Weighting and uncertainty','Moments with large noise should not receive the same influence merely because they are expressed in larger units. Weighting by an inverse covariance accounts for their scale and correlation. Estimate a preliminary model, estimate the moment covariance, then refit with the updated weight. In short samples the estimated weight introduces noise; more elaborate estimation is not automatically more reliable.']
 ],
 'hac':[
 ['Long-run covariance','For a stationary scalar moment fₜ, the long-run variance is S=Γ₀+2Σⱼ≥1 Γⱼ, where Γⱼ=Cov(fₜ,fₜ₋ⱼ). For vectors, use Γⱼ+Γⱼ′ instead of doubling. Positive dependence often raises the sample-average variance relative to Γ₀/n. Newey–West truncates at a bandwidth and tapers lag terms to estimate this object. The target is dependence of the estimating moments, not simply correlation of prices.']
 ],
 'bootstrap':[
 ['Keep the error distribution straight','The bootstrap approximates the distribution of θ̂−θ by θ̂*−θ̂. If bootstrap errors have quantiles a and b, then the interval θ̂−b ≤ θ ≤ θ̂−a follows by rearranging a ≤ θ̂−θ ≤ b. Substituting a=q₀.₀₂₅−θ̂ and b=q₀.₉₇₅−θ̂ yields the basic interval. This is why its endpoints reflect, rather than simply repeat, the bootstrap quantiles.']
 ],
 'volatility-extensions':[
 ['Normalize a DCC matrix','After updating Qₜ, define Rᵢⱼ,ₜ=Qᵢⱼ,ₜ/√(Qᵢᵢ,ₜQⱼⱼ,ₜ). The diagonal becomes one, making R a correlation matrix under valid positive-definiteness conditions. Then Hᵢⱼ,ₜ=σᵢ,ₜσⱼ,ₜRᵢⱼ,ₜ. Marginal volatility and correlation can each move. A covariance forecast therefore needs both components, and a hedge evaluated at one static correlation can fail under a different state.']
 ]};
for(const [id,sections] of Object.entries(deep))lessons.find(l=>l.id===id).deepSections=sections;
})(typeof window!=='undefined'?window:globalThis);
