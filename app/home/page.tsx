import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { HomeClient } from "./home-client"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const fullName = user.user_metadata?.full_name as string | undefined
  const email = user.email ?? ""
  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : email[0]?.toUpperCase() ?? "?"

  return <HomeClient fullName={fullName ?? email} email={email} initials={initials} />
}
