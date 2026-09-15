# Course Visual Language Brief

## Status

WORKING

This document defines the initial visual language for the course, using Stage 1 as the calibration specimen.

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

## 8. Attention choreography and evidence locality

Visual hierarchy should change as the learner's task changes. Persistent elements such as the Business Request, Working Schema, editors, and completed work do not have a fixed visual rank throughout a stage.

The active reasoning or action surface should lead; established artifacts should shift into reference roles when appropriate. In Stage 1, for example, the Working Schema can be central while the learner establishes the relationship, then become secondary when a Baseline measurement, JOIN explanation, SQL implementation, result inspection, or final verification becomes the current task.

When a learner action produces evidence that must be interpreted immediately, keep the action, resulting evidence, and immediate interpretation spatially associated enough to read as one continuous reasoning cycle. Avoid unnecessary left-right or top-bottom jumps that make the learner search for the next action after producing evidence.

When the primary learner activity legitimately moves between page regions, the handoff should be visually legible. The learner should not experience the active questionnaire or action surface as simply jumping between columns without a clear change in role or reasoning phase.

During active authoring, the current task, the authoring tool, and references needed to perform that task should read as one coherent working area. A supporting reference may be visually secondary, but it should remain practically available without requiring the learner to leave the authoring context.

A transition control should normally appear near the evidence or action from which the next step directly follows, unless another placement has a stronger pedagogical reason.

## 9. Teacher guidance voice

Instructional guidance has a visual role distinct from the learner's task prompt, system or status text, correctness feedback, and Concept Moments.

Concise bridges that explain why the next reasoning move matters, and explicit teacher-led explanations such as the JOIN teaching sequence, should be visually recognizable as guidance from the course rather than appearing as undifferentiated body copy.

The distinction must be perceptible at a glance. Guidance should not look like a subdued neutral note, status message, or incidental annotation that can be visually skipped without noticing that the course is actively orienting the learner. It should have enough salience to register as a teacher intervention while remaining subordinate to the learner's current task or evidence surface when that task is primary.

This does not mean that every explanatory sentence should receive a special treatment. The distinct guidance role is reserved for text that actively orients the learner through the reasoning journey or explains a concept before the learner acts. The exact visual treatment remains an implementation decision, but the role should be applied consistently enough that the learner can recognize it across the stage.

## 10. Cross-encounter visual consistency

Equivalent learner roles should use a consistent visual language across encounters unless a real pedagogical difference requires a different treatment.

For example, when two encounters both place the learner in active SQL authoring, the editor, execution controls, supporting Working Schema reference, completed-work treatment, and local assistance should read as the same course tool and interaction role. Likewise, Business Requests, current reasoning tasks, Concept Moments, result evidence, and completed history should preserve recognizable role-level treatment across encounters.

Consistency does not require pixel-identical screens or identical scaffolding. A later encounter may contain different content, evidence, controls, or support because its pedagogical role differs. Visual divergence should reflect that learner-role difference rather than historical implementation layers, encounter-specific CSS drift, or arbitrary styling choices.

Shared visual behavior should therefore be implemented from a clear common source where practical, while encounter-local styling should be reserved for genuine encounter-specific needs. This is an implementation constraint in service of visual consistency, not a requirement to create a separate design-system layer.

## 11. Stage 1 as Calibration Specimen

Stage 1 tests and refines this visual language. The language should be reusable, but is not yet a complete system for every future stage. Do not over-generalize from Stage 1 to future concepts that have not yet been designed.

## 12. Locked Pedagogy

Visual changes must not silently alter learner flow, question intent, answer logic, concept timing, SQL reasoning, hint logic, solution logic, or stage completion logic.

Where the current pedagogical authority explicitly changes learner-facing wording, answer distinctions, feedback behavior, evidence handling, or interaction sequencing, visual implementation should follow that updated authority rather than preserve stale copy for its own sake.

Visual design supports the pedagogy. It does not redefine it.

## 13. Working Schema Capacity

The Working Schema must allow the learner to keep up to four selected relations available concurrently for inspection and reasoning. Four is a workspace capacity ceiling, not a pedagogical target or expected task size. The number of relations required by a task is determined by that task; Working Schema capacity is independent of that number and of the relational operation being learned or used.

## 14. Course controls and local assistance

Global course controls are visually distinct from Stage-local task content. They belong to a stable course-shell layer rather than appearing as another scaffold, disclosure, or action inside the current reasoning card or SQL task.

Their role and behavior are defined in `course-design/course-controls.md`.

The control layer should remain easy to find and consistent across Stages where a global control is available, while staying visually subordinate to the learner's current task, evidence, or authoring surface.

