-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Brand" (
    "brandId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL DEFAULT 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.independentmediators.co.uk%2Fwp-content%2Fuploads%2F2016%2F02%2Fplaceholder-image.jpg&f=1&nofb=1&ipt=613650d4780638abb197c76bf2919e306e1cfd5607088f1250b798074bd5b1b4&ipo=images'
);
INSERT INTO "new_Brand" ("brandId", "name") SELECT "brandId", "name" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
CREATE TABLE "new_Product" (
    "prodId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Ups, nothing here!',
    "photo" TEXT NOT NULL DEFAULT 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.independentmediators.co.uk%2Fwp-content%2Fuploads%2F2016%2F02%2Fplaceholder-image.jpg&f=1&nofb=1&ipt=613650d4780638abb197c76bf2919e306e1cfd5607088f1250b798074bd5b1b4&ipo=images',
    "brandId" INTEGER NOT NULL,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("brandId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("brandId", "description", "name", "price", "prodId") SELECT "brandId", "description", "name", "price", "prodId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Category" (
    "catId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL DEFAULT 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.independentmediators.co.uk%2Fwp-content%2Fuploads%2F2016%2F02%2Fplaceholder-image.jpg&f=1&nofb=1&ipt=613650d4780638abb197c76bf2919e306e1cfd5607088f1250b798074bd5b1b4&ipo=images'
);
INSERT INTO "new_Category" ("catId", "name") SELECT "catId", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
