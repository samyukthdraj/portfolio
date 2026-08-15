"use server";

export async function submitContactForm(formData: { name: string, email: string, message: string }) {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        ...formData
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { success: false, message: "Network error" };
  }
}
