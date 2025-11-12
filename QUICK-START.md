# Quick Start: Panel 1 Loading Animation

Get the Panel 1 loading animation working in 3 minutes.

## 1. Add Files (30 seconds)

In your HTML `<head>`:
```html
<link rel="stylesheet" href="src/panel-loader.css">
```

Before closing `</body>`:
```html
<script src="src/panel-loader.js"></script>
```

## 2. Add ID to Panel 1 (10 seconds)

Find Panel 1 (around line 700) and add `id="heroPanel1"`:
```html
<div id="heroPanel1" class="comic-panel-3d">
    <!-- existing content -->
</div>
```

## 3. Initialize Loader (2 minutes)

Add this to your existing `<script>` section:
```javascript
// Panel 1 Loading Animation
const panel1Loader = PanelLoader.attachToPanel('#heroPanel1', {
    loaderType: 'spinner',           // or 'skeleton'
    loadingText: 'Loading magical content'
});

panel1Loader.show();
```

## Done!

Refresh your page. Panel 1 now shows a loading animation for ~1.5 seconds before content appears.

## Customize (Optional)

### Change Loader Type
```javascript
loaderType: 'skeleton'  // Shows gray placeholder shapes
```

### Change Text
```javascript
loadingText: 'Mr. Chloro is preparing his lesson...'
```

### Adjust Timing
```javascript
duration: 2000,         // Show loader for 2 seconds minimum
fadeInDuration: 800     // Slower fade-in (800ms)
```

## Full Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your existing head content -->
    <link rel="stylesheet" href="src/panel-loader.css">
</head>
<body>
    <!-- Your content -->

    <div id="heroPanel1" class="comic-panel-3d">
        <div class="text-8xl text-center mb-6">🌿</div>
        <div class="speech-bubble-3d mb-16">
            <p class="font-fredoka font-bold text-slate-800 text-xl">
                "Hi! I'm Mr. Chloro, and plants have MAGICAL powers!"
            </p>
        </div>
        <p class="text-center font-fredoka font-black text-slate-600 text-lg">
            🎬 Panel 1
        </p>
    </div>

    <script src="src/panel-loader.js"></script>
    <script>
        const panel1Loader = PanelLoader.attachToPanel('#heroPanel1', {
            loaderType: 'spinner',
            loadingText: 'Loading magical content'
        });

        panel1Loader.show();
    </script>
</body>
</html>
```

## Testing

1. Open your page in a browser
2. Watch Panel 1 - you should see rotating leaves
3. After ~1.5 seconds, content fades in smoothly
4. Done!

## Troubleshooting

**Loader doesn't appear?**
- Check browser console for errors
- Verify file paths are correct
- Ensure panel ID matches: `#heroPanel1`

**Loader never disappears?**
- Check if images are loading properly
- Look for console errors
- Try: `panel1Loader.hide()` to manually hide

## Next Steps

- See `PANEL-LOADER-README.md` for full documentation
- Open `panel-loader-demo.html` for live examples
- Read `INTEGRATION-GUIDE.md` for advanced integration
- Check `VISUAL-STATES.md` for design details

## Two Loader Styles

### Spinner (Default)
- Rotating leaf emojis (🌿)
- Green plant theme
- Animated text with dots
- Best for: Mr. Chloro panels

### Skeleton
- Gray placeholder shapes
- Mimics panel structure
- Shimmer animation
- Best for: Content preview

Choose based on your design needs!
