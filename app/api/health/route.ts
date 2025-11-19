import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Cloud Run and monitoring
 */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'epl-editor-converter',
    version: process.env.npm_package_version || '1.0.0',
  });
}

