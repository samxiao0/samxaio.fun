# Background Music Setup Instructions

To add your favorite song to the website:

1. **Add your audio file** to the `public` folder (e.g., `your-favorite-song.mp3`)
2. **Update the src** in `src/App.tsx` to match your filename
3. **Legal note**: Make sure you have rights to use the music

## Browser Autoplay Policies ⚠️

**Important:** Most modern browsers block autoplay audio without user interaction due to policies. Here's what happens:

- **First visit**: Music won't autoplay automatically
- **After user clicks anywhere**: Music can then be controlled via the floating button
- **Manual control**: Users can always play/pause/mute using the floating music button

## Features:
- 🎵 Floating music control button (bottom-right)
- ▶️ Play/Pause controls
- 🔇 Mute/Unmute option
- 🔄 Loops automatically
- 📱 Responsive design

## Alternative Approach:
If you want guaranteed autoplay, consider:
- Adding a welcome modal that asks users to enable audio
- Using HTML audio with controls visible
- Letting users opt-in to background music

The current implementation respects user preferences and browser policies!