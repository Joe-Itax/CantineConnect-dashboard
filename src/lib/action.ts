"use server";

import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export async function submitLoginForm(prevState: unknown, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validatedFields = LoginSchema.safeParse({ email, password });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Veuillez corriger les erreurs",
        success: false,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email: validatedFields.data.email,
          password: validatedFields.data.password,
        }),
      }
    );

    const data = await response.json();
    console.log("response login: ", response);
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return {
      user: data.user,
      success: true,
    };
  } catch (error: unknown) {
    console.log("error lors du login: ", error);

    return {
      errors: {},
      message:
        error instanceof globalThis.Error
          ? error.message
          : "Une erreur inconnue s'est produite",
      success: false,
    };
  }
}
