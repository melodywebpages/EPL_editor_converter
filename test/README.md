# Test Files

This folder contains test EPL files and utilities for testing the EPL to ZPL converter.

## Test Files

### EPL Files

- **`sample.epl`** - Original sample label with text, barcode, and line
- **`test-simple.epl`** - Minimal test case with just text
- **`test-user.epl`** - Real-world product label example with:
  - Company name (ACME Co.)
  - Price ($9.99)
  - Product name (Widget Model X)
  - Barcode (123456789012)
  
- **`complex-shipping-waybill.epl`** - **COMPREHENSIVE TEST** - Multi-label shipping document with:
  - **4 Complete Labels:**
    - 3 Package waybill labels (Package 1/3, 2/3, 3/3)
    - 1 Detailed packing slip
  - **14 Barcodes Total:**
    - 3 Master tracking numbers (Code 39 format)
    - 3 Package identifier barcodes
    - 6 Item/SKU barcodes
    - 1 Invoice verification barcode
    - 1 Order barcode on packing slip
  - **135+ Text Fields** including:
    - Sender and recipient addresses
    - Service level and delivery info
    - Package weights and dimensions
    - Reference numbers, PO, and invoice
    - Item quantities and descriptions
    - Special handling instructions
  - **20 Line Separators** for visual organization
  - **Total Output:** ~6.5KB of ZPL code

### Output Files

- **`test-output.zpl`** - Generated ZPL from running `test-conversion.js`

### Utilities

- **`test-conversion.js`** - Simple conversion test script
  - Tests single-label EPL conversion
  - Outputs the generated ZPL
  - Shows conversion warnings

- **`test-complex.js`** - Complex multi-label test script
  - Tests the complex shipping waybill EPL
  - Generates 4 separate ZPL files
  - Creates a combined ZPL output
  - Shows detailed statistics about:
    - Number of labels generated
    - Total barcodes and text fields
    - File sizes and content breakdown

## Running Tests

### Simple Test (Command Line)

```bash
cd test
node test-conversion.js
```

This will:
1. Convert the simple test EPL to ZPL
2. Display the input and output
3. Save the result to `test-output.zpl`
4. Show any warnings

### Complex Test (Multi-Label Waybill)

```bash
cd test
node test-complex.js
```

This will:
1. Convert the complex shipping waybill (4 labels)
2. Generate separate ZPL files for each label:
   - `complex-output-label-1.zpl` - Package 1/3 waybill
   - `complex-output-label-2.zpl` - Package 2/3 waybill
   - `complex-output-label-3.zpl` - Package 3/3 waybill
   - `complex-output-label-4.zpl` - Packing slip
3. Create `complex-output-combined.zpl` with all labels
4. Display detailed statistics
5. Show barcode and text field counts

### Test in the Web App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Upload any of the `.epl` files in this folder

3. Choose your output format (PDF, ZPL, or PNG)

4. Click "Convert" to see the result

## Expected Outputs

### test-user.epl → ZPL

```zpl
^XA
^PW457
^LL228
^MD21
^FO12,18^AAN,10,10^FDACME Co.^FS
^FO100,45^A0N,20,20^FD$9.99^FS
^FO20,80^ABN,10,10^FDWidget Model X^FS
^FO30,110^BY2,3,70^B3N,,Y^FD123456789012^FS
^PQ1
^XZ
```

This should render as a proper product label with all fields positioned correctly.

## Test Coverage

The test files cover:

✅ **Basic Features:**
- Simple text fields
- Single barcodes
- Label dimensions

✅ **Intermediate Features:**
- Multiple text fields with different fonts
- Various barcode types
- Lines and separators
- Mixed font sizes

✅ **Advanced Features:**
- Multi-label documents (4 labels in one file)
- Complex layouts with many fields
- Multiple barcodes per label (up to 14 total)
- Realistic shipping/logistics use case
- Package tracking and inventory data
- Dense information layouts

## Adding New Test Cases

To add a new test case:

1. Create a new `.epl` file with your EPL content
2. Test it using the web app or test scripts
3. Verify the output looks correct
4. Document any special features or edge cases
5. Consider adding a dedicated test script for complex cases

## Troubleshooting

If a test fails:

1. Check the generated ZPL in `test-output.zpl`
2. Use the "Test Labelary API Connection" button in the web app
3. Review conversion warnings
4. Verify the EPL syntax is correct
5. Check that all commands are supported (see main README.md)

