## UUID vs GUID: What's the Difference?

UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are essentially the same thing. Microsoft calls them GUIDs; everyone else calls them UUIDs.

A UUID looks like: `550e8400-e29b-41d4-a716-446655440000`

### UUID Versions

| Version | How It's Generated | Collision Risk |
|---------|-------------------|:---:|
| v1 | Timestamp + MAC address | None |
| v4 | Random | Almost none |
| v5 | SHA-1 hash of namespace + name | None |

### When to Use UUIDs

| Use Case | Best Version |
|----------|-------------|
| Database primary keys | v4 or v7 |
| Session IDs | v4 |
| Distributed systems | v7 (time-sortable) |
| Content addressing | v5 |

### UUID vs Auto-Increment ID

| | UUID | Auto-Increment |
|--|------|:-----:|
| Global uniqueness | Yes | No |
| Sortable | v7 only | Yes |
| Storage size | 128 bit | 32/64 bit |
| Predictable | No | Yes |

[Generate UUID →](/tools/uuid-generator)
