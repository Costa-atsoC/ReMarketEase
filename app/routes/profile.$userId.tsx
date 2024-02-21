import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { getUserById } from "~/models/user.server";
import { formatDate } from "~/utils";

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = Number(params.userId);
  console.log(userId);
  const user = await getUserById(userId);
  console.log(user);
  if (user != null) {
    return json({ user: user });
  }
  return redirect("/");
}

export default function userProfile() {
  const { user } = useLoaderData<typeof loader>();
  return <div>{user.name}</div>;
}
