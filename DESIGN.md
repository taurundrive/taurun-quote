# Design System Specification (Taurun Monocromático)

## Colors

### Theme Strategy
- **Mode**: Dark Mode nativo por padrão (`.dark` no HTML)
- **Background**: `hsl(240 10% 3.9%)` (#09090b)
- **Foreground**: `hsl(0 0% 98%)` (#fafafa)
- **Card**: `hsl(240 10% 5.9%)` (#0f0f11) em superfície limpa com borda sólida
- **Primary / Accent**: `hsl(0 0% 98%)` no dark mode / `hsl(240 5.9% 10%)` no light mode (Monocromático de Alto Contraste, SEM neons)
- **Border**: `hsl(240 3.7% 18.9%)` (#303036)
- **Muted Foreground**: `hsl(240 5% 64.9%)` (#a1a1aa)

## Typography

- **Font Family**: `Geist`, sans-serif (Google Fonts)
- **Display Headings**: Geist ExtraBold, tracking-tight (`tracking-tight`), `text-wrap: balance`
- **Section Titles**: Geist Bold, tracking-normal
- **Body & Labels**: Geist Medium / Regular, line-height 1.5
- **Letter Spacing Floor**: -0.02em (evita que as letras colidam)

## Layout & Rules Anti-AI Slop

- **Sem Kickers/Eyebrows Artificiais**: Proibido adicionar pílulas superiores como "AO VIVO" ou "SIMULADOR COMERCIAL & APRESENTAÇÕES" acima dos títulos.
- **Sem Neons ou Auras de Luz**: Proibido o uso de `glow-primary`, `box-shadow` colorido difuso ou auras de luz desfocadas (`blur-3xl`).
- **Sem Ícones Decorativos Desnecessários**: Ícones funcionais apenas para orientar entradas de dados.
- **Border Radius Controlado**: Mantido o teto de `0.75rem` (12px), evitando cantos super arredondados (> 20px) em cartões.

## Motion & Motion Rules

- **Expansão de Vinil Click**: Transição suave de altura e opacidade (`transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1)`).
- **Sem Rebote (No Bounce)**: Transições físicas sub-300ms.
