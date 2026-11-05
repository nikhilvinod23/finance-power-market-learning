# ChatGPT, Obsidian, and a consistent learning record

Status: portable exports and confirmed review imports are implemented. No account, vault, backend, notification, or recurring task is connected. The user chose to plan integration before scheduling it.

## Recommended starting point

Keep public teaching content in this repository. Keep personal progress and review attempts private. Use one structured learning record as the authority; use Obsidian Markdown as a readable view of it. Avoid treating a ChatGPT conversation, browser storage, and manually edited notes as three independently authoritative databases.

The current workflow needs no API key or paid backend:

1. Mark topics read and record your own understanding in the site.
2. Open **Progress → Export ChatGPT review pack**. It selects up to five started/read topics, prioritizing due and unreviewed topics. Personal notes are excluded unless you opt in. The file includes lesson context, sources, stable IDs, and a grading/output contract.
3. Upload the Markdown pack to an interactive conversation in your ChatGPT account. It asks for up to three novel questions, one at a time, without initially showing solutions. Answer from memory; report hints or reference use honestly.
4. Ask ChatGPT to provide the actual attempts as the requested JSON result file. Check original answers, grading, feedback, timestamps, and assistance labels. The model may misgrade or misformat a response; ask for corrections before importing it.
5. Choose **Import review results**, inspect the preview, then confirm. Records append by unique ID. Reimporting identical IDs is safe; conflicting ID contents are rejected. This does not overwrite self-reported understanding.
6. Export the **Obsidian notebook (.zip)**, extract `Finance Learning` inside a vault, and open its dashboard. It includes topic text and references, your notes, confirmed review events, agent guidance, and `State/learning-state.json`. The JSON is a backup the site can import. Extraction is manual; the site does not discover your filesystem.

Always back up your vault before replacing a prior export. Exported topic Markdown is a generated snapshot: editing it does not update browser progress. Save additional personal notes outside the generated folder, or merge them deliberately. To transfer browser progress to another device, use the JSON backup and import it there. Obsidian Sync does not synchronize the site's localStorage.

## Honest evidence of learning

Reading, self-reported understanding, site quiz attempts, and confirmed external reviews are different signals. Page visits and time spent are not mastery. A correct response after seeing a solution is assisted. The actual initial answer stays in the record even after correction.

Current review evidence stores:

| Field | Purpose |
| --- | --- |
| `id`, `lessonId`, `contentVersion` | Stable event, topic, and source-content identity |
| `reviewedAt`, `reviewer` | When it happened and who assessed it |
| `question`, `answer`, `feedback` | Auditable question, original response, and assessment |
| `score` | Provisional judgment from 0 to 1 |
| `assistance` | `none`, `hint`, or `solution` |

The initial rule counts an unaided score at least 0.8 as a pass. Different questions passed at least seven days apart in the current uninterrupted pass sequence provide a limited delayed-retention signal. A failed or assisted attempt restarts that sequence. This is a heuristic, not proof of general competence or a calibrated probability of remembering. Repeated variants can still be too similar; the reviewer must judge transfer.

Suggested next review dates use one day after a failed/assisted attempt, three days after an initial unaided pass, seven days after delayed evidence, and twenty-one days after at least three distinct passes with delayed evidence. These are starting rules to refine with actual use, not a validated adaptive scheduler. Due dates do not schedule notifications.

For stronger assessment, require explanation, a calculation with units, and implementation on a new case. Eventually record rubric dimensions, confidence before answering, prompt/model version, an artifact or code-test result, and any grading correction as a new linked event. Confidence can reveal overconfidence but should not inflate the score. For an important conclusion, inspect the reasoning and independent calculations rather than accepting an LLM grade alone.

### Review import schema

```json
{
  "kind": "finance-learning-review",
  "version": 1,
  "records": [{
    "id": "r-unique-attempt-001",
    "lessonId": "time-value",
    "reviewedAt": "2026-11-04T12:00:00.000Z",
    "score": 0.75,
    "assistance": "none",
    "reviewer": "chatgpt",
    "question": "The actual question asked",
    "answer": "The actual answer before feedback",
    "feedback": "Rubric and corrections",
    "contentVersion": "2026-11-04.2"
  }]
}
```

