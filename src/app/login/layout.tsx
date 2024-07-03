export const dynamic = 'force-dynamic'
import NavBar from "../components/navbar-public"

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}