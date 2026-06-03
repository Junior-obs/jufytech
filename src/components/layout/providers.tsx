"use client"

import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0D0D1A",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#F5F5F5",
          },
        }}
      />
    </>
  )
}