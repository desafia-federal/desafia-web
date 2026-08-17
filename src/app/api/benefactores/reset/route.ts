import { NextResponse } from "next/server";
import { clearBenefactors } from "@/lib/benefactors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Herramienta temporal para limpiar entradas de prueba. Protegida con el
// MP_WEBHOOK_SECRET (una credencial que sólo está en el entorno). Quitar
// junto con el diagnóstico una vez terminada la verificación.
export async function POST(request: Request) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  const provided = request.headers.get("x-reset-key");
  if (!secret || provided !== secret) {
    return NextResponse.json({ message: "No autorizado." }, { status: 401 });
  }
  const removed = await clearBenefactors();
  return NextResponse.json({ removed });
}
