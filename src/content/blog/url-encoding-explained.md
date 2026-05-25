## What is URL Encoding?

URL encoding (percent-encoding) converts special characters into a format safe for URLs.

Characters like spaces, `&`, `?`, `#`, and non-ASCII characters must be encoded because they have special meanings in URLs.

### Why Spaces Become %20 or +

In URLs:
- `%20` is the standard percent-encoded space
- `+` represents a space in query strings (form data)

### Common Encodings

| Character | Encoded | Reason |
|-----------|---------|--------|
| Space | %20 | Not allowed in URLs |
| & | %26 | Separates query params |
| ? | %3F | Starts query string |
| # | %23 | Fragment identifier |
| / | %2F | Path separator |
| Chinese | %E4%B8%AD | Non-ASCII |

### When to Encode
1. **Query parameters** — always encode values
2. **Path segments** — encode special characters
3. **Fragment** — rarely encoded

[URL Encode/Decode →](/tools/url-encoder)
