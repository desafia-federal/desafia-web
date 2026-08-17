import { NextResponse } from "next/server";
import { listBenefactors } from "@/lib/benefactors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const benefactors = await listBenefactors();
    return NextResponse.json({ benefactors });
  } catch {
    return NextResponse.json({ benefactors: [] }, { status: 200 });
  }
}
