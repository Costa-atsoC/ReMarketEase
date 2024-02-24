import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { json, useLoaderData, Link } from "@remix-run/react";
import { getUserById, getUserProducts } from "~/models/user.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = Number(params.userId);
  const user = await getUserById(userId);
  const products = await getUserProducts(userId);

  if (user != null) {
    return json({ user, products });
  }
  return redirect("/");
}

export default function userProfile() {
  const { user, products } = useLoaderData<typeof loader>();
  const date = user.createdAt.split(" "); //We only want the date not the hour
  return (
    <div className=" lg:px-4 max-w-screen-xl mx-auto w-full">
      <div className="dark:text-white text-2xl font-black lg:pb-5">
        {user.name}
      </div>
      <div className="dark:text-white">Member since: {date[0]}</div>
      <div>
        <span className="dark:text-white lg:pb-10">
          {products?.length} Product{products!.length > 1 ? "s" : null}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-3/4">
          {products && products?.length > 0 ? (
            products.map((prod) => (
              <Link
                to={`/products/${prod.prodId}`}
                key={prod.prodId}
                className="rounded overflow-hidden shadow shadow-lg h-full hover:shadow-2xl"
              >
                <img
                  className="object-cover h-52 w-full"
                  src={prod.photo}
                  alt={prod.name}
                />

                <div className="flex flex-col px-6 pt-1 mb-2">
                  <span className="font-bold text-left dark:text-white">
                    {prod.name}
                  </span>
                  <span className="text-left dark:text-white">
                    {prod.price}€
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div>NOTHING</div>
          )}
        </div>
      </div>
    </div>
  );
}
