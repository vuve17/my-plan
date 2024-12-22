export const dynamic = 'force-dynamic'
import NavBar from "../components/navbar-public"

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      display: "flex", 
      justifyContent: "center" , 
      alignItems: "center",
      height: "100vh",
    }}>
      <NavBar />
      {children}
    </div>
  )
}