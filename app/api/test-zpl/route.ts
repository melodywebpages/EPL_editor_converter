import { NextResponse } from 'next/server';

/**
 * Test endpoint to verify Labelary API connectivity
 */
export async function GET() {
  try {
    // Simple test ZPL
    const testZpl = `^XA
^FO50,50^A0N,50,50^FDTest Label^FS
^XZ`;

    const labelaryUrl = 'http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/';
    
    console.log('Testing Labelary API...');
    console.log('URL:', labelaryUrl);
    console.log('ZPL:', testZpl);
    
    const response = await fetch(labelaryUrl, {
      method: 'POST',
      headers: {
        'Accept': 'image/png',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: testZpl,
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        status: response.status,
        error: errorText,
        zpl: testZpl
      });
    }

    const buffer = await response.arrayBuffer();
    
    return NextResponse.json({
      success: true,
      status: response.status,
      message: 'Labelary API is working correctly',
      imageSize: buffer.byteLength,
      zpl: testZpl
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

