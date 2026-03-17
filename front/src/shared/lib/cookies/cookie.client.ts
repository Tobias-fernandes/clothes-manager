import { CookieOptions } from "@/shared/types/cookie.types";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");

    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return null;
};

const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
) => {
  if (typeof document === "undefined") return;

  const { days = 365, path = "/", sameSite = "Lax", secure = true } = options;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  let cookie = `${name}=${encodeURIComponent(
    value,
  )};expires=${date.toUTCString()};path=${path};SameSite=${sameSite}`;

  if (secure) cookie += ";Secure";

  document.cookie = cookie;
};

const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export { getCookie, setCookie, deleteCookie };
