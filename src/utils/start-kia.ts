import { Kia } from "https://deno.land/x/kia@v0.1.0/kia.ts";

export async function startKia(text: string): Promise<Kia> {
  const kia = new Kia(text);
  await kia.start();
  return kia;
}
