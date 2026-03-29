import "../styles/globals.css";

export const metadata = {
  title: "Leilung",
  description: "Governance grounded in data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[var(--bg-canvas)]">
      <body>{children}</body>
    </html>
  );
}
