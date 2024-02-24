import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import Header from "~/routes/header";
import { getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return json({ loggedIn: true });
  }
  return json({ loggedIn: false });
}

export default function Profile() {
  return (
    <Header>
      <Outlet />
    </Header>
  );
}
