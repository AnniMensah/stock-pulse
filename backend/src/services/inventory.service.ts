import { prisma } from '../config/database';

export const checkLowStock = (products: any[]) => {
  return products.map(p => ({
    ...p,
    status: p.stock <= p.threshold ? 'red' : p.stock <= p.threshold * 2 ? 'yellow' : 'green'
  }));
};

export const generateDailySummary = async (ownerId: string, date: string) => {
  // Sold vs stock calculation
  return { summary: 'Daily report stub' };
};
