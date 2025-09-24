export const groupBy = <T>(arr: T[], key: keyof T) =>
  arr.reduce((acc, item) => {
    const k = String(item[key]);
    acc[k] = acc[k] || [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);

/** Convert currency string to number */
export const parseCurrency = (str: string) =>
  parseFloat((str || "").replace(/[^0-9.-]+/g, "")) || 0;