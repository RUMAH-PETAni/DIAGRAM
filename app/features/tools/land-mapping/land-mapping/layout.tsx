import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '../../../globals.css'


export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
      {children}
    </div>
  )
}
