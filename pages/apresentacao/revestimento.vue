<template>
  <!-- Apresentação comercial — Revestimento Taurun -->
  <div
    class="pres-root"
    @keydown.right.prevent="nextSlide"
    @keydown.left.prevent="prevSlide"
    @keydown.space.prevent="nextSlide"
    tabindex="0"
    ref="rootEl"
  >

    <!-- ── Seta Esquerda ───────────────────────────────────────── -->
    <button
      class="nav-arrow nav-arrow--left"
      :class="{ hidden: currentSlide === 0 }"
      @click.stop="prevSlide"
      aria-label="Slide anterior"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>

    <!-- ── Seta Direita ───────────────────────────────────────── -->
    <button
      class="nav-arrow nav-arrow--right"
      :class="{ hidden: currentSlide === slides.length - 1 }"
      @click.stop="nextSlide"
      aria-label="Próximo slide"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>

    <!-- ── Contador de slide ───────────────────────────────────── -->
    <div class="slide-counter">
      {{ currentSlide + 1 }} / {{ slides.length }}
    </div>

    <!-- ═══════════════════════════════════════════
         SLIDE 01 — Logo Reveal
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-01"
      :class="{ active: currentSlide === 0 }"
    >
      <div class="particles">
        <span v-for="n in 18" :key="n" class="particle" :style="particleStyle(n)" />
      </div>

      <div class="logo-wrapper">
        <div class="logo-line logo-line--top" ref="lineTop" />
        <div class="logo-container" ref="logoContainer">
          <img src="/logo-taurun.png" alt="Taurun" class="taurun-logo" ref="logoImg" />
        </div>
        <div class="logo-line logo-line--bottom" ref="lineBottom" />
        <p class="tagline" ref="taglineEl">Revestimento Profissional</p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 02 — A Superfície Perfeita
         Layout: 45% texto | 55% imagem full-bleed
         Linhas cruzam da área de texto até a imagem
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-02"
      :class="{ active: currentSlide === 1 }"
      ref="slide02"
    >
      <!-- Coluna de texto — 45% -->
      <div class="s2-text" ref="s2Text">

        <!-- Título -->
        <div class="s2-title-block" ref="s2TitleBlock">
          <span class="s2-sup">A Superfície</span>
          <em class="s2-italic">Perfeita</em>
        </div>

        <!-- Conceito -->
        <div class="s2-concept" ref="s2Concept">
          <p class="s2-concept-lead">O conceito central é o</p>
          <strong class="s2-concept-key">tatame unificado</strong>
          <p class="s2-concept-sub">Uma superfície. Sem divisões, fitas ou velcros.</p>
        </div>

        <!-- 3 tópicos com linhas de annotation que cruzam até a imagem -->
        <ul class="s2-topics">
          <li class="s2-topic" ref="topic1">
            <div class="s2-topic-text">
              <span class="s2-bullet">01</span>
              <p><strong>Hexafibra exclusiva</strong> — material sintético desenvolvido para o Jiu Jitsu.</p>
            </div>
            <!-- Linha que parte daqui e vai até a imagem -->
            <div class="s2-line-wrap">
              <div class="s2-line" ref="line1" />
            </div>
          </li>

          <li class="s2-topic" ref="topic2">
            <div class="s2-topic-text">
              <span class="s2-bullet">02</span>
              <p><strong>Aderência sem agressão</strong> — textura equilibrada que protege a pele.</p>
            </div>
            <div class="s2-line-wrap">
              <div class="s2-line" ref="line2" />
            </div>
          </li>

          <li class="s2-topic" ref="topic3">
            <div class="s2-topic-text">
              <span class="s2-bullet">03</span>
              <p><strong>Encaixe invisível</strong> — tecnologia click sem parafusos aparentes.</p>
            </div>
            <div class="s2-line-wrap">
              <div class="s2-line" ref="line3" />
            </div>
          </li>
        </ul>
      </div>

      <!-- Coluna de imagem — 55% full-bleed -->
      <div class="s2-image-col">
        <div class="s2-image-frame" ref="s2ImageFrame">
          <img
            src="/hexafibra.jpg"
            alt="Textura Hexafibra Taurun"
            class="s2-hexaimg"
            ref="s2HexaImg"
          />
          <!-- Overlay esquerdo para fundir com fundo -->
          <div class="s2-image-overlay" />
          <!-- Vignette escuro no topo/bottom -->
          <div class="s2-image-vignette" />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 03 — Antes & Depois / Revestimento
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-03"
      :class="{ active: currentSlide === 2 }"
    >
      <!-- Coluna Esquerda — reveal antes/depois -->
      <div class="s3-left">

        <!-- Container empilhado: antes embaixo, depois revela por cima -->
        <div class="s3-compare" ref="s3Compare">
          <!-- ANTES — camada base -->
          <img
            src="/revestimento-antes.jpg"
            alt="Tatame antes do Revestimento Taurun"
            class="s3-img s3-img--antes"
          />

          <!-- DEPOIS — revela com clip-path controlado pelo slider -->
          <div
            class="s3-depois-wrap"
            ref="s3DepoisWrap"
            :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }"
          >
            <img
              src="/revestimento-depois.jpg"
              alt="Tatame com Revestimento Taurun"
              class="s3-img s3-img--depois"
            />
          </div>

          <!-- Handle dragável -->
          <div
            class="s3-handle"
            :style="{ left: sliderPos + '%' }"
            @mousedown.prevent="startDrag"
            @touchstart.prevent="startDragTouch"
            ref="s3Handle"
          >
            <div class="s3-handle-line" />
            <div class="s3-handle-grip">
              <!-- seta esquerda -->
              <svg viewBox="0 0 20 20" fill="currentColor" width="10" height="10">
                <path d="M12 4l-6 6 6 6" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <!-- seta direita -->
              <svg viewBox="0 0 20 20" fill="currentColor" width="10" height="10">
                <path d="M8 4l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </div>
          </div>

          <!-- Label antes -->
          <span class="s3-label s3-label--antes" ref="s3LabelAntes">Antes</span>
          <!-- Label depois -->
          <span class="s3-label s3-label--depois" ref="s3LabelDepois">Depois</span>
        </div>

      </div>

      <!-- Coluna Direita — texto + logo -->
      <div class="s3-right" ref="s3Right">

        <!-- Título hierárquico -->
        <div class="s3-title-block" ref="s3TitleBlock">
          <span class="s3-sup">Modelo de</span>
          <em class="s3-italic">Tatame Escolhido</em>
          <!-- Logo no lugar do texto -->
          <img src="/revestimento-logo.png" alt="Revestimento Taurun" class="s3-title-logo" />
        </div>

        <!-- Frases sequenciais -->
        <ul class="s3-phrases">
          <li class="s3-phrase" ref="s3Phrase1">Sem encaixes</li>
          <li class="s3-phrase" ref="s3Phrase2">Sem mau cheiro</li>
          <li class="s3-phrase" ref="s3Phrase3">Estética impecável</li>
        </ul>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 04 — Etapas do Projeto Após Fechamento do Contrato
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-04"
      :class="{ active: currentSlide === 3 }"
      ref="slide04"
    >
      <div class="s4-container">
        <!-- Header -->
        <div class="s4-header" ref="s4Header">
          <span class="s4-eyebrow">Etapas do Projeto Após</span>
          <h2 class="s4-title">Fechamento do Contrato</h2>
        </div>

        <!-- Cards Expansíveis -->
        <div class="s4-cards-wrapper" ref="s4CardsWrap">
          <div
            v-for="(etapa, index) in etapas"
            :key="index"
            class="s4-card"
            :class="{ 'is-active': activeEtapa === index }"
            @click="activeEtapa = index"
          >
            <!-- Top bar / número e ícone -->
            <div class="s4-card-header">
              <span class="s4-number">{{ etapa.number }}</span>
              <div class="s4-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="s4-icon">
                  <path :d="etapa.iconPath" />
                </svg>
              </div>
            </div>

            <!-- Conteúdo expandido (Título e Descrição) -->
            <div class="s4-card-body">
              <h3 class="s4-card-title">{{ etapa.title }}</h3>
              <p class="s4-card-desc">{{ etapa.description }}</p>
            </div>

            <!-- Label vertical quando colapsado -->
            <div class="s4-collapsed-label">
              <span>{{ etapa.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 05 — Quem São Nossos Clientes?
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-05"
      :class="{ active: currentSlide === 4 }"
      ref="slide05"
    >
      <div class="s5-container">
        <!-- Header -->
        <div class="s5-header" ref="s5Header">
          <span class="s5-eyebrow">QUEM SÃO OS</span>
          <h2 class="s5-title">Nossos Clientes?</h2>
        </div>

        <!-- Grid de Atletas (2 linhas x 5 itens) -->
        <div class="s5-grid" ref="s5Grid">
          <div
            v-for="(atleta, index) in atletas"
            :key="index"
            class="s5-athlete-item"
            :class="{ 'is-revealed': atleta.revealed }"
            @click="atleta.revealed = !atleta.revealed"
          >
            <!-- Avatar em círculo -->
            <div class="s5-avatar-wrap">
              <!-- Overlay misterioso não revelado -->
              <div class="s5-unrevealed-overlay">
                <span class="s5-mystery-mark">?</span>
                <span class="s5-touch-hint">clique</span>
              </div>

              <!-- Imagem do atleta -->
              <img
                :src="atleta.image"
                :alt="atleta.name"
                class="s5-avatar-img"
              />
            </div>

            <!-- Nome do atleta (revela com o clique) -->
            <div class="s5-name-wrap">
              <span class="s5-name">{{ atleta.name }}</span>
            </div>
          </div>
        </div>

        <!-- Botão para revelar/ocultar todos -->
        <button
          class="s5-reveal-all-btn"
          @click="toggleRevealAll"
        >
          {{ allRevealed ? 'Ocultar Todos' : 'Revelar Todos' }}
        </button>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 06 — Orçamento & Investimento Comercial
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-06"
      :class="{ active: currentSlide === 5 }"
      ref="slide06"
    >
      <div class="s6-container">
        <!-- Header -->
        <div class="s6-header" ref="s6Header">
          <span class="s6-eyebrow">RESUMO DO ORÇAMENTO</span>
          <h2 class="s6-title">Investimento & Proposta</h2>
        </div>

        <!-- Card Principal da Proposta -->
        <div class="s6-proposal-card" ref="s6Card">
          
          <!-- Metadados da Cotação (Cliente & Consultor) -->
          <div class="s6-meta-bar">
            <div class="s6-meta-item">
              <span class="s6-meta-label">CLIENTE / ACADEMIA</span>
              <strong class="s6-meta-value">{{ quote.clientName.value || 'Academia Parceira' }}</strong>
            </div>
            <div v-if="quote.clientPhone.value" class="s6-meta-item">
              <span class="s6-meta-label">CONTATO</span>
              <span class="s6-meta-value">{{ quote.clientPhone.value }}</span>
            </div>
            <div class="s6-meta-item s6-meta-item--seller">
              <span class="s6-meta-label">CONSULTOR TAURUN</span>
              <span class="s6-meta-value">{{ quote.selectedSeller.value.name }}</span>
            </div>
          </div>

          <!-- Tabela de Produtos / Itens Cotados -->
          <div class="s6-items-table">
            
            <!-- Item 1: Produto Principal (Tatame/Revestimento) -->
            <div class="s6-item-row">
              <div class="s6-item-info">
                <span class="s6-item-badge">Produto Principal</span>
                <h4 class="s6-item-name">{{ quote.selectedProduct.value.name }}</h4>
                <p class="s6-item-desc">{{ quote.selectedProduct.value.description }}</p>
              </div>
              <div class="s6-item-specs">
                <div class="s6-spec">
                  <span class="s6-spec-label">Metragem</span>
                  <span class="s6-spec-val">{{ quote.quantityM2.value }} m²</span>
                </div>
                <div class="s6-spec">
                  <span class="s6-spec-label">Valor / m²</span>
                  <span class="s6-spec-val">{{ quote.formatCurrency(quote.pricePerM2.value) }}</span>
                </div>
                <div class="s6-spec s6-spec--subtotal">
                  <span class="s6-spec-label">Subtotal</span>
                  <span class="s6-spec-val">{{ quote.formatCurrency(quote.totalTatamePrice.value) }}</span>
                </div>
              </div>
            </div>

            <!-- Item 2: Vinil Click (se ativado pelo vendedor) -->
            <div v-if="quote.hasVinilClick.value" class="s6-item-row s6-item-row--optional">
              <div class="s6-item-info">
                <span class="s6-item-badge s6-item-badge--opt">Adicional</span>
                <h4 class="s6-item-name">Proteções de parede Vinil Click</h4>
                <p class="s6-item-desc">Sistema de proteção lateral de parede com encaixe Vinil Click.</p>
              </div>
              <div class="s6-item-specs">
                <div class="s6-spec">
                  <span class="s6-spec-label">Quantidade</span>
                  <span class="s6-spec-val">{{ quote.vinilQuantity.value }} un.</span>
                </div>
                <div class="s6-spec">
                  <span class="s6-spec-label">Valor un.</span>
                  <span class="s6-spec-val">{{ quote.formatCurrency(quote.vinilUnitPrice.value) }}</span>
                </div>
                <div class="s6-spec s6-spec--subtotal">
                  <span class="s6-spec-label">Subtotal</span>
                  <span class="s6-spec-val">{{ quote.formatCurrency(quote.totalVinilPrice.value) }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Total Geral -->
          <div class="s6-total-bar">
            <div class="s6-total-block">
              <span class="s6-total-label">INVESTIMENTO TOTAL ESTIMADO</span>
              <div class="s6-total-amount">
                {{ quote.formatCurrency(quote.grandTotal.value) }}
              </div>
            </div>
          </div>

          <!-- Benefícios e Garantia -->
          <div class="s6-perks">
            <span class="s6-perk">✓ Fábrica própria com entrega garantida</span>
            <span class="s6-perk">✓ Projeto e instalação sob medida inclusos</span>
            <span class="s6-perk">✓ Garantia oficial Taurun de alta performance</span>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useQuote } from '~/composables/useQuote'

useHead({
  title: 'Revestimento Taurun — Apresentação Comercial',
  meta: [{ name: 'description', content: 'Apresentação comercial Revestimento Taurun.' }],
})

// ── Composable de cotação ──────────────────────────────────────
const quote = useQuote()

// ── Slides & navegação ────────────────────────────────────────
const slides = [0, 1, 2, 3, 4, 5]
const currentSlide = ref(0)

function nextSlide() {
  if (currentSlide.value < slides.length - 1) goTo(currentSlide.value + 1)
}
function prevSlide() {
  if (currentSlide.value > 0) goTo(currentSlide.value - 1)
}
function goTo(i: number) {
  if (i === currentSlide.value) return
  currentSlide.value = i
  if (i === 0) animateSlide01()
  if (i === 1) animateSlide02()
  if (i === 2) animateSlide03()
  if (i === 3) animateSlide04()
  if (i === 4) animateSlide05()
  if (i === 5) animateSlide06()
}

// ── Refs ─────────────────────────────────────────────────────
const rootEl      = ref<HTMLElement>()
const lineTop     = ref<HTMLElement>()
const lineBottom  = ref<HTMLElement>()
const logoContainer = ref<HTMLElement>()
const logoImg     = ref<HTMLElement>()
const taglineEl   = ref<HTMLElement>()

const slide02     = ref<HTMLElement>()
const s2Text      = ref<HTMLElement>()
const s2TitleBlock = ref<HTMLElement>()
const s2Concept   = ref<HTMLElement>()
const topic1      = ref<HTMLElement>()
const topic2      = ref<HTMLElement>()
const topic3      = ref<HTMLElement>()
const line1       = ref<HTMLElement>()
const line2       = ref<HTMLElement>()
const line3       = ref<HTMLElement>()
const s2ImageFrame = ref<HTMLElement>()
const s2HexaImg   = ref<HTMLElement>()

// Slide 03 refs
const s3Compare    = ref<HTMLElement>()
const s3DepoisWrap = ref<HTMLElement>()
const s3Handle     = ref<HTMLElement>()
const s3LabelAntes = ref<HTMLElement>()
const s3LabelDepois= ref<HTMLElement>()
const s3Right      = ref<HTMLElement>()
const s3TitleBlock = ref<HTMLElement>()
const s3Phrase1    = ref<HTMLElement>()
const s3Phrase2    = ref<HTMLElement>()
const s3Phrase3    = ref<HTMLElement>()

// ── Slide 04 refs & data ──────────────────────────────────────
const slide04     = ref<HTMLElement>()
const s4Header    = ref<HTMLElement>()
const s4CardsWrap = ref<HTMLElement>()
const activeEtapa = ref(0)

// ── Slide 05 refs & data ──────────────────────────────────────
const slide05  = ref<HTMLElement>()
const s5Header = ref<HTMLElement>()
const s5Grid   = ref<HTMLElement>()

// ── Slide 06 refs & link WhatsApp ────────────────────────────
const slide06  = ref<HTMLElement>()
const s6Header = ref<HTMLElement>()
const s6Card   = ref<HTMLElement>()

const whatsappLink = computed(() => {
  const text = `Olá, gostaria de aprovar o orçamento do ${quote.selectedProduct.value.name} (${quote.quantityM2.value}m²) no valor de ${quote.formatCurrency(quote.grandTotal.value)} para ${quote.clientName.value || 'minha academia'}.`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})

const atletas = ref([
  { name: 'Cobrinha',          image: '/clientes/images.jpeg',                                                              revealed: false },
  { name: 'Vagner Rocha',      image: '/clientes/60f8321c159c1.jpeg',                                                      revealed: false },
  { name: 'Felipe Preguiça',  image: '/clientes/felipe-preguica-analisa-duelo-contra-henrique-ceconi-no-bjj-stars-8-encontro-de-geracoes.jpg', revealed: false },
  { name: 'Cyborg',            image: '/clientes/Roberto-Cyborg1.jpg',                                                      revealed: false },
  { name: 'Celsinho Venicius', image: '/clientes/celso-venicius-jiu-jitsu_480x480.webp',                                      revealed: false },
  { name: 'Isaque Bahiense',   image: '/clientes/IMG_2382.jpeg',                                                          revealed: false },
  { name: 'Gutemberg',         image: '/clientes/images (1).jpeg',                                                         revealed: false },
  { name: 'Anderson Muniz',    image: '/clientes/anderson-muniz.webp',                                                     revealed: false },
  { name: 'Aung',              image: '/clientes/Aung_La_N_Sang-hero-1200x1165-1.jpg',                                     revealed: false },
  { name: 'Daniel 220v',       image: '/clientes/1_daniel-35975615.jpg',                                                   revealed: false },
])

const allRevealed = computed(() => atletas.value.every(a => a.revealed))

function toggleRevealAll() {
  const target = !allRevealed.value
  atletas.value.forEach(a => { a.revealed = target })
}

const etapas = [
  {
    number: '01',
    title: 'Projeto',
    description: 'Disponibilizamos nossa equipe de arquitetos e designer gráficos para desenvolver cada aspecto visual do projeto, com projeções 3D profissionais',
    iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    number: '02',
    title: 'Produção',
    description: 'Tudo é fabricado sob medida na nossa fábrica própria.',
    iconPath: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83',
  },
  {
    number: '03',
    title: 'Envio',
    description: 'Todo material é embalado e colocado em caixas especiais de envio.',
    iconPath: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12',
  },
  {
    number: '04',
    title: 'Instalação',
    description: 'Nossa equipe vai até o local executar toda a instalação de maneira artesanal.',
    iconPath: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  },
]

// Slider interativo slide 03
const sliderPos  = ref(50) // % da esquerda
const isDragging = ref(false)

function getPosPct(clientX: number): number {
  if (!s3Compare.value) return 50
  const rect = s3Compare.value.getBoundingClientRect()
  const pct  = ((clientX - rect.left) / rect.width) * 100
  return Math.min(Math.max(pct, 3), 97)
}

function startDrag(e: MouseEvent) {
  isDragging.value = true
  const onMove = (ev: MouseEvent) => {
    if (!isDragging.value) return
    sliderPos.value = getPosPct(ev.clientX)
  }
  const onUp = () => {
    isDragging.value = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

function startDragTouch(e: TouchEvent) {
  isDragging.value = true
  const onMove = (ev: TouchEvent) => {
    if (!isDragging.value) return
    sliderPos.value = getPosPct(ev.touches[0].clientX)
  }
  const onEnd = () => {
    isDragging.value = false
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onEnd)
  }
  window.addEventListener('touchmove', onMove, { passive: true })
  window.addEventListener('touchend', onEnd)
}

// ── Partículas slide 01 ───────────────────────────────────────
function particleStyle(n: number) {
  const seed = n * 137.508
  return {
    left:  `${(seed * 0.618) % 100}%`,
    top:   `${(seed * 0.382) % 100}%`,
    width: `${2 + (n % 3)}px`,
    height:`${2 + (n % 3)}px`,
    animationDelay:    `${(n * 0.4) % 5}s`,
    animationDuration: `${6 + (n % 4)}s`,
  }
}

// ── GSAP — Slide 01 logo reveal ───────────────────────────────
function animateSlide01() {
  const tl = gsap.timeline()
  gsap.set(lineTop.value,       { scaleX: 0, transformOrigin: 'left center' })
  gsap.set(lineBottom.value,    { scaleX: 0, transformOrigin: 'right center' })
  gsap.set(logoContainer.value, { scale: 0.8, autoAlpha: 0 })
  gsap.set(taglineEl.value,     { autoAlpha: 0, y: 10 })

  tl
    .to(lineTop.value,       { scaleX: 1, duration: 0.8, ease: 'expo.out' }, 0.2)
    .to(lineBottom.value,    { scaleX: 1, duration: 0.8, ease: 'expo.out' }, 0.4)
    .to(logoContainer.value, { scale: 1, autoAlpha: 1, duration: 0.9, ease: 'expo.out' }, 0.5)
    .to(taglineEl.value,     { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.1)
}

// ── GSAP — Slide 02 — abuso total ────────────────────────────
function animateSlide02() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  // Reset total
  gsap.set(s2ImageFrame.value, {
    clipPath: 'inset(0 100% 0 0)',
    autoAlpha: 0,
  })
  gsap.set(s2HexaImg.value, { scale: 1.12 })
  gsap.set(s2TitleBlock.value, { autoAlpha: 0, y: 30 })
  gsap.set(s2Concept.value,    { autoAlpha: 0, y: 20 })
  gsap.set([topic1.value, topic2.value, topic3.value], { autoAlpha: 0, x: -30 })
  gsap.set([line1.value, line2.value, line3.value], {
    scaleX: 0,
    transformOrigin: 'left center',
  })

  tl
    // 1. Imagem revela — cortina da esquerda + zoom-out do parallax
    .to(s2ImageFrame.value, {
      clipPath: 'inset(0 0% 0 0)',
      autoAlpha: 1,
      duration: 1.1,
    }, 0)
    .to(s2HexaImg.value, {
      scale: 1,
      duration: 1.6,
      ease: 'power2.out',
    }, 0)

    // 2. Título sobe com stagger de opacidade
    .to(s2TitleBlock.value, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.4)

    // 3. Conceito
    .to(s2Concept.value, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.65)

    // 4. Tópico 01 → linha 01 cruza tela
    .to(topic1.value, { autoAlpha: 1, x: 0, duration: 0.45 }, 0.85)
    .to(line1.value,  { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0.92)

    // 5. Tópico 02 → linha 02
    .to(topic2.value, { autoAlpha: 1, x: 0, duration: 0.45 }, 1.1)
    .to(line2.value,  { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 1.17)

    // 6. Tópico 03 → linha 03
    .to(topic3.value, { autoAlpha: 1, x: 0, duration: 0.45 }, 1.35)
    .to(line3.value,  { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 1.42)

    // 7. Ken Burns suave na imagem depois que tudo entrou
    .to(s2HexaImg.value, {
      scale: 1.04,
      duration: 8,
      ease: 'none',
    }, 1.8)
}

// ── GSAP — Slide 03 — entrada + slider interativo ───────────
function animateSlide03() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  // Reset posicao do slider
  sliderPos.value = 5  // começa mostrando o "antes" quase todo
  const animObj = { pos: 5 }

  // Reset visões
  gsap.set(s3Compare.value,     { autoAlpha: 0, scale: 0.94 })
  gsap.set(s3Handle.value,      { autoAlpha: 0 })
  gsap.set(s3LabelAntes.value,  { autoAlpha: 0, y: 6 })
  gsap.set(s3LabelDepois.value, { autoAlpha: 0, y: 6 })
  gsap.set(s3Right.value,       { autoAlpha: 0, x: 40 })
  gsap.set(s3TitleBlock.value,  { autoAlpha: 0, y: 25 })
  gsap.set([s3Phrase1.value, s3Phrase2.value, s3Phrase3.value], { autoAlpha: 0, x: 20 })

  tl
    // 1. Container de imagem entra
    .to(s3Compare.value, { autoAlpha: 1, scale: 1, duration: 0.8 }, 0)

    // 2. Label "Antes" aparece
    .to(s3LabelAntes.value, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.6)

    // 3. Coluna direita desliza da direita
    .to(s3Right.value, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.3)
    .to(s3TitleBlock.value, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.5)

    // 4. Wipe automático até 50% via sliderPos com reatividade fluida
    .to(animObj, {
      pos: 50,
      duration: 1.3,
      ease: 'power3.inOut',
      onUpdate: () => { sliderPos.value = animObj.pos }
    }, 0.8)

    // 5. Handle aparece no centro
    .to(s3Handle.value, { autoAlpha: 1, duration: 0.3 }, 1.6)

    // 6. Labels
    .to(s3LabelDepois.value, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.5)

    // 7. Frases sequenciais
    .to(s3Phrase1.value, { autoAlpha: 1, x: 0, duration: 0.45 }, 1.3)
    .to(s3Phrase2.value, { autoAlpha: 1, x: 0, duration: 0.45 }, 1.6)
    .to(s3Phrase3.value, { autoAlpha: 1, x: 0, duration: 0.45 }, 1.9)
}

// ── GSAP — Slide 04 — entrada + stagger de cards ─────────────
function animateSlide04() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  activeEtapa.value = 0

  gsap.set(s4Header.value, { autoAlpha: 0, y: -25 })
  if (s4CardsWrap.value?.children) {
    gsap.set(s4CardsWrap.value.children, { autoAlpha: 0, y: 35 })
  }

  tl
    .to(s4Header.value, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
    .to(s4CardsWrap.value?.children || [], {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
    }, 0.2)
}

// ── GSAP — Slide 05 — entrada + stagger de clientes ──────────
function animateSlide05() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  // Oculta os atletas na entrada para interatividade por clique
  atletas.value.forEach(a => { a.revealed = false })

  gsap.set(s5Header.value, { autoAlpha: 0, y: -25 })
  if (s5Grid.value?.children) {
    gsap.set(s5Grid.value.children, { autoAlpha: 0, scale: 0.8, y: 25 })
  }

  tl
    .to(s5Header.value, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
    .to(s5Grid.value?.children || [], {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
    }, 0.2)
}

// ── GSAP — Slide 06 — entrada de proposta e valores ──────────
function animateSlide06() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  gsap.set(s6Header.value, { autoAlpha: 0, y: -25 })
  gsap.set(s6Card.value,   { autoAlpha: 0, scale: 0.95, y: 30 })

  tl
    .to(s6Header.value, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
    .to(s6Card.value,   { autoAlpha: 1, scale: 1, y: 0, duration: 0.9 }, 0.25)
}

// ── Lifecycle ─────────────────────────────────────────────────
onMounted(async () => {
  await nextTick()
  rootEl.value?.focus()
  animateSlide01()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap');

/* ── Raiz ─────────────────────────────────────────────────── */
.pres-root {
  position: fixed;
  inset: 0;
  background: #0d1012;
  overflow: hidden;
  outline: none;
  font-family: 'Geist', sans-serif;
  color: #fff;
}

/* ── Slides base ─────────────────────────────────────────── */
.slide {
  position: absolute;
  inset: 0;
  display: flex;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide.active {
  opacity: 1;
  pointer-events: auto;
}

/* ── Setas de navegação laterais ─────────────────────────── */
.nav-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 200;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50%;
  background: rgba(13,16,18,0.7);
  backdrop-filter: blur(8px);
  color: rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.nav-arrow:hover {
  border-color: rgba(255,255,255,0.35);
  color: #fff;
  background: rgba(13,16,18,0.95);
}
.nav-arrow svg {
  width: 18px;
  height: 18px;
}
.nav-arrow--left  { left: 1.5rem; }
.nav-arrow--right { right: 1.5rem; }
.nav-arrow.hidden {
  opacity: 0;
  pointer-events: none;
}

/* Contador */
.slide-counter {
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;
  z-index: 200;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.2);
}

/* ══════════════════════════════
   SLIDE 01 — Logo
══════════════════════════════ */
.slide-01 {
  align-items: center;
  justify-content: center;
  background: #0d1012;
}

.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(105,105,105,0.2);
  animation: drift linear infinite;
}
@keyframes drift {
  0%,100% { transform: translateY(0) scale(1);    opacity: 0.15; }
  50%      { transform: translateY(-18px) scale(1.25); opacity: 0.3; }
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
}
.logo-line {
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #696969 50%, transparent);
}
.logo-container {
  position: relative;
  padding: 1.5rem 3rem;
}
.logo-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(105,105,105,0.07) 0%, transparent 70%);
}
.taurun-logo {
  width: clamp(140px, 18vw, 280px);
  height: auto;
  display: block;
  /* branco → #696969 */
  filter: brightness(0) invert(1) brightness(0.42) saturate(0);
}
.tagline {
  font-size: clamp(0.6rem, 1vw, 0.75rem);
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(105,105,105,0.55);
}

/* ══════════════════════════════
   SLIDE 02 — Superfície Perfeita
══════════════════════════════ */
.slide-02 {
  display: grid;
  grid-template-columns: 45% 55%;
  align-items: stretch;
}

/* ── Texto (coluna esquerda) ── */
.s2-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 5vw, 5rem) clamp(1.5rem, 3.5vw, 4rem);
  gap: 1.8rem;
  position: relative;
  z-index: 2;
}

/* Título */
.s2-title-block {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 0.1rem;
}
.s2-sup {
  font-size: clamp(0.9rem, 1.6vw, 1.3rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-weight: 400;
}
.s2-italic {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(3.5rem, 8vw, 8rem);
  color: #a3a3a3;
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -0.02em;
}

/* Conceito */
.s2-concept {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.s2-concept-lead {
  /* texto auxiliar — leve, contém o contexto */
  font-size: clamp(1rem, 1.6vw, 1.4rem);
  color: rgba(255,255,255,0.4);
  font-weight: 300;
  margin: 0;
  letter-spacing: 0.01em;
}
.s2-concept-key {
  /* título bold — destaque máximo */
  font-size: clamp(2rem, 4vw, 4.5rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.03em;
  line-height: 1;
}
.s2-concept-sub {
  /* detalhe menor */
  font-size: clamp(0.75rem, 1vw, 0.95rem);
  color: rgba(255,255,255,0.22);
  font-weight: 300;
  margin: 0.5rem 0 0;
  letter-spacing: 0.015em;
}

/* Tópicos */
.s2-topics {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.s2-topic {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.s2-topic-text {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.s2-bullet {
  font-size: clamp(0.6rem, 0.75vw, 0.8rem);
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.15);
  font-weight: 600;
  padding-top: 0.2rem;
  flex-shrink: 0;
}

.s2-topic-text p {
  font-size: clamp(0.85rem, 1.2vw, 1.1rem);
  color: rgba(255,255,255,0.42);
  line-height: 1.55;
  font-weight: 300;
  margin: 0;
}
.s2-topic-text strong {
  color: rgba(255,255,255,0.78);
  font-weight: 500;
}

/*
  Linha de annotation — parte logo após o tópico,
  cobre toda a largura incluindo a coluna da imagem.
  transformOrigin: left → GSAP anima scaleX de 0 → 1
*/
.s2-line-wrap {
  /* Estende além da coluna de texto até cobrir a imagem */
  position: relative;
  /* A largura aqui é 100% da coluna de texto, mas a linha
     vai além via width > 100% */
  overflow: visible;
}

.s2-line {
  height: 1px;
  /* A linha vai da esquerda e cruza para a coluna de imagem */
  width: calc(100% + 55vw); /* cruza toda a coluna da imagem */
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.45) 0%,
    rgba(255,255,255,0.15) 40%,
    rgba(255,255,255,0.04) 75%,
    transparent 100%
  );
  transform-origin: left center;
}

/* ── Imagem (coluna direita) ── */
.s2-image-col {
  position: relative;
  overflow: hidden;
}

.s2-image-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.s2-hexaimg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: contrast(1.06) brightness(0.82);
  transform-origin: center center;
}

/* Overlay esquerdo — funde coluna de texto com imagem */
.s2-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    #0d1012 0%,
    rgba(13,16,18,0.4) 20%,
    transparent 55%
  );
  pointer-events: none;
}

/* Vignette topo + base */
.s2-image-vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(13,16,18,0.5) 0%, transparent 20%),
    linear-gradient(to top,    rgba(13,16,18,0.5) 0%, transparent 20%);
  pointer-events: none;
}
/* ══════════════════════════════
   SLIDE 03 — Antes & Depois
══════════════════════════════ */
.slide-03 {
  display: grid;
  grid-template-columns: 55% 45%;
  align-items: center;
  padding: 4vw 5vw;
  gap: 4vw;
  background: #0d1012;
}

/* ── Coluna esquerda ── */
.s3-left {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Container que empilha as duas imagens */
.s3-compare {
  position: relative;
  width: 100%;
  height: 78vh;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
}

/* Imagens base */
.s3-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.s3-img--antes {
  filter: brightness(0.75) saturate(0.85);
}
.s3-img--depois {
  filter: brightness(0.88);
}

/* Wrapper do "depois" — GSAP anima clip-path aqui */
.s3-depois-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* Linha divisória vertical que viaja com o wipe */
.s3-divider {
  position: absolute;
  top: 0;
  /* fica na borda direita do clip — usamos right:0 do wrap */
  right: 0;
  width: 2px;
  height: 100%;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 0 12px rgba(255,255,255,0.4);
  pointer-events: none;
}

/* Labels antes / depois */
.s3-label {
  position: absolute;
  font-size: clamp(0.65rem, 0.9vw, 0.8rem);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  backdrop-filter: blur(6px);
}
.s3-label--antes {
  top: 1rem;
  left: 1rem;
  background: rgba(0,0,0,0.55);
  color: rgba(255,255,255,0.5);
}
.s3-label--depois {
  top: 1rem;
  right: 1rem;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.15);
}

/* ── Coluna direita ── */
.s3-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

/* Logo do revestimento */
.s3-logo-block {
  display: flex;
  align-items: center;
}
.s3-rev-logo {
  max-width: clamp(120px, 16vw, 220px);
  height: auto;
  /* mantém logo visível sobre fundo escuro */
  filter: brightness(0) invert(1) brightness(0.75) saturate(0);
}

