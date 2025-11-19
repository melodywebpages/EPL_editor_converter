# EPL Editor & Converter

A modern Next.js web application that lets you **edit EPL (Eltron Programming Language) code with live preview** and convert to ZPL (Zebra Programming Language), PDF, or PNG formats using the Labelary API.

![EPL Editor & Converter](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

### 📝 **EPL Code Editor**
- **Live Code Editing** - Edit EPL code directly in the browser
- **Real-time Preview** - See label visualization update as you type (1-second debounce)
- **Syntax Display** - Monospace font with proper formatting
- **Auto-save** - Changes preserved during editing session

### 👁️ **Visual Preview**
- **Split-View Interface** - EPL code on left, live preview on right
- **Instant Rendering** - Preview updates automatically after editing
- **High-Quality Visualization** - PNG preview of actual label output
- **Manual Refresh** - Force update preview with refresh button

### 🔄 **Conversion & Export**
- **Multiple Output Formats** - Export as PDF, ZPL, or PNG
- **EPL to ZPL Translation** - Converts common EPL commands to ZPL format
- **Download Edited Version** - Export includes your code changes
- **Fast Processing** - Real-time conversion using the Labelary API

### 🎨 **User Experience**
- 📤 **Drag & Drop Upload** - Easy file upload with drag-and-drop support
- ⚠️ **Warning System** - Alerts about unsupported or problematic commands
- 🔍 **Auto Label Detection** - Automatically detects label dimensions from EPL
- 📊 **File Statistics** - Line count and file size display
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS
- 📱 **Mobile Responsive** - Works on desktop, tablet, and mobile devices

## Supported EPL Commands

The converter supports the following EPL commands:

| EPL Command | Description | ZPL Equivalent |
|-------------|-------------|----------------|
| `A` | ASCII text | `^FO`, `^A`, `^FD` |
| `B` | Barcode | `^FO`, `^BY`, `^B` |
| `LO` | Line draw (rectangle) | `^GB` |
| `LS` | Line draw (diagonal) | `^GB` (approximated) |
| `Q` | Label height | `^LL` |
| `q` | Label width | `^PW` |
| `P` | Print quantity | `^PQ` |
| `N` | Clear buffer | Handled by `^XA` |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/epl-pdf-zpl.git
cd epl-pdf-zpl
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Quick Start
1. **Upload an EPL file** - Click the upload area or drag and drop your `.epl` or `.txt` file
2. **View split-screen interface** - EPL code appears in editor, preview generates automatically
3. **Edit the code** (optional) - Make changes directly in the editor
4. **Watch live preview** - Label visualization updates as you type
5. **Select output format** - Choose between PDF, ZPL, or PNG
6. **Convert & Download** - Click convert to export your edited label

### Editing Features
- **Live Preview**: Changes reflect in preview after 1 second of inactivity
- **Manual Refresh**: Click "🔄 Refresh" button to update preview instantly
- **Edited Badge**: Shows when code has been modified from original
- **Statistics**: View line count and file size in real-time

### Example EPL Files

**Simple Example:**
```epl
N
q457
Q228,32,-16
D7
A12,18,0,2,1,1,R,ACME Co.
A100,45,0,1,2,2,N,$9.99
A20,80,0,3,1,1,N,Widget Model X
B30,110,0,1,2,7,70,B,123456789012
L
P1
```

This creates a product label with company name, price, product name, and barcode.

**With Quotes:**
```epl
N
Q609,24
q831
A100,100,0,3,1,1,N,"Hello World"
B200,200,0,1,2,6,100,N,"123456789"
P1
```

Both formats (with and without quotes) are supported.

### Complex Test Case

For a comprehensive test, check out `test/complex-shipping-waybill.epl` which includes:
- 4 complete labels (3 waybills + 1 packing slip)
- 14 barcodes
- 135+ text fields
- Real-world shipping scenario

See `test/TEST-RESULTS.md` for detailed test results.

## Project Structure

```
epl-pdf-zpl/
├── app/
│   ├── api/
│   │   ├── convert/
│   │   │   └── route.ts       # API endpoint for conversion
│   │   └── test-zpl/
│   │       └── route.ts       # API test endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page component
├── utils/
│   └── eplToZpl.ts            # EPL to ZPL converter logic
├── test/
│   ├── *.epl                  # Test EPL files
│   ├── test-conversion.js     # Simple test script
│   ├── test-complex.js        # Complex test script
│   ├── README.md              # Test documentation
│   └── TEST-RESULTS.md        # Detailed test results
├── package.json
├── tsconfig.json
├── CHANGELOG.md
└── README.md
```

## API Integration

This application uses the [Labelary API](https://labelary.com/service.html) to render ZPL as PDF or PNG images. The API endpoint used is:

```
POST http://api.labelary.com/v1/printers/{dpmm}/labels/{width}x{height}/{index}/
```

### Parameters

- `dpmm`: Dots per millimeter (default: 8dpmm)
- `width`: Label width in inches (default: 4)
- `height`: Label height in inches (default: 6)
- `index`: Label index (default: 0)

## Limitations

- Complex or proprietary EPL commands may not be fully supported
- Diagonal lines (LS command) are approximated as rectangles in ZPL
- Some advanced formatting options may not translate perfectly
- The Labelary API has rate limits (3 requests/second on free tier)

## Google Ads Compliance

This project includes all necessary compliance requirements for Google Ads approval:

- ✅ **Privacy Policy** - Comprehensive data protection and privacy disclosure
- ✅ **Terms of Service** - Legal terms and conditions
- ✅ **Cookie Consent Banner** - GDPR-compliant cookie notice
- ✅ **Contact Page** - Multiple contact methods and FAQ
- ✅ **Professional Footer** - Links to all legal pages
- ✅ **SEO Optimization** - Complete meta tags and sitemap
- ✅ **ads.txt** - Authorized digital sellers file
- ✅ **robots.txt** - Search engine directives

See `GOOGLE_ADS_COMPLIANCE.md` for the complete checklist and setup instructions.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Labelary API** - ZPL rendering service
- **React Hooks** - useState, useEffect, useRef for editor functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Labelary](https://labelary.com/) for providing the ZPL rendering API
- EPL and ZPL programming language documentation

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ using Next.js and TypeScript

