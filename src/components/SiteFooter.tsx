import { Link } from 'react-router-dom'
import logoNexa from '@/assets/logo.png'
import { marketingLinks, type MarketingSectionId } from '@/data/navigation'

type SiteFooterProps = {
  onNavigate: (section: MarketingSectionId) => void
}

const footerLinkClass =
  'w-fit rounded-sm text-left text-sm text-white/68 transition-all duration-300 hover:text-[#B549F0] hover:drop-shadow-[0_0_9px_rgba(181,73,240,0.52)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexa-cyan/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050214]'

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  return (
    <footer className="relative z-[60] overflow-hidden bg-[#050214] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,#F661FD_20%,#AE3CFF_42%,#5F3BFF_66%,#01A2ED_84%,transparent_100%)] opacity-70 shadow-[0_0_18px_rgba(174,60,255,0.62)]" />
      <div className="absolute inset-x-0 top-px h-28 bg-[linear-gradient(180deg,rgba(95,59,255,0.07),transparent)]" />

      <div className="nexa-shell relative pb-14 pt-28 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-11 sm:grid-cols-2 sm:gap-x-12 xl:grid-cols-[1.35fr_0.75fr_0.75fr_1.35fr] xl:gap-14">
          <div>
            <img
              src={logoNexa}
              alt="NEXA"
              className="h-[62px] w-auto select-none object-contain drop-shadow-[0_0_16px_rgba(174,60,255,0.3)]"
              draggable={false}
            />
            <p className="mt-5 max-w-[390px] text-sm leading-7 text-white/66">
              Plataforma de orientação profissional e desenvolvimento de trajetória, criada para ajudar usuários a
              explorarem áreas, habilidades e possibilidades de futuro.
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white/92">
              Navegação
            </h2>
            <nav aria-label="Navegação do rodapé" className="mt-5 flex flex-col gap-3.5">
              {marketingLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={footerLinkClass}
                >
                  {link.label}
                </button>
              ))}
              <Link to="/login" className={footerLinkClass}>
                Login
              </Link>
              <Link to="/painel" className={footerLinkClass}>
                Painel
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white/92">Legal</h2>
            <div className="mt-5 flex flex-col gap-3.5">
              <a href="#" onClick={(event) => event.preventDefault()} className={footerLinkClass}>
                Termos de Uso
              </a>
              <a href="#" onClick={(event) => event.preventDefault()} className={footerLinkClass}>
                Política de Privacidade
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white/92">
              Informação
            </h2>
            <p className="mt-5 max-w-[440px] text-sm leading-7 text-white/60">
              As informações apresentadas pela Nexa possuem caráter orientativo e não substituem aconselhamento
              profissional, educacional, psicológico ou jurídico especializado.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.08] pt-7 text-center text-xs text-white/48 sm:mt-14">
          © 2026 Nexa. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
