import { NextResponse } from "next/server";

// Validates the brief without sending or retaining personal information.
export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > 20000)
    return NextResponse.json(
      { error: "Please keep your brief under 20 KB." },
      { status: 413 },
    );
  const origin = request.headers.get("origin");
  try {
    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      new URL(request.url).host;
    if (origin && new URL(origin).host !== host)
      return NextResponse.json(
        { error: "Please submit through the portfolio contact form." },
        { status: 403 },
      );
  } catch {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  }
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "Please send a valid brief." },
      { status: 400 },
    );
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return NextResponse.json(
      { error: "Please send a valid brief." },
      { status: 400 },
    );
  if (data.website)
    return NextResponse.json(
      { error: "Unable to submit this request." },
      { status: 400 },
    );
  const fields = [
    "Name",
    "Handle",
    "Project",
    "Campaign Type",
    "Budget",
    "Creators",
    "Timeline",
    "Message",
  ];
  const values = Object.fromEntries(
    fields.map((key) => [
      key,
      typeof data[key] === "string" ? data[key].trim() : "",
    ]),
  );
  const types = [
    "KOL Campaign",
    "Content",
    "Video / UGC",
    "Creator Partnership",
    "Other",
  ];
  if (
    !values.Name ||
    values.Name.length > 100 ||
    !/^@?[a-zA-Z0-9_]{1,50}$/.test(values.Handle) ||
    values.Message.length < 10 ||
    values.Message.length > 5000 ||
    !types.includes(values["Campaign Type"]) ||
    (values.Creators &&
      (!/^\d+$/.test(values.Creators) ||
        Number(values.Creators) < 1 ||
        Number(values.Creators) > 10000)) ||
    fields.some((k) => k !== "Message" && values[k].length > 300)
  ) {
    return NextResponse.json(
      {
        error:
          "Please enter your name, a valid Telegram or X handle, and a message of 10–5,000 characters.",
      },
      { status: 400 },
    );
  }
  return NextResponse.json({ mode: "brief" });
}