Use the real review date; the example is not an attempt to import. Unknown lesson IDs, invalid scores, future dates, duplicate IDs in one file, oversized files, and conflicting existing event IDs are rejected. Imported text is escaped in the site. Content from another version is flagged for review in the preview. The app never executes imported text. Review import is capped at 100 attempts per file; stored history at 2,000 events. Export a backup before any later archiving/migration.

## Can the website use ChatGPT Plus directly?

These are separate capabilities:

- **ChatGPT identity:** Sign in with ChatGPT can identify a user in supported participating apps. Identity alone does not share conversations, memory, files, or learning state.
- **Included plan usage:** Current OpenAI documentation allows eligible Go/Plus/Pro users to approve included Work/Codex usage in participating commercial apps/sites that support it, with app limits. This is a limited supported integration ecosystem, not an automatic entitlement for any custom GitHub Pages site. Supported open-source tooling is another path to investigate for a local agent. We have not established this site's eligibility or implemented that authorization.
- **OpenAI API:** A conventional custom API integration has separate billing and authorization. A Plus subscription alone is not a generic API credential. Any paid API path needs an explicit budget and a private server-side key.
- **Learning data access:** Regardless of model access, the agent needs an explicitly authorized source for your private learning record. Signing in does not create that data connection.

Use the interactive pack workflow with your current Plus account first. Do not copy session cookies or account tokens into the site, scrape the ChatGPT UI as a backend, or publish a model API key. GitHub Pages can host the public reader, but cannot securely hold a secret server credential.

Official references, reviewed November 4, 2026:

- [Sign in with ChatGPT](https://help.openai.com/en/articles/20001410-sign-in-with-chatgpt)
- [Using a ChatGPT plan in other apps/sites](https://help.openai.com/en/articles/20001542-using-your-chatgpt-plan-in-other-apps-and-sites)
- [Separate ChatGPT and API billing](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform)

## Recurring review

Start with short daily recall and a longer weekly mixed application session once a reliable data connection exists. Select due topics and weaknesses; include occasional previously strong topics. Do not infer forgetting merely because a review was skipped.

A ChatGPT scheduled reminder can prompt you to open an interactive review. A task cannot automatically see this browser's localStorage or a local vault. Current OpenAI documentation specifically says a task in a project cannot access uploaded or project-stored files. Uploading a pack to a Project therefore does not by itself make a recurring task aware of your changing progress.

For automatic content-aware reviews, verify that the selected scheduled runtime can read the approved private record and write results using a supported connector or local agent. Do not assume an arbitrary private endpoint or connector is available to every task. Have it report the state version it actually read and stop if unavailable or stale. Keep grade confirmation before an assessment becomes accepted evidence, especially during initial calibration.

- [Official scheduled-task capabilities and limitations](https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt)

## Later automatic architecture

| Component | Responsibility |
| --- | --- |
| Public GitHub Pages site | Lessons, source references, practice UI |
| Private learning store | Canonical status snapshots and append-only review events |
| Authenticated sync service | User-scoped reads/writes, validation, revisions, conflict detection |
| Obsidian adapter | Materialize Markdown views; ingest deliberately supported note fields |
| Review agent | Read due topics and history, ask questions, propose scored events |
| Scheduler | Trigger reminders or supported agent work at chosen cadence |

For a local-first implementation, choose a private vault folder and use an explicitly authorized local agent/bridge limited to that folder. Obsidian stores Markdown on disk and refreshes external changes. A local process can maintain a structured state file and generate views; it still needs a secure route for a mobile browser to access the same state. Do not expose an unauthenticated local file server to the internet.

For reliable computer/mobile sync, a small authenticated private backend is more suitable than relying on browser storage plus two-way Markdown edits. Maintain append-only event IDs, revision checks for status/notes, timestamps, content versions, deduplication, backup, and a deletion policy. Derive mastery views from events; retain original assessments and corrections. Use a real sign-in flow for that backend, distinct from permission to use a model provider.

Do not put private progress in this public repository, a public Gist, a Pages JSON file, or a public URL with only an obscure filename. A separate private repository can hold snapshots for an authorized agent, but rapid multi-device editing still needs conflict handling and a suitable authenticated client.

- [How Obsidian stores data](https://obsidian.md/help/data-storage)

Before implementing live sync, decide the actual vault location, mobile sync method, canonical private store, supported agent runtime/model authentication, and review cadence/time zone. No vault location or credentials should be guessed.
