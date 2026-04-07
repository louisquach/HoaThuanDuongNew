"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/AppContextProvider";

export default function PrivateLayout({ children }) {
  const context = useAppContext();
  const router = useRouter();

  if (!context.logged) {
    router.push("/_admin");
    return null;
  }

  return <>{children}</>;
}
