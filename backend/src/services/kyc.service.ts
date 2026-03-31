// KYC Service Stub
import { prisma } from '../config/database';

export const processKYC = async (userId: string, documents: any) => {
  // Upload to Cloudinary, update status
  return { approved: false };
};

export const getKYCStatus = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user?.kycStatus || 'pending';
};
