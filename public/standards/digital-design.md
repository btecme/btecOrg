---
title: Digital Design Standards
description: Practical principles for clear, responsive, accessible and reliable digital products.
reviewed: "2026-11-12"
---

# Digital Design Standards

Practical guidance for clear, responsive, reliable digital products.
Scope: websites, dashboards, app interfaces, and their supporting APIs.
Public edition. Last reviewed: 2026-11-12.

## Principles

These standards put [First Principles](https://www.b-tec.org/first-principles) into practice:

- [Start With Reality](https://www.b-tec.org/first-principles#start-with-reality): measure before adding complexity.
- [Prefer Simplicity, Not Simplism](https://www.b-tec.org/first-principles#prefer-simplicity-not-simplism): simple design, one authoritative reference.
- [Transparency](https://www.b-tec.org/first-principles#transparency): honest states, verified outcomes.
- [Design for Change and Failure](https://www.b-tec.org/first-principles#design-for-change-and-failure): recoverable, maintainable systems.

Accessibility remains a requirement throughout the standards below.

## Using these standards

This document defines our digital design standards. For the complete collection, see
[Standards](https://www.b-tec.org/standards). UI work must apply
[UI responsiveness](ui-responsiveness.md); supporting API changes must also apply the
[API architecture and scalability standard](api-architecture-scalability.md).
People and digital agents can use the same guidance to identify the requirements relevant
to a project.

A standard describes intended practice, not proof that an existing product implements it.
Apply it to new work and relevant edits; verify affected behavior before claiming adoption.

## Sections and current coverage

| Section | Current guidance | Coverage |
|---|---|---|
| Foundations | [Principles](#principles) | Simplicity, honest state, resilience, measured decisions, and one source of truth. |
| Responsiveness and interaction | [UI responsiveness](ui-responsiveness.md#interaction-contract) and [pattern selection](ui-responsiveness.md#choose-the-pattern-that-removes-the-actual-friction) | Pending/confirmed/error states, preserved work, duplicate/stale-response protection, and purposeful microinteractions. |
| Responsive layout and typography | [Layout stability](ui-responsiveness.md#accessibility-and-resilience-are-part-of-responsiveness) | Dedicated viewport, spacing, and type-scale guidance is future work; no shared numerical specification is adopted here. |
| Accessibility | [Accessibility and resilience](ui-responsiveness.md#accessibility-and-resilience-are-part-of-responsiveness) | Keyboard/focus, status semantics, reduced motion, contrast, and non-color status. Broader accessibility guidance remains future work. |
| Performance and delivery | [Responsiveness](ui-responsiveness.md#purpose-and-scope), [bounded upload/prefetch](ui-responsiveness.md#early-upload-and-bounded-prefetch-use-an-existing-wait-safely), and [measurement](ui-responsiveness.md#default-acceptance-smoke-checks-for-ui-changes) | Reduce real latency and unnecessary work; broader delivery budgets remain future work. |
| API architecture and scalability | [API standard](api-architecture-scalability.md) | Select mechanisms for measured needs; define contracts, access controls, bounded work, and recovery. |
| Validation | [UI checks](ui-responsiveness.md#default-acceptance-smoke-checks-for-ui-changes) and [API verification](api-architecture-scalability.md#project-specific-verification) | Verify affected behavior; record measurements and unverified cases in project documentation. |

## Requirements, options, and evidence

- **Requirements:** apply each standard's correctness, access, accessibility/resilience,
  and verification safeguards within their stated scope.
- **Options:** select interaction patterns and architecture mechanisms for actual needs.
  Example timings, distances, and curves are not universal rules.
- **Future guidance:** coverage gaps are not silently adopted specifications.
- **Evidence:** distinguish observed behavior, estimates, source inspiration, and unverified
  claims. A social-media caption is not a technical specification or a performance result.

## Maintaining the documentation

These standards evolve as we learn from design, implementation, and real use. Revisions
should remain practical, linkable, and independent of any particular product or platform.
State what is required, what is optional, what remains future work, and what has actually
been verified. Keep product-specific implementation evidence with the product it describes.
