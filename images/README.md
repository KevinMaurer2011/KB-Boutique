# K&B Boutique - Image Organization

## Folder Structure

### `/images/` - Main Images (Static/Constant)
Use this folder for images that will stay the same on your website:

- **`logo.png`** - Your boutique logo (recommended: 200x100px or similar)
- **`hero-image.jpg`** - Main hero/banner image (recommended: 1200x600px)
- **`about-image.jpg`** - About section image (recommended: 600x400px)
- **`favicon.ico`** - Website favicon (16x16px or 32x32px)

### `/images/gallery/` - Photo Gallery
Use this folder for all your boutique photos that will scroll in the gallery:

- **`photo1.jpg`** - First gallery photo (recommended: 400x500px)
- **`photo2.jpg`** - Second gallery photo (recommended: 400x500px)
- **`photo3.jpg`** - Third gallery photo (recommended: 400x500px)
- **`photo4.jpg`** - Fourth gallery photo (recommended: 400x500px)
- **`photo5.jpg`** - Fifth gallery photo (recommended: 400x500px)
- **`photo6.jpg`** - Sixth gallery photo (recommended: 400x500px)
- **`photo7.jpg`** - Seventh gallery photo (recommended: 400x500px)
- **`photo8.jpg`** - Eighth gallery photo (recommended: 400x500px)
- **`photo9.jpg`** - Ninth gallery photo (recommended: 400x500px)
- **`photo10.jpg`** - Tenth gallery photo (recommended: 400x500px)
- **`photo11.jpg`** - Eleventh gallery photo (recommended: 400x500px)
- **`photo12.jpg`** - Twelfth gallery photo (recommended: 400x500px)
- Add more photos as needed: `photo13.jpg`, `photo14.jpg`, etc.

**Note**: The gallery automatically displays ALL photos you add! Just name them sequentially (photo1.jpg, photo2.jpg, etc.) and update the `photoCount` in `script.js` if you add more than 12.

## Image Guidelines

### Recommended Sizes:
- **Hero images**: 1200x600px (2:1 ratio)
- **About section**: 600x400px (3:2 ratio)
- **Logo**: 200x100px or similar
- **Gallery photos**: 400x500px (4:5 ratio)

### File Formats:
- **Photos**: Use `.jpg` for photos with many colors
- **Logos/Graphics**: Use `.png` for images with transparency
- **Web optimization**: Keep file sizes under 500KB for fast loading

## How to Update Images

1. **Replace existing images**: Simply drop new images with the same filename
2. **Add new gallery photos**: Add to `/gallery/` folder with sequential names like `photo13.jpg`, `photo14.jpg`, etc.
3. **Update photo count**: If you add more than 12 photos, update the `photoCount` value in `script.js`

## Current Image Setup

Your website is now set up with dynamic image loading:

- **Hero section**: `images/hero-image.jpg`
- **About section**: `images/about-image.jpg`  
- **Gallery photos**: `images/gallery/photo1.jpg` through `images/gallery/photo12.jpg` (automatically loaded)

## Adding More Gallery Photos

To add more than 12 photos:
1. Add new photos to `/images/gallery/` folder
2. Name them sequentially: `photo13.jpg`, `photo14.jpg`, etc.
3. Update the `photoCount` value in `script.js` (line 315) to match your total number of photos
4. The gallery will automatically display all photos!
