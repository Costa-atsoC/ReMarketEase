import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getCategories } from "~/models/category.server";

export const loader = async () => {
  return json({ categories: await getCategories(), loggedIn: false });
};

export default function CategoryAll() {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {categories.map((category) => (
        <Link
          to={`/categories/${category.catId}`}
          className="transition rounded overflow-hidden shadow-lg hover:-translate-y-1 hover:scale-110"
          key={category.catId}
        >
          <img className="w-full" src={category.photo} alt={category.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-center">
              {category.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
