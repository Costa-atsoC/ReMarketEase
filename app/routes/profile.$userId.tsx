import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { json, useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
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
  const [tab, setTab] = useState(1);
  const date = user.createdAt.split(" "); //We only want the date not the hour

  return (
    <div className=" lg:px-4 max-w-screen-xl mx-auto w-full">
      <div className="dark:text-white text-2xl font-black lg:pb-5">
        {user.name}
      </div>
      <div className="dark:text-white">Member since: {date[0]}</div>
      <div>
        <div className="inline-flex">
          <button
            onClick={() => setTab(1)}
            className={`px-4 py-2 focus:outline-none ${
              tab === 1
                ? "dark:text-white border-b-2 border-blue-500"
                : "dark:text-white hover:dark:text-gray-800 hover:dark:bg-gray-300"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setTab(2)}
            className={`px-4 py-2 focus:outline-none ${
              tab === 2
                ? "dark:text-white dark:border-b-2"
                : "dark:text-white hover:dark:text-gray-800 hover:dark:bg-gray-300"
            }`}
          >
            Reviews
          </button>
        </div>
        <hr className=" border-blue-500" />
        <div className="pt-2">
          {tab === 1 && (
            <>
              <div className="lg:pb-5">
                <span className="dark:text-white ">
                  {products?.length} Product{products!.length > 1 ? "s" : null}
                </span>
                
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-3/4 ">
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
            </>
          )}
          {tab === 2 && <div>Reviews</div>}
        </div>
      </div>
    </div>
  );
}
