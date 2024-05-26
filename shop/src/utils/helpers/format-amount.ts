export function formatAmountForDisplay(amount: number, currency = 'TRY'): string {
  const numberFormat = new Intl.NumberFormat(['tr-TR'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
  });

  return numberFormat.format(amount);
}
