import { PrismaClient } from "@prisma/client";
import { formatDate } from "~/utils";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const { date, hour } = formatDate();
  // Create brands
  const brand1 = await prisma.brand.create({
    data: {
      name: "Brand A",
    },
  });

  const brand2 = await prisma.brand.create({
    data: {
      name: "Brand B",
    },
  });

  // Create categories
  const category1 = await prisma.category.create({
    data: {
      name: "Category 1",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Category 2",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Category 3",
    },
  });

  const category4 = await prisma.category.create({
    data: {
      name: "Category 4",
    },
  });

  const category5 = await prisma.category.create({
    data: {
      name: "Category 5",
    },
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: "Product 1",
      price: 10.99,
      description: "Description of Product 1",
      brandId: brand1.brandId,
      categories: {
        connect: { catId: category1.catId },
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Product 2",
      price: 20.49,
      description: "Description of Product 2",
      brandId: brand2.brandId,
      categories: {
        connect: { catId: category2.catId },
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Lorem Ipsum",
      price: 20.49,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum nunc eget, varius nisl. Donec auctor, libero at lacinia convallis, nunc libero lacinia elit, nec",
      brandId: brand2.brandId,
      categories: {
        connect: { catId: category1.catId },
      },
    },
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      createdAt: `${date} ${hour}`,
      updatedAt: `${date} ${hour}`,
      email: "john@example.com",
      password: await bcrypt.hash("123", 10),
      cart: {
        create: [
          { quantity: 2, prodId: product1.prodId },
          { quantity: 1, prodId: product2.prodId },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "John Doe",
      createdAt: `${date} ${hour}`,
      updatedAt: `${date} ${hour}`,
      email: "test@example.com",
      password: await bcrypt.hash("123", 10),
      cart: {
        create: [
          { quantity: 2, prodId: product1.prodId },
          { quantity: 1, prodId: product2.prodId },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Gonçalo Costa",
      createdAt: `${date} ${hour}`,
      updatedAt: `${date} ${hour}`,
      email: "john@example.com",
      password: await bcrypt.hash("123", 10),
      cart: {
        create: [
          { quantity: 2, prodId: product1.prodId },
          { quantity: 1, prodId: product2.prodId },
        ],
      },
    },
  });

  const userProduct1 = await prisma.userProduct.create({
    data: {
      userUserId: 3,
      productProdId: 1,
    },
  });

  const userProduct2 = await prisma.userProduct.create({
    data: {
      userUserId: 3,
      productProdId: 2,
    },
  });

  const userProduct3 = await prisma.userProduct.create({
    data: {
      userUserId: 3,
      productProdId: 3,
    },
  });

  console.log("Database has been seeded. 🌱");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
