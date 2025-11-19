import { NextRequest, NextResponse } from 'next/server';
import { convertEplToZpl, getLabelDimensions } from '@/utils/eplToZpl';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const outputFormat = formData.get('format') as string || 'pdf';
    const labelSize = formData.get('labelSize') as string || 'auto';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read the EPL file content
    const eplContent = await file.text();

    // Convert EPL to ZPL
    const conversionResult = convertEplToZpl(eplContent);
    const { zpl, warnings } = conversionResult;

    // If user just wants ZPL, return it directly
    if (outputFormat === 'zpl') {
      return new NextResponse(zpl, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="${file.name.replace('.epl', '')}.zpl"`,
        },
      });
    }

    // Get label dimensions from EPL or use specified size
    const dimensions = getLabelDimensions(eplContent);
    let width: string;
    let height: string;
    const dpmm = dimensions.dpmm;

    // Override dimensions if a specific label size is selected
    if (labelSize !== 'auto') {
      switch (labelSize) {
        case '4x6':
          width = '4';
          height = '6';
          break;
        case '4x4':
          width = '4';
          height = '4';
          break;
        case '2.25x4':
          width = '2.25';
          height = '4';
          break;
        default:
          width = dimensions.width.toString();
          height = dimensions.height.toString();
      }
    } else {
      width = dimensions.width.toString();
      height = dimensions.height.toString();
    }

    // Call Labelary API to convert ZPL to PDF
    const labelaryUrl = `http://api.labelary.com/v1/printers/${dpmm}dpmm/labels/${width}x${height}/0/`;
    
    console.log('Calling Labelary API:', labelaryUrl);
    console.log('ZPL content:', zpl);
    console.log('Output format:', outputFormat);
    
    const labelaryResponse = await fetch(labelaryUrl, {
      method: 'POST',
      headers: {
        'Accept': outputFormat === 'pdf' ? 'application/pdf' : 'image/png',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: zpl,
    });

    console.log('Labelary response status:', labelaryResponse.status);
    console.log('Labelary response headers:', Object.fromEntries(labelaryResponse.headers.entries()));

    if (!labelaryResponse.ok) {
      const errorText = await labelaryResponse.text();
      console.error('Labelary API error:', errorText);
      console.error('Status:', labelaryResponse.status);
      console.error('ZPL sent:', zpl);
      
      return NextResponse.json(
        { 
          error: 'Failed to convert to PDF/PNG', 
          details: `Labelary API returned ${labelaryResponse.status}: ${errorText}`,
          zpl: zpl,
          warnings: warnings,
          statusCode: labelaryResponse.status,
          apiUrl: labelaryUrl
        },
        { status: 500 }
      );
    }

    const contentType = labelaryResponse.headers.get('content-type') || 'application/pdf';
    const buffer = await labelaryResponse.arrayBuffer();

    const fileExtension = outputFormat === 'pdf' ? 'pdf' : 'png';
    const fileName = file.name.replace('.epl', `.${fileExtension}`);

    // Return the PDF/PNG with warnings in headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'X-Conversion-Warnings': warnings.length > 0 ? JSON.stringify(warnings) : 'none',
        'X-Label-Dimensions': `${width}x${height}`,
      },
    });

  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { 
        error: 'Conversion failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

