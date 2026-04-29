# URL Redirect Solution for Qbotica - Complete Guide

## Problem Summary

Your WordPress site has issues with URL redirects:

1. **Longer slug variations not redirecting** to shorter versions
   - `qbotica.com/a-complete-guide-to-accounting-ai-agents-features-benefits-and-implementation/` → Should redirect to `/a-complete-guide-to-accounting-ai-agents/`

2. **Numeric parameters causing 404s**
   - `qbotica.com/doqumentai/1000` → Should redirect to `/doqumentai/` (without the numeric parameter)

3. **Need domain normalization** across development and production environments

4. **Global solution** without hardcoding specific URLs

---

## Solution Overview

The solution has been implemented as a **Must-Use Plugin (mu-plugin)** that automatically handles these redirects without modification to theme files or hardcoding specific URLs.

### File Created:
```
/backend/wp-content/mu-plugins/qbotica-global-redirects.php
```

---

## How It Works

### 1. **Slug Variation Redirect** (Longer → Shorter)

The plugin detects common URL slug patterns and automatically redirects longer versions to shorter canonical versions:

```
Pattern Detection:
- /slug-features-benefits-and-implementation → /slug
- /slug-features-benefits-and-use-cases → /slug
- /slug-complete-guide → /slug
- /slug-best-practices → /slug
- /slug-step-by-step-guide → /slug
```

**How it works:**
1. Checks if current URL (with longer suffix) is accessible
2. If not found, removes the suffix
3. Searches for the shorter version
4. If found, performs 301 redirect (permanent)

### 2. **Numeric Parameter Redirect**

Handles URLs with numeric parameters:

```
Example:
/doqumentai/1000 → /doqumentai/
/any-page/999 → /any-page/
```

**How it works:**
1. Detects if the last segment is numeric
2. Removes it and checks if the page exists
3. Redirects if the page without parameter exists

### 3. **Query Parameter Preservation**

All redirects preserve existing query parameters:

```
/old-url/1000?utm_source=google → /new-url/?utm_source=google
```

---

## Setup & Activation

### Automatic (Already Done)

The mu-plugin is already created and will activate automatically:

1. ✅ File is in: `/backend/wp-content/mu-plugins/qbotica-global-redirects.php`
2. ✅ Will load before regular plugins
3. ✅ No activation needed

### Verify It's Working

Check in WordPress Admin:
- Go to **Plugins → Inactive Plugins**
- The plugin won't appear here (mu-plugins are automatic)
- Go to **Plugins → Active Plugins**
- It may not appear here either (normal for mu-plugins)

To verify it's loaded:
```php
// Check in wp-admin by adding this temporarily to functions.php
if (function_exists('qbotica_handle_global_redirects')) {
    echo "<!-- Redirects active -->";
}
```

---

## Configuration Options

### Optional: Enable Domain Normalization

If you want to force all traffic to use `www.` prefix (optional):

Add to `wp-config.php`:

```php
// Force www.qbotica.com (optional - only if needed)
define('QBOTICA_FORCE_WWW', true);
```

**Note:** This is optional and only needed if you want to normalize domains.

---

## Testing the Redirects

### Test Case 1: Slug Variation

**Before:** `https://www.qbotica.com/a-complete-guide-to-accounting-ai-agents-features-benefits-and-implementation/`
- ❌ Shows 404 or redirects incorrectly

**After:** 
- ✅ Redirects to `https://www.qbotica.com/a-complete-guide-to-accounting-ai-agents/`
- ✅ Browser shows 301 redirect

### Test Case 2: Numeric Parameters

**Before:** `https://www.qbotica.com/doqumentai/1000`
- ❌ Shows 404

**After:**
- ✅ Redirects to `https://www.qbotica.com/doqumentai/`
- ✅ Browser shows 301 redirect

### Test Case 3: Query Parameters

**Before:** `https://www.qbotica.com/doqumentai/1000?utm_source=google`

**After:**
- ✅ Redirects to `https://www.qbotica.com/doqumentai/?utm_source=google`
- ✅ Query parameters preserved

---

## How to Add More Patterns

If you need to handle additional slug patterns beyond the defaults, edit the mu-plugin file:

**File:** `/backend/wp-content/mu-plugins/qbotica-global-redirects.php`

**Find this section:**
```php
$patterns = array(
    '/-features-benefits-and-implementation$/',
    '/-features-benefits-and-use-cases$/',
    '/-complete-guide$/',
    '/-best-practices$/',
    '/-step-by-step-guide$/',
);
```

**Add new patterns as needed:**
```php
$patterns = array(
    '/-features-benefits-and-implementation$/',
    '/-features-benefits-and-use-cases$/',
    '/-complete-guide$/',
    '/-best-practices$/',
    '/-step-by-step-guide$/',
    '/-your-new-pattern$/',  // Add here
);
```

---

## Troubleshooting

### Issue: Redirects not working

**Check:**
1. File exists: `/backend/wp-content/mu-plugins/qbotica-global-redirects.php`
2. No PHP syntax errors: Check WordPress debug log
3. Permalinks are enabled in WordPress Settings → Permalinks
4. `.htaccess` is writable (if using Apache)

### Issue: Too many redirects

**Solution:**
- Check that the canonical URL (shorter slug) actually exists
- Make sure there's no redirect loop in `.htaccess`
- Check WordPress site settings for correct URL

### Issue: Query parameters not working

**Solution:**
- The plugin automatically preserves them
- Check if query parameters are being removed by another plugin

### Enable Debug Mode

Add to `wp-config.php` to see redirect info in PHP error log:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Check: `/backend/wp-content/debug.log`

---

## Alternative: .htaccess Method (Optional)

If you prefer server-level redirects, add this to `.htaccess` **before** the WordPress section:

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# Remove numeric parameters from URL (e.g., /page/123 → /page)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^/]+)/[0-9]+/?$ /$1/ [L,R=301]

# Redirect longer slug variations to shorter versions
# Pattern: remove -features-benefits-and-implementation suffix
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)-features-benefits-and-implementation/?$ /$1/ [L,R=301]

# Pattern: remove -complete-guide suffix
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)-complete-guide/?$ /$1/ [L,R=301]

</IfModule>
```

**Note:** The WordPress mu-plugin method is recommended as it's more flexible and doesn't require .htaccess.

---

## Performance Impact

- **Minimal:** The plugin only runs on 404s or when pages aren't found directly
- **Cached:** Once cached, no additional checks needed
- **Efficient:** Uses WordPress native `get_page_by_path()` function

---

## Future Enhancements

The plugin can be extended to handle:

1. Custom redirect mappings (database-driven)
2. Advanced pattern matching
3. Redirect statistics & monitoring
4. A/B testing with redirects
5. Redirect logs

---

## Support & Maintenance

### File Locations
- **Plugin:** `/backend/wp-content/mu-plugins/qbotica-global-redirects.php`
- **Config:** `wp-config.php`
- **Debug:** `/backend/wp-content/debug.log`

### When to Update
- If new URL patterns are added to the site
- If you need to customize redirect behavior
- If you want to monitor redirect activity

### Backup
Always backup before modifying:
```bash
cp /backend/wp-config.php /backend/wp-config.php.backup
cp /backend/wp-content/mu-plugins/ /backend/wp-content/mu-plugins.backup/
```

---

## Questions?

The solution automatically handles:
✅ Longer slug variations → Shorter versions
✅ Numeric parameter removal
✅ Query parameter preservation
✅ All pages (no hardcoding needed)
✅ Both dev and production environments
✅ Domain normalization (optional)