/* Bloco de título */
.s3-title-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  line-height: 1;
}
.s3-sup {
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  font-weight: 400;
}
.s3-italic {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(1.8rem, 3.5vw, 3.5rem);
  color: #a3a3a3;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.01em;
}
.s3-bold {
  font-size: clamp(2rem, 4.5vw, 5rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.04em;
  line-height: 0.92;
  text-transform: uppercase;
  margin-top: 0.4rem;
}

/* Frases sequenciais */
.s3-phrases {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  border-left: 1px solid rgba(255,255,255,0.08);
  padding-left: 1.2rem;
}
.s3-phrase {
  font-size: clamp(0.9rem, 1.4vw, 1.25rem);
  color: rgba(255,255,255,0.45);
  font-weight: 300;
  letter-spacing: 0.02em;
}
.s3-phrase:first-child {
  color: rgba(255,255,255,0.65);
  font-weight: 400;
}

/* Logo no bloco de título (substitui texto) */
.s3-title-logo {
  max-width: clamp(140px, 18vw, 260px);
  height: auto;
  margin-top: 0.5rem;
  /* branco → cinza visível no fundo escuro */
  filter: brightness(0) invert(1) brightness(0.8) saturate(0);
  display: block;
}

/* ── Handle interativo antes/depois ── */
.s3-compare {
  cursor: ew-resize;
}

/* Linha vertical do handle */
.s3-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;        /* área clicável generosa */
  transform: translateX(-50%);
  z-index: 10;
  cursor: ew-resize;
  pointer-events: auto;
}

