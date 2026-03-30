'use server';

import { getSession } from "@/lib/session";
import { env } from "@/data/env/server";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  if (typeof password !== "string" || password.length === 0) {
    redirect("/login?error=invalid");
  }
  if (password !== env.AUTH_PASSWORD) {
    redirect("/login?error=invalid");
  }
  const session = await getSession();
  session.isAuthenticated = true;
  await session.save();
  redirect("/app");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}
