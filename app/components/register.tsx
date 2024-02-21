import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useRef } from "react";
import { createUser, getUserByEmail } from "~/models/user.server";
import { getCategories } from "~/models/category.server";
import { RegisterProps } from "~/types/types";

export const loaderReg = async () => {
  return json({ cara: await getCategories() });
};

export const action2 = async () => {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  //TODO: Make something more pretty
  if (name === "" || email === "" || password === "") {
    alert("Please fill in all fields");
    return json(
      { errors: { email: "Please fill in all fields", password: null } },
      { status: 400 }
    );
  }
  console.log(getCategories());
  const userExists = await getUserByEmail(email);

  if (userExists) {
    alert("User already exists");
    return;
  }

  const data = { name, email, password };

  return await createUser(data)
    .then((res) => {
      if (res) {
        alert("User registered successfully");
      } else {
        alert("User already exists");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error registering user");
    });
};

const Register: React.FC<RegisterProps> = ({ open, onClose }) => {
  const actionData = useActionData<typeof action2>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (actionData?.errors?.email) {
  //     emailRef.current?.focus();
  //   } else if (actionData?.errors?.password) {
  //     passwordRef.current?.focus();
  //   }
  // }, [actionData]);

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors 
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-header rounded-xl shadow p-6 transition-all border-solid border-secondary border-2
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg font-black bg-transparent hover:text-primary transition duration-500 ease-in-out"
        >
          <span>X</span>
        </button>

        {/* Main body */}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <span className="rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
            Welcome to ReMarketEase
          </span>
          <span className="py-2" />
          <div className="flex flex-col">
            <span className="text-primary">Name</span>
            <input
              type="text"
              className="bg-primary rounded-lg text-gray-500 px-2 border-2 border-secondary"
              id="name"
            />
            <span className="py-2" />
            <span className="text-primary">Email</span>
            <input
              ref={emailRef}
              type="text"
              id="email"
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
              className="bg-primary rounded-lg text-gray-500 px-2 border-2 border-secondary"
            />
            {actionData?.errors?.email ? (
              <div className="pt-1 text-red-700" id="email-error">
                {actionData.errors.email}
              </div>
            ) : null}
            <span className="py-2" />
            <span className="text-primary">Password</span>
            <input
              type="password"
              className="bg-primary rounded-lg text-gray-500 px-2 border-2 border-secondary"
              id="password"
            />
            <span className="py-4" />
            <button
              className="h-12 flex items-center justify-center rounded uppercase font-semibold px-8 border-solid border-2 border-primary  bg-primary hover:bg-header hover:text-primary hover:cursor-pointer transition duration-500 ease-in-out"
              onClick={async () => {
                action2();
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

//RIGHT NOW THIS FILE IS NOT BEING USE BUT I WOULD LIKE IT TO BECAME THE REGISTER MODAL
