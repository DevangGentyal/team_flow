/*
  Warnings:

  - You are about to drop the `signup` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `role` ENUM('guide', 'student') NOT NULL;

-- DropTable
DROP TABLE `signup`;
