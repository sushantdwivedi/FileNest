# 📁 FileNest

**FileNest** is a modern, mobile-first file upload and management app built with **Expo** using **Bun** as the package manager. Users can easily **select, validate, upload, preview, and manage image and PDF files** — all securely stored in **Supabase Storage**.

---

## 🚀 Features

### ✅ File Picker & Validation
- Select files using `expo-document-picker` or `expo-image-picker`
- Accepted formats:
  - Images: `.png`, `.jpg`, `.jpeg`
  - Documents: `.pdf`
- Max file size: **5 MB**
- Smart validation flow:
  - ❌ No file selected → "No file selected."
  - ❌ Invalid file → "Only PNG/JPG/PDF under 5 MB allowed."
  - ✅ Valid file → Proceed to upload

---

### ☁️ Upload to Supabase
- Uploads files to a Supabase **Storage Bucket**
- Loading indicators during upload
- Graceful error handling (network or storage issues)
- Retrieve **public URLs** for previews

---

### 👀 File Preview
- After upload:
  - 🖼️ Images are previewed directly
  - 📄 PDFs open in browser via `WebBrowser.openBrowserAsync()`

---

### 📄 List & Manage Files
- Fetch and display previously uploaded files
- Show file names and appropriate previews
- **Swipe-to-delete** using `react-native-gesture-handler`
  - Delete from Supabase
  - Optimistically remove from UI

---

### 🎨 Styling & Code Quality
- Styled with **NativeWind** (Tailwind CSS for React Native)
- Linted and formatted with **Biome**
  - Supports JS/TS/JSON
  - Recommended rules + custom overrides
- Built with:
  - **React Hooks** for state/effects
  - Modular structure
  - Reusable components:
    - `FilePickerButton`
    - `FilePreview`
    - `UploadedFileList`
    - `SwipeableFileItem`

---

### 🌟 Bonus Features
- ✅ Toast/snackbar on upload/delete success
- 🔄 Pull-to-refresh for file list

---

## 🛠 Tech Stack

| Tool         | Purpose                           |
|--------------|-----------------------------------|
| **Bun**      | Package manager                   |
| **Expo**     | React Native framework            |
| **NativeWind** | Tailwind styling for React Native |
| **Supabase** | File storage backend              |
| **Biome**    | Linter and formatter              |


---

## 🧰 Project Structure

components/
├── FilePickerButton.tsx
├── FilePreview.tsx
├── UploadedFileList.tsx
└── SwipeableFileItem.tsx

lib/
└── supabaseClient.ts



---

## 🏁 Getting Started

### ⚙️ Prerequisites

- [Bun](https://bun.sh/) installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally

### 📦 Install dependencies

```bash
bun install
bun dev
```


---

Let me know if you’d like:
- GitHub badges (e.g., build passing, license)
- A version with working screenshot placeholders
- A CONTRIBUTING.md file or LICENSE template

Or I can help you scaffold the repo from scratch if you want to publish it right.
