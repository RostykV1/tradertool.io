import { Currencies } from "./shared";

export const transformToCurrency = (value: number, withCents?: boolean, currency?: Currencies): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: withCents ? 2 : 0,
  });

  return formatter.format(value);
};

export const spaceOrganizer = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
