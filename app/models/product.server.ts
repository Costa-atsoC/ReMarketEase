import { prisma } from "~/db.server";
export type { Product } from "@prisma/client";

export async function getProducts() {
  return prisma.product.findMany();
}

export async function getSpecificProduct(id: number){
  return prisma.product.findUnique({
    where: {
      prodId: id
    },
  })
}

export async function getProductBrand(id: number){
  return prisma.product.findUnique({
    where: {
      prodId: id
    },
    select: {
      brand: true
    }
  })
}