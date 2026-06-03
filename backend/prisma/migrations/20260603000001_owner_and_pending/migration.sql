-- Add PENDING and APPROVED values to InspectionStatus enum
ALTER TYPE "InspectionStatus" ADD VALUE IF NOT EXISTS 'PENDING';
ALTER TYPE "InspectionStatus" ADD VALUE IF NOT EXISTS 'APPROVED';

-- Add ownerId to fire_extinguishers (nullable FK to users)
ALTER TABLE "fire_extinguishers"
  ADD COLUMN IF NOT EXISTS "ownerId" TEXT REFERENCES "users"("id") ON DELETE SET NULL;
