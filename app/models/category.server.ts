import { prisma } from "~/db.server";
export type { Category } from "@prisma/client";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function getSpecificCategory(id: number){
  return prisma.category.findUnique({
    where: {
      catId: id
    },
  })
}

export async function getProductsFromCategory(id: number): Promise<any[]> {
  const category = await prisma.category.findUnique({
    where: {
      catId: id
    },
    select: {
      products: true
    }
  })
  return category?.products || [];
}