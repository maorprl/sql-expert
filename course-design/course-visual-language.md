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

## 2. Completed Steps

Completed steps should remain visible and reviewable, but be visually quieter than the current activity. They should be compact, preserve the original question, learner answer, and completion state, and support review without competing with the active step.

Completion should feel like progress, not like another active task.

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

## 8. Attention choreography and evidence locality

Visual hierarchy should change as the learner's task changes. Persistent elements such as the Business Request, Working Schema, editors, and completed work do not have a fixed visual rank throughout a stage.

The active reasoning or action surface should lead; established artifacts should shift into reference roles when appropriate. In Stage 1, for example, the Working Schema can be central while the learner establishes the relationship, then become secondary when a Baseline measurement, JOIN explanation, SQL implementation, result inspection, or final verification becomes the current task.

When a learner action produces evidence that must be interpreted immediately, keep the action, resulting evidence, and immediate interpretation spatially associated enough to read as one continuous reasoning cycle. Avoid unnecessary left-right or top-bottom jumps that make the learner search for the next action after producing evidence.

A transition control should normally appear near the evidence or action from which the next step directly follows, unless another placement has a stronger pedagogical reason.

## 9. Stage 1 as Calibration Specimen

Stage 1 tests and refines this visual language. The language should be reusable, but is not yet a complete system for every future stage. Do not over-generalize from Stage 1 to future concepts that have not yet been designed.

## 10. Locked Pedagogy

Visual changes must not silently alter learner flow, question intent, answer logic, concept timing, SQL reasoning, hint logic, solution logic, or stage completion logic.

Where the current pedagogical authority explicitly changes learner-facing wording, answer distinctions, feedback behavior, evidence handling, or interaction sequencing, visual implementation should follow that updated authority rather than preserve stale copy for its own sake.

Visual design supports the pedagogy. It does not redefine it.

## 11. Working Schema Capacity

The Working Schema must allow the learner to keep up to four selected relations available concurrently for inspection and reasoning. Four is a workspace capacity ceiling, not a pedagogical target or expected task size. The number of relations required by a task is determined by that task; Working Schema capacity is independent of that number and of the relational operation being learned or used.
