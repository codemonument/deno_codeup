import { Kia } from "https://deno.land/x/kia@v0.1.0/kia.ts";

export function startKia(text: string): Kia {
  const kia = new Kia(text);
  return kia;
}