Back and Retry / Redo should therefore read as course-level actions rather than as content generated by the current Stage. `Show solution` is not part of that persistent global layer: where available, it is local SQL-workspace assistance and should use a consistent secondary treatment across applicable SQL authoring tasks. Exact placement, grouping, responsive treatment, and visual styling remain implementation decisions within the role boundaries established in `course-design/course-controls.md`.

## 15. Interaction topology and locality contract

The course must preserve recognizable spatial roles across the learner journey. Visual prominence may change, but prominence changes must not be implemented by arbitrarily relocating learner-facing roles between page regions.

### 15.1 Stable learner-response anchor

The current learner prompt, its response controls, answer checking, and response-specific corrective feedback form one learner-response role. On layouts with multiple stable lanes, this role should remain anchored to a predictable learner-response region across ordinary reasoning states.

A change in pedagogical phase may legitimately change which surface is visually primary, but primary-surface emphasis does not by itself authorize moving the learner-response role to another column. If a learner-response surface changes page region, the change must correspond to a real role change, be supported by the encounter authority, and use a visually legible handoff. A state change alone is not sufficient justification.

Equivalent learner-response roles across encounters should follow the same spatial pattern unless an encounter-specific pedagogical requirement explicitly requires otherwise.

### 15.2 Tool and evidence locality

Tools and evidence remain local to the action they support. A prepared measurement, SQL authoring action, execution control, returned result, or other evidence surface may become visually primary without taking ownership of unrelated learner-response content.

When an action immediately produces evidence that the learner must interpret, the relevant control, evidence, and immediate interpretation must be close enough to read as one cycle. Large empty regions, unrelated panels, or cross-column travel must not separate a small piece of evidence from the question that interprets it.

If the learner's interaction is directly with an object such as a Working Schema field, the check and corrective feedback for that object should remain local to that interaction unless a stronger learner-experience reason requires otherwise.

### 15.3 Feedback ownership

Corrective feedback belongs to the learner action or response that caused it. Correctness feedback, validation feedback, SQL diagnostics, and evidence-interpretation feedback should appear with the relevant question, control, editor, schema interaction, or result context rather than in a generic distant feedback area.

Feedback may consolidate a completed reasoning move and bridge to the next one, but it must not force the learner to search another page region to discover whether the action they just took was accepted or how to correct it.

### 15.4 Transition controls

A `Continue`, verification transition, or equivalent local progression control should remain near the feedback, evidence, or completed action from which the next step follows. Transition controls must not alternate between page regions merely because different runtime states use different containers.

Course-shell navigation such as Back / Forward or chapter navigation is exempt from this rule because it has a persistent navigation role defined separately in `course-design/course-controls.md`.

### 15.5 Persistent references

The Business Request, Working Schema, Live Schema, and Completed Steps may change visual prominence as their pedagogical role changes. A change in prominence is not automatically a change in location.

Working Schema may be an active interaction surface in one state and a quieter reference in another. Its treatment may change accordingly, but relocation should occur only when it materially improves the current task and does not cause the learner's primary question or action to jump unpredictably.

Completed Steps are review history, not the primary navigation mechanism. They must remain reviewable while staying visually quieter than the current task, and their accumulated size must not force the active learner interaction into a different spatial pattern.

### 15.6 Phase handoffs

A genuine phase handoff may move the learner's primary attention from reasoning to teaching, authoring, evidence inspection, or verification. A valid handoff requires all of the following:

1. the learner role actually changes;
2. the new primary surface is visually signaled before or as it takes focus;
3. the previous surface remains understandable as completed work or supporting reference;
4. the learner is not required to hunt across the page for the next control or question;
5. equivalent handoffs use a consistent course-wide pattern.

A layout must not treat every state transition as a phase handoff.

### 15.7 Single ownership of spatial behavior

Course-wide spatial behavior should have one clear shared implementation owner where practical. Stage-specific CSS or DOM relocation should be reserved for real encounter-specific differences, not used as another layer of general layout control.

The same learner-facing object must not receive conflicting placement rules from the base layout, shared state CSS, encounter CSS, and runtime DOM reparenting without an explicit precedence contract. If implementation requires such competing ownership, treat that as a design/conformance defect to resolve rather than a normal styling technique.

### 15.8 Transition-level validation

Visual validation must inspect the learner journey transition by transition, not only isolated representative screenshots.

For every material state transition, validation should record at minimum:

- current learner prompt / response location before and after;
- active tool or evidence location before and after;
- feedback location;
- transition-control location;
- Working Schema / reference role;
- Completed Steps treatment;
- whether any page-region move represents a justified phase handoff or an unexplained jump.

A state may look internally coherent and still fail this contract if entering or leaving it causes an unjustified spatial jump.
