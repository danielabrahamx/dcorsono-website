# 🛍️ Golden Dawn Collection Setup Guide

## 🎯 What You Now Have

### ✅ **Real Corsono Shop**
- **URL**: http://localhost:3000/corsono
- **Features**: Full e-commerce interface with cart, product modals, filtering
- **Data**: Loads from `frontend/public/data/products.json`

### ✅ **Product Admin Panel**
- **URL**: http://localhost:3000/admin/products  
- **Purpose**: Generate product JSON for your products.json file

## 🚀 How to Add Your Golden Dawn Products

### **Step 1: Add Product Images**
1. **Create folder**: `frontend/public/images/products/`
2. **Add your images** with these names:
   ```
   golden-dawn-hoodie-1.jpg
   golden-dawn-hoodie-2.jpg
   golden-dawn-tracksuit-1.jpg
   golden-dawn-tracksuit-2.jpg
   golden-dawn-set-1.jpg
   golden-dawn-set-2.jpg
   ```

### **Step 2: Update Products Data**
1. **Open**: `frontend/public/data/products.json`
2. **Update the prices** to your actual £ prices
3. **Update descriptions** with your copy
4. **Add more image paths** if you have more photos

### **Step 3: Test Your Shop**
1. **Visit**: http://localhost:3000/corsono
2. **Browse products** with real data
3. **Test cart functionality**
4. **Try product modals**

## 📸 Image Requirements

### **Format & Size:**
- **Formats**: JPG, PNG, WebP
- **Resolution**: 1200x1200px minimum  
- **Aspect Ratio**: Square (1:1) preferred
- **File Size**: Under 2MB each

### **Naming Convention:**
```
product-name-1.jpg    (main image)
product-name-2.jpg    (detail/lifestyle)
product-name-3.jpg    (additional angles)
```

## 🎨 Current Product Setup

The shop is pre-loaded with your Golden Dawn collection:

### **1. Golden Dawn Hoodie - £75**
- Category: Hoodies
- Description: Premium hoodie embodying conscious luxury
- Sizes: S, M, L, XL
- Colors: Black, Gold

### **2. Golden Dawn Tracksuit Bottoms - £55**  
- Category: Tracksuit Bottoms
- Description: Luxurious bottoms for conscious comfort
- Sizes: S, M, L, XL
- Colors: Black, Gold

### **3. Golden Dawn Full Set - £115** 
- Category: Full Sets
- Description: Complete set with bundle savings
- Sizes: S, M, L, XL
- Colors: Black, Gold
- **Special**: £15 savings (was £130)

## 🛠️ Customization Options

### **Update Prices:**
Edit `frontend/public/data/products.json`:
```json
{
  "price": 85,           // Your actual price
  "originalPrice": 95,   // Optional: for sale pricing
  "savings": 10          // Auto-calculated discount
}
```

### **Add More Products:**
Use the admin panel at http://localhost:3000/admin/products to generate new product objects, then add them to the products.json array.

### **Modify Categories:**
Current categories: `hoodies`, `tracksuits`, `sets`
Add new ones in both the products.json and CorsonoShop.tsx

## 🎯 Next Steps

1. **Add your real product photos** to `/frontend/public/images/products/`
2. **Update prices and descriptions** in `products.json`
3. **Test the full shopping experience**
4. **Add payment integration** (when ready)

## 📱 Mobile Responsive

The shop is fully responsive and works beautifully on:
- ✅ Desktop
- ✅ Tablet  
- ✅ Mobile
- ✅ All screen sizes

## 🌟 Features Included

- ✅ **Product Grid** with filtering
- ✅ **Product Modals** with size/color selection
- ✅ **Shopping Cart** with persistent state
- ✅ **Price Display** in £ (GBP)
- ✅ **Stock Status** indicators
- ✅ **Bundle Pricing** with savings display
- ✅ **Responsive Design**
- ✅ **Mystical Styling** matching your brand

**Your Golden Dawn collection is now ready for conscious luxury shopping! 🌟**
