/*
  Warnings:

  - Added the required column `category` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "image_url" TEXT NOT NULL
);
INSERT INTO "new_Cards" ("id") SELECT "id" FROM "Cards";
DROP TABLE "Cards";
ALTER TABLE "new_Cards" RENAME TO "Cards";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
