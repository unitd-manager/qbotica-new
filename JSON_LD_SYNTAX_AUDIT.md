# JSON-LD Structured Data Syntax Audit

## Summary
Found multiple files handling JSON-LD structured data and schema markup across the frontend codebase. Potential JSON parsing error at position 1966 likely originates from malformed JSON in RankMath metadata.

---

## Files with JSON-LD/Schema Markup

### 1. **[src/components/Common/StructuredData.js](src/components/Common/StructuredData.js)**
   - **Purpose**: Client-side component that injects JSON-LD scripts into document head
   - **Functionality**: 
     - Takes data array and converts to JSON-LD script tags
     - Replaces WordPress domain URLs with Next.js URLs
     - Line 41: `script.text = JSON.stringify(updatedItem);`
   - **Potential Issue**: If `updatedItem` contains circular references or invalid types, `JSON.stringify()` will fail
   - **Risk Level**: Medium - relies on input validation

### 2. **[src/lib/rankmath-utils.js](src/lib/rankmath-utils.js)**
   - **Purpose**: Parse and generate RankMath SEO metadata including JSON-LD
   - **Key Functions**:
     - `parseRankMathData()` (Line 1+): Parses Rank Math API response
     - Line 70: `const parsedJson = JSON.parse(jsonMatch[1].trim());` - **CRITICAL**
       - Extracts JSON-LD from HTML and parses it
       - Has error handling: `catch (jsonError) { console.warn('Failed to parse JSON-LD:', jsonError.message); }`
     - Line 79: Stores structured data
     - `generateStructuredDataScript()` (Line 357+): Converts data to script tags
     - Line 365: `const jsonString = typeof data === 'string' ? data : JSON.stringify(data);`
   - **Risk Level**: HIGH - This is where the JSON parsing error likely occurs

### 3. **[src/lib/metadata.js](src/lib/metadata.js)**
   - **Line 105**: `'application/ld+json': JSON.stringify(rankMathMeta.schema)`
   - **Purpose**: Converts structured data to Next.js metadata format
   - **Potential Issue**: If `rankMathMeta.schema` is malformed, this will fail
   - **Risk Level**: High - depends on RankMath API data quality

### 4. **[src/lib/rankmath-metadata.js](src/lib/rankmath-metadata.js)**
   - **Line 106**: `schema: null` - indicates schema handling is deferred
   - **Purpose**: Extracts RankMath SEO metadata from WordPress
   - **Note**: Schema generation is documented as "usually handled separately by RankMath"
   - **Risk Level**: Low - but unclear schema handling path

---

## Error Position Analysis

### Position 1966 Context
The error message mentions "JSON parsing error at position 1966" which suggests:
- The JSON being parsed is approximately 1966+ bytes long
- Error occurs at a specific character position
- Could be:
  - Unescaped quotes in URLs or descriptions
  - Invalid UTF-8 or special characters
  - Improperly nested brackets
  - Missing/extra commas or colons

### Most Likely Source
**[src/lib/rankmath-utils.js](src/lib/rankmath-utils.js) Line 70** in `parseRankMathData()`:
```javascript
try {
  const parsedJson = JSON.parse(jsonMatch[1].trim());
  jsonLdScripts.push(parsedJson);
} catch (jsonError) {
  console.warn('Failed to parse JSON-LD:', jsonError.message);
}
```

This is where external JSON from RankMath API is parsed and could contain malformed data.

---

## Common JSON-LD Schema Issues to Check For

1. **Unescaped Quotes**: Strings containing `"` without `\"`
2. **Special Characters**: Unescaped special characters in URLs or descriptions
3. **Invalid Unicode**: Broken emoji or non-ASCII characters
4. **Circular References**: Objects referencing themselves
5. **Null/Undefined Values**: JavaScript `undefined` instead of `null`
6. **Trailing Commas**: Arrays/objects ending with `,`
7. **Missing Commas**: Between object properties
8. **Improperly Nested**: Mismatched `{`, `[` brackets

---

## Usage Across Frontend

### Pages Using StructuredData Component:
- [src/app/contact-us/page.js](src/app/contact-us/page.js) - Line 25
- [src/app/[slug]/page.js](src/app/[slug]/page.js) - Line 45
- [src/app/[slug]/[subslug]/page.js](src/app/[slug]/[subslug]/page.js) - Line 81
- [src/app/[slug]/[subslug]/[thirdslug]/page.js](src/app/[slug]/[subslug]/[thirdslug]/page.js) - Line 78
- [src/app/case-studies/page.js](src/app/case-studies/page.js)
- [src/app/case-studies/[slug]/page.js](src/app/case-studies/[slug]/page.js)
- [src/app/careers/page.js](src/app/careers/page.js)
- [src/app/careers/[slug]/page.js](src/app/careers/[slug]/page.js)
- [src/app/newsroom/page.js](src/app/newsroom/page.js)
- [src/app/services/[slug]/page.js](src/app/services/[slug]/page.js)
- [src/app/usecases/[slug]/page.js](src/app/usecases/[slug]/page.js)
- [src/app/solutions/page.js](src/app/solutions/page.js)
- [src/app/resources/white-papers/page.js](src/app/resources/white-papers/page.js)
- [src/app/marketing-assets/page.js](src/app/marketing-assets/page.js)
- And 20+ more pages...

---

## Recommendations for Debugging

1. **Enable Verbose Logging** in [src/lib/rankmath-utils.js](src/lib/rankmath-utils.js):
   - Add detailed error logs with character position info
   - Log the actual JSON string that's failing to parse

2. **Add JSON Validation** before parsing:
   ```javascript
   console.log('JSON to parse:', jsonMatch[1].trim());
   console.log('Length:', jsonMatch[1].trim().length);
   ```

3. **Check RankMath API Response**:
   - Verify the raw HTML head response is properly escaped
   - Ensure special characters are properly encoded

4. **Validate JSON Output**:
   - Use a JSON linter to check structured data being generated
   - Verify all strings are properly escaped

5. **Character Encoding**:
   - Ensure UTF-8 encoding throughout the chain
   - Check for hidden special characters near position 1966

---

## Next Steps

1. Add debug logging to identify which schema/page is causing the error
2. Check WordPress RankMath settings for malformed JSON-LD output
3. Validate all third-party content being embedded in schema markup
4. Consider adding a JSON validation/sanitization layer before parsing
