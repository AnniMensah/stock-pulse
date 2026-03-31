import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { ownerId: req.query.ownerId as string }
  });
  res.json(products);
};

export const updateStock = async (req: Request, res: Response) => {
  // TODO: Scan barcode -> update stock
  res.json({ message: 'Stock update stub' });
};

export const getLowStock = async (req: Request, res: Response) => {
  // Traffic light logic in service
  res.json({ message: 'Low stock alert stub' });
};
