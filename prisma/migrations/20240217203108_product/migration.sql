/*
  Warnings:

  - You are about to drop the column `cart` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "name", "password", "updatedAt", "userId") SELECT "createdAt", "email", "name", "password", "updatedAt", "userId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Product" (
    "prodId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Ups, nothing here!',
    "photo" TEXT NOT NULL DEFAULT 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.independentmediators.co.uk%2Fwp-content%2Fuploads%2F2016%2F02%2Fplaceholder-image.jpg&f=1&nofb=1&ipt=613650d4780638abb197c76bf2919e306e1cfd5607088f1250b798074bd5b1b4&ipo=images',
    "brandId" INTEGER NOT NULL,
    "userUserId" INTEGER,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("brandId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User" ("userId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("brandId", "description", "name", "photo", "price", "prodId") SELECT "brandId", "description", "name", "photo", "price", "prodId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
