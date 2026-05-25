## What is a Unix Timestamp?

A Unix timestamp (or epoch time) is the number of seconds since **January 1, 1970 00:00:00 UTC** — the Unix Epoch.

### Why 1970?
Unix developers picked it as a convenient reference point. Everything before is negative, everything after is positive.

### Common Formats

| Format | Example |
|--------|---------|
| Seconds | 1711234567 |
| Milliseconds | 1711234567000 |
| ISO 8601 | 2024-03-23T21:36:07Z |
| Human | March 23, 2024, 9:36 PM |

### Why Timestamps Matter
- Databases use them as primary keys
- APIs exchange timestamps for synchronization
- Logs use timestamps for debugging
- JWT tokens contain `iat` (issued at) and `exp` (expires) timestamps

### The Year 2038 Problem
32-bit systems store timestamps as signed integers. The maximum value is 2,147,483,647 — which is January 19, 2038. After that, timestamps will overflow and wrap back to 1901.

> Use 64-bit timestamps to avoid the Y2038 problem.

[Convert Timestamps Now →](/tools/timestamp-converter)
