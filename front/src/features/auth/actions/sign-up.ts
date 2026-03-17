"use server";

const signUp = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (email === "") {
    return { success: false, error: "Por favor, insira um e-mail." };
  }

  if (password === "") {
    return { success: false, error: "Por favor, insira uma senha." };
  }

  return { success: true, error: null };
};

export { signUp };