.s3-handle-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background: rgba(255,255,255,0.75);
  box-shadow: 0 0 10px rgba(255,255,255,0.3);
  pointer-events: none;
}

/* Grip circular central */
.s3-handle-grip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.4);
  pointer-events: auto;
  cursor: ew-resize;
  color: #0d1012;
}

/* ══════════════════════════════
   SLIDE 04 — Etapas do Projeto
══════════════════════════════ */
.slide-04 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4vw 6vw;
  background: #0d1012;
}

.s4-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1320px;
  gap: clamp(2rem, 4vh, 3.5rem);
}

.s4-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  line-height: 1;
}

.s4-eyebrow {
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}

.s4-title {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2.5rem, 5.5vw, 5.5rem);
  color: #a3a3a3;
  font-weight: 400;
  line-height: 1.05;
  margin: 0;
}

.s4-cards-wrapper {
  display: flex;
  gap: 1.25rem;
  width: 100%;
  height: clamp(340px, 48vh, 520px);
}

.s4-card {
  flex: 1;
  min-width: 85px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: clamp(1.5rem, 2.5vw, 2.5rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: flex 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.5s ease,
              border-color 0.5s ease,
              box-shadow 0.5s ease;
}

.s4-card:hover {
  border-color: rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.035);
}

.s4-card.is-active {
  flex: 3.8;
  background: linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%);
  border-color: rgba(255,255,255,0.25);
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
}

.s4-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.s4-number {
  font-size: clamp(0.8rem, 1vw, 0.95rem);
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.28);
  font-weight: 600;
}

.s4-card.is-active .s4-number {
  color: rgba(255,255,255,0.6);
}

.s4-icon-box {
  width: clamp(44px, 3.5vw, 54px);
  height: clamp(44px, 3.5vw, 54px);
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.5);
  transition: all 0.4s ease;
}

.s4-card:hover .s4-icon-box {
  border-color: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.85);
}

.s4-card.is-active .s4-icon-box {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.35);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(255,255,255,0.1);
}

.s4-icon {
  width: 22px;
  height: 22px;
}

.s4-card-body {
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  transition: opacity 0.45s ease 0.12s, transform 0.45s ease 0.12s;
  margin-top: auto;
}

.s4-card.is-active .s4-card-body {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.s4-card-title {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2.2rem, 4vw, 4.2rem);
  color: #ffffff;
  font-weight: 400;
  line-height: 1;
  margin: 0 0 1.2rem 0;
  letter-spacing: -0.01em;
}

.s4-card-desc {
  font-family: 'Geist', sans-serif;
  font-size: clamp(0.95rem, 1.3vw, 1.35rem);
  color: rgba(255,255,255,0.68);
  line-height: 1.55;
  font-weight: 300;
  margin: 0;
  max-width: 92%;
}

.s4-collapsed-label {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
  transform-origin: center center;
  white-space: nowrap;
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(1rem, 1.4vw, 1.3rem);
  color: rgba(255,255,255,0.35);
  opacity: 1;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.s4-card.is-active .s4-collapsed-label {
  opacity: 0;
}

/* ══════════════════════════════
   SLIDE 05 — Quem São Nossos Clientes
══════════════════════════════ */
.slide-05 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vw 5vw;
  background: #0d1012;
}

.s5-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  gap: clamp(1.8rem, 3.5vh, 3rem);
}

.s5-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  line-height: 1;
}

.s5-eyebrow {
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}

.s5-title {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2.5rem, 5.5vw, 5.5rem);
  color: #a3a3a3;
  font-weight: 400;
  line-height: 1.05;
  margin: 0;
}

.s5-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(1.2rem, 2.5vw, 2.2rem) clamp(1rem, 2vw, 2rem);
  width: 100%;
  justify-items: center;
}

.s5-athlete-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  user-select: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.s5-athlete-item:hover {
  transform: translateY(-4px);
}

.s5-avatar-wrap {
  position: relative;
  width: clamp(100px, 9.5vw, 150px);
  height: clamp(100px, 9.5vw, 150px);
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.02);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
}

.s5-athlete-item:hover .s5-avatar-wrap {
  border-color: rgba(255,255,255,0.35);
  box-shadow: 0 15px 35px rgba(0,0,0,0.6);
}

