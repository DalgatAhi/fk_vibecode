import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D-конфигуратор крыши",
  description:
    "Интерактивный 3D-конфигуратор кровли с выбором формы, материала, цвета и формой заявки.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
