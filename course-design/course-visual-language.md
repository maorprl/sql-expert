# Course Visual Language Brief

## Status

WORKING

This document defines the initial visual language for the course, using Lesson 1 as the calibration specimen. Historical/internal repository naming may retain `Stage` identifiers.

It is not a full design system.

The goal is to make the course feel inviting, focused, and like a guided learning environment rather than an internal tool, admin interface, or developer console, while preserving the existing pedagogy and learner flow.

---

## 1. Current learner focus

The current learner activity should be the strongest visual focus on the page. In many states this will be the current reasoning prompt, but when the learner's immediate action is to run a prepared measurement, author SQL, inspect query results, or interpret produced evidence, the relevant tool or evidence surface may become the primary action surface.

The page should make clear what the learner is expected to attend to and act on now. Completed work and supporting references should remain visually quieter than that current activity.

Visual hierarchy is compositional, not only component-level. It is not enough for the current task, teacher guidance, completed history, and supporting references to each have individually distinct styling if the page composition still makes their roles compete or forces the learner to search for the active task. Their placement, scale, and grouping should make the current learner focus legible as the organizing center of the screen.

## 2. Completed Steps

Completed steps should remain visible and reviewable, but be visually quieter than the current activity. They should be compact, preserve the original question, learner answer, and completion state, and support review without competing with the active step.

Completion should feel like progress, not like another active task.

Reviewability does not require completed work to occupy the primary learner lane. If completed work would displace the current task from the active workspace, separate the task from its tool, or force the learner to scan past history before acting, completed work should move to a secondary placement or treatment while remaining available for review. The exact UI mechanism is not prescribed here.

This applies to ordinary reasoning states as well as tool-led or authoring states. As completed history accumulates, it must not become the dominant first scan path merely because earlier steps are listed before the current one. The current learner task should remain directly reachable without requiring the learner to visually traverse the completed history first.

## 3. Concept Moments

New concepts such as Grain, Primary Key / Foreign Key, Cardinality, and JOIN should have a distinct visual treatment. They should clearly signal that a new idea has just been named, have stronger hierarchy than normal feedback, use dedicated spacing and surface treatment, and separate learning from success.

Concept treatment should attach terminology to meaning the learner has just established rather than make the terminology itself the prerequisite for understanding the task.

## 4. Color Roles

Green primarily represents correct answers, successful completion, and positive validation. A separate accent color represents new concepts, instructional emphasis, learning transitions, and visual explanations. Concepts should not rely on green as their main identity.

The overall palette should contribute to an inviting learning experience, not merely encode states. It should feel calm and approachable while maintaining readable contrast and clear semantic color roles.

## 5. SQL Teaching vs SQL Workspace

SQL teaching—syntax patterns, short explanations, and worked structural examples—should feel like instructional content. The SQL workspace—editor, execution controls, and results—should feel like tools used by the learner.

These roles are distinct but their visual prominence is contextual. Before learner-authored SQL, the teaching explanation should lead and the workspace should not compete for primary attention. Once implementation becomes the learner's current action, the editor may and should become the primary action surface. After execution, the returned result may become the primary evidence surface for inspection and verification.

Interaction structure and visual tone are separate concerns: changing how the experience feels must not silently change its learning sequence or behavior.

## 6. Typography, Spacing, and Surfaces

Use clear hierarchy rather than many visually similar bordered rectangles. Prioritize readable line length, comfortable line height, clear section spacing, strong distinction between headings, prompts, feedback, concepts, and tools, restrained borders, and clear surface hierarchy.

Avoid making every block look equally important. A persistent artifact may remain visible while becoming visually secondary when it is no longer the learner's current action surface.

## 7. Visual Aids

Visual aids are explanatory rather than decorative. They appear only when they clarify a relational idea, are local to the concept they support, reinforce reasoning after learner engagement, and do not give away answers prematurely.

When an explanation contains multiple conceptual layers, visual treatment should support the intended instructional sequence rather than expose all layers as equal-priority content at first sight.

A relationship visual must spatially represent the relationship it claims to explain. Connector endpoints should correspond to the actual related fields, Cardinality markers or directional annotations must agree with the semantic relationship and the layout being shown, and annotations must not overlap the relation cards in a way that makes the relationship ambiguous.