.s5-athlete-item.is-revealed .s5-avatar-wrap {
  border-color: rgba(255,255,255,0.5);
  box-shadow: 0 0 30px rgba(255,255,255,0.15);
}

.s5-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: blur(18px) brightness(0.2) contrast(1.2);
  transform: scale(1.15);
  transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.s5-athlete-item.is-revealed .s5-avatar-img {
  filter: blur(0px) brightness(0.92) contrast(1.05);
  transform: scale(1);
}

.s5-unrevealed-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  gap: 0.1rem;
  background: radial-gradient(circle at center, rgba(13,16,18,0.5) 0%, rgba(13,16,18,0.85) 100%);
  transition: opacity 0.45s ease;
}

.s5-athlete-item.is-revealed .s5-unrevealed-overlay {
  opacity: 0;
  pointer-events: none;
}

.s5-mystery-mark {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(1.8rem, 2.8vw, 2.8rem);
  color: rgba(255,255,255,0.45);
  line-height: 1;
}

.s5-touch-hint {
  font-size: clamp(0.55rem, 0.75vw, 0.7rem);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  font-weight: 400;
}

.s5-name-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.2rem;
  text-align: center;
}

.s5-name {
  font-family: 'Geist', sans-serif;
  font-size: clamp(0.85rem, 1.15vw, 1.15rem);
  color: #ffffff;
  font-weight: 400;
  letter-spacing: 0.01em;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
}

