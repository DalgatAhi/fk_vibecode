import { NextResponse } from "next/server";
import { requestFormSchema } from "@/lib/utils/schema";

const requestStore: string[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Некорректные данные формы.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  requestStore.push(JSON.stringify(parsed.data));

  return NextResponse.json({
    ok: true,
    message: "Заявка отправлена.",
    requestId: requestStore.length,
  });
}
