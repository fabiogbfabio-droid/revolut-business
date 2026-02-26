import Link from "next/link"
import { RevolutLogo } from "@/components/revolut-logo"
import { AppBackground } from "@/components/app-background"
import { Mail } from "lucide-react"

export default function ConfirmarEmailPage() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-5" style={{ background: "#000" }}>
      <AppBackground />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center flex-shrink-0">
            <RevolutLogo className="w-4 h-4 text-black" />
          </div>
          <span className="text-sm font-medium text-white/80">Revolut Business</span>
        </div>

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}
        >
          <Mail className="w-9 h-9 text-blue-400" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[1.75rem] font-bold text-white leading-tight text-balance">
            Confirme seu e-mail
          </h1>
          <p className="text-[15px] text-white/50 leading-relaxed text-pretty">
            Enviamos um link de confirmação para o seu e-mail. Clique no link para ativar sua conta e acessar o Revolut Business.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/login"
          className="w-full py-[17px] rounded-full bg-white text-black font-semibold text-[15px] tracking-wide text-center active:scale-[0.98] transition-transform duration-100 shadow-md"
        >
          Ir para o login
        </Link>

        <p className="text-[13px] text-white/30">
          Não recebeu o e-mail? Verifique sua pasta de spam.
        </p>
      </div>
    </div>
  )
}
