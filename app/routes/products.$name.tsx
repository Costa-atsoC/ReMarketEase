import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getProductBrand, getSpecificProduct } from "~/models/product.server";
import { addProductToCart } from "~/models/user.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.name);

  return json({
    product: await getSpecificProduct(Number(id)),
    brand: getProductBrand(Number(id)),
  });
};

export const handleAdd = async () => {
  const { product } = useLoaderData<typeof loader>();
  await addProductToCart(1, product!.prodId, 1);
};

export default function Postid() {
  const { product, brand } = useLoaderData<typeof loader>();
  const [controller, setController] = useState(false);
  const [partialDescription, setPartialDescription] = useState("");

  useEffect(() => {
    if (product?.description && product?.description.length > 300) {
      setController(true);
      setPartialDescription(product.description.slice(0, 300));
    }
  }, []);

  function handleController() {
    setController(!controller);
  }

  function handleShowMore() {
    return !controller && product ? (
      <div>{product.description}</div>
    ) : (
      <div>
        {partialDescription}
        <button onClick={handleController}>...</button>
      </div>
    );
  }
  return (
    <div className="sm:px-10 md:px-10 lg:px-24 xl:px-24 py-8">
      {product && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div className="relative">
            <img
              src={product.photo}
              alt={product.name}
              className="sticky top-0 z-50 pt-6"
            />
          </div>
          <div className="px-4 flex flex-col md:items-start">
            <div>
              <span className="font-bold text-xl mb-2 text-center">
                {product.name}
              </span>
              <br />
              <span className="font-thin text-xl mb-2 text-center">
                {product.price} €
              </span>
            </div>
            <span className=" pt-2 pb-4">Review placeholder</span>
            <button
              onClick={() => handleAdd()}
              className="bg-header hover:bg-primary hover:text-header text-white font-bold py-2 px-4 rounded border-solid border-2 border-header"
            >
              Add to cart
            </button>
            <div className="pt-4">{handleShowMore()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
