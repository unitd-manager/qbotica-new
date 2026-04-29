# Redirect Solution - Testing & Verification Guide

## Quick Test Scenarios

### Test Environment
- **Production:** `https://www.qbotica.com`
- **Development:** `https://dev.srv975395.hstgr.cloud`

---

## Browser Testing (Easiest Method)

### Test #1: Slug Variation Redirect

**What to do:**
1. Open browser
2. Paste this URL: `https://www.qbotica.com/a-complete-guide-to-accounting-ai-agents-features-benefits-and-implementation/`
3. Press Enter

**Expected result:**
- Browser address bar changes to: `/a-complete-guide-to-accounting-ai-agents/`
- Page loads successfully (no 404)

**What it means:**
✅ Working = Slug variation redirect is active
❌ Not working = Plugin not active or URL doesn't exist

---

### Test #2: Numeric Parameter Redirect

**What to do:**
1. Open browser
2. Paste this URL: `https://www.qbotica.com/doqumentai/1000`
3. Press Enter

**Expected result:**
- Browser address bar changes to: `/doqumentai/`
- Page loads successfully

**What it means:**
✅ Working = Numeric parameter stripping is active
❌ Not working = Plugin not active or base URL doesn't exist

---

### Test #3: Query Parameter Preservation

**What to do:**
1. Open browser
2. Paste this URL: `https://www.qbotica.com/doqumentai/1000?utm_source=google&utm_medium=cpc`
3. Press Enter

**Expected result:**
- Browser address bar shows: `/doqumentai/?utm_source=google&utm_medium=cpc`
- Query parameters are preserved exactly

**What it means:**
✅ Working = Query parameters are preserved correctly
❌ Not working = Plugin might be stripping parameters

---

## DevTools Testing (For Developers)

### Method 1: Check HTTP Status Code

**Steps:**
1. Press `F12` to open DevTools
2. Go to **Network** tab
3. Paste problematic URL in address bar
4. Look at the Status column

**What to look for:**
- ✅ `301 Moved Permanently` = Redirect is working
- ❌ `404 Not Found` = Page doesn't exist or plugin not active
- ⚠️ `200 OK` = No redirect needed (URL is already valid)

---

### Method 2: View Response Headers

**Steps:**
1. Open DevTools (F12)
2. Network tab
3. Click on the request
4. Go to **Response Headers** or **Headers** tab
5. Look for `Location` header

**What to look for:**
```
Location: /a-complete-guide-to-accounting-ai-agents/
```

This shows where the redirect is pointing.

---

## Command Line Testing (For Technical Users)

### Using cURL (Linux/Mac/Windows PowerShell)

**Test 1: Check if redirect happens**

```bash
curl -I https://www.qbotica.com/doqumentai/1000
```

**Expected output:**
```
HTTP/1.1 301 Moved Permanently
Location: https://www.qbotica.com/doqumentai/
```

**Test 2: Follow the redirect**

```bash
curl -L https://www.qbotica.com/doqumentai/1000
```

Should return the HTML of `/doqumentai/` page (not 404 error)

**Test 3: With query parameters**

```bash
curl -I "https://www.qbotica.com/doqumentai/1000?utm_source=test"
```

**Expected output:**
```
Location: https://www.qbotica.com/doqumentai/?utm_source=test
```

---

## WordPress Admin Verification

### Check if Plugin is Active

**Steps:**
1. Go to WordPress Admin
2. Navigate to **Plugins**
3. Look for mu-plugins (might not show in list)
4. Or check in **Settings → Debug** if enabled

**Expected:**
- No error messages
- No plugin conflicts

### Enable Debug Mode to See Details

**Edit:** `backend/wp-config.php`

**Add these lines:**
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

**Then check:**
```
backend/wp-content/debug.log
```

**Look for:**
- No PHP errors related to the mu-plugin
- Any redirect activity logs

---

## Test Checklist

Print this and use it:

```
Redirect Testing Checklist
==========================

Date: ___________
Tested By: ___________

Test Environment:
☐ Production (qbotica.com)
☐ Development (dev.srv975395.hstgr.cloud)

Redirect Tests:
☐ Test #1: Slug variation - Browser test
  URL: /a-complete-guide-to-accounting-ai-agents-features-benefits-and-implementation/
  Result: ___________
  
☐ Test #2: Numeric parameters - Browser test
  URL: /doqumentai/1000
  Result: ___________
  
☐ Test #3: Query parameters - Browser test
  URL: /doqumentai/1000?utm_source=test
  Result: ___________

DevTools Tests:
☐ Test #4: HTTP status code
  Expected: 301 Moved Permanently
  Result: ___________
  
☐ Test #5: Location header
  Expected: Correct destination URL
  Result: ___________

Additional Pages to Test:
☐ Page 1: URL: __________ Expected: __________
☐ Page 2: URL: __________ Expected: __________
☐ Page 3: URL: __________ Expected: __________

Notes:
_________________________________________________________________
_________________________________________________________________

Status: ☐ WORKING  ☐ NEEDS DEBUGGING
```

---

## Debugging Steps

### If Tests Fail

**Step 1: Verify plugin file exists**

```bash
ls -la backend/wp-content/mu-plugins/qbotica-global-redirects.php
```

**Step 2: Check for PHP errors**

```bash
tail -f backend/wp-content/debug.log
```

**Step 3: Verify shorter URL exists**

Make sure the target URL (without numeric parameter or suffix) actually exists:
- Go to WordPress Admin
- Pages → All Pages
- Search for the canonical URL

**Step 4: Check .htaccess**

Make sure `.htaccess` isn't interfering:

```bash
cat backend/.htaccess
```

Look for any redirect rules that might conflict.

**Step 5: Test with cURL to isolate the issue**

```bash
curl -v https://www.qbotica.com/doqumentai/1000
```

The `-v` flag shows all headers and helps identify where the issue is.

---

## Common Issues & Fixes

| Issue | Possible Cause | Fix |
|-------|----------------|-----|
| 404 after redirect | Target URL doesn't exist | Verify the canonical page exists in WordPress |
| No redirect happening | Plugin not loading | Check file permissions: `chmod 644 qbotica-global-redirects.php` |
| Wrong redirect URL | URL format issue | Check that base URL is in WordPress without trailing slash |
| Query params lost | Other plugin interfering | Disable plugins one by one to find conflict |
| Too many redirects | Redirect loop | Check .htaccess for conflicting rules |
| Works on dev, not production | Domain/URL mismatch | Check WordPress Settings → General URLs |

---

## Success Criteria

✅ All tests pass if:

1. **Slug variations redirect** → Shorter version loads
2. **Numeric parameters removed** → Clean URL loads
3. **Query params preserved** → ?utm_source=test is kept
4. **HTTP status 301** → Browser DevTools shows 301
5. **Works on both servers** → Dev AND production
6. **No 404 errors** → All redirects work

---

## Reporting Results

**To report testing results, provide:**

```
Test Date: [Date]
Server: [Production/Dev]
Test URLs Used: [List of URLs tested]
Results: [Pass/Fail with details]
HTTP Status Codes: [Show the codes]
Browser: [Chrome/Firefox/Safari]
Any Errors: [Any error messages seen]
```

**Example:**
```
Test Date: 2026-04-29
Server: Production
Test URLs Used: 
  - /accounting-ai-agents-features-and-implementation/
  - /doqumentai/1000
  - /doqumentai/1000?utm_source=test
Results: All three tests passed
HTTP Status: 301 Moved Permanently
Browser: Chrome 125
Any Errors: None
```
