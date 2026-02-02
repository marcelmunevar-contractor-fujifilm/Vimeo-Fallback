# Vimeo Fallback

A solution for handling Vimeo video embeds with consent management for targeted advertising cookies.

## Overview

This project provides a fallback mechanism for embedding Vimeo videos on web pages with integrated consent management. It displays a warning message when targeting cookies are not enabled and allows users to enable targeting cookies through the OneTrust consent manager.

## Features

- **Consent-Based Video Display**: Videos only display when the C0004 (Targeting) consent category is enabled
- **User-Friendly Warning**: Displays a consent warning when targeting cookies are disabled
- **OneTrust Integration**: Integrates with OneTrust's consent management platform

## Installation

1. **Include the script files** in your HTML page:
   Add the script shown below to "COMMON ATTRIBUTES"->"Custom tag body bottom" in CAMP.

```html
<script src="/path/ConsentManager.js"></script>
```

2. **Add the HTML structure** to your webpage where you want the video to appear

```html
<div class="vimeo-placeholder">
  <div class="video-consent-warning" style="display:none">
    <div class="c-attention-box box -blue -info">
      <h3 class="c-headline">Video Cannot Be Displayed</h3>
      <div class="m-wysiwyg">
        <p>
          To view this video, please enable Targeting Cookies in your cookie
          settings.
        </p>
        <p>
          <a href="#" onclick="consentManager.enableTargeting(event);"
            >Click Here to Enable Targeting Cookies</a
          >
        </p>
        <p>Already enabled? Try refreshing your browser.</p>
      </div>
    </div>
  </div>
  <div class="vimeo-video">{Paste Vimeo Embed Here}</div>
</div>
```

#### Class details:

- `vimeo-placeholder`: Top-level wrapper for the component.
- `video-consent-warning`: The warning block shown when targeting cookies (C0004) are not active. It's hidden by default via `style="display:none"` and shown by the `ConsentManager` when needed.
- `c-attention-box box -blue -info c-headline m-wysiwyg`: Site-level utility classes used by CAMP to render the warning box.
- `vimeo-video`: Container for the Vimeo iframe. Paste the Vimeo embed markup here and is hidden/shown based on consent status.

## JavaScript Functionality

The `ConsentManager` initializes on page load (on `DOMContentLoaded`) as `consentManager`.

Functions:
- **enableTargeting()**: Calls `OneTrust.ToggleInfoDisplay()` to open the OneTrust cookie settings.
- **isC0004Active()**: Checks if the C0004 consent category is currently active by inspecting `OnetrustActiveGroups`.
- **hideElements()**: Shows/hides the warning and video based on consent status. Is called on page load (on `DOMContentLoaded`).

## OneTrust Categories

- **C0004**: Targeting cookies (required for video display)

## Requirements

- OneTrust consent manager script must be loaded on the page
- `OnetrustActiveGroups` global variable must be available
- `OneTrust.ToggleInfoDisplay()` method must be available
