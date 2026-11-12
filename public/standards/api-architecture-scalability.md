---
title: API Architecture and Scalability Standard
description: Simple API choices, measured performance, bounded work and reliable recovery.
reviewed: "2026-11-12"
---

# API Architecture and Scalability Standard

Public edition. Last reviewed: 2026-11-12.
Entry point: [digital-design standards](digital-design.md).
Related: [UI responsiveness](ui-responsiveness.md), especially its
[interaction contract](ui-responsiveness.md#interaction-contract).

## Purpose and scope

Choose the simplest architecture that meets the actual product and operational need.
Apply this guide to new API decisions and relevant changes; it does not mandate migrations.
Keep an existing, adequate stack unless measured constraints justify added complexity.
Protocols are alternatives and complements, not successive levels of engineering maturity.
This is intended practice; verify implementation and runtime behavior for each product.
Keep project-specific contracts, budgets, decisions, and evidence in the project's docs.

## Measure before optimizing

- Define the affected user journey, workload, correctness needs, and expected growth.
- Establish a representative baseline before changing architecture; investigate emerging
  limits before production failure rather than waiting for something to break.
- Measure latency distribution (including tail latency), not just averages. Distinguish
  client/network time, server processing, database work, and time to usable UI where relevant.
- Compare request counts and payload sizes per completed journey; inspect server/database
  cost, query counts, connection load, and resource use where meaningful to the bottleneck.
- State environment, sample size, concurrency, cache state, and workload assumptions.
  Separate observed results from estimates; do not invent universal numerical budgets.
- First consider query/index fixes, pagination, bounded batching, compression, or caching
  when appropriate. Caches need explicit freshness, invalidation, and access boundaries.
- Compare before/after under comparable conditions, including correctness and operational
  cost. A faster transport does not fix inefficient queries or an overloaded dependency.

## Choose the mechanism for the need

| Mechanism | Useful when | Tradeoff / required consideration |
|---|---|---|
| REST / HTTP endpoints | Resource-oriented reads/writes and ordinary request/response flows | Default when adequate; aggregate or batch where useful, paginate and bound responses. |
| GraphQL | Clients genuinely need varied shapes or related data in one query | Validate query cost/depth and resolver access; avoid N+1 work. Neither fewer requests nor lower cost is automatic. |
| Webhooks | A service must notify another service asynchronously | Verify signatures, deduplicate deliveries, and support bounded retries and recovery. |
| SSE | A browser needs one-way server updates over a long-lived HTTP stream | Define reconnect/resume behavior, proxy compatibility, authorization, and cleanup. |
| WebSockets | Low-latency bidirectional interaction is genuinely required | Own connection lifecycle, recovery, ordering, backpressure, and capacity planning. |
| gRPC | Controlled service-to-service clients benefit from RPC and generated contracts | Check client/proxy compatibility and operational tooling; browsers may need an adapter. Performance is workload-dependent. |
| Composition / aggregation | A journey needs data from multiple services or endpoints | Can use REST, GraphQL, RPC, or other existing tools; bound fan-out and define partial failure behavior. |

Composition is an architectural pattern, not another wire protocol. Multiple mechanisms
may coexist. Introduce each only for a concrete requirement; keep the decision reversible
where practical and include ownership, deployment, observability, and maintenance cost.

## Contracts, security, and bounded work

- Authenticate callers and authorize each operation, object, tenant, field, or subscription
  as applicable across every transport. Connection establishment alone is not authorization.
  Define expiry/revocation handling for long-lived connections and subscription changes.
- Use appropriate encrypted transport and protect credentials. Do not put secrets in URLs,
  client bundles, logs, or error payloads; minimize logged personal data.
- Validate incoming parameters and payloads at trust boundaries; enforce bounded sizes,
  concurrency, rate limits, query complexity, and deadlines appropriate to the service.
- Maintain documented request/event schemas, error semantics, compatibility expectations,
  and a versioning/deprecation strategy. Plan additive and breaking changes deliberately.
  Generated types and schema validation do not guarantee business semantics or permissions.
- For writes, define idempotency, ordering/concurrency rules, and authoritative confirmation.
  A timeout may hide a successful write: reconcile or use idempotent retries, not blind replay.
- Bound retries with backoff and jitter where useful; honor server retry guidance and avoid
  retry storms. Propagate deadlines/cancellation where supported; report partial failures.
- Keep polling bounded in frequency, concurrency, and lifetime; back off after errors and
  stop when the result is final or the consumer is gone. Avoid overlapping stale polls.

## Delivery and connection recovery

- Webhooks: verify the provider's signature against the required raw body and trusted secret;
  enforce timestamp/replay checks where supported. Reject invalid deliveries before effects.
- Deduplicate by stable delivery/event identity with durable state as needed; make effects
  idempotent. Acknowledge only after durable acceptance, then process asynchronously if useful.
  Define retry limits, failed-delivery handling, inspection, and safe replay/reconciliation.
- SSE/WebSockets: close streams, sockets, listeners, and timers when no longer needed.
  Use bounded reconnect backoff, detect broken connections, and avoid duplicate subscriptions.
- Define event identity/order, duplicate handling, resume/replay or snapshot resynchronization,
  and behavior when history is unavailable. Do not assume reconnect restores missed events.
  Bound buffers and slow-consumer work; avoid unlimited queues or reconnect loops.
- Align UI state with the [interaction contract](ui-responsiveness.md#interaction-contract):
  expose pending/stale/disconnected states honestly, preserve work, reject obsolete responses,
  and never represent connection establishment as confirmation of a completed operation.

## Project-specific verification

Verify the mechanism actually changed, using representative non-sensitive data and the
project's existing tools where practical. No new harness is required for documentation alone.
Check normal, slow, failed, timed-out, and repeated operations; verify access denial and
cross-tenant isolation where applicable. Exercise pagination/query bounds and compatibility.
For webhooks, include invalid signatures, duplicates, retries, and failed processing recovery.
For streams/sockets, include disconnect, reconnect, missed events, cleanup, and slow consumers.
For composition, include a slow/failed dependency and bounded fan-out/partial results.
Record before/after measurements, observed limits, and unverified cases; claim scalability
only within the tested workload and environment. Preserve a practical rollback/recovery path.

## Source and evidence limit

Public-edition source inspiration: [Instagram reel DfAIT0IOcAq](https://www.instagram.com/reel/DfAIT0IOcAq/),
@_devoops (Devoops), dated 2026-10-27, “The 7 levels of APIs, explained with one food
delivery app.” Public caption/metadata verification identified REST, GraphQL, Webhooks,
SSE, WebSockets, gRPC, and Composition; no video or audio was reviewed.
Its closing “Start at level one. Climb only when something breaks.” is a rhetorical prompt,
not this standard's rule: measure need before failure and select alternatives/complements.
The caption is inspiration, not a specification authority or evidence of performance wins.
