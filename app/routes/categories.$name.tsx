import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  getProductsFromCategory,
  getSpecificCategory,
} from "~/models/category.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.name);

  return json({
    products: await getProductsFromCategory(Number(id)),
    category: await getSpecificCategory(id),
  });
};

export default function categoryName() {
  const { products, category } = useLoaderData<typeof loader>();
  return (
    <div className="px-24 py-4">
      {category && (
        <div>
          <span className="text-2xl font-bold text-gray-800 pb-1 dark:text-white">
            {category.name}
          </span>
        </div>
      )}
      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-4">
          {products.map((product) => (
            <Link
              to={`/products/${product.prodId}`}
              className="transition rounded overflow-hidden shadow-lg hover:-translate-y-1 hover:scale-110"
              key={product.prodId}
            >
              <img className="w-full" src={product.photo} alt={product.name} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center dark:text-white text-gray-800">
                  {product.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
}
