import type { FC } from "react";
import { CurrencyFlag } from "@/app/component/ui/currencyFlag";

type CurrencyDetails = {
  country: string;
  currencySymbol: string;
  currencyName: string;
  currencyShortForm: string;
  icon: FC<{ className?: string }>;
  iconName: string;
};

type CurrencyItem = {
  value: string;
  label: string;
  details: CurrencyDetails;
};

type RawItem = Omit<CurrencyItem, "details"> & {
  details: Omit<CurrencyDetails, "icon">;
};

const rawList: RawItem[] = [
  {
    value: "INR",
    label: "INR",
    details: {
      country: "India",
      currencySymbol: "₹",
      currencyName: "Indian Rupee",
      currencyShortForm: "INR",
      iconName: "IN",
    },
  },
  {
    value: "USD",
    label: "USD",
    details: {
      country: "United States",
      currencySymbol: "$",
      currencyName: "United States Dollar",
      currencyShortForm: "USD",
      iconName: "US",
    },
  },
  {
    value: "EUR",
    label: "EUR",
    details: {
      country: "European Union",
      currencySymbol: "€",
      currencyName: "Euro",
      currencyShortForm: "EUR",
      iconName: "EU",
    },
  },
  {
    value: "GBP",
    label: "GBP",
    details: {
      country: "United Kingdom",
      currencySymbol: "£",
      currencyName: "British Pound Sterling",
      currencyShortForm: "GBP",
      iconName: "GB",
    },
  },
  {
    value: "JPY",
    label: "JPY",
    details: {
      country: "Japan",
      currencySymbol: "¥",
      currencyName: "Japanese Yen",
      currencyShortForm: "JPY",
      iconName: "JP",
    },
  },
  {
    value: "KRW",
    label: "KRW",
    details: {
      country: "South Korea",
      currencySymbol: "₩",
      currencyName: "South Korean Won",
      currencyShortForm: "KRW",
      iconName: "KR",
    },
  },
  {
    value: "ILS",
    label: "ILS",
    details: {
      country: "Israel",
      currencySymbol: "₪",
      currencyName: "Israeli Shekel",
      currencyShortForm: "ILS",
      iconName: "IL",
    },
  },
  {
    value: "VND",
    label: "VND",
    details: {
      country: "Vietnam",
      currencySymbol: "₫",
      currencyName: "Vietnamese Dong",
      currencyShortForm: "VND",
      iconName: "VN",
    },
  },
  {
    value: "BDT",
    label: "BDT",
    details: {
      country: "Bangladesh",
      currencySymbol: "৳",
      currencyName: "Bangladeshi Taka",
      currencyShortForm: "BDT",
      iconName: "BD",
    },
  },
  {
    value: "RUB",
    label: "RUB",
    details: {
      country: "Russia",
      currencySymbol: "₽",
      currencyName: "Russian Ruble",
      currencyShortForm: "RUB",
      iconName: "RU",
    },
  },
  {
    value: "BRL",
    label: "BRL",
    details: {
      country: "Brazil",
      currencySymbol: "R$",
      currencyName: "Brazilian Real",
      currencyShortForm: "BRL",
      iconName: "BR",
    },
  },
  {
    value: "UAH",
    label: "UAH",
    details: {
      country: "Ukraine",
      currencySymbol: "₴",
      currencyName: "Ukrainian Hryvnia",
      currencyShortForm: "UAH",
      iconName: "UA",
    },
  },
  {
    value: "KZT",
    label: "KZT",
    details: {
      country: "Kazakhstan",
      currencySymbol: "₸",
      currencyName: "Kazakhstani Tenge",
      currencyShortForm: "KZT",
      iconName: "KZ",
    },
  },
  {
    value: "TWD",
    label: "TWD",
    details: {
      country: "Taiwan",
      currencySymbol: "NT$",
      currencyName: "New Taiwan Dollar",
      currencyShortForm: "TWD",
      iconName: "TW",
    },
  },
  {
    value: "IDR",
    label: "IDR",
    details: {
      country: "Indonesia",
      currencySymbol: "Rp",
      currencyName: "Indonesian Rupiah",
      currencyShortForm: "IDR",
      iconName: "ID",
    },
  },
  {
    value: "PKR",
    label: "PKR",
    details: {
      country: "Pakistan",
      currencySymbol: "₨",
      currencyName: "Pakistani Rupee",
      currencyShortForm: "PKR",
      iconName: "PK",
    },
  },
];

const attachIcon = (
  item: (typeof rawList)[number]
): CurrencyItem => ({
  ...item,
  details: {
    ...item.details,
    icon: ({ className }: { className?: string }) => (
      <CurrencyFlag iconName={item.details.iconName} className={className} />
    ),
  },
});

export const currencyList: CurrencyItem[] = rawList.map(attachIcon);
