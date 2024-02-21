-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Brand" (
    "brandId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'No brand',
    "photo" TEXT NOT NULL DEFAULT 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.independentmediators.co.uk%2Fwp-content%2Fuploads%2F2016%2F02%2Fplaceholder-image.jpg&f=1&nofb=1&ipt=613650d4780638abb197c76bf2919e306e1cfd5607088f1250b798074bd5b1b4&ipo=images'
);
INSERT INTO "new_Brand" ("brandId", "name", "photo") SELECT "brandId", "name", "photo" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
