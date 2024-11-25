import "./globals.css";

export const metadata = {
  title: "MyVetSystem",
  description: "Vet appointments booking system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  );
}
