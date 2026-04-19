import { Router, Request, Response, RequestHandler } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

/**
 * @route   POST /api/sales
 * @desc    Record a sale, reduce stock, and log activity
 */
const recordSaleHandler: RequestHandler = async (req, res) => {
  const { productId } = req.body;
  const id = Number(productId);

  if (!productId || isNaN(id)) {
    res.status(400).json({ error: 'A valid Product ID is required' });
    return;
  }

  try {
    // Perform stock update and sale recording in a single transaction
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Verify product exists and is in stock
      const product = await tx.product.findUnique({
        where: { id },
      });

      if (!product) throw new Error('Product not found');
      if (product.stock <= 0) throw new Error('Product is out of stock');

      // 2. Decrement stock
      const updatedProduct = await tx.product.update({
        where: { id: product.id },
        data: { stock: product.stock - 1 },
      });

      // 3. Create a sale record
      const sale = await tx.sale.create({
        data: {
          productId: product.id,
          amount: product.price,
          description: `Sold ${product.name}`,
        },
      });

      return { product: updatedProduct, sale };
    });

    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

router.post('/', recordSaleHandler);

export default router;