/*
  Seed an admin user into the database.
  Uses Prisma Client with the existing MongoDB datasource.

  Env overrides:
    - ADMIN_EMAIL (default: admin@idevx.com)
    - ADMIN_NAME  (default: Admin User)
*/

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@idevx.com";
  const name = process.env.ADMIN_NAME || "Superadmin";
  const image = null;
  const plainPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    const data = { role: "admin" };
    if (!existing.passwordHash) {
      data.passwordHash = passwordHash;
    }
    if (existing.role !== "admin" || !existing.passwordHash) {
      await prisma.user.update({ where: { id: existing.id }, data });
      console.log("Updated existing user to admin:", email);
    } else {
      console.log("Admin already exists:", email);
    }
  } else {
    await prisma.user.create({
      data: { email, name, image, role: "admin", passwordHash },
    });
    console.log("Created admin user:", email);
  }
}

seedAdmin()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
