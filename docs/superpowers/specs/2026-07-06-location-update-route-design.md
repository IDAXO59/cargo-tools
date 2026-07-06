# Location Update — Route Fields Design

## Purpose

The `location-update` tool currently resolves a single "current location" input
(ZIP / City,State / Apple or Google Maps link) into a team-chat message and shows
it as a single pin on a mini US map. This adds two more optional fields — Start
and End — so the tool can show a full route (start → current → end) on the map,
while keeping the copied message unchanged.

## Fields & Layout

Three stacked inputs in the input card, in route order:

1. **Start** (new, optional) — same input format/parsing as Current.
2. **Current location** (existing, required) — unchanged behavior: ZIP / City,State
   / Apple or Google Maps link (including the short-link and precise-pin fixes
   already shipped).
3. **End** (new, optional) — same input format/parsing as Current.

All three fields use the same `resolve()` parsing logic. Start and End may be
left blank; Current keeps today's required behavior (shake animation if empty
on submit).

One "Go" button resolves all three fields.

## Output Message

Unchanged: `Hi, team! Current location: {current}`. Start and End never appear
in the copied text — they exist only to drive the map visualization.

## Data Flow

- `resolve(raw)` is refactored to return `{ text, coords }` instead of writing
  to the module-level `lastCoords`. This is required because all three fields
  can resolve concurrently, and each needs its own coordinate pair — a shared
  mutable variable would let the last-resolved call clobber the others.
- `generate()`:
  1. Reads raw values from all three fields.
  2. For each non-empty field, calls `resolve(raw)` (wrapped to swallow
     per-field errors, same pattern as the existing short-link handling) and
     collects `{ text, coords }` or `null`.
  3. If Current is empty, shakes the input and stops (existing behavior).
  4. Builds the result text from Current's `text` only.
  5. Calls `showRouteMap({ start, current, end })` with whichever of the three
     results resolved successfully.

## Map Rendering

`showMiniMap` is generalized into `showRouteMap`:

- Each defined point gets a marker:
  - Start — gray circle.
  - End — green circle.
  - Current — primary-color circle with the existing pulsing `<animate>` ring.
- A polyline connects the defined points in order Start → Current → End,
  skipping any point that didn't resolve to coordinates. If fewer than two
  points have coordinates, no line is drawn (matches current single-point
  behavior when only Current resolves).
- State highlighting (`.map-state-active`) applies only to Current's state, as
  today — Start/End do not highlight their states, to avoid visual noise from
  three differently-colored state fills.

## Error Handling

Each field resolves independently. An unresolvable Start or End (e.g. a short
Maps link, per the existing `SHORT_LINK` error) simply contributes no marker or
line segment — it does not block Current from resolving or the message from
being generated. This mirrors the existing per-field error handling already in
`generate()`.

## Out of Scope

- Route distance/duration calculation.
- Curved/road-following route lines (straight-line polyline only, consistent
  with the mini map being a stylized, non-navigable SVG projection).
- Persisting Start/End between sessions.
