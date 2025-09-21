// app/layout.jsx
import { Outfit } from "next/font/google"
import "./globals.css"
import Provider from "./Provider"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata = {
  title: "ᴅʀᴇᴀᴍ ᴛᴏ ꜰʟʏ",
  description: "The Web Master",
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={outfit.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
