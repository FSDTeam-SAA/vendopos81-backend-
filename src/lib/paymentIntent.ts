
export const groupItemsBySupplier = (items: any[]) => {
  const map: Record<string, any[]> = {};
  for (const item of items) {
    const supplierId = item.supplierId.toString();
    if (!map[supplierId]) map[supplierId] = [];
    map[supplierId].push(item);
  }
  return map;
};

export const calculateAmounts = (items: any[]) => {
  let total = 0;
  for (const item of items) {
    total += item.unitPrice * item.quantity;
  }
  const adminCommission = Math.round(total * 0.25);
  const supplierAmount = total - adminCommission;
  return { total, adminCommission, supplierAmount };
};


