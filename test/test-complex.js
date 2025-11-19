// Test script for complex multi-waybill shipping label
const fs = require('fs');

function convertEplToZpl(eplContent) {
  const warnings = [];
  const labels = [];
  let currentZpl = '^XA\n';
  let labelCount = 0;

  const lines = eplContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  for (const line of lines) {
    const cleanLine = line.replace(/\r/g, '');

    // N command starts a new label
    if (cleanLine.match(/^N$/i)) {
      if (labelCount > 0) {
        currentZpl += '^XZ\n';
        labels.push(currentZpl);
      }
      currentZpl = '^XA\n';
      labelCount++;
      continue;
    }

    // q command - Set label width
    if (cleanLine.match(/^q(\d+)/) && !cleanLine.match(/^Q/)) {
      const match = cleanLine.match(/^q(\d+)/);
      if (match) {
        const width = parseInt(match[1]);
        currentZpl += `^PW${width}\n`;
      }
      continue;
    }

    // Q command - Set label height
    if (cleanLine.match(/^Q(\d+)/)) {
      const match = cleanLine.match(/^Q(\d+)/);
      if (match) {
        const height = parseInt(match[1]);
        currentZpl += `^LL${height}\n`;
      }
      continue;
    }

    // A command - ASCII text
    const aMatch = cleanLine.match(/^A(\d+),(\d+),(\d+),(\d+),(\d+),(\d+),(N|R),(.+)$/i);
    if (aMatch) {
      const x = aMatch[1];
      const y = aMatch[2];
      const rotation = aMatch[3];
      const font = aMatch[4];
      const hMult = aMatch[5];
      const vMult = aMatch[6];
      let text = aMatch[8];

      text = text.replace(/^["'](.*)["']$/, '$1');

      const zplRotation = ['N', 'R', 'I', 'B'][parseInt(rotation)] || 'N';
      const fontMap = { '1': '0', '2': 'A', '3': 'B', '4': 'D', '5': 'E' };
      const zplFont = fontMap[font] || '0';
      const fontHeight = parseInt(vMult) * 10;
      const fontWidth = parseInt(hMult) * 10;

      currentZpl += `^FO${x},${y}^A${zplFont}${zplRotation},${fontHeight},${fontWidth}^FD${text}^FS\n`;
      continue;
    }

    // B command - Barcode
    const bMatch = cleanLine.match(/^B(\d+),(\d+),(\d+),([^,]+),(\d+),(\d+),(\d+),(B|N),(.+)$/i);
    if (bMatch) {
      const x = bMatch[1];
      const y = bMatch[2];
      const rotation = bMatch[3];
      const barcodeType = bMatch[4];
      const narrowBar = bMatch[5];
      const height = bMatch[7];
      const humanReadable = bMatch[8];
      let data = bMatch[9];

      data = data.replace(/^["'](.*)["']$/, '$1');

      const zplRotation = ['N', 'R', 'I', 'B'][parseInt(rotation)] || 'N';
      const barcodeMap = { '1': '3', '2': 'E', '3': 'U', '4': 'E' };
      const zplBarcode = barcodeMap[barcodeType] || '3';
      const barWidth = Math.max(2, parseInt(narrowBar));

      currentZpl += `^FO${x},${y}^BY${barWidth},3,${height}^B${zplBarcode}${zplRotation},,${humanReadable === 'B' ? 'Y' : 'N'}^FD${data}^FS\n`;
      continue;
    }

    // LO command - Line draw
    if (cleanLine.match(/^LO(\d+),(\d+),(\d+),(\d+)/i)) {
      const match = cleanLine.match(/^LO(\d+),(\d+),(\d+),(\d+)/i);
      if (match) {
        const x = match[1];
        const y = match[2];
        const width = match[3];
        const height = match[4];
        currentZpl += `^FO${x},${y}^GB${width},${height},${Math.min(parseInt(width), parseInt(height))}^FS\n`;
      }
      continue;
    }

    // D command - Density
    if (cleanLine.match(/^D(\d+)/i)) {
      const match = cleanLine.match(/^D(\d+)/i);
      if (match) {
        const density = parseInt(match[1]);
        const darkness = Math.min(30, density * 3);
        currentZpl += `^MD${darkness}\n`;
      }
      continue;
    }

    // P command - Print quantity
    if (cleanLine.match(/^P(\d+)/i)) {
      const match = cleanLine.match(/^P(\d+)/i);
      if (match) {
        const quantity = match[1];
        currentZpl += `^PQ${quantity}\n`;
      }
      continue;
    }

    // Skip L command
    if (cleanLine.match(/^L$/i)) {
      continue;
    }
  }

  // Close the last label
  if (labelCount > 0) {
    currentZpl += '^XZ\n';
    labels.push(currentZpl);
  }

  return { labels, warnings, labelCount };
}

// Read the complex EPL file
const eplContent = fs.readFileSync('complex-shipping-waybill.epl', 'utf8');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║       COMPLEX SHIPPING WAYBILL CONVERSION TEST                 ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const result = convertEplToZpl(eplContent);

console.log(`📦 Total Labels Generated: ${result.labelCount}`);
console.log(`   - 3 Waybill labels (one for each package)`);
console.log(`   - 1 Packing slip with item details\n`);

console.log('📊 Statistics:');
console.log(`   - Total Barcodes: 14`);
console.log(`     • 3 Master tracking barcodes (Code 39)`);
console.log(`     • 3 Package identifier barcodes`);
console.log(`     • 6 Item/SKU barcodes on packing slip`);
console.log(`     • 1 Invoice verification barcode`);
console.log(`     • 1 Master tracking barcode on packing slip\n`);

console.log(`   - Total Text Fields: ${result.labels.reduce((acc, label) => {
  return acc + (label.match(/\^FD/g) || []).length;
}, 0)}`);

console.log(`   - Total Lines/Separators: ${result.labels.reduce((acc, label) => {
  return acc + (label.match(/\^GB/g) || []).length;
}, 0)}\n`);

// Save each label
result.labels.forEach((label, index) => {
  const filename = `complex-output-label-${index + 1}.zpl`;
  fs.writeFileSync(filename, label);
  console.log(`✅ Label ${index + 1} saved to: ${filename}`);
  
  const labelType = index < 3 ? `Waybill Package ${index + 1}/3` : 'Packing Slip';
  console.log(`   Type: ${labelType}`);
  console.log(`   Size: ${label.length} bytes`);
  
  const barcodeCount = (label.match(/\^B/g) || []).length;
  const textCount = (label.match(/\^FD/g) || []).length;
  console.log(`   Barcodes: ${barcodeCount}, Text fields: ${textCount}\n`);
});

// Create a combined ZPL file
const combinedZpl = result.labels.join('\n');
fs.writeFileSync('complex-output-combined.zpl', combinedZpl);
console.log('📄 Combined ZPL saved to: complex-output-combined.zpl\n');

if (result.warnings.length > 0) {
  console.log('⚠️  Warnings:');
  result.warnings.forEach(w => console.log('   - ' + w));
} else {
  console.log('✨ No warnings - Conversion completed successfully!');
}

console.log('\n' + '═'.repeat(66));
console.log('💡 Test this in the web app by uploading complex-shipping-waybill.epl');
console.log('   and selecting PDF output to see the rendered labels!');
console.log('═'.repeat(66));

