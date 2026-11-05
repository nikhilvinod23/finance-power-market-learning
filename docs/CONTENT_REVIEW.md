# Content review

Reviewed November 4, 2026. This records the scope of a content and implementation review, not a guarantee that every statement is error-free.

## Coverage

The site has 75 lessons and 150 quick questions: the existing 45 lessons plus 30 lessons across nine practical tracks. The new tracks cover financial modeling, Python/SQL data handling, power-market mechanics, forecasting, commodity hedging, energy project finance, risk/accounting, optimization/strategy implementation, and selected CFA Level I foundations.

All lessons retain the same structure: explanation, notation and assumptions, worked example, deeper treatment, misconception, quick practice, a longer application exercise, glossary terms, prerequisites, and references. Existing IDs, passage indices, question indices, initial prerequisite statuses, and version-1 browser progress remain compatible.

## Corrections and clarifications

- Control variates: expectation preservation explicitly assumes a fixed coefficient or an independently fitted pilot coefficient. Same-sample coefficient estimation can introduce finite-sample bias.
- GMM: the weighting matrix is explicitly symmetric positive definite. Distinguish long-run moment covariance from the covariance of the parameter estimator.
- Wald tests: nonredundant restrictions and a full-rank Jacobian replace the ambiguous phrase “independent restrictions.” Statistical independence between restrictions is not the condition.
- AR(1): the stationary-mean claim identifies suitable stationary zero-mean innovations.
- Notation: a prime on a scalar function is a derivative; on a vector/matrix it denotes transpose here.
- New finance examples distinguish FCFF from equity cash flow, time-zero Excel NPV from future periods, nominal from real values, and mark-to-market from cash.
- Power examples state interval units, generator/load settlement direction, simplified network assumptions, storage efficiency conventions, and perfect-foresight limits. A transport example is not asserted to reproduce full AC or DC network physics or detailed ERCOT settlement.
- Tail risk uses a declared empirical quantile convention and a worst-tail average that handles the illustrated discrete case. It does not treat VaR as a maximum loss.

## Sources

Every explanatory section has references, with references also beside worked/deeper material. MIT lessons retain PDF page ranges. A centralized registry records publisher/author, locator, link, rights context, and review date. Sources also links related lessons to references. Original practice and examples are labeled; source attribution does not imply the publisher supplied or endorsed those scenarios.

Original MIT archive metadata supplies the exact public PDF URLs. New references were checked against official publisher/documentation pages: OpenStax, Microsoft, Python, NumPy, pandas, PostgreSQL, scikit-learn, SciPy, the authors' forecasting textbook, CFTC, CME, ERCOT, SAM, BIS, and CFA Institute. Some documentation URLs track the current release and can change. Current ERCOT protocols remain authoritative for effective rules. No fixed market price cap, product-specific eligibility, or detailed operational rule is asserted here.

## Verification

Automated checks cover all lesson renders, stable IDs, valid and acyclic prerequisites, citation resolution and source coverage, finite question answers, prior browser-state compatibility, escaped imported text, progress persistence, review import validation and confirmation, event deduplication/conflicts, delayed-evidence rules, pack selection, and ZIP structure/CRC. Existing widget checks compare numerical models against analytical cases and exhaustive battery enumeration. New example calculations are checked independently from their text.

These checks do not establish that every conceptual passage is beyond dispute or that each extension is a production implementation. Larger application exercises invite work and independent review; no Python runtime, professional risk engine, or full market simulator is provided. Source locators sometimes identify a chapter or course resource rather than a page-level citation for every sentence.

## Remaining limitations

- Selected CFA foundations are not complete current syllabus coverage or official exam preparation.
- Introductory project-finance and market examples omit contract-specific legal/accounting detail and operational charges.
- An LLM score can be wrong. Confirmed imported reviews remain provisional evidence and do not silently overwrite self-reported understanding.
- Browser progress is device-local until transferred; exports are snapshots. No Plus account, Obsidian vault, sync service, or schedule is connected.
- No paid textbooks, private notes, personal learning records, credentials, or source PDFs are committed.

## November 5, 2026 teaching revision

All 225 main passages were expanded in place with causal explanation, reasoning steps, applications, and conceptual connections. The calculus treatment now develops gradients, Hessians, mixed derivatives, quadratic corrections, and directional curvature with original examples. Additional primary references are OpenStax Calculus Volume 3 and MIT 18.S096 Matrix Calculus (2023). Source links are compact popovers; the full scope note follows navigation. Top/bottom progress controls share one state.

The new flashcard bank contains 168 cards, with recognition evidence kept separate from completion. Tests cover eligibility, retries, hints, recency weights, import/merge, synchronized controls, source/footer structure, and independent Taylor/Hessian/dispatch cases. See TEACHING_AND_PRACTICE.md for the model assumptions and limitations. Expanded prose is an original teaching synthesis, not additional MIT source pages or full exam coverage.
