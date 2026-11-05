# Teaching depth and practice

The November 5, 2026 revision expands all 225 main passages across 75 lessons. Existing passage and question indices remain stable. The main teaching path now explains mechanisms, intermediate reasoning, assumptions, and connections rather than relying on a definition followed by a formula. Short summaries remain as orientation, not the entire explanation.

## How to extend the lessons

Start with the problem that makes the concept useful. Explain what changes, what is held fixed, and why the mechanism produces the result. Introduce notation after the idea, work through intermediate steps, then connect the result to another topic and explain where the analogy or model stops working. Do not lengthen a passage with repeated definitions or generic advice. More complicated concepts should receive proportionately more explanation.

For example, the calculus passage derives the secant slope of x² before taking its limit, develops partial derivatives as slices through a landscape, constructs a gradient, then explains Hessian entries as changes in sensitivities. A worked two-input quadratic shows the mixed term and exact second-order correction. The discussion connects the Hessian to gamma, portfolio covariance, optimization, and saddle points. The visual varies an interaction coefficient to show why a zero gradient need not indicate a minimum.

The explanatory additions live in `content/depth-*.js`. They extend the original section bodies in place so search, dictionary destinations, ChatGPT packs, and notebook exports receive the same teaching text. References load afterward. Original examples and explanatory extensions remain distinguished from the source authors' material.

## Visuals

`visuals.js` supplies six interactive mechanisms (tangent/Taylor, Hessian, covariance, discounting timeline, dispatch, and estimation fit, with multiple related displays) and static diagrams for network congestion, information timing, cash-flow relationships, Bellman choices, and loss tails. Several are reused where the same mechanism connects topics. Existing pricing, simulation, volatility, diversification, and battery widgets remain.

Controls are deliberate, with no automatic animation. Axes, units, assumptions, line styles, and explanations accompany the figures. The Hessian plot is two principal-direction slices, not a complete rendered surface. The supply example is a simplified convex two-unit problem. Diagrams are educational models, not operational market software.

## Compact sources and progress controls

Small Sources buttons follow relevant teaching areas. Clicking opens reference details with publisher, locator, and outgoing links. Native popovers support Escape and light dismissal; the close button is explicit. The full attribution/scope notice appears after previous/next lesson navigation. Top and bottom reading/understanding controls update the same state and stay synchronized.

## Flashcards

Flashcards include only lessons marked **Understood**, including the two originally understood prerequisites. The bank has 150 lesson-question cards plus 18 additional causal/transfer checks. The calculation cards use distinct numerical alternatives; this is multiple-choice recognition practice rather than a Python execution test or a proof of practical skill.

Each attempt stores a stable card ID, timestamp, selected answer, correctness, assistance flag, and content version. Attempts are private browser progress, included in JSON exports/imports and the notebook JSON backup. Old version-1 progress files without flashcard data still import. Import merges event IDs and rejects conflicting contents.

Only the first attempt for a card on each UTC date contributes to its topic's weight. Immediate retries remain visible attempts but cannot turn a same-day correction into fresh evidence. A hinted answer does not count as an unaided success. Repeated exposure to the same question on later days can still overstate transfer; use novel open-ended and implementation work alongside cards.

For a first attempt aged `d` days, weight `w = 0.5^(d/30)`. With weighted unaided correct total `C` and weighted attempt total `N`, the displayed recognition estimate is `(1+C)/(2+N)`. The two prior pseudo-observations provide smoothing, not a validated psychological memory model. With no attempts, the UI says **Not tested**, not “50% known.” Review weight is `1-estimate`, or 1 for untested topics. Old evidence moves toward the neutral prior as it ages; this does not prove an actual amount of forgetting.

The queue prioritizes unseen cards, older practice, weak topic evidence, and recent mistakes, then distributes cards across topics. The optional topic selector focuses a session. Two or more first-of-day evidence attempts with an estimate below 0.5 flag a practice gap in Review. Self-reported understanding is never silently changed. External ChatGPT review evidence remains separate; its pack now also includes flashcard recognition evidence where available.

Completion is a user claim. A flashcard score measures responses to selected prompts. A stronger assessment requires explaining reasoning, solving a changed example, and implementing or debugging an application without help.