Cardinality notation should read immediately as part of the relationship representation rather than as arbitrary floating text attached to a line. The `1` and `M` roles, or any equivalent notation, should be visually associated with the relevant relationship endpoints strongly enough that the learner can interpret the one-to-many meaning without first decoding the layout.

Learner-facing symbols and metaphors must not imply a relational operation, identity, equivalence, arithmetic, or other semantic claim that is not true. Use direct relational explanation when a metaphor would distort the mechanism. This is a proportional precision rule, not a ban on all symbols or metaphors; the exact local visual remains an implementation decision when it preserves the correct meaning.

## 8. Attention choreography and evidence locality

Visual hierarchy should change as the learner's task changes. Persistent elements such as the Business Request, Working Schema, editors, and completed work do not have a fixed visual rank throughout a Lesson.

The active reasoning or action surface should lead; established artifacts should shift into reference roles when appropriate. In Lesson 1, for example, the Working Schema can be central while the learner establishes the relationship, then become secondary when a Baseline measurement, JOIN explanation, SQL implementation, result inspection, or final verification becomes the current task.

When a learner action produces evidence that must be interpreted immediately, keep the action, resulting evidence, and immediate interpretation spatially associated enough to read as one continuous reasoning cycle. Avoid unnecessary left-right or top-bottom jumps that make the learner search for the next action after producing evidence.

Primary attention may legitimately shift between the learner-response lane and a tool, object, or evidence surface as the learner's role changes. That change in visual prominence does not relocate the learner-response role itself: on the current multi-lane course surface, learner-facing reasoning and verification responses remain anchored to the learner-response lane under Section 15. A handoff should make the new active tool or evidence surface obvious without making the learner hunt for where questions, checking, feedback, or progression controls have moved.

When action moves between instructional guidance and an active work surface, visual focus moves with the active task. The active guidance and active work surface should read as the same current moment, with the active work surface receiving the strongest relevant visual priority. Previous or reference areas remain available but visually secondary. This does not prescribe dimming, borders, motion, animation, a universal component pattern, or another specific treatment.

During active authoring, the current task, the authoring tool, and references needed to perform that task should read as one coherent working area. A supporting reference may be visually secondary, but it should remain practically available without requiring the learner to leave the authoring context.

A transition control should normally appear near the learner-response feedback or completed reasoning move from which the next step follows. Tool-execution controls remain local to the tool they execute. Section 15 defines the stable ownership of these roles.

## 9. Teacher guidance voice

Instructional guidance has a visual role distinct from the learner's task prompt, system or status text, correctness feedback, and Concept Moments.

Concise bridges that explain why the next reasoning move matters, and explicit teacher-led explanations such as the JOIN teaching sequence, should be visually recognizable as guidance from the course rather than appearing as undifferentiated body copy.

The distinction must be perceptible at a glance. Guidance should not look like a subdued neutral note, status message, or incidental annotation that can be visually skipped without noticing that the course is actively orienting the learner. It should have enough salience to register as a teacher intervention while remaining subordinate to the learner's current task or evidence surface when that task is primary.

This does not mean that every explanatory sentence should receive a special treatment. The distinct guidance role is reserved for text that actively orients the learner through the reasoning journey or explains a concept before the learner acts. The exact visual treatment remains an implementation decision, but the role should be applied consistently enough that the learner can recognize it across the Lesson.

## 10. Cross-encounter visual consistency

Equivalent learner roles should use a consistent visual language across encounters unless a real pedagogical difference requires a different treatment.

For example, when two encounters both place the learner in active SQL authoring, the editor, execution controls, supporting Working Schema reference, completed-work treatment, and local assistance should read as the same course tool and interaction role. Likewise, Business Requests, current reasoning tasks, Concept Moments, result evidence, and completed history should preserve recognizable role-level treatment across encounters.

Consistency does not require pixel-identical screens or identical scaffolding. A later encounter may contain different content, evidence, controls, or support because its pedagogical role differs. Visual divergence should reflect that learner-role difference rather than historical implementation layers, encounter-specific CSS drift, or arbitrary styling choices.

