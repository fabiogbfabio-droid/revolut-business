"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { RevolutLogo } from "@/components/revolut-logo"
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react"

interface HomeClientProps {
  fullName: string
  email: string
  initials: string
}

const quickActions = [
  { label: "Enviar", icon: ArrowUpRight, color: "#3b82f6" },
  { label: "Receber", icon: ArrowDownLeft, color: "#22c55e" },
  { label: "Cartão", icon: CreditCard, color: "#f59e0b" },
  { label: "Relatório", icon: BarChart3, color: "#a855f7" },
]

const transactions = [
  { label: "Stripe Payments", amount: "+R$ 12.450,00", date: "Hoje, 14:32", positive: true },
  { label: "Google Cloud", amount: "-R$ 320,00", date: "Hoje, 09:15", positive: false },
  { label: "Transferência recebida", amount: "+R$ 5.000,00", date: "Ontem, 18:00", positive: true },
  { label: "Adobe Creative", amount: "-R$ 240,00", date: "24 fev, 10:00", positive: false },
]

export function HomeClient({ fullName, email, initials }: HomeClientProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div
      className="relative w-full flex flex-col overflow-auto font-sans"
      style={{ minHeight: "100dvh", background: "#050505", color: "white" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-5 pt-12 pb-4"
        style={{ background: "linear-gradient(to bottom, #050505 80%, transparent)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center flex-shrink-0">
            <RevolutLogo className="w-4 h-4 text-black" />
          </div>
          <span className="text-sm font-semibold text-white/70">Business</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notificações"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          >
            <Bell className="w-4 h-4 text-white/70" />
          </button>
          <button
            type="button"
            aria-label="Configurações"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          >
            <Settings className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </header>

      {/* Balance card */}
      <section className="px-5 pt-2 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "white" }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <p className="text-[13px] text-white/40">Olá,</p>
            <p className="text-[15px] font-semibold text-white leading-tight truncate max-w-[180px]">{fullName}</p>
          </div>
        </div>

        <div
          className="rounded-3xl p-6"
          style={{
            background: "linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%)",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-white/35 mb-1">Saldo disponível</p>
          <p className="text-[2.5rem] font-bold text-white tracking-tight">R$ 42.780<span className="text-2xl text-white/50">,50</span></p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[12px] font-semibold text-emerald-400">+12,4%</span>
            <span className="text-[12px] text-white/30">este mês</span>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="px-5 pb-6">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              type="button"
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform duration-100"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <span className="text-[11px] font-medium text-white/50">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Transactions */}
      <section className="flex-1 px-5 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-white">Transações recentes</h2>
          <button type="button" className="text-[13px] text-white/35 hover:text-white/60 transition-colors flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col gap-1" role="list">
          {transactions.map((tx) => (
            <div
              key={tx.label + tx.date}
              role="listitem"
              className="flex items-center justify-between px-4 py-4 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div>
                <p className="text-[14px] font-medium text-white">{tx.label}</p>
                <p className="text-[12px] text-white/35 mt-0.5">{tx.date}</p>
              </div>
              <span
                className="text-[14px] font-semibold"
                style={{ color: tx.positive ? "#4ade80" : "rgba(255,255,255,0.7)" }}
              >
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Logout */}
      <div className="px-5 pb-10">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-[14px] font-semibold text-red-400 active:scale-[0.98] transition-transform"
          style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
        >
          <LogOut className="w-4 h-4" />
          Sair da conta
        </button>
      </div>
    </div>
  )
}
