import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import Header from "~/components/header";
import { getCategories } from "~/models/category.server";
import { destroySession, getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  // SEO
  return [
    { title: "ReMarketEase" },
    { name: "description", content: "Welcome to ReMarketEase!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return json({
      loggedIn: true,
      categories: await getCategories(),
      user: session.data,
    });
  }
  return json({
    loggedIn: false,
    categories: await getCategories(),
    user: session.data,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function Index() {
  const { categories } = useLoaderData<typeof loader>();
  const data = useLoaderData();

  let catMore = categories;
  if (categories.length > 4) {
    catMore = categories.slice(0, 4);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <div>
          <img
            src="https://media.product.which.co.uk/prod/images/original/gm-e6f655ef-3e91-4f56-be27-25f8490e100e-selling-second-hand-4.jpg"
            alt="placeholder1"
            className="object-cover object-center w-full h-96 rounded-md"
          />
        </div>
        <div className="px-24">
          <div className="py-4 pb-6">
            <Link to="/categories/all">
              <span className="text-2xl font-black underline-offset-8 underline hover:decoration-blue-400 text-gray-800 pb-1 dark:text-white uppercase cursor-pointer">
                Categories
              </span>
            </Link>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {catMore.map((category) => (
              <Link
                to={`/categories/${category.catId}`}
                className="ease-in duration-300 transition rounded overflow-hidden shadow-lg hover:-translate-y-1 hover:scale-110"
                key={category.catId}
              >
                <img
                  className="w-full"
                  src={category.photo}
                  alt={category.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center dark:text-white">
                    {category.name}
                  </div>
                </div>
              </Link>
            ))}
            {categories.length > 4 ? (
              <div className=" overflow-hidden flex flex-col justify-center items-center">
                <Link
                  to="/categories/all"
                  className="ease-in duration-300 px-6 py-4 underline underline-offset-8 dark:decoration-white rounded hover:-translate-y-1 hover:scale-110 dark:hover:decoration-blue-400 hover:decoration-blue-400 ring ring-gray-900 dark:ring-white dark:hover:ring-blue-400 hover:ring-blue-400"
                >
                  <div className="font-bold text-xl mb-2 text-center dark:text-white text-gray-800">
                    See More
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
          <br />
        </div>
        {data.loggedIn ? (
          <div>
            <Form method="post">
              <button>Logout</button>
            </Form>
          </div>
        ) : null}
      </Header>
    </div>
  );
}
