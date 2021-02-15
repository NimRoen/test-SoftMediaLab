export const numberFormat = (value: string) => {
  return Intl.NumberFormat('ru-RU').format(Number(value)) || '';
};
