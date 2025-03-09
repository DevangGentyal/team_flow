-- CreateTable
CREATE TABLE `Signup` (
    `sid` INTEGER NOT NULL AUTO_INCREMENT,
    `sname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,
    `batch` VARCHAR(191) NOT NULL,
    `dept` VARCHAR(191) NOT NULL,
    `div` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Signup_email_key`(`email`),
    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