.s5-athlete-item.is-revealed .s5-name {
  opacity: 1;
  transform: translateY(0);
}

.s5-reveal-all-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 30px;
  padding: 0.5rem 1.4rem;
  font-family: 'Geist', sans-serif;
  font-size: clamp(0.7rem, 0.9vw, 0.85rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.s5-reveal-all-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
  color: #ffffff;
}

/* ══════════════════════════════
   SLIDE 06 — Orçamento Comercial
══════════════════════════════ */
.slide-06 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vw 5vw;
  background: #0d1012;
}

.s6-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: clamp(1.5rem, 3vh, 2.5rem);
}

.s6-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  line-height: 1;
}

.s6-eyebrow {
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}

.s6-title {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2.5rem, 5vw, 5rem);
  color: #a3a3a3;
  font-weight: 400;
  line-height: 1.05;
  margin: 0;
}

.s6-proposal-card {
  width: 100%;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 24px;
  padding: clamp(1.8rem, 3vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  backdrop-filter: blur(12px);
}

.s6-meta-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-wrap: wrap;
  gap: 1rem;
}

.s6-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.s6-meta-label {
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  font-weight: 500;
}

.s6-meta-value {
  font-size: clamp(1rem, 1.3vw, 1.25rem);
  color: #ffffff;
  font-weight: 500;
}

.s6-items-table {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.s6-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem clamp(1.2rem, 2vw, 2rem);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  gap: 2rem;
  flex-wrap: wrap;
}

.s6-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
  min-width: 260px;
}

.s6-item-badge {
  align-self: flex-start;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.7);
  font-weight: 600;
}

.s6-item-badge--opt {
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.5);
}

.s6-item-name {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(1.4rem, 2vw, 2.2rem);
  color: #ffffff;
  margin: 0;
  font-weight: 400;
}

.s6-item-desc {
  font-size: clamp(0.8rem, 1vw, 0.95rem);
  color: rgba(255,255,255,0.45);
  margin: 0;
  font-weight: 300;
}

.s6-item-specs {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 3rem);
}

.s6-spec {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
}

.s6-spec-label {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
}

.s6-spec-val {
  font-size: clamp(0.95rem, 1.3vw, 1.25rem);
  color: rgba(255,255,255,0.85);
  font-weight: 400;
}

.s6-spec--subtotal .s6-spec-val {
  color: #ffffff;
  font-weight: 600;
}

.s6-total-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem clamp(1.2rem, 2vw, 2rem);
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 18px;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.s6-total-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.s6-total-label {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.45);
  font-weight: 500;
}

.s6-total-amount {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2rem, 4vw, 3.8rem);
  color: #ffffff;
  font-weight: 600;
  line-height: 1;
}

.s6-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.s6-edit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.4rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.7);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.s6-edit-btn:hover {
  border-color: rgba(255,255,255,0.35);
  color: #ffffff;
  background: rgba(255,255,255,0.08);
}

.s6-cta-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.8rem;
  border-radius: 12px;
  background: #ffffff;
  color: #0d1012;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(255,255,255,0.15);
  transition: all 0.3s ease;
}

.s6-cta-btn:hover {
  transform: translateY(-2px);
  background: #f0f0f0;
  box-shadow: 0 15px 35px rgba(255,255,255,0.25);
}

.s6-perks {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.s6-perk {
  font-size: clamp(0.75rem, 0.95vw, 0.9rem);
  color: rgba(255,255,255,0.4);
  font-weight: 300;
}
</style>

