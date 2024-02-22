import { Link, json, useLoaderData, useLocation } from "@remix-run/react";
import React from "react";

import { LayoutProps, HeaderProps } from "~/types/types";
import CAT from "~/assets/cat.png";
import Footer from "~/components/footer";
import Switcher from "~/components/switcher";
import { searchBarPage } from "~/utils";

const Header: React.FC<LayoutProps> = ({ children }) => {
  const data = useLoaderData<HeaderProps>();
  const location = useLocation();
  console.log(location.pathname);
  const page = searchBarPage(location.pathname);
  console.log(searchBarPage(location.pathname));
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mx-4 mb-4 mt-2 flex flex-col flex-grow">
        <header className="flex justify-between items-center p-6 bg-slate-100 dark:bg-slate-900 rounded-lg">
          <div>
            <Link to="/">
              <p className="transition ease-in duration-300 text-gray-800 rounded-sm dark:text-blue-500  pr-6 pl-1 mr-2 py-0 hover:scale-110 text-xl font-black">
                R<span className="text-xl">E</span>M
                <span className="text-xl">ARKET</span>E
                <span className="text-xl">ASE</span>
              </p>
            </Link>
          </div>
          {/* Right side  */}
          <nav className="flex items-center">
            {" "}
            {/* Add flex and items-center classes here */}
            {!data.loggedIn ? (
              <div>
                <Link
                  to="/login"
                  className="ease-in duration-300 dark:text-white rounded-sm dark:hover:text-blue-400 underline dark:decoration-blue-100 decoration-blue-500 underline-offset-8 text-md font-black uppercase mr-4"
                >
                  <span className="">Sign In or Register</span>
                </Link>
              </div>
            ) : (
              // User logged in part
              <div className="flex flex-row">
                <button
                  type="button"
                  className="relative inline-flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                  <span className="sr-only">Notifications</span>
                  {/* Number of notification */}
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    20
                  </div>
                </button>
                <Link to={`/profile/${data.user?.userId}`}>
                  <img src={CAT} alt="" className="rounded-full w-5" />
                </Link>
              </div>
            )}
            <Switcher />
          </nav>
        </header>

        {/* Search Bar */}
        {page ? (
          <form className=" mt-2">
            <div className="flex">
              <label
                htmlFor="search-dropdown"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Your Email
              </label>
              <button
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                All categories{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Mockups
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Templates
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Design
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Logos
                    </button>
                  </li>
                </ul>
              </div>
              <div className="relative flex-grow">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos, Design Templates..."
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ease-in duration-300 transition  hover:scale-110"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        ) : null}

        <div className="flex-1 mt-4">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Header;
