import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import Header from "~/routes/header";
import { getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return json({ loggedIn: true, user: session.data });
  }
  return json({ loggedIn: false, user: session.data });
}

export default function Products() {
  return (
    <Header>
      <div className="mx-auto w-full max-w-screen-xl">
        <Outlet />
      </div>
    </Header>
  );
}
