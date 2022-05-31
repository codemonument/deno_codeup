import { Kia } from "../deps/_kia.ts";

export async function startKia(text: string): Promise<Kia> {
  const kia = new Kia(text);
  await kia.start();
  return kia;
}
