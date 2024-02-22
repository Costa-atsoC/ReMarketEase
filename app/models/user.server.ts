import { prisma } from "~/db.server";
export type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { RegisterUser } from "~/types/types";
import { formatDate } from "~/utils";

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUser({ name, email, password }: RegisterUser) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { date, hour } = formatDate();
  const user = {
    name: name,
    email: email,
    password: hashedPassword,
    createdAt: `${date} ${hour}`,
    updatedAt: `${date} ${hour}`,
  };

  return prisma.user.create({
    data: user,
  });
}

export async function verifyUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  return user;
}

export async function addProductToCart(
  userId: number,
  productId: number,
  quantity: number
) {
  prisma.productCart.create({
    data: {
      quantity,
      prodId: productId,
      userId,
    },
  });
  console.log(prisma.user.findUnique({ where: { userId } }));
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({ where: { userId } });
  if (user != null) return user;
  return null;
}

export async function getUserProducts(userId: number) {
  const userProduct = await prisma.userProduct.findMany({
    where: { userUserId: userId },
  });
  if (!userProduct) {
    return null;
  }
  let prod = [];
  //since we are putting arrays in a array we have to push only the obj. and not the array
  for (var val of userProduct) {
    let valor = await prisma.product.findMany({
      where: { prodId: val.productProdId },
    });
    prod.push(valor[0]);
  }
  return prod;
}
