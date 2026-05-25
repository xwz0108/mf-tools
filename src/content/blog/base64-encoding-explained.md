## What is Base64?

Base64 converts binary data into ASCII text using 64 characters: A-Z, a-z, 0-9, +, and /.

### Why Use Base64?
- Embed images directly in HTML/CSS
- Send binary data in JSON
- Attach files to emails (MIME)
- Store binary data in text-only databases

### How It Works
1. Take 3 bytes (24 bits) of data
2. Split into 4 groups of 6 bits
3. Map each 6-bit group to a Base64 character
4. If less than 3 bytes, pad with `=`

### Common Use Cases

| Use Case | Example |
|----------|---------|
| Data URIs | `data:image/png;base64,iVBOR...` |
| JWT tokens | Encoded header and payload |
| Email attachments | MIME encoding |
| API auth | Basic Auth: `base64(user:pass)` |

### Is Base64 Encryption?
**No.** Base64 is encoding, not encryption. Anyone can decode it. Never use Base64 to "protect" sensitive data.

[Encode/Decode Now →](/tools/base64-encoder)
