# Vimeo Fallback

A solution for handling Vimeo video embeds with consent management for targeted advertising cookies.

## Overview

This project provides a fallback mechanism for embedding Vimeo videos on web pages with integrated consent management. It displays a warning message when targeting cookies are not enabled and allows users to enable targeting cookies through the OneTrust consent manager.

## Features

- **Consent-Based Video Display**: Videos only display when the C0004 (Targeting) consent category is enabled
- **User-Friendly Warning**: Displays a consent warning when targeting cookies are disabled
- **OneTrust Integration**: Integrates with OneTrust's consent management platform
- **Responsive Iframe**: Uses responsive padding for proper video aspect ratio on all devices

## Installation

### Basic Setup

1. **Include the script files** in your HTML page:
   ```html
   <script src="ConsentManager.js"></script>
   ```
2. **Add the HTML structure** from `test.html` to your webpage where you want the video to appear
3. **Ensure OneTrust is loaded** before the ConsentManager script:

   ```html
   <!-- OneTrust Banner Script -->
   <script
     src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
     charset="UTF-8"
   ></script>

   <!-- Your ConsentManager -->
   <script src="ConsentManager.js"></script>
   ```

## Usage

Include the `test.html` file's content in your webpage where you want to embed a Vimeo video with consent management.

### HTML Structure

- **Video Container**: A placeholder div that contains both the warning and video elements
- **Consent Warning**: Displays a message and link to enable targeting cookies
- **Vimeo Iframe**: The embedded Vimeo player (hidden until consent is granted)

### JavaScript Functionality

The `ConsentManager` class handles:

- **enableTargeting()**: Opens the OneTrust cookie settings (via `ToggleInfoDisplay()`), waits 2 seconds, and calls `OneTrust.UpdateConsent("Category", "C0004:1")`. This method supports both synchronous and promise-based `UpdateConsent` implementations and will refresh the UI when C0004 (Targeting) becomes active. Ensure the triggering link passes the event (e.g., `onclick="consentManager.enableTargeting(event)"`) — consider updating the link text to **"Open cookie settings"** for clarity.
- **isC0004Active()**: Checks if the C0004 consent category is currently active
- **hideElements()**: Shows/hides the warning and video based on consent status

## OneTrust Categories

- **C0004**: Targeting cookies (required for video display)

## Requirements

- OneTrust consent manager script must be loaded on the page
- `OnetrustActiveGroups` global variable must be available
- `OneTrust.UpdateConsent()` method must be available

## Notes

- The video is hidden by default and only shown when C0004 consent is active
- The consent warning is displayed by default and hidden when C0004 is active
- DOM content loaded event triggers the initial consent check

## CAMP Instructions

1. Add the script shown below to "COMMON ATTRIBUTES"->"Custom tag body bottom" in CAMP.

<script src="https://assets.fujifilmusa.com/hlus/vimeo-fallback/ConsentManager.js"></script>

2. Add the code shown below to a z10_embeddedCode paragraph.

<div class="vimeo-placeholder"> <div class="video-consent-warning" style="display:none"> <div class="c-attention-box box -blue -info"> <h3 class="c-headline">Video Cannot Be Displayed</h3> <div class="m-wysiwyg"> <p>To view this video, please enable Targeting Cookies in your cookie settings.</p> <p><a href ="#" onclick="consentManager.enableTargeting(event);">Click Here to Enable Targeting Cookies</a></p> <p> Already enabled? Try refreshing your browser </p> </div> </div> </div> <div class="vimeo-video"> {Paste Vimeo Embed Here} </div> </div>
