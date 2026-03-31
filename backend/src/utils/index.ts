// Utils Stub
export const generateBarcode = (productId: string) => {
  return `SP-${productId.slice(-6)}`;
};

export const formatGhanaDate = (date: Date) => {
  return date.toLocaleDateString('en-GH');
};
