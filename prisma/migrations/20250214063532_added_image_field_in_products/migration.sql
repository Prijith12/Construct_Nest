/*
  Warnings:

  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "productId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" INTEGER,
    "unit" TEXT,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Product" ("name", "price", "productId", "rating", "unit") SELECT "name", "price", "productId", "rating", "unit" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
