-- CreateEnum
CREATE TYPE "ExtinguisherStatus" AS ENUM ('ACTIVE', 'DELIVERED', 'RETURNED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('EXPIRY_WARNING', 'POLICE_ESCALATION');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'SMS', 'SYSTEM');

-- CreateEnum
CREATE TYPE "EscalationStatus" AS ENUM ('PENDING', 'REPORTED', 'RESOLVED');

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fire_extinguishers" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "type" TEXT,
    "capacity" TEXT,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "status" "ExtinguisherStatus" NOT NULL DEFAULT 'ACTIVE',
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fire_extinguishers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "channel" "NotificationChannel" NOT NULL DEFAULT 'SYSTEM',
    "message" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    "extinguisherId" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escalations" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "EscalationStatus" NOT NULL DEFAULT 'PENDING',
    "reportedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "notes" TEXT,
    "customerId" TEXT NOT NULL,
    "extinguisherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "escalations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_nationalId_key" ON "customers"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "fire_extinguishers_serialNumber_key" ON "fire_extinguishers"("serialNumber");

-- AddForeignKey
ALTER TABLE "fire_extinguishers" ADD CONSTRAINT "fire_extinguishers_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_extinguisherId_fkey" FOREIGN KEY ("extinguisherId") REFERENCES "fire_extinguishers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escalations" ADD CONSTRAINT "escalations_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escalations" ADD CONSTRAINT "escalations_extinguisherId_fkey" FOREIGN KEY ("extinguisherId") REFERENCES "fire_extinguishers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
