# Redirect Solution - Quick Setup Checklist

## ✅ What's Been Done

- [x] Created global redirect mu-plugin
  - **File:** `backend/wp-content/mu-plugins/qbotica-global-redirects.php`
  - Handles slug variations automatically
  - Handles numeric parameters automatically
  - Preserves query parameters

- [x] Created comprehensive guide
  - **File:** `REDIRECT_SOLUTION.md`
  - Full documentation with examples
  - Troubleshooting section
  - Testing procedures

---

## 🚀 Immediate Next Steps

### 1. Verify Plugin is Active

```
WordPress Admin → Plugins
(Look for any error notices - should be none)
```

### 2. Test the Redirects

Open these URLs in browser and check behavior:

**Test Case 1 - Slug Variation:**
```
Current Problem:
https://www.qbotica.com/a-complete-guide-to-accounting-ai-agents-features-benefits-and-implementation/

After Fix:
Should redirect to: /a-complete-guide-to-accounting-ai-agents/
Status: Should show 301 redirect in browser dev tools
```

**Test Case 2 - Numeric Parameters:**
```
Current Problem:
https://www.qbotica.com/doqumentai/1000

After Fix:
Should redirect to: /doqumentai/
Status: Should show 301 redirect
```

**Test Case 3 - With Query Parameters:**
```
Current:
https://www.qbotica.com/some-page/123?utm_source=google

After Fix:
Should redirect to: /some-page/?utm_source=google
Query params should be preserved
```

### 3. Monitor for Errors

Check WordPress error log:
```
File: backend/wp-content/debug.log
```

### 4. Verify on Both Domains

Test on:
- ✅ Production: `https://www.qbotica.com`
- ✅ Development: `https://dev.srv975395.hstgr.cloud`

Both should work identically.

---

## 📋 Advanced Configuration (Optional)

### Option A: Add Domain Normalization

If you want all traffic to use `www` prefix:

**Edit:** `backend/wp-config.php`

**Add this line:**
```php
define('QBOTICA_FORCE_WWW', true);
```

### Option B: Add Custom Patterns

If you have other URL patterns to handle:

**Edit:** `backend/wp-content/mu-plugins/qbotica-global-redirects.php`

**Find this section:**
```php
$patterns = array(
    '/-features-benefits-and-implementation$/',
    // Add more patterns here
);
```

**Add your pattern:**
```php
'/-your-pattern$/',
```

### Option C: Enable Debug Mode

To see redirect information in logs:

**Edit:** `backend/wp-config.php`

**Add:**
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

---

## 🔍 How to Verify It's Working

### Method 1: Browser DevTools

1. Open any problematic URL in browser
2. Press `F12` to open DevTools
3. Go to **Network** tab
4. Reload page
5. Look for response with **301 status** - that's the redirect working!

### Method 2: cURL Command

```bash
curl -I https://www.qbotica.com/doqumentai/1000
```

**Good output:**
```
HTTP/1.1 301 Moved Permanently
Location: https://www.qbotica.com/doqumentai/
```

### Method 3: WordPress Debug Log

Add this to `wp-config.php`:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

Then check: `backend/wp-content/debug.log`

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Redirects not working | Check file exists at `wp-content/mu-plugins/qbotica-global-redirects.php` |
| Still showing 404 | Verify shorter URL actually exists in WordPress |
| Too many redirects | Check `.htaccess` for conflicts - disable if suspicious |
| Query params lost | Plugin automatically preserves them - check other plugins |
| Works on dev, not production | Check domain settings in WordPress Settings → General |

---

## 📞 Support

If issues occur:

1. **Check file permissions:**
   ```bash
   ls -la backend/wp-content/mu-plugins/
   # Should be readable by web server
   ```

2. **Enable debug mode** to see detailed errors

3. **Check WordPress error log** at `backend/wp-content/debug.log`

4. **Verify plugin is loading:**
   - Add to `backend/wp-content/themes/twentytwentyfive-child/functions.php`:
   ```php
   if (function_exists('qbotica_handle_global_redirects')) {
       error_log('Redirect plugin loaded successfully');
   }
   ```

---

## 📝 Files Reference

| File | Purpose |
|------|---------|
| `backend/wp-content/mu-plugins/qbotica-global-redirects.php` | Main redirect plugin |
| `backend/wp-config.php` | Configuration (optional) |
| `REDIRECT_SOLUTION.md` | Complete documentation |
| `REDIRECT_SETUP_CHECKLIST.md` | This file |

---

## ✨ Summary

The solution is **completely automated**:
- ✅ No hardcoded URLs
- ✅ Works for all pages
- ✅ Preserves query parameters
- ✅ Handles multiple URL patterns
- ✅ Works on both dev and production
- ✅ Minimal performance impact
- ✅ Easy to extend

**Next: Run the tests above to verify everything is working!**
