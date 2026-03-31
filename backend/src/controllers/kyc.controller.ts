import { Request, Response } from 'express';

export const submitKYC = async (req: Request, res: Response) => {
  // Upload ID to Cloudinary
  res.json({ message: 'KYC submission stub' });
};

export const getKYCStatus = async (req: Request, res: Response) => {
  res.json({ status: 'pending' });
};
