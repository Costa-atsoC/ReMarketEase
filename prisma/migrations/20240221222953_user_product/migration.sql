-- CreateTable
CREATE TABLE "UserProduct" (
    "userProdId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userUserId" INTEGER NOT NULL,
    "productProdId" INTEGER NOT NULL,
    CONSTRAINT "UserProduct_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserProduct_productProdId_fkey" FOREIGN KEY ("productProdId") REFERENCES "Product" ("prodId") ON DELETE RESTRICT ON UPDATE CASCADE
);