Shared visual behavior should therefore be implemented from a clear common source where practical, while encounter-local styling should be reserved for genuine encounter-specific needs. This is an implementation constraint in service of visual consistency, not a requirement to create a separate design-system layer.

## 11. Lesson 1 as Calibration Specimen

Lesson 1 tests and refines this visual language. The language should be reusable, but is not yet a complete system for every future Lesson. Do not over-generalize from Lesson 1 to future concepts that have not yet been designed.

## 12. Locked Pedagogy

Visual changes must not silently alter learner flow, question intent, answer logic, concept timing, SQL reasoning, hint logic, solution logic, or Lesson completion logic.

Where the current pedagogical authority explicitly changes learner-facing wording, answer distinctions, feedback behavior, evidence handling, or interaction sequencing, visual implementation should follow that updated authority rather than preserve stale copy for its own sake.

Visual design supports the pedagogy. It does not redefine it.

## 13. Working Schema Capacity

The Working Schema must allow the learner to keep up to four selected relations available concurrently for inspection and reasoning. Four is a workspace capacity ceiling, not a pedagogical target or expected task size. The number of relations required by a task is determined by that task; Working Schema capacity is independent of that number and of the relational operation being learned or used.

## 14. Course controls and local assistance

Global course controls are visually distinct from Lesson-local task content. They belong to a stable course-shell layer rather than appearing as another scaffold, disclosure, or action inside the current reasoning card or SQL task.

Their role and behavior are defined in `course-design/course-controls.md`.

The control layer should remain easy to find and consistent across Lessons where a global control is available, while staying visually subordinate to the learner's current task, evidence, or authoring surface.

Inter-Lesson Previous / Next and Retry / Redo should therefore read as course-level actions rather than as content generated by the current Lesson. `Show solution` is not part of that persistent global layer: where available, it is local SQL-workspace assistance and should use a consistent secondary treatment across applicable SQL authoring tasks. Exact placement, grouping, responsive treatment, and visual styling remain implementation decisions within the role boundaries established in `course-design/course-controls.md`.

## 15. Interaction topology and locality contract

The current course surface uses stable learner-response and workspace/evidence roles. Visual prominence may change as the learner moves from reasoning to object interaction, measurement, authoring, evidence inspection, or verification, but those changes in prominence must not make the learner-response role jump between page regions.

### 15.1 Stable learner-response lane

On the current multi-lane course surface, the learner-response lane is the stable home for learner-facing reasoning and verification interactions.

For those interactions, the following elements remain together in that lane:

- the actionable learner prompt or question;
- answer choices or other response controls that are not themselves direct manipulation of a workspace object;
- `Check` or equivalent answer-submission control;
- response-specific corrective and success feedback;
- Concept Moment or reused-concept consequence that follows that reasoning move;
- `Continue`, `Complete lesson`, or another local progression control that follows the completed reasoning move.

This ownership does not alternate between lanes because a runtime state changes, because another surface becomes visually primary, or because the evidence being inspected is displayed elsewhere. Equivalent learner-response roles across Lessons follow the same spatial pattern.

### 15.2 Workspace, object, tool, and evidence lane

The workspace/evidence lane owns the surfaces the learner manipulates or inspects as working material. On the current course surface this includes, as applicable:

- Working Schema and direct field/relation manipulation inside it;
- prepared measurement editors;
- SQL editor and SQL-authoring assistance;
- tool-execution controls such as `Run query`;
- Results and other produced evidence;
- SQL diagnostics and other feedback whose meaning is specifically about tool execution rather than the learner's reasoning answer.

Direct manipulation remains local to the object being manipulated. For example, the learner may click a Working Schema field in the workspace/evidence lane while the question, Check, reasoning feedback, and Continue remain in the learner-response lane. The selected state of the object should remain visible on the object so the two regions read as one coordinated task.

Likewise, Results remain in the workspace/evidence lane while a verification question and its answer controls remain in the learner-response lane. The layout must keep the relevant evidence visible and practically inspectable from that stable response position; evidence locality is achieved through adjacency, alignment, prominence, and focus choreography rather than by relocating the response role beside the evidence.

