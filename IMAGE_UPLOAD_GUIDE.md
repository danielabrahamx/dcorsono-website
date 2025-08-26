# 📸 Golden Dawn Product Image Upload Guide

## 🎯 Quick Start

1. **Go to Product Admin**: http://localhost:3000/admin/products
2. **Fill product details** (use Quick Fill buttons for Golden Dawn products)
3. **Upload images** using the drag & drop interface
4. **Generate product code** with real image paths
5. **Copy & paste** into CorsonoPage.tsx

## 📁 Image Organization

### Automatic File Structure:
```
images/
└── corsono/
    ├── [uuid].jpg    (your uploaded hoodie images)
    ├── [uuid].jpg    (your uploaded tracksuit images)
    └── [uuid].jpg    (your uploaded set images)
```

### Image Naming:
- Images are automatically renamed with UUID for security
- Original filenames are preserved in the upload process
- Images are accessible via: `/images/corsono/[filename]`

## 🖼️ Image Requirements

### File Formats:
- ✅ JPG/JPEG
- ✅ PNG
- ✅ WebP

### Recommended Specs:
- **Resolution**: 1200x1200px minimum
- **Aspect Ratio**: Square (1:1) for best display
- **File Size**: Under 5MB per image
- **Quality**: High quality for product showcase

## 🚀 Upload Process

### Method 1: Admin Interface (Recommended)
1. Enter product name first
2. Drag & drop multiple images
3. See real-time upload progress
4. Preview uploaded images
5. Copy formatted image paths

### Method 2: Direct Upload (Alternative)
- Use the Corsono Gallery: http://localhost:3000/corsono-gallery
- Upload images there
- Manually copy image URLs
- Add to product code manually

## 💡 Pro Tips

### For Golden Dawn Collection:
1. **Hoodie Photos**: Front, back, side, detail shots, lifestyle
2. **Tracksuit Bottoms**: Front, back, side, waist detail, fabric close-up
3. **Full Set**: Styled together, separate pieces, lifestyle shots

### Image Order Matters:
- First image = main product image
- Additional images = gallery/detail shots
- Consider: front → back → details → lifestyle

### Upload Strategy:
1. Upload hoodie images first
2. Generate hoodie product code
3. Upload tracksuit images
4. Generate tracksuit product code
5. Upload set images (or reuse individual images)
6. Generate set product code

## 🔧 Technical Details

### Backend Integration:
- Uses existing `/api/corsono/gallery/upload` endpoint
- Supports multiple file upload
- Automatic UUID generation
- File type validation

### Frontend Integration:
- Real-time upload progress
- Image preview grid
- Automatic path generation
- Copy-to-clipboard functionality

### Security:
- File type validation
- UUID-based filenames
- Size limitations
- CORS protection

## 📋 Example Usage

1. **Fill "Golden Dawn Hoodie" details**
2. **Upload 3-5 hoodie images**
3. **Click "Copy Image Paths"**
4. **Generate product code** (includes real image URLs)
5. **Paste into CorsonoPage.tsx products array**

Result: Beautiful product display with your actual images! ✨

## 🆘 Troubleshooting

### Upload Issues:
- Ensure product name is filled first
- Check file format (JPG/PNG/WebP only)
- Verify file size (under 5MB)
- Check internet connection

### Path Issues:
- Use "Copy Image Paths" button for correct formatting
- Ensure images are uploaded before generating code
- Check that backend server is running (port 3001)

### Display Issues:
- Clear browser cache
- Check image URLs are accessible
- Verify product code is properly formatted
- Ensure images are in /images/corsono/ folder

---

**Ready to showcase your Golden Dawn collection with stunning product photography! 📸✨**
