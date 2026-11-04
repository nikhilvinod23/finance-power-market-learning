# Authoring baseline

Use this workflow when adding or editing finance, trading, math, programming, CFA, or power-market lessons in Finance & Power Market Learning.

1. Read the actual source. Record title, author, date, license, page ranges, and supported concepts. Verify current market rules from primary documentation. Separate source adaptations from original applications.
2. Select one coherent learning objective per lesson. Start with the plain-language idea, then define every symbol when introducing an equation. Explain units, information timing, probability measure, assumptions, and limitations where relevant.
3. Use the `L` schema in `content/curriculum.js`: stable id, title, module, tags, summary, at least three titled explanatory sections, worked numerical example, deeper explanation, common mistake, two to four questions, one longer exercise, glossary definitions, prerequisites, and source metadata. Choose depth by difficulty, not word count. Give advanced concepts derivation steps rather than only formulas.
4. Use familiar analogies sparingly, then explain their limits. Keep the main path understandable without opening the deeper section. Keep useful prerequisite material even when initially understood.
5. Supply practice with checked answers, numeric tolerance and units, or distinct multiple-choice options with one correct answer and a meaningful explanation. Avoid ambiguous conventions. Keep practice original; link source exercises separately.
6. Add glossary definitions and accurate links to teaching passages. Tag across relevant fields; distinguish material actually covered from future roadmap entries. Do not label MIT lessons as complete CFA preparation.
7. Preserve stored progress: never reuse lesson IDs, reorder existing passage indices, or reorder existing question indices without an explicit migration. Store only user progress in the browser; content remains public and generic. Never infer mastery from a page visit or a single correct answer.
8. For diagrams and interactives, identify all inputs and outputs, show units and assumptions, use deterministic seeds where useful, and describe exactly what is simulated. Validate numerical routines independently with analytical cases or exhaustive enumeration. Never represent perfect foresight as tradable performance.
9. Keep a reading-first UI with a restrained semantic palette, accessible controls, visible focus, responsive layout, and no gradients, animated icons, decorative microheadings, or unnecessary dashboards. Use SVG for exact diagrams; generated images are inappropriate for exact mathematical claims.
10. Run curriculum, numerical, and state tests; build; inspect desktop and mobile when browser access is available. Check searches, glossary links, question feedback, persistence, export/import, review flags, direct URLs, and no unintended horizontal overflow.

## Example schema

```js
L('stable-id','Clear title','module-id',['Finance','Math'],
  'One sentence stating the idea.',
  [['Idea','Explanation.'],['Notation','Define symbols.'],['Use','Explain application.']],
  'Worked example with intermediate arithmetic and units.',
  'Deeper derivation, conditions, and practical limits.',
  'A specific misconception and its correction.',
  [num('Question?',4,0.01,'Reasoning.','units'),
   mc('Question?',['Choice A','Choice B','Choice C'],1,'Reasoning.')],
  'Longer exercise inviting explicit reasoning.',
  {'Term':'Definition.'},
  {prerequisites:['existing-id'],source:'lec01',pages:'3–13'});
```

`L`, `num`, and `mc` are provided by `AUTHOR`. Load additional content files before `app.js`; include them in curriculum validation. Use `.reference` for independent source references and update the renderer when adding a new reference type. Keep user-controlled text escaped, including imported notes. Keep import records whitelisted and size-limited.

## Semantic color palette

Use the tokens in colors.css: blue for navigation, actions, and model curves; green for completed or understood items, correct answers, and positive cash flows; amber for review flags, caution, and variance forecasts; red for errors, losses, downward branches, and destructive actions. Use pale corresponding backgrounds for surfaces and retain neutral reading text. Keep labels and line styles so meaning never relies on color alone. Preserve this mapping in new controls and diagrams; do not add unrelated accent colors or gradients.

When changing a published stylesheet, increment its version query in index.html so browser caches do not hide visual updates.
