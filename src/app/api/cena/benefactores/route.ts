import { benefactorStoreIsConfigured, listInitialBenefactors } from "@/lib/benefactors";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const configured = benefactorStoreIsConfigured();

  try {
    const benefactors = await listInitialBenefactors();

    return Response.json(
      { benefactors, configured },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    console.error(
      "No se pudo leer la nómina de benefactores:",
      error instanceof Error ? error.message : "error desconocido",
    );
    return Response.json(
      { benefactors: [], configured, error: "No pudimos actualizar la nómina." },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
