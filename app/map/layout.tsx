import React from 'react';

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        {children}
      </body>
    </html>
  );
}