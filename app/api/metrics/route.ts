import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  // Simulate heavy high-concurrency workloads metrics
  return NextResponse.json({
    activeConnections: Math.floor(Math.random() * 5000) + 1000,
    cpuLoad: (Math.random() * 40 + 10).toFixed(1) + "%",
    memoryUsage: (Math.random() * 2 + 1).toFixed(2) + "GB",
    timestamp: new Date().toISOString()
  });
}