### 15.3 Feedback ownership

Reasoning feedback belongs with the learner-response interaction in the learner-response lane. A wrong answer, correct answer, explanatory consolidation, or Concept Moment that follows a reasoning response must not appear in another lane merely because the response depends on a schema object or evidence surface.

Tool feedback belongs with the tool. SQL syntax/execution diagnostics, prepared-measurement execution errors, and comparable tool-state messages remain local to the editor, Run control, Results, or other tool surface that produced them.

Directly manipulated workspace objects may show local selection, hover, focus, validity, or relationship state. Those object states support the interaction but do not take ownership of the learner-facing reasoning feedback.

### 15.4 Transition controls

Local reasoning progression controls stay with the learner-response role. `Continue`, `Complete lesson`, verification progression, and equivalent controls that follow reasoning feedback remain in the learner-response lane and must not alternate between page regions as different states use different runtime containers.

Tool controls remain local to the tool they execute. `Run query`, editor assistance, and comparable tool actions therefore stay in the workspace/evidence lane.

Course-shell inter-Lesson Previous / Next navigation is exempt from this rule because it has a persistent navigation role defined separately in `course-design/course-controls.md`.

### 15.5 Persistent references and responsive ordering

The Business Request, Working Schema, Live Schema, and Completed Steps may change visual prominence as their pedagogical role changes. A change in prominence is not automatically a change in location or ownership.

Working Schema may be an active object-interaction surface in one state and a quieter reference in another. Its treatment may change accordingly, but this does not move the learner-response role into or out of the Working Schema.

Completed Steps are review history, not the primary navigation mechanism. They must remain reviewable while staying visually quieter than the current task. On stacked or narrow layouts, Completed Steps must not be inserted between the current learner-response task and the active tool or evidence surface needed to perform that task. Their accumulated or expanded size must not force the learner to traverse review history to reach the active editor, Results, Working Schema, or other required workspace surface.

### 15.6 Phase handoffs without response-role relocation

A genuine phase handoff may move the learner's primary attention from reasoning to teaching, direct object manipulation, measurement, authoring, evidence inspection, or verification. The active tool or evidence surface may therefore become the strongest visual focus.

Within the current course interaction model, a phase handoff changes attention and prominence; it does not relocate the learner-response role. A valid handoff requires all of the following:

1. the learner role actually changes;
2. the new primary tool, object, teaching, or evidence surface is visually signaled before or as it takes focus;
3. the learner-response lane remains recognizable and predictable when a question, checking action, reasoning feedback, or local progression control is present;
4. the previous surface remains understandable as completed work or supporting reference;
5. the learner is not required to hunt across the page for the next control, question, tool, or evidence;
6. equivalent handoffs use a consistent course-wide pattern.

A layout must not treat every state transition as a phase handoff. If a future encounter genuinely requires a different response-location model, that exception must be established explicitly in current course and encounter authority before implementation; it must not be inferred from a state change, tool prominence, or evidence locality.

### 15.7 Coherent ownership of spatial behavior

Course-wide spatial behavior should remain coherent across Lessons. This is a conformance requirement, not a mandate to introduce generalized components or a new shared-component architecture. Lesson-specific CSS or DOM behavior should represent genuine encounter-specific differences rather than conflicting role ownership.

The same learner-facing object must not receive conflicting placement rules from the base layout, shared state CSS, encounter CSS, and runtime DOM reparenting without an explicit precedence contract. If implementation requires such competing ownership, treat that as a design/conformance defect to resolve rather than a normal styling technique.

### 15.8 Transition-level validation

Visual validation must inspect the learner journey transition by transition, not only isolated representative screenshots.

For every material state transition, validation should record at minimum:

- learner-response-lane prompt, response, feedback, and progression-control state before and after;
- active tool, object, or evidence location and visual prominence before and after;
- whether required evidence remains practically inspectable from the stable learner-response position;
- Working Schema / reference role;
- Completed Steps treatment and ordering;
- whether any learner-response element changed page region despite the stable-lane contract.

A state may look internally coherent and still fail this contract if entering or leaving it relocates the learner-response role, separates the current task from a required tool/evidence surface, or makes the learner hunt for the next action.
