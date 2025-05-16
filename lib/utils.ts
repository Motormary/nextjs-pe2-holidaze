import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ErrorSource } from "./definitions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const numToDollarString = (value: number) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)

export function failedToVerify() {
  return {
    success: false,
    source: ErrorSource.SESSION,
    data: null as any,
    error: "You don't have the authorization to use this feature",
  }
}
