# TODO: Fix TypeScript rootDir Error for Prisma Seed

## Steps:
- [x] 1. Confirm edit plan with user (excluding prisma/seed.ts from tsconfig.json)
- [ ] 2. Edit backend/tsconfig.json to exclude "prisma/seed.ts"
- [ ] 3. Verify no TypeScript errors: cd backend && npx tsc --noEmit
- [ ] 4. Test Prisma seed: cd backend && npx prisma db seed
- [ ] 5. Mark task complete

