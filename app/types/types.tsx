import { User } from "@prisma/client";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface AlertProps {
  message: string;
  type: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface LayoutProps {
  children: ReactNode;
}

interface RegisterProps {
  open: boolean;
  onClose: () => void;
}

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

type returnValue = User | { error?: string; success?: string } | null;

enum FormNames {
  LOGIN_FORM = "login",
  REGISTER_FORM = "register",
}

interface HeaderProps {
  loggedIn: boolean;
  user?: User;
}

export type {
  AlertProps,
  LayoutProps,
  RegisterProps,
  RegisterUser,
  returnValue,
  HeaderProps,
};

export { FormNames }; //Because we are exporting the enum FormNames, we can use it in other files
