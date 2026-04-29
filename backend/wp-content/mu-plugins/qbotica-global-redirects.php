<?php
/**
 * Plugin Name: Qbotica Global Redirects
 * Description: Handles global URL redirects for slug variations and domain normalization
 * Version: 1.0.0
 * Author: Qbotica Dev Team
 */

/**
 * Global redirect handler for URL slug variations
 * 
 * This handles:
 * 1. Redirects from longer slug variations to shorter canonical versions
 * 2. Domain normalization (e.g., qbotica.com to www.qbotica.com)
 * 3. Parameter preservation
 * 4. No hardcoded URLs - works generically for all pages
 */

add_action('template_redirect', 'qbotica_handle_global_redirects', 1);

function qbotica_handle_global_redirects() {
    // Only process on frontend
    if (is_admin()) {
        return;
    }

    $current_url = $_SERVER['REQUEST_URI'];
    $current_host = $_SERVER['HTTP_HOST'];
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';

    // Get the current page slug
    $request_uri = parse_url($current_url, PHP_URL_PATH);
    $request_uri = trim($request_uri, '/');

    if (empty($request_uri)) {
        return; // Don't redirect homepage
    }

    // Split the URI into segments
    $uri_segments = explode('/', $request_uri);
    $original_slug = end($uri_segments);

    // Check if current page exists (is published and accessible)
    $current_post = get_page_by_path($request_uri, OBJECT, array('page', 'post'));

    if ($current_post) {
        return; // Current URL is valid, no redirect needed
    }

    // Try to find if a shorter version of the slug exists
    // Remove suffixes like "-features-benefits-and-implementation" pattern
    $shorter_slug = $original_slug;
    $redirect_needed = false;

    // Pattern 1: Remove common suffixes (features-benefits-implementation, etc.)
    $patterns = array(
        '/-features-benefits-and-implementation$/',
        '/-features-benefits-and-use-cases$/',
        '/-complete-guide$/',
        '/-best-practices$/',
        '/-step-by-step-guide$/',
    );

    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $original_slug)) {
            $shorter_slug = preg_replace($pattern, '', $original_slug);
            $redirect_needed = true;
            break;
        }
    }

    // If we found a shorter slug, check if it exists
    if ($redirect_needed) {
        $shorter_uri = implode('/', array_slice($uri_segments, 0, -1)) . '/' . $shorter_slug;
        $shorter_uri = trim($shorter_uri, '/');

        $shorter_post = get_page_by_path($shorter_uri, OBJECT, array('page', 'post'));

        if ($shorter_post) {
            // Found the shorter version, redirect to it
            $redirect_url = $protocol . '://' . $current_host . '/' . $shorter_uri . '/';
            
            // Preserve query parameters
            if (!empty($_SERVER['QUERY_STRING'])) {
                $redirect_url .= '?' . $_SERVER['QUERY_STRING'];
            }

            // Perform redirect (301 for permanent redirect)
            wp_redirect($redirect_url, 301);
            exit;
        }
    }

    // Pattern 2: Handle numeric parameters at the end (e.g., /doqumentai/1000 → /doqumentai)
    if (count($uri_segments) >= 2 && is_numeric(end($uri_segments))) {
        $numeric_param = array_pop($uri_segments);
        $uri_without_param = implode('/', $uri_segments);
        
        $post_without_param = get_page_by_path($uri_without_param, OBJECT, array('page', 'post'));
        
        if ($post_without_param) {
            // Found the page without numeric parameter, redirect to it
            $redirect_url = $protocol . '://' . $current_host . '/' . $uri_without_param . '/';
            
            // Preserve query parameters
            if (!empty($_SERVER['QUERY_STRING'])) {
                $redirect_url .= '?' . $_SERVER['QUERY_STRING'];
            }

            wp_redirect($redirect_url, 301);
            exit;
        }
    }

    // Pattern 3: Domain normalization - redirect to www if needed
    // Only if you want to force www domain
    if (defined('QBOTICA_FORCE_WWW') && QBOTICA_FORCE_WWW) {
        if (strpos($current_host, 'www.') === false && 
            strpos($current_host, 'localhost') === false && 
            strpos($current_host, 'dev.') !== 0) {
            
            $redirect_url = $protocol . '://www.' . $current_host . $current_url;
            wp_redirect($redirect_url, 301);
            exit;
        }
    }
}

/**
 * Alternative approach: Add custom rewrite rules for automatic slug resolution
 * This catches 404s and tries to find the canonical version
 */
add_filter('404_template_hierarchy', 'qbotica_handle_404_redirects', 10, 1);

function qbotica_handle_404_redirects($templates) {
    // If it's a 404, try to find and redirect to the canonical URL
    $request_uri = trim($_SERVER['REQUEST_URI'], '/');
    
    if (empty($request_uri)) {
        return $templates;
    }

    // Try removing trailing numeric parameters
    $uri_parts = explode('/', $request_uri);
    if (count($uri_parts) >= 2 && is_numeric(end($uri_parts))) {
        array_pop($uri_parts);
        $canonical_uri = implode('/', $uri_parts);
        $canonical_post = get_page_by_path($canonical_uri, OBJECT, array('page', 'post'));
        
        if ($canonical_post) {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
            $redirect_url = $protocol . '://' . $_SERVER['HTTP_HOST'] . '/' . $canonical_uri . '/';
            
            if (!empty($_SERVER['QUERY_STRING'])) {
                $redirect_url .= '?' . $_SERVER['QUERY_STRING'];
            }

            wp_redirect($redirect_url, 301);
            exit;
        }
    }

    return $templates;
}
