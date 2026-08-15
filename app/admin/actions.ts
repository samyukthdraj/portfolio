"use server";

import { redis } from "@/lib/upstash";
import { PortfolioData } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: unknown, formData: FormData) {
  const password = formData.get("password");
  
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", password as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    redirect("/admin");
  }
  
  return { error: "Invalid password" };
}

export async function updatePortfolioData(data: PortfolioData) {
  try {
    await redis.set("portfolio_data", data);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update data:", error);
    return { success: false, error: "Failed to update database" };
  }
}

export async function getPortfolioData() {
  try {
    const data = await redis.get<PortfolioData>("portfolio_data");
    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to fetch data" };
  }
}
