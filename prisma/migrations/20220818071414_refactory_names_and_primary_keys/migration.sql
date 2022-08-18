/*
  Warnings:

  - The primary key for the `users_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users_roles` table. All the data in the column will be lost.
  - You are about to drop the `Permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPermissions" DROP CONSTRAINT "UserPermissions_permissions_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPermissions" DROP CONSTRAINT "UserPermissions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_permissions_id_fkey";

-- DropIndex
DROP INDEX "users_roles_id_key";

-- AlterTable
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "users_roles_pkey" PRIMARY KEY ("user_id", "role_id");

-- DropTable
DROP TABLE "Permissions";

-- DropTable
DROP TABLE "UserPermissions";

-- CreateTable
CREATE TABLE "user_permissions" (
    "user_id" TEXT NOT NULL,
    "permissions_id" TEXT NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("user_id","permissions_id")
);

-- CreateTable
CREATE TABLE "permisssions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permisssions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permisssions_id_key" ON "permisssions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "permisssions_name_key" ON "permisssions"("name");

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permissions_id_fkey" FOREIGN KEY ("permissions_id") REFERENCES "permisssions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissions_id_fkey" FOREIGN KEY ("permissions_id") REFERENCES "permisssions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
