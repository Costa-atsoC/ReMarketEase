import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import Header from "~/components/header";
import Alert from "~/components/alert";
import type { returnValue } from "~/types/types";
import { FormNames } from "~/types/types";

import { createUser, getUserByEmail, verifyUser } from "../models/user.server";
import { getSession, commitSession } from "~/sessions";
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  return json({ loggedIn: false });
}

export const handleLogin = async (formData: FormData): Promise<returnValue> => {
  const email = formData.get("emailLogin") as string;
  const password = formData.get("passwordLogin") as string;

  if (email === "" || password === "") {
    return { error: "Please fill in all fields" };
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User does not exist" };
  }

  const checkPassword = await verifyUser(email, password);
  if (!checkPassword) {
    return { error: "Incorrect password" };
  }
  return { success: "User logged in successfully" };
};

export const handleRegister = async (
  formData: FormData
): Promise<returnValue> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (name === "" || email === "" || password === "") {
    return { error: "Please fill in all fields" };
  }

  const userExists = await getUserByEmail(email);

  if (userExists) {
    return { error: "User already exists" };
  }

  const data = {
    name,
    email,
    password,
  };

  await createUser(data).catch((err) => {
    console.log(err);
    return { error: "Error registering user" };
  });

  return { success: "User registered successfully" };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formName = formData.get("formName");

  switch (formName) {
    case FormNames.LOGIN_FORM:
      handleLogin(formData);
      const session = await getSession(request.headers.get("Cookie"));
      const user = await getUserByEmail(formData.get("emailLogin") as string);
      if (user == undefined) {
        return null;
      } else {
        session.set("userId", user?.userId.toString());
        console.log(session);
        return redirect("/", {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
      }
    case FormNames.REGISTER_FORM:
      return handleRegister(formData);
    default:
      return null;
  }
};

const showMessage = (data: returnValue) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex justify-end mr-5">
      {data && data.error ? (
        <Alert open={open} setOpen={setOpen} {...{ message: data.error, type: "error" }} />
      ) : null}
      {data && data.success ? (
        <Alert open={open} setOpen={setOpen} {...{ message: data.success, type: "success" }} />
      ) : null}
    </div>
  );
};

export default function Login() {
  const load = useLoaderData();
  const data = useActionData<returnValue>();
  const { state } = useNavigation();
  const busy = state === "submitting" || state === "loading";

  return (
    <Header>
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center m-20 border-2 border-border w-max ">
          <span className="md:mt-0 sm:max-w-md py-2">
            Welcome to ReMarketEase
          </span>
          <div className="grid grid-cols-2 border-t-2 border-border border-">
            {/* Left Col - Login */}
            <Form method="post" className="flex flex-col lg:p-4">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                id="emailLogin"
                name="emailLogin"
                className="bg-primary rounded-lg text-gray-500 px-2 border-2 border-secondary"
              />
              <span className="py-2" />
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                id="passwordLogin"
                name="passwordLogin"
                className="bg-primary rounded-lg text-gray-500 px-2 border-2 border-secondary"
              />
              <span className="py-4" />
              <button
                type="submit"
                name="formName"
                value={FormNames.LOGIN_FORM}
                disabled={busy}
                className="h-12 flex items-center justify-center rounded uppercase font-semibold px-8 border-solid border-2 border-primary  bg-primary hover:bg-header hover:text-primary hover:cursor-pointer transition duration-500 ease-in-out"
              >
                Login
              </button>
            </Form>
            {/* Left Col - Login */}

            {/* Right Col - Register */}
            <Form
              method="post"
              className="flex flex-col lg:border-l-2 lg:border-border lg:p-4"
            >
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-primary rounded-lg text-gray-500 px-2 border-2 border-secondary"
              />
              <span className="py-2" />
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="bg-primary rounded-lg text-gray-500 px-2 border-2 border-secondary"
              />
              <span className="py-2" />
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-primary rounded-lg text-gray-500 px-2 border-2 border-secondary"
              />
              <span className="py-4" />
              <button
                type="submit"
                name="formName"
                disabled={busy}
                value={FormNames.REGISTER_FORM}
                className="h-12 flex items-center justify-center rounded uppercase font-semibold px-8 border-solid border-2 border-primary  bg-primary hover:bg-header hover:text-primary hover:cursor-pointer transition duration-500 ease-in-out"
              >
                Register
              </button>
            </Form>
            {/* Right Col - Register */}
          </div>
        </div>
      </div>

      {/* Warnings */}
      {showMessage(data)}
    </Header>
  );
}
