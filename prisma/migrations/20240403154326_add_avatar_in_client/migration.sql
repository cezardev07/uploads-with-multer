/*
  Warnings:

  - Added the required column `avatar` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `avatar` VARCHAR(191) NOT NULL;
