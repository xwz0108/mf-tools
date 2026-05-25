## JSON: The Universal Data Format

JSON (JavaScript Object Notation) is the most widely used data format on the web. Every REST API, config file, and database exchange uses it.

### Why JSON Won
- Human-readable
- Language-independent
- Simple structure (objects + arrays + primitives)
- Native JavaScript support

### JSON Syntax Rules

1. Data is in name/value pairs: `"key": "value"`
2. Data is separated by commas
3. Curly braces hold objects: `{}`
4. Square brackets hold arrays: `[]`
5. Keys must be strings (double quotes)
6. Values can be: string, number, object, array, boolean, null

### Common JSON Mistakes

```json
{
  "name": "John",         // ✓ correct
  'name': "John",         // ✗ single quotes
  "age": 30,              // ✓ correct
  "isActive": true,       // ✓ correct
  "city": undefined       // ✗ undefined not valid
}
```

### JSON Schema
Validate your JSON structure with JSON Schema. Define required fields, data types, and constraints.

[Format & Validate JSON →](/tools/json-formatter)
