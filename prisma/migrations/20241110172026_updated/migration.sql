/*
  Warnings:

  - Added the required column `mobile` to the `ServiceProvider` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServiceProvider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "rating" INTEGER
);
INSERT INTO "new_ServiceProvider" ("id", "name", "rating", "service") SELECT "id", "name", "rating", "service" FROM "ServiceProvider";
DROP TABLE "ServiceProvider";
ALTER TABLE "new_ServiceProvider" RENAME TO "ServiceProvider";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
