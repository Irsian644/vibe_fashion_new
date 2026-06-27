import { site } from "./site";

export function price(value: number): string {
  return `${site.currencySymbol}${value.toFixed(0)}`;
}
