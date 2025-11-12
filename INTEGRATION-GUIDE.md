# Integration Guide: Adding Panel Loader to index.html

This guide shows you exactly how to integrate the Panel 1 loading animation into your existing `index.html` file.

## Step 1: Add CSS and JS Files

Add these lines to the `<head>` section of `index.html`, right after the existing stylesheet links:

```html
<!-- Panel Loading Animation -->
<link rel="stylesheet" href="src/panel-loader.css">
```

Add this line before the closing `</body>` tag, right before the existing `<script>` tag:

```html
<!-- Panel Loading Animation Controller -->
<script src="src/panel-loader.js"></script>
```

## Step 2: Update Panel 1 HTML (Lines 700-706)

Find Panel 1 in your HTML (around line 700). Add an `id` attribute:

**Before:**
```html
<div class="comic-panel-3d">
    <div class="text-8xl text-center mb-6">🌿</div>
    ...
</div>
```

**After:**
```html
<div id="heroPanel1" class="comic-panel-3d">
    <div class="text-8xl text-center mb-6">🌿</div>
    ...
</div>
```

## Step 3: Add Loading Script

Add this code to the existing `<script>` section at the bottom of `index.html` (around line 1320):

```javascript
// Panel 1 Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    // Check if we should show the loader (e.g., on first visit)
    const showPanelLoader = sessionStorage.getItem('panelLoaded') !== 'true';

    if (showPanelLoader) {
        // Create and show loader for Panel 1
        const panel1Loader = PanelLoader.attachToPanel('#heroPanel1', {
            loaderType: 'spinner',
            loadingText: 'Loading Mr. Chloro\'s story',
            duration: 1500,
            fadeInDuration: 600
        });

        panel1Loader.show();

        // Mark as loaded for subsequent visits
        sessionStorage.setItem('panelLoaded', 'true');
    }
});
```

## Step 4: Complete Integration Code Block

Here's the complete code to add to your existing script section:

```javascript
// ============================================
// PANEL 1 LOADING ANIMATION
// ============================================
(function initializePanelLoader() {
    'use strict';

    // Wait for DOM and images
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPanelLoader);
    } else {
        setupPanelLoader();
    }

    function setupPanelLoader() {
        // Only show loader on first panel view or after refresh
        const shouldShowLoader = true; // Set to false to disable

        if (!shouldShowLoader) return;

        // Initialize Panel 1 loader
        const panel1 = document.getElementById('heroPanel1');
        if (!panel1) {
            console.warn('Panel 1 not found. Skipping loader.');
            return;
        }

        const loader = new PanelLoader(panel1, {
            loaderType: 'spinner',
            loadingText: 'Loading magical content',
            duration: 1500,
            fadeInDuration: 600
        });

        // Show loader immediately
        loader.show();
    }
})();
```

## Alternative: Load All Three Hero Panels

If you want to apply the loader to all three hero panels (Panel 1, 2, and 3):

```javascript
// ============================================
// ALL HERO PANELS LOADING ANIMATION
// ============================================
(function initializeAllPanelLoaders() {
    'use strict';

    window.addEventListener('load', () => {
        const heroPanels = document.querySelectorAll('.hero-gradient .comic-panel-3d');

        heroPanels.forEach((panel, index) => {
            // Add unique ID if not present
            if (!panel.id) {
                panel.id = `heroPanel${index + 1}`;
            }

            const loader = new PanelLoader(panel, {
                loaderType: index === 0 ? 'spinner' : 'skeleton',
                loadingText: `Loading Panel ${index + 1}`,
                duration: 1500,
                fadeInDuration: 600
            });

            // Stagger the loaders for a wave effect
            setTimeout(() => {
                loader.show();
            }, index * 300);
        });
    });
})();
```

## Full HTML Template Changes

### In `<head>` section (after line 13):

```html
<!-- Existing stylesheets -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fredoka:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

<!-- ADD THIS LINE -->
<link rel="stylesheet" href="src/panel-loader.css">

<style>
    /* Existing styles */
```

### In Panel 1 HTML (around line 700):

```html
<!-- CHANGE THIS -->
<div class="comic-panel-3d">

<!-- TO THIS -->
<div id="heroPanel1" class="comic-panel-3d">
```

### Before closing `</body>` tag (around line 1400):

```html
    <!-- Existing script -->
    <script>
        // ... existing particle code ...
        // ... existing avatar selection code ...
        // ... existing other code ...

        // ADD THIS SECTION AT THE END
        // ============================================
        // PANEL 1 LOADING ANIMATION
        // ============================================
        (function() {
            const loader = PanelLoader.attachToPanel('#heroPanel1', {
                loaderType: 'spinner',
                loadingText: 'Loading magical content'
            });

            if (loader) {
                loader.show();
            }
        })();
    </script>

    <!-- ADD THIS LINE BEFORE THE EXISTING SCRIPT -->
    <script src="src/panel-loader.js"></script>
</body>
</html>
```

## Configuration Options for Your Theme

Since your theme uses purple/pink gradients, you may want to customize the loader colors:

### Option 1: Keep Green Theme (Mr. Chloro)
Perfect for Panel 1 since it features Mr. Chloro talking about plants.

### Option 2: Match Purple Theme
Edit `src/panel-loader.css` and change these values:

```css
/* Line 12 - Background gradient */
@keyframes pulseBackground {
    0%, 100% {
        background: linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%);
    }
    50% {
        background: linear-gradient(135deg, #e9d5ff 0%, #f5d0fe 100%);
    }
}

/* Line 101 - Dot colors */
.panel-loader-dot {
    background: #a855f7; /* Purple */
}

@keyframes dotBounce {
    0%, 60%, 100% {
        background: #a855f7; /* Purple */
    }
    30% {
        background: #9333ea; /* Darker purple */
    }
}
```

## Testing

After integration:

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Reload the page** (Ctrl+R or Cmd+R)
3. **Observe Panel 1** - should show loader for ~1.5 seconds
4. **Check console** - no errors should appear
5. **Test on mobile** - animations should be smooth

## Troubleshooting

### Loader doesn't appear
```javascript
// Add debug logging
console.log('Panel element:', document.getElementById('heroPanel1'));
console.log('PanelLoader available:', typeof PanelLoader !== 'undefined');
```

### Loader appears but doesn't hide
```javascript
// Force hide after 3 seconds (development only)
setTimeout(() => {
    const panel = document.getElementById('heroPanel1');
    panel?.classList.remove('panel-loading-state');
}, 3000);
```

### Images don't fade in smoothly
Ensure images have proper `src` attributes and are accessible:

```javascript
const images = document.querySelectorAll('#heroPanel1 img');
images.forEach(img => {
    console.log('Image:', img.src, 'Complete:', img.complete);
});
```

## Performance Tips

1. **Only load on first visit**: Use `sessionStorage` to track
2. **Preload critical images**: Add `<link rel="preload">` in `<head>`
3. **Defer non-critical scripts**: Add `defer` attribute
4. **Use lazy loading**: Add `loading="lazy"` to panel images

## Questions?

See `PANEL-LOADER-README.md` for full documentation and `panel-loader-demo.html` for live examples.
