# Course Visual Language Brief

## Status

WORKING

This document defines the initial visual language for the course, using Stage 1 as the calibration specimen.

It is not a full design system.

The goal is to make the course feel inviting, focused, and like a guided learning environment rather than an internal tool, admin interface, or developer console, while preserving the existing pedagogy and learner flow.

---

## 1. Current Step

The current learner step should be the strongest visual focus on the page. It should have clear spacing and hierarchy, feel active and intentional, avoid looking like a generic form section, and keep the learner’s attention on the current reasoning task.

The current step should visually dominate completed steps and supporting tools.

## 2. Completed Steps

Completed steps should remain visible and reviewable, but be visually quieter than the current step. They should be compact, preserve the original question, learner answer, and completion state, and support review without competing with the active step.

Completion should feel like progress, not like another active task.

## 3. Concept Moments

New concepts such as Grain, Primary Key / Foreign Key, Cardinality, and JOIN should have a distinct visual treatment. They should clearly signal that a new idea has just been named, have stronger hierarchy than normal feedback, use dedicated spacing and surface treatment, and separate learning from success.

## 4. Color Roles

Green primarily represents correct answers, successful completion, and positive validation. A separate accent color represents new concepts, instructional emphasis, learning transitions, and visual explanations. Concepts should not rely on green as their main identity.

The overall palette should contribute to an inviting learning experience, not merely encode states. It should feel calm and approachable while maintaining readable contrast and clear semantic color roles.

## 5. SQL Teaching vs SQL Workspace

SQL teaching—syntax patterns, short explanations, and worked structural examples—should feel like instructional content. The SQL workspace—editor, execution controls, and results—should feel like tools used by the learner. The workspace supports the lesson rather than dominating it.

Interaction structure and visual tone are separate concerns: changing how the experience feels must not silently change its learning sequence or behavior.

## 6. Typography, Spacing, and Surfaces

Use clear hierarchy rather than many visually similar bordered rectangles. Prioritize readable line length, comfortable line height, clear section spacing, strong distinction between headings, prompts, feedback, concepts, and tools, restrained borders, and clear surface hierarchy.

Avoid making every block look equally important.

## 7. Visual Aids

Visual aids are explanatory rather than decorative. They appear only when they clarify a relational idea, are local to the concept they support, reinforce reasoning after learner engagement, and do not give away answers prematurely.

### Locked Stage 1 Requirement

After the learner correctly reasons about cardinality in Step 4, Stage 1 must include a small visual aid that reinforces:

- `company.company_id` as the primary key
- `funding_round.company_id` as the foreign key
- `company 1 → M funding_round`

This visual aid is a pedagogical requirement. Its treatment follows this visual language. Do not use a Venn diagram.

## 8. Stage 1 as Calibration Specimen

Stage 1 tests and refines this visual language. The language should be reusable, but is not yet a complete system for every future stage. Do not over-generalize from Stage 1 to future concepts that have not yet been designed.

## 9. Locked Pedagogy

Visual changes must not alter learner flow, question wording, answer options, concept wording, SQL reasoning, hint logic, solution logic, or stage completion logic.

Visual design supports the pedagogy. It does not redefine it.
