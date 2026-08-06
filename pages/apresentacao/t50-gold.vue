<template>
  <!-- Apresentação comercial — Taurun T50-PRO -->
  <div
    class="pres-root"
    @keydown.right.prevent="nextSlide"
    @keydown.left.prevent="prevSlide"
    @keydown.space.prevent="nextSlide"
    tabindex="0"
    ref="rootEl"
  >

    <!-- ── Botão Sair da Apresentação (Voltar à Lista de Orçamentos) ── -->
    <button
      class="exit-pres-btn"
      @click.stop="exitPresentation"
      title="Sair da apresentação e voltar à lista de orçamentos"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="exit-icon">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span class="exit-label">Sair</span>
    </button>

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
         SLIDE 01 — Logo Reveal Capa (T50-PRO)
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
        <p class="tagline" ref="taglineEl">T50-GOLD — Tatame Profissional sem Encaixes</p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 02 — Sucesso de Desempenho (Mapa Mundi Tech e Animado - 10s)
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-mapa"
      :class="{ active: currentSlide === 1 }"
      ref="slideMapa"
    >
      <div class="mapa-container">
        
        <!-- Coluna Esquerda: Título + Texto + Métricas Reais -->
        <div class="mapa-info-col" ref="mapaInfo">
          
          <!-- Header alinhado ao Design System -->
          <div class="mapa-title-block" ref="mapaHeader">
            <span class="mapa-sup">Sucesso de</span>
            <em class="mapa-italic">Desempenho</em>
          </div>

          <p class="mapa-desc" ref="mapaDesc">
            O Modelo T50-Gold foi pensado para atender uma exigência ainda maior em relação à absorção de impacto.
          </p>

          <!-- Quadro Único Grande: 1000+ Academias Atendidas crescendo gradativamente -->
          <div class="mapa-single-stat-card" ref="mapaStatsGrid">
            <div class="mapa-big-number-wrap">
              <span class="mapa-big-number" ref="gymCountEl">0</span>
              <span class="mapa-big-plus">+</span>
            </div>
            <span class="mapa-big-label">Academias Atendidas no Mundo</span>
          </div>

        </div>

        <!-- Coluna Direita: Mapa Físico e Oficial Mundi com Fronteiras -->
        <div class="mapa-svg-col" ref="mapaSvgCol">
          <div class="mapa-svg-wrapper">
            
            <!-- Linha de Varredura Laser (Scanner Line) -->
            <div class="mapa-scanner-line" ref="scannerLine" />

            <!-- Imagem Vetorial Oficial do Mapa Mundi -->
            <img src="/world.svg" alt="Mapa Mundi" class="mapa-br-svg-img" />

            <!-- Camada SVG de Conexões e Nós de Academias Sincronizados com o Mapa -->
            <svg
              class="mapa-overlay-svg"
              viewBox="30.767 241.591 784.077 458.627"
              preserveAspectRatio="xMidYMid meet"
              ref="mapaSvg"
            >
              <defs>
                <radialGradient id="brCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12" />
                  <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                </radialGradient>
              </defs>

              <rect width="1000" height="1000" fill="url(#brCenterGlow)" />

              <!-- Conexões de Rede Globais -->
              <g class="mapa-net-lines">
                <line
                  v-for="(line, idx) in networkConnections"
                  :key="idx"
                  :x1="line.x1"
                  :y1="line.y1"
                  :x2="line.x2"
                  :y2="line.y2"
                  class="mapa-net-line"
                  ref="netLineEls"
                />
              </g>

              <!-- Nós de Academias (Preenchidos Animadamente ao Longo de 10s) -->
              <g class="mapa-nodes-group">
                <g
                  v-for="(node, index) in mapNodes"
                  :key="index"
                  class="mapa-node-group"
                  ref="mapNodeEls"
                >
                  <!-- Pulso Ripple Animado (proporcional ao node.size) -->
                  <circle
                    :cx="node.x"
                    :cy="node.y"
                    :r="node.size * 2.5"
                    class="node-pulse-ring"
                  />

                  <!-- Halo Monocromático de Alto Contraste -->
                  <circle
                    :cx="node.x"
                    :cy="node.y"
                    :r="node.size + 2"
                    fill="rgba(255,255,255,0.3)"
                  />

                  <!-- Ponto Central Relevante (Branco Puro) -->
                  <circle
                    :cx="node.x"
                    :cy="node.y"
                    :r="node.size"
                    fill="#ffffff"
                    class="node-core"
                  />
                </g>
              </g>

              <!-- Sem labels — somente pontos focais -->
            </svg>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 03 — A Solução: Estrutura T50-PRO (Tecnologia de Absorção Híbrida)
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-camadas"
      :class="{ active: currentSlide === 2 }"
      ref="slideCamadas"
    >
      <div class="camadas-grid-container">
        
        <!-- Coluna Esquerda: Palco 3D da Estrutura de Camadas com Linhas Brancas Animadas -->
        <div class="camadas-stage-col">
          <div
            class="camadas-stage"
            ref="camadasStage"
            @mousemove="handleMouseMoveStage"
            @mouseleave="handleMouseLeaveStage"
          >
            <!-- Imagem 3D das Camadas do Tatame T50-PRO (Fundo 100% Transparente) -->
            <img
              src="/camadas/t50-pro-camadas.png"
              alt="Camadas Tatame Taurun T50-PRO"
              class="camadas-render-img"
              ref="camadasImg"
            />

            <!-- SVG Overlay com Linhas Brancas Animadas Conectando aos Rótulos Externos -->
            <svg class="camadas-lines-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <!-- Camada 01: Lona Hexafibra (Topo -> Fora à Esquerda) -->
              <g class="svg-group-c1">
                <circle cx="450" cy="160" r="4" class="svg-dot" />
                <circle cx="450" cy="160" r="10" class="svg-dot-pulse" />
                <polyline points="450,160 260,60 40,60" class="svg-line svg-line-c1" ref="svgLineC1" />
              </g>

              <!-- Camada 02: Espuma de Alto Retorno (Meio -> Topo Direito onde marcado em vermelho) -->
              <g class="svg-group-c2">
                <circle cx="660" cy="310" r="4" class="svg-dot" />
                <circle cx="660" cy="310" r="10" class="svg-dot-pulse" />
                <polyline points="660,310 760,110 880,50" class="svg-line svg-line-c2" ref="svgLineC2" />
              </g>

              <!-- Camada 03 Base: Granulado TS40 (Base -> Fora à Esquerda) -->
              <g class="svg-group-c3">
                <circle cx="340" cy="440" r="4" class="svg-dot" />
                <circle cx="340" cy="440" r="10" class="svg-dot-pulse" />
                <polyline points="340,440 200,520 40,520" class="svg-line svg-line-c3" ref="svgLineC3" />
              </g>
            </svg>

            <!-- Callout Camada 01: Lona Hexafibra -->
            <div class="camadas-callout callout-c1" ref="contentC1">
              <div class="callout-box">
                <div class="callout-header-brand">
                  <span class="callout-badge">CAMADA 01</span>
                  <img src="/camadas/hexafibra-logo.png" alt="Logo Hexafibra" class="callout-hexafibra-logo" />
                </div>
                <span class="callout-title">Lona Hexafibra</span>
                <span class="callout-tag">Textura exclusiva e máxima durabilidade</span>
              </div>
            </div>

            <!-- Callout Camada 02: Espuma de Alto Retorno -->
            <div class="camadas-callout callout-c2" ref="contentC2">
              <div class="callout-box">
                <span class="callout-badge">CAMADA 02</span>
                <span class="callout-title">Espuma de alto retorno</span>
                <span class="callout-tag">Recuperação rápida e amortecimento</span>
              </div>
            </div>

            <!-- Callout Camada 03: Granulado TS40 -->
            <div class="camadas-callout callout-c3" ref="contentC3">
              <div class="callout-box">
                <span class="callout-badge">CAMADA 03 BASE</span>
                <span class="callout-title">Granulado TS40</span>
                <span class="callout-tag">Base de alta densidade e absorção</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Coluna Direita: Texto Alinhado ao Exemplo com Ênfase em Absorção Híbrida -->
        <div class="camadas-info-col" ref="camadasInfoCol">
          <div class="camadas-title-block">
            <span class="camadas-sup-label">MODELO DE</span>
            <h2 class="camadas-title-italic">Tatame Escolhido</h2>
          </div>

          <div class="camadas-logo-brand">
            <img src="/camadas/t50-pro-logo.png" alt="T50-PRO Logo" class="t50pro-logo-img" />
          </div>

          <p class="camadas-text-desc">
            O modelo de tatame <strong>mais premium do mercado</strong> e o único com tecnologia de 
            <span class="highlight-absorcao-hibida">ABSORÇÃO HÍBRIDA</span>.
          </p>
        </div>

      </div>
    </section>
    <!-- ═══════════════════════════════════════════
         SLIDE 04 — Absorção Híbrida (Sistema Exclusivo Taurun)
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-absorcao"
      :class="{ active: currentSlide === 3 }"
      ref="slideAbsorcao"
    >
      <div class="abs-container">
        
        <!-- Coluna Esquerda: Simulador V-shape SVG -->
        <div class="abs-left-col">
          <div class="abs-stage-3d" ref="absStageCol">
            
            <svg class="abs-blocks-svg" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
              <!-- Camada Base Densa -->
              <polygon :points="basePoints" class="svg-block-base" />
              <!-- Camada Soft Top -->
              <polygon :points="softPoints" class="svg-block-soft" />
            </svg>

            <!-- SVG Lines conectando a cena aos labels (idêntico ao Slide 03) -->
            <svg class="abs-lines-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <!-- Camada Soft Top -> Esquerda -->
              <g class="svg-group-soft">
                <circle cx="500" cy="180" r="4" class="svg-dot" />
                <circle cx="500" cy="180" r="10" class="svg-dot-pulse" />
                <polyline points="500,180 320,80 40,80" class="svg-line svg-line-soft" ref="lineSoft" />
              </g>
              <!-- Camada Base -> Direita -->
              <g class="svg-group-base">
                <circle cx="500" cy="380" r="4" class="svg-dot" />
                <circle cx="500" cy="380" r="10" class="svg-dot-pulse" />
                <polyline points="500,380 660,480 960,480" class="svg-line svg-line-base" ref="lineBase" />
              </g>
            </svg>

            <!-- Callout Camada Soft Top (Esquerda Superior) -->
            <div class="abs-callout callout-soft" ref="calloutSoft">
              <div class="callout-box">
                <span class="callout-badge">Camada Topo</span>
                <span class="callout-title">Soft Top Ergonômico</span>
                <span class="callout-tag">Amortece impacto focal de joelhos e cotovelos</span>
              </div>
            </div>

            <!-- Callout Camada Base (Direita Inferior) -->
            <div class="abs-callout callout-base" ref="calloutBase">
              <div class="callout-box">
                <span class="callout-badge">Núcleo Estrutural</span>
                <span class="callout-title">Base Densa TS40</span>
                <span class="callout-tag">Dissipa projeções ao solo sem tocar o piso</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Coluna Direita: Controles e Texto Editorial (Sem Bullets) -->
        <div class="abs-right-col">
          <div class="abs-header" ref="absHeader">
            <span class="abs-eyebrow">A FÍSICA DO T50-PRO</span>
            <h2 class="abs-title">Absorção Híbrida</h2>
            <p class="abs-lead">
              A inteligência do tatame T50-PRO está na combinação precisa de duas densidades que reagem fisicamente à intensidade da força aplicada.
            </p>
          </div>

          <div class="abs-controls-wrapper" ref="absSelector">
            <span class="abs-controls-hint">Selecione para simular o comportamento estrutural:</span>
            
            <div class="abs-modes-stack">
              <button
                type="button"
                class="abs-mode-btn"
                :class="{ 'is-active': activeImpactMode === 'soft' }"
                @click="setImpactMode('soft')"
              >
                <div class="abs-btn-text">
                  <strong>Treino Diário e Movimentação</strong>
                  <span>Simula compressão leve (proteção de articulações). Apenas a camada Soft trabalha.</span>
                </div>
                <div class="abs-btn-indicator"></div>
              </button>

              <button
                type="button"
                class="abs-mode-btn heavy-mode"
                :class="{ 'is-active': activeImpactMode === 'heavy' }"
                @click="setImpactMode('heavy')"
              >
                <div class="abs-btn-text">
                  <strong>Projeção ao Solo (Judo / BJJ)</strong>
                  <span>Simula dissipação de alta carga de impacto. A base age antes de encostar no chão.</span>
                </div>
                <div class="abs-btn-indicator"></div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 05 — Acabamentos em Alto Padrão
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-acabamentos"
      :class="{ active: currentSlide === 4 }"
      ref="slideAcabamentos"
    >
      <div class="acab-container">
        
        <!-- Coluna Esquerda: Texto + Foto da Quina Grande + Instruções -->
        <div class="acab-info-col">
          <div class="acab-title-block" ref="acabHeader">
            <span class="acab-sup">DETALHES QUE FAZEM A DIFERENÇA</span>
            <h2 class="acab-title-italic">Acabamentos em Alto Padrão</h2>
          </div>

          <p class="acab-desc" ref="acabDesc">
            O <strong>T50-PRO</strong> usa acabamentos nas quinas e nas laterais que proporcionam um aspecto altamente profissional, durabilidade extrema e segurança total para o seu tatame.
          </p>

          <!-- Lista de Instruções / Diferenciais -->
          <div class="acab-features-list">
            <div class="acab-feature-item">
              <span class="acab-feature-icon">✓</span>
              <div class="acab-feature-text">
                <strong>Acabamento profissional — Taurun Mat Corner</strong>
                <span>Encaixe anatômico de alta densidade com logo Taurun gravado em relevo.</span>
              </div>
            </div>

            <div class="acab-feature-item">
              <span class="acab-feature-icon">✓</span>
              <div class="acab-feature-text">
                <strong>Tatame com Cantoneira Taurun T50-PRO</strong>
                <span>Proteção lateral contínua com alinhamento perfeito sem pontas expostas.</span>
              </div>
            </div>

            <div class="acab-feature-item">
              <span class="acab-feature-icon">✓</span>
              <div class="acab-feature-text">
                <strong>Estética Impecável de Fábrica</strong>
                <span>Valorização visual instantânea do espaço da academia.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Imagem Vertical sem a pílula/badge -->
        <div class="acab-vert-col">
          <div class="acab-vert-frame" ref="acabVertFrame">
            <img
              src="/tatame-com-cantoneira.png"
              alt="Tatame com Cantoneira Taurun T50-PRO"
              class="acab-vert-img"
            />
            
            <div class="vert-frame-glow" />
          </div>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 05 — A Superfície Perfeita
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-02"
      :class="{ active: currentSlide === 5 }"
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
          <p class="s2-concept-lead">O conceito central do T50-PRO é o</p>
          <strong class="s2-concept-key">TATAME UNIFICADO</strong>
          <p class="s2-concept-sub">Uma superfície. Sem divisões, fitas ou velcros.</p>
        </div>

        <!-- 3 tópicos com linhas de annotation que cruzam até a imagem -->
        <ul class="s2-topics">
          <li class="s2-topic" ref="topic1">
            <div class="s2-topic-text">
              <span class="s2-bullet">01</span>
              <p><strong>Tecnologia exclusiva</strong> — a única superfície feita exclusivamente para artes marciais.</p>
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
              <p><strong>Não escorrega</strong> — devido à textura em alto-relevo.</p>
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
            alt="Textura T50-PRO Taurun"
            class="s2-hexaimg"
            ref="s2HexaImg"
          />
          <div class="s2-image-overlay" />
          <div class="s2-image-vignette" />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 06 — Benefícios Chave & Vantagens Competitivas
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-beneficios"
      :class="{ active: currentSlide === 6 }"
      ref="slideBeneficios"
    >
      <div class="ben-container">
        
        <!-- Coluna Esquerda: Título + Cards de Benefícios -->
        <div class="ben-left-col">
          <div class="ben-header" ref="benHeader">
            <span class="ben-eyebrow">VANTAGENS COMPETITIVAS</span>
            <h2 class="ben-title">Benefícios Chave do T50-PRO</h2>
          </div>

          <div class="ben-grid" ref="benGrid">
            <!-- Card 1: Impermeável -->
            <div class="ben-card">
              <div class="ben-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 14h16" />
                  <path d="M7 14l-2 5" />
                  <path d="M17 14l2 5" />
                  <path d="M12 4v10" />
                  <path d="M8 8l4-4 4 4" />
                </svg>
              </div>
              <p class="ben-card-text">
                Tatame impermeável e de fácil higienização
              </p>
            </div>

            <!-- Card 2: Sem Encaixes -->
            <div class="ben-card">
              <div class="ben-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 10l3 3 7-7" />
                </svg>
              </div>
              <p class="ben-card-text">
                Totalmente sem encaixes e frestas
              </p>
            </div>

            <!-- Card 3: Acabamento Profissional -->
            <div class="ben-card">
              <div class="ben-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <p class="ben-card-text">
                Acabamentos de alto padrão e completamente profissionais
              </p>
            </div>

            <!-- Card 4: Sem Mau Cheiro -->
            <div class="ben-card">
              <div class="ben-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <p class="ben-card-text">
                Sem problemas com o mau cheiro
              </p>
            </div>

            <!-- Card 5: Conversão de Clientes -->
            <div class="ben-card">
              <div class="ben-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <p class="ben-card-text">
                Maior chance de conversão de clientes
              </p>
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Imagem do Tatame T50-PRO (Flow Life) -->
        <div class="ben-right-col">
          <div class="ben-image-frame">
            <img
              src="/t50-pro-flowlife.jpg"
              alt="Tatame Taurun T50-PRO instalado em academia"
              class="ben-tatame-img"
              ref="benImg"
            />
            <div class="ben-img-overlay" />
          </div>
        </div>

      </div>
    </section>



    <!-- ═══════════════════════════════════════════
         SLIDE 07 — Etapas do Projeto
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-04"
      :class="{ active: currentSlide === 7 }"
      ref="slide04"
    >
      <div class="s4-container">
        <div class="s4-header" ref="s4Header">
          <span class="s4-eyebrow">Etapas do Projeto Após</span>
          <h2 class="s4-title">Fechamento do Contrato</h2>
        </div>

        <div class="s4-cards-wrapper" ref="s4CardsWrap">
          <div
            v-for="(etapa, index) in etapas"
            :key="index"
            class="s4-card"
            :class="{ 'is-active': activeEtapa === index }"
            @click="activeEtapa = index"
          >
            <div class="s4-card-header">
              <span class="s4-number">{{ etapa.number }}</span>
              <div class="s4-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="s4-icon">
                  <path :d="etapa.iconPath" />
                </svg>
              </div>
            </div>

            <div class="s4-card-body">
              <h3 class="s4-card-title">{{ etapa.title }}</h3>
              <p class="s4-card-desc">{{ etapa.description }}</p>
            </div>

            <div class="s4-collapsed-label">
              <span>{{ etapa.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 08 — Quem São Nossos Clientes?
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-05"
      :class="{ active: currentSlide === 8 }"
      ref="slide05"
    >
      <div class="s5-container">
        <div class="s5-header" ref="s5Header">
          <span class="s5-eyebrow">QUEM SÃO OS</span>
          <h2 class="s5-title">Nossos Clientes?</h2>
        </div>

        <div class="s5-grid" ref="s5Grid">
          <div
            v-for="(atleta, index) in atletas"
            :key="index"
            class="s5-athlete-item"
            :class="{ 'is-revealed': atleta.revealed }"
            @click="atleta.revealed = !atleta.revealed"
          >
            <div class="s5-avatar-wrap">
              <div class="s5-unrevealed-overlay">
                <span class="s5-mystery-mark">?</span>
                <span class="s5-touch-hint">clique</span>
              </div>
              <img
                :src="atleta.image"
                :alt="atleta.name"
                class="s5-avatar-img"
              />
            </div>

            <div class="s5-name-wrap">
              <span class="s5-name">{{ atleta.name }}</span>
            </div>
          </div>
        </div>

        <button
          class="s5-reveal-all-btn"
          @click="toggleRevealAll"
        >
          {{ allRevealed ? 'Ocultar Todos' : 'Revelar Todos' }}
        </button>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SLIDE 09 — Orçamento & Investimento Comercial (T50-PRO)
    ════════════════════════════════════════════ -->
    <section
      class="slide slide-06"
      :class="{ active: currentSlide === 9 }"
      ref="slide06"
    >
      <div class="s6-container">
        <!-- Header -->
        <div class="s6-header" ref="s6Header">
          <span class="s6-eyebrow">RESUMO DO ORÇAMENTO T50-PRO</span>
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
            <!-- Badge Indicador de Tabela / Condição Especial -->
            <div class="s6-meta-item s6-meta-item--status">
              <span class="s6-status-badge" :class="{ 'is-special': isDiscountApplied }">
                {{ isDiscountApplied ? '✓ Tabela Promocional do Consultor' : 'Tabela Oficial de Fábrica' }}
              </span>
            </div>
          </div>

          <!-- Tabela de Produtos / Itens Cotados -->
          <div class="s6-items-table">

            <!-- Item 1: Tatame T50-PRO -->
            <div class="s6-item-row">
              <div class="s6-item-info">
                <span class="s6-item-badge">Produto Principal</span>
                <h4 class="s6-item-name">Tatame Taurun T50-PRO</h4>
                <p class="s6-item-desc">{{ quote.quantityM2.value }}m² de superfície unificada de alta performance.</p>
              </div>
              <div class="s6-item-specs">
                <div class="s6-spec">
                  <span class="s6-spec-label">Metragem</span>
                  <span class="s6-spec-val">{{ quote.quantityM2.value }} m²</span>
                </div>
                <div class="s6-spec">
                  <span class="s6-spec-label">Valor / m²</span>
                  <span class="s6-spec-val">{{ quote.formatCurrency(displayPricePerM2) }}</span>
                </div>
                <div class="s6-spec s6-spec--subtotal">
                  <span class="s6-spec-label">Subtotal</span>
                  <span class="s6-spec-val">{{ quote.formatCurrency(displayTotalTatame) }}</span>
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
                  <span class="s6-spec-val">{{ quote.vinilQuantity.value }} m</span>
                </div>
                <div class="s6-spec">
                  <span class="s6-spec-label">Valor / m</span>
                  <span class="s6-spec-val">{{ quote.formatCurrency(displayVinilUnitPrice) }}</span>
                </div>
                <div class="s6-spec s6-spec--subtotal">
                  <span class="s6-spec-label">Subtotal</span>
                  <span class="s6-spec-val">{{ quote.formatCurrency(displayTotalVinil) }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Total Geral e Botão Interativo de Condição Especial -->
          <div class="s6-total-bar">
            <div class="s6-total-block">
              <span class="s6-total-label">
                {{ isDiscountApplied ? 'INVESTIMENTO FINAL (CONDIÇÃO ESPECIAL)' : 'VALOR DE TABELA OFICIAL' }}
              </span>

              <!-- Preço original riscado + preço promocional real -->
              <div class="s6-total-amount-wrap">
                <span v-if="isDiscountApplied" class="s6-strikethrough-amount">
                  {{ quote.formatCurrency(inflatedGrandTotal) }}
                </span>
                <div class="s6-total-amount" :class="{ 'is-special': isDiscountApplied }">
                  {{ quote.formatCurrency(displayGrandTotal) }}
                </div>
              </div>
            </div>

            <!-- Botão Interativo para o Vendedor Alternar entre Tabela Inflada e Preço Real -->
            <button
              class="s6-discount-toggle-btn"
              :class="{ 'is-applied': isDiscountApplied }"
              @click="isDiscountApplied = !isDiscountApplied"
            >
              <span v-if="!isDiscountApplied" class="s6-toggle-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="s6-toggle-icon">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Aplicar Condição Especial</span>
              </span>
              <span v-else class="s6-toggle-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="s6-toggle-icon">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Condição Especial Aplicada</span>
              </span>
            </button>
          </div>

          <!-- Benefícios e Garantia -->
          <div class="s6-perks">
            <span class="s6-perk">✓ Fábrica própria com entrega garantida</span>
            <span class="s6-perk">✓ Projeto e instalação sob medida inclusos</span>
            <span class="s6-perk">✓ Garantia oficial Taurun T50-PRO de alta performance</span>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, reactive } from 'vue'const mapNodes = [
  // ── BRASIL (CLUSTER PRINCIPAL — ALTA DENSIDADE) ──────────────
  { x: 295, y: 580, size: 3.5 }, // SP Capital
  { x: 285, y: 571, size: 2.5 }, // Campinas
  { x: 301, y: 589, size: 2.5 }, // Santos
  { x: 279, y: 561, size: 2.2 }, // Ribeirão Preto
  { x: 308, y: 575, size: 3.5 }, // RJ Capital
  { x: 298, y: 551, size: 3.0 }, // BH
  { x: 313, y: 555, size: 2.2 }, // Vitória
  { x: 280, y: 595, size: 3.0 }, // Curitiba
  { x: 285, y: 608, size: 2.8 }, // Florianópolis
  { x: 275, y: 620, size: 3.0 }, // Porto Alegre
  { x: 291, y: 535, size: 3.5 }, // Brasília
  { x: 282, y: 541, size: 2.5 }, // Goiânia
  { x: 325, y: 518, size: 3.2 }, // Salvador
  { x: 338, y: 498, size: 3.2 }, // Recife (costa nordeste)
  // Clusters adicionais Brasil
  { x: 298, y: 584, size: 2.0 }, // Grande SP cluster
  { x: 292, y: 577, size: 2.0 },
  { x: 311, y: 578, size: 2.0 },
  { x: 288, y: 538, size: 2.0 },
  { x: 303, y: 568, size: 2.2 }, // Vale do Paraíba
  { x: 277, y: 601, size: 2.0 }, // Interior SC
  { x: 294, y: 544, size: 2.0 }, // Interior MG
  { x: 318, y: 525, size: 2.2 }, // Norte RJ / Sul BA
  { x: 270, y: 558, size: 1.8 }, // Campo Grande

  // ── CALIFÓRNIA — LA — SAN FRANCISCO ─────────────────────
  { x: 123, y: 407, size: 3.5 }, // San Francisco / Bay Area
  { x: 120, y: 413, size: 2.8 }, // San Jose
  { x: 127, y: 423, size: 3.8 }, // Los Angeles
  { x: 125, y: 420, size: 2.8 }, // LA - West Hollywood
  { x: 129, y: 428, size: 2.5 }, // LA - Long Beach
  { x: 131, y: 433, size: 2.8 }, // San Diego

  // ── TEXAS ───────────────────────────────────────────────────
  { x: 168, y: 443, size: 3.2 }, // Dallas
  { x: 172, y: 449, size: 3.0 }, // Fort Worth / Dallas area
  { x: 176, y: 453, size: 3.5 }, // Houston
  { x: 168, y: 455, size: 2.5 }, // Austin
  { x: 168, y: 461, size: 2.2 }, // San Antonio

  // ── BOLÍVIA ───────────────────────────────────────────────────
  { x: 248, y: 573, size: 3.5 }, // La Paz / Santa Cruz

  // ── IRLANDA ───────────────────────────────────────────────────
  { x: 389, y: 386, size: 3.5 }, // Dublin

  // ── ABU DHABI (EAU) ───────────────────────────────────────────
  { x: 532, y: 468, size: 3.8 }, // Abu Dhabi / Dubai

  // ── EUROPA (ESPALHADOS) ───────────────────────────────────────
  { x: 401, y: 375, size: 3.0 }, // Londres (UK)
  { x: 407, y: 390, size: 3.2 }, // Paris (França)
  { x: 427, y: 372, size: 3.0 }, // Berlim (Alemanha)
  { x: 438, y: 403, size: 2.8 }, // Roma (Itália)
  { x: 383, y: 400, size: 2.8 }, // Madrid (Espanha)
  { x: 420, y: 385, size: 2.2 }, // Amsterdam
  { x: 445, y: 388, size: 2.2 }, // Viena
  { x: 415, y: 365, size: 2.0 }  // Copenhague
]

// Linhas de Rede conectando a malha global
const networkConnections = [
  // Brasil interno
  { x1: 295, y1: 580, x2: 308, y2: 575 }, // SP - RJ
  { x1: 295, y1: 580, x2: 298, y2: 551 }, // SP - BH
  { x1: 295, y1: 580, x2: 280, y2: 595 }, // SP - Curitiba
  { x1: 298, y1: 551, x2: 291, y2: 535 }, // BH - Brasília
  { x1: 291, y1: 535, x2: 325, y2: 518 }, // Brasília - Salvador
  { x1: 325, y1: 518, x2: 338, y2: 498 }, // Salvador - Recife

  // Rotas Internacionais (Brasil -> Mundo)
  { x1: 295, y1: 580, x2: 248, y2: 573 }, // SP - Bolívia
  { x1: 295, y1: 580, x2: 127, y2: 423 }, // SP - Los Angeles
  { x1: 308, y1: 575, x2: 407, y2: 390 }, // RJ - Paris (Europa Hub)
  { x1: 407, y1: 390, x2: 389, y2: 386 }, // Paris - Irlanda
  { x1: 407, y1: 390, x2: 401, y2: 375 }, // Paris - UK
  { x1: 407, y1: 390, x2: 427, y2: 372 }, // Paris - Alemanha
  { x1: 407, y1: 390, x2: 438, y2: 403 }, // Paris - Itália
  { x1: 407, y1: 390, x2: 532, y2: 468 }, // Paris - Abu Dhabi
  { x1: 127, y1: 423, x2: 168, y2: 443 }, // LA - Dallas
  { x1: 127, y1: 423, x2: 401, y2: 375 }  // LA - UK
]

// ── Refs Slide 03 Camadas (T50-GOLD Absorção Híbrida) ─────────────────
const slideCamadas   = ref<HTMLElement>()
const camadasStage   = ref<HTMLElement>()
const camadasImg     = ref<HTMLElement>()
const camadasInfoCol = ref<HTMLElement>()

const svgLineC1 = ref<SVGPolylineElement>()
const svgLineC2 = ref<SVGPolylineElement>()
const svgLineC3 = ref<SVGPolylineElement>()

const contentC1 = ref<HTMLElement>()
const contentC2 = ref<HTMLElement>()
const contentC3 = ref<HTMLElement>()

function handleMouseMoveStage(e: MouseEvent) {
  if (!camadasStage.value || !camadasImg.value) return
  const rect = camadasStage.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5

  gsap.to(camadasImg.value, {
    rotationY: x * 18,
    rotationX: -y * 18,
    x: x * 20,
    y: y * 20,
    duration: 0.4,
    ease: 'power2.out',
    overwrite: 'auto'
  })
}

function handleMouseLeaveStage() {
  if (!camadasImg.value) return
  gsap.to(camadasImg.value, {
    rotationY: 0,
    rotationX: 0,
    x: 0,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto'
  })
}

// ── Refs Slide 04 (Acabamentos em Alto Padrão) ─────────────────────
const slideAcabamentos = ref<HTMLElement>()
const acabHeader       = ref<HTMLElement>()
const acabDesc         = ref<HTMLElement>()
const acabVertFrame    = ref<HTMLElement>()

function animateSlideAcabamentos() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  gsap.set(acabHeader.value,    { autoAlpha: 0, y: -20 })
  gsap.set(acabDesc.value,      { autoAlpha: 0, y: 15 })
  gsap.set(acabVertFrame.value, { autoAlpha: 0, x: 30, scale: 0.96 })

  tl
    .to(acabHeader.value,    { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
    .to(acabDesc.value,      { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
    .to(acabVertFrame.value, { autoAlpha: 1, x: 0, scale: 1, duration: 0.9 }, 0.3)
}

// ── Refs Slide 05 (A Superfície Perfeita) ──────────────────────
const slide02      = ref<HTMLElement>()
const s2Text       = ref<HTMLElement>()
const s2TitleBlock = ref<HTMLElement>()
const s2Concept    = ref<HTMLElement>()
const topic1       = ref<HTMLElement>()
const topic2       = ref<HTMLElement>()
const topic3       = ref<HTMLElement>()
const line1        = ref<HTMLElement>()
const line2        = ref<HTMLElement>()
const line3        = ref<HTMLElement>()
const s2ImageFrame = ref<HTMLElement>()
const s2HexaImg    = ref<HTMLElement>()

// ── Refs Slide 06 (Benefícios Chave) ──────────────────────────
const slideBeneficios = ref<HTMLElement>()
const benHeader       = ref<HTMLElement>()
const benGrid         = ref<HTMLElement>()
const benImg          = ref<HTMLElement>()

function animateSlideBeneficios() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Reset elementos para estado inicial
  gsap.set(benHeader.value, { autoAlpha: 0, y: -30, filter: 'blur(10px)' })

  const cards = benGrid.value?.querySelectorAll('.ben-card') || []
  const iconBoxes = benGrid.value?.querySelectorAll('.ben-icon-box') || []
  const cardTexts = benGrid.value?.querySelectorAll('.ben-card-text') || []

  gsap.set(cards, {
    autoAlpha: 0,
    x: -60,
    rotationY: -15,
    transformPerspective: 1000,
    transformOrigin: 'left center'
  })
  gsap.set(iconBoxes, { autoAlpha: 0, scale: 0.3, rotation: -45 })
  gsap.set(cardTexts, { autoAlpha: 0, x: 15 })

  if (benImg.value?.parentElement) {
    gsap.set(benImg.value.parentElement, {
      clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
      autoAlpha: 1
    })
    gsap.set(benImg.value, { scale: 1.18, filter: 'brightness(0.6) blur(6px)' })
  }

  // Animação sequencial em camadas
  tl
    .to(benHeader.value, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, 0)
    .to(benImg.value?.parentElement || [], {
      clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
      duration: 1.2,
      ease: 'expo.inOut'
    }, 0.1)
    .to(benImg.value, {
      scale: 1,
      filter: 'brightness(1) blur(0px)',
      duration: 1.4,
      ease: 'power3.out'
    }, 0.2)
    .to(cards, {
      autoAlpha: 1,
      x: 0,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.09,
      ease: 'power3.out'
    }, 0.3)
    .to(iconBoxes, {
      autoAlpha: 1,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.09,
      ease: 'back.out(2)'
    }, 0.45)
    .to(cardTexts, {
      autoAlpha: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.09,
      ease: 'power2.out'
    }, 0.5)
}

// ── Refs & Lógica do SLIDE ABSORÇÃO HÍBRIDA ─────────────────────
const slideAbsorcao   = ref<HTMLElement>()
const absHeader       = ref<HTMLElement>()
const absSelector     = ref<HTMLElement>()
const absStageCol     = ref<HTMLElement>()
const calloutSoft     = ref<HTMLElement>()
const calloutBase     = ref<HTMLElement>()
const lineSoft        = ref<SVGPolylineElement>()
const lineBase        = ref<SVGPolylineElement>()

const activeImpactMode = ref<'soft' | 'heavy'>('soft')
let impactTimeline: gsap.core.Timeline | null = null

const impactData = reactive({
  baseCenterY: 150,
  softCenterY: 60,
})

const basePoints = computed(() => `0,250 500,250 500,150 250,${impactData.baseCenterY} 0,150`)
const softPoints = computed(() => `0,145 250,${impactData.baseCenterY - 5} 500,145 500,60 250,${impactData.softCenterY} 0,60`)

function setImpactMode(mode: 'soft' | 'heavy') {
  activeImpactMode.value = mode
  
  if (impactTimeline) {
    impactTimeline.kill()
  }
  
  // Reseta estado para a transição
  gsap.to(impactData, {
    baseCenterY: 150,
    softCenterY: 60,
    duration: 0.4,
    ease: 'power2.out',
    onComplete: () => {
      impactTimeline = gsap.timeline({ repeat: -1, yoyo: true })
      
      if (mode === 'soft') {
        impactTimeline.to(impactData, {
          baseCenterY: 150, // Base não afunda no treino diário
          softCenterY: 85,  // Topo amassa levemente (focal)
          duration: 1.2,
          ease: 'sine.inOut'
        })
      } else {
        impactTimeline.to(impactData, {
          baseCenterY: 175, // Base afunda no centro (dissipação)
          softCenterY: 120, // Topo amassa muito
          duration: 0.8,
          ease: 'sine.inOut'
        })
      }
    }
  })
}

function animateSlideAbsorcao() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  gsap.set(absHeader.value, { autoAlpha: 0, x: 40, filter: 'blur(8px)' })
  gsap.set(absSelector.value, { autoAlpha: 0, x: 40 })
  gsap.set(absStageCol.value, { autoAlpha: 0, scale: 0.95, filter: 'blur(12px)' })
  
  // Reset da cena
  gsap.to(impactData, { 
    softCenterY: 60, 
    baseCenterY: 150, 
    duration: 0.1
  })
  
  // Esconde SVG Lines e Callouts
  gsap.set([lineSoft.value, lineBase.value], { drawSVG: '0%' })
  gsap.set([calloutSoft.value, calloutBase.value], { autoAlpha: 0, scale: 0.9 })

  tl
    .to(absHeader.value, { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 0.8 }, 0)
    .to(absSelector.value, { autoAlpha: 1, x: 0, duration: 0.8 }, 0.15)
    .to(absStageCol.value, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1 }, 0.2)
    .to(impactData, { 
      softCenterY: 60,
      duration: 1, 
      ease: 'bounce.out' 
    }, 0.4)
    // Anima Linhas e Callouts
    .to([lineSoft.value, lineBase.value], { drawSVG: '100%', duration: 0.8, stagger: 0.2 }, 0.8)
    .to([calloutSoft.value, calloutBase.value], { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.5)' }, 1.0)
    .add(() => {
      setImpactMode('soft')
    }, 1.2)
}

// ── Refs Slide 05 (Antes/Depois) ──────────────────────────────
const slide03      = ref<HTMLElement>()
const s3Header     = ref<HTMLElement>()
const s3Compare    = ref<HTMLElement>()
const s3BeforeLabel= ref<HTMLElement>()
const s3AfterLabel = ref<HTMLElement>()
const s3PhrasesWrap= ref<HTMLElement>()
const s3Phrase1    = ref<HTMLElement>()
const s3Phrase2    = ref<HTMLElement>()
const s3Phrase3    = ref<HTMLElement>()

// ── Slide 06 refs & data (Etapas) ──────────────────────────────
const slide04     = ref<HTMLElement>()
const s4Header    = ref<HTMLElement>()
const s4CardsWrap = ref<HTMLElement>()
const activeEtapa = ref(0)

// ── Slide 07 refs & data (Clientes) ────────────────────────────
const slide05  = ref<HTMLElement>()
const s5Header = ref<HTMLElement>()
const s5Grid   = ref<HTMLElement>()

// ── Slide 08 refs (Proposta) ──────────────────────────────────
const slide06  = ref<HTMLElement>()
const s6Header = ref<HTMLElement>()
const s6Card   = ref<HTMLElement>()

// Preço inflado (+35%) & Condição Especial do Vendedor
const isDiscountApplied = ref(false)
const INFLATION_FACTOR = 1.35

const displayPricePerM2 = computed(() => {
  return isDiscountApplied.value
    ? quote.pricePerM2.value
    : quote.pricePerM2.value * INFLATION_FACTOR
})

const displayTotalTatame = computed(() => {
  return isDiscountApplied.value
    ? quote.totalTatamePrice.value
    : quote.totalTatamePrice.value * INFLATION_FACTOR
})

const displayVinilUnitPrice = computed(() => {
  return isDiscountApplied.value
    ? quote.vinilUnitPrice.value
    : quote.vinilUnitPrice.value * INFLATION_FACTOR
})

const displayTotalVinil = computed(() => {
  return isDiscountApplied.value
    ? quote.totalVinilPrice.value
    : quote.totalVinilPrice.value * INFLATION_FACTOR
})

const displayGrandTotal = computed(() => {
  return isDiscountApplied.value
    ? quote.grandTotal.value
    : quote.grandTotal.value * INFLATION_FACTOR
})

const inflatedGrandTotal = computed(() => {
  return quote.grandTotal.value * INFLATION_FACTOR
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
    description: 'Disponibilizamos nossa equipe de arquitetos e designer gráficos para desenvolver cada aspecto visual do projeto T50-GOLD com projeções 3D.',
    iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    number: '02',
    title: 'Produção',
    description: 'O tatame T50-GOLD é fabricado sob medida na nossa fábrica própria.',
    iconPath: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83',
  },
  {
    number: '03',
    title: 'Envio',
    description: 'Todo material é embalado e enviado via logística especializada.',
    iconPath: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12',
  },
  {
    number: '04',
    title: 'Instalação',
    description: 'Nossa equipe técnica executa toda a montagem unificada no local.',
    iconPath: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  },
]

// Slider interativo slide 05
const sliderPos  = ref(50)
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

// ── GSAP — Slide 02 — MAPA MUNDI ANIMADO EM 10 SEGUNDOS ───
let mapTimeline: gsap.core.Timeline | null = null

function animateSlideMapa() {
  if (mapTimeline) mapTimeline.kill()
  
  const tl = gsap.timeline()
  mapTimeline = tl

  animationProgress.value = 0

  // Resets iniciais
  gsap.set(mapaHeader.value,    { autoAlpha: 0, y: -20 })
  gsap.set(mapaDesc.value,      { autoAlpha: 0, y: 15 })
  gsap.set(mapaStatsGrid.value, { autoAlpha: 0, y: 20 })
  gsap.set(mapaSvgCol.value,    { autoAlpha: 0, scale: 0.94 })

  if (scannerLine.value) {
    gsap.set(scannerLine.value, { top: '0%', autoAlpha: 0.8 })
  }

  if (mapNodeEls.value?.length) {
    gsap.set(mapNodeEls.value, { autoAlpha: 0, scale: 0, transformOrigin: 'center center' })
  }
  if (netLineEls.value?.length) {
    gsap.set(netLineEls.value, { autoAlpha: 0, strokeDasharray: 50, strokeDashoffset: 50 })
  }

  const counterObj = { count: 0, progress: 0 }
  if (gymCountEl.value) gymCountEl.value.innerText = '0'

  // 1. Entradas dos textos (0s - 0.8s)
  tl
    .to(mapaHeader.value,    { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0)
    .to(mapaDesc.value,      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0.15)
    .to(mapaStatsGrid.value, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0.3)
    .to(mapaSvgCol.value,    { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'expo.out' }, 0.2)

  // 2. Animação da Scanner Line varrendo o Brasil (0s - 10s)
  if (scannerLine.value) {
    tl.to(scannerLine.value, {
      top: '100%',
      duration: 9.8,
      ease: 'power1.inOut'
    }, 0.2)
  }

  // 3. Preenchimento gradual e constante dos pontos pelo mapa do Brasil (EXATAMENTE 10s)
  if (mapNodeEls.value?.length) {
    tl.to(mapNodeEls.value, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2)',
      stagger: {
        amount: 9.2,
        from: 'random'
      }
    }, 0.5)
  }

  // 4. Linhas de conexão
  if (netLineEls.value?.length) {
    tl.to(netLineEls.value, {
      autoAlpha: 0.5,
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: {
        amount: 8.5,
        from: 'start'
      }
    }, 0.8)
  }

  // 5. Incremento numérico contínuo do contador de 0 a 1000+ (0.2s - 10s)
  tl.to(counterObj, {
    count: 1000,
    progress: 100,
    duration: 9.8,
    ease: 'power2.out',
    onUpdate: () => {
      if (gymCountEl.value) {
        gymCountEl.value.innerText = Math.floor(counterObj.count).toString()
      }
      animationProgress.value = Math.floor(counterObj.progress)
    }
  }, 0.2)
}

// ── GSAP — Slide Camadas (Estrutura T50-PRO Absorção Híbrida) ────────
function animateSlideCamadas() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  const setupLine = (el?: SVGPolylineElement) => {
    if (!el) return
    const len = el.getTotalLength ? el.getTotalLength() : 350
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
  }

  setupLine(svgLineC1.value)
  setupLine(svgLineC2.value)
  setupLine(svgLineC3.value)

  gsap.set(camadasImg.value,     { autoAlpha: 0, scale: 0.9, y: 30 })
  gsap.set(camadasInfoCol.value, { autoAlpha: 0, x: 40 })
  gsap.set([contentC1.value, contentC2.value, contentC3.value], { autoAlpha: 0, y: 15, scale: 0.95 })

  tl
    .to(camadasImg.value,     { autoAlpha: 1, scale: 1, y: 0, duration: 1 }, 0)
    .to(camadasInfoCol.value, { autoAlpha: 1, x: 0, duration: 0.8 }, 0.2)

    // Linha 1 & Rótulo Camada 01 (Lona Hexafibra)
    .to(svgLineC1.value, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.5)
    .to(contentC1.value, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 }, 0.8)

    // Linha 2 & Rótulo Camada 02 (Espuma de Alto Retorno)
    .to(svgLineC2.value, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.7)
    .to(contentC2.value, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 }, 1.0)

    // Linha 3 & Rótulo Camada 03 (Granulado TS40)
    .to(svgLineC3.value, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.9)
    .to(contentC3.value, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 }, 1.2)
}

// ── GSAP — Slide 04 (A Superfície Perfeita) ───────────────────
function animateSlide02() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  gsap.set(s2ImageFrame.value, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0 })
  gsap.set(s2HexaImg.value,    { scale: 1.12 })
  gsap.set(s2TitleBlock.value, { autoAlpha: 0, y: 30 })
  gsap.set(s2Concept.value,    { autoAlpha: 0, y: 20 })
  gsap.set([topic1.value, topic2.value, topic3.value], { autoAlpha: 0, x: -30 })
  gsap.set([line1.value, line2.value, line3.value], { scaleX: 0, transformOrigin: 'left center' })

  tl
    .to(s2ImageFrame.value, { clipPath: 'inset(0 0% 0 0)', autoAlpha: 1, duration: 1.1 }, 0)
    .to(s2HexaImg.value,    { scale: 1, duration: 1.6, ease: 'power2.out' }, 0)
    .to(s2TitleBlock.value, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.4)
    .to(s2Concept.value,    { autoAlpha: 1, y: 0, duration: 0.55 }, 0.65)
    .to(topic1.value,       { autoAlpha: 1, x: 0, duration: 0.45 }, 0.85)
    .to(line1.value,        { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0.92)
    .to(topic2.value,       { autoAlpha: 1, x: 0, duration: 0.45 }, 1.1)
    .to(line2.value,        { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 1.17)
    .to(topic3.value,       { autoAlpha: 1, x: 0, duration: 0.45 }, 1.35)
    .to(line3.value,        { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 1.42)
}

// ── GSAP — Slide 05 (Antes & Depois) ──────────────────────────
function animateSlide03() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  sliderPos.value = 5
  const animObj = { pos: 5 }

  gsap.set(s3Compare.value,     { autoAlpha: 0, scale: 0.94 })
  gsap.set(s3Handle.value,      { autoAlpha: 0 })
  gsap.set(s3LabelAntes.value,  { autoAlpha: 0, y: 6 })
  gsap.set(s3LabelDepois.value, { autoAlpha: 0, y: 6 })
  gsap.set(s3Right.value,       { autoAlpha: 0, x: 40 })
  gsap.set(s3TitleBlock.value,  { autoAlpha: 0, y: 25 })
  gsap.set([s3Phrase1.value, s3Phrase2.value, s3Phrase3.value], { autoAlpha: 0, x: 20 })

  tl
    .to(s3Compare.value,    { autoAlpha: 1, scale: 1, duration: 0.8 }, 0)
    .to(s3LabelAntes.value, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.6)
    .to(s3Right.value,      { autoAlpha: 1, x: 0, duration: 0.7 }, 0.3)
    .to(s3TitleBlock.value, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.5)
    .to(animObj, {
      pos: 50,
      duration: 1.3,
      ease: 'power3.inOut',
      onUpdate: () => { sliderPos.value = animObj.pos }
    }, 0.8)
    .to(s3Handle.value,      { autoAlpha: 1, duration: 0.3 }, 1.6)
    .to(s3LabelDepois.value, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.5)
    .to(s3Phrase1.value,     { autoAlpha: 1, x: 0, duration: 0.45 }, 1.3)
    .to(s3Phrase2.value,     { autoAlpha: 1, x: 0, duration: 0.45 }, 1.6)
    .to(s3Phrase3.value,     { autoAlpha: 1, x: 0, duration: 0.45 }, 1.9)
}

// ── GSAP — Slide 06 (Etapas) ──────────────────────────────────
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

// ── GSAP — Slide 07 (Clientes) ────────────────────────────────
function animateSlide05() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
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

// ── GSAP — Slide 08 (Proposta) ────────────────────────────────
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
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Geist:wght@300;400;500;600;700;800&display=swap');

/* ── Container base da apresentação ─────────────────────────── */
.pres-root {
  position: fixed;
  inset: 0;
  background: #0d1012;
  overflow: hidden;
  outline: none;
  font-family: 'Geist', sans-serif;
  color: #fff;
}

/* ── Botão Sair da Apresentação ──────────────────────────── */
.exit-pres-btn {
  position: fixed;
  top: clamp(1rem, 2.5vw, 1.8rem);
  left: clamp(1rem, 2.5vw, 1.8rem);
  z-index: 210;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 1.1rem;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(14px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.exit-pres-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.4);
  color: #ffffff;
  transform: translateX(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
}

.exit-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.exit-pres-btn:hover .exit-icon {
  transform: translateX(-3px);
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

.nav-arrow--left  { left: 1.5rem; }
.nav-arrow--right { right: 1.5rem; }
.nav-arrow.hidden {
  opacity: 0;
  pointer-events: none;
}

.nav-arrow svg {
  width: 18px;
  height: 18px;
}

/* ── Contador de slides ──────────────────────────────────────── */
.slide-counter {
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;
  z-index: 200;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.2);
}

/* ── Slides genérico ─────────────────────────────────────────── */
.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide.active {
  opacity: 1;
  pointer-events: auto;
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 01 — Capa (Logo Reveal)
   ══════════════════════════════════════════════════════════════ */
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
  filter: brightness(0) invert(1) brightness(0.42) saturate(0);
}

.tagline {
  font-size: clamp(0.6rem, 1vw, 0.75rem);
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(105,105,105,0.55);
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 02 — MAPA OFICIAL DO BRASIL TECH & ANIMADO (10s)
   ══════════════════════════════════════════════════════════════ */
.slide-mapa {
  align-items: center;
  justify-content: center;
  background: #0d1012;
  padding: 2rem clamp(2rem, 4vw, 5rem);
  width: 100%;
  height: 100%;
}

.mapa-container {
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: grid;
  grid-template-columns: 40% 60%;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.mapa-info-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  z-index: 10;
}

.mapa-title-block {
  display: flex;
  flex-direction: column;
  line-height: 0.95;
}

.mapa-sup {
  font-family: 'Geist', sans-serif;
  font-size: clamp(1rem, 1.6vw, 1.4rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
}

.mapa-italic {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2.8rem, 4.8vw, 4.5rem);
  font-weight: 600;
  color: #ffffff;
}

.mapa-desc {
  font-size: clamp(0.95rem, 1.25vw, 1.15rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.mapa-desc strong {
  color: #ffffff;
  font-weight: 600;
}

.mapa-single-stat-card {
  width: 100%;
  padding: 2.2rem 2.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.mapa-big-number-wrap {
  display: flex;
  align-items: baseline;
  line-height: 1;
}

.mapa-big-number, .mapa-big-plus {
  font-family: 'Geist', sans-serif;
  font-size: clamp(3.8rem, 5.5vw, 5.5rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.03em;
}

.mapa-big-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

.mapa-stat-card--full {
  grid-column: 1 / -1;
  padding: 1rem 1.2rem;
}

.mapa-stat-value {
  font-size: clamp(1.8rem, 2.6vw, 2.5rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.mapa-stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.45);
}

.mapa-stat-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.mapa-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  animation: pulseDot 1.5s infinite alternate;
}

.mapa-status-dot.is-complete {
  background: #ffffff;
  animation: none;
}

@keyframes pulseDot {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}

.mapa-status-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
  font-weight: 500;
}

.mapa-progress-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.mapa-progress-bar {
  height: 100%;
  background: #ffffff;
  border-radius: 4px;
  transition: width 0.1s linear;
}

/* Coluna Direita (Mapa do Brasil Oficial + Sincronização SVG) */
.mapa-svg-col {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.mapa-svg-wrapper {
  position: relative;
  width: 100%;
  max-width: 740px;
  height: 680px;
  border-radius: 18px;
  background: radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.5) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mapa-br-svg-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* SVG já tem fill cinza-claro e stroke branco — só precisamos de opacidade */
  opacity: 0.3;
  pointer-events: none;
}

.mapa-overlay-svg {
  position: absolute;
  inset: 1.5rem;
  width: calc(100% - 3rem);
  height: calc(100% - 3rem);
  pointer-events: none;
}

.mapa-scanner-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
  z-index: 10;
  pointer-events: none;
}

.mapa-net-line {
  stroke: rgba(255, 255, 255, 0.25);
  stroke-width: 0.3;
  stroke-dasharray: 1 1;
}

.node-pulse-ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.6);
  stroke-width: 0.3;
  animation: ringPulse 2s infinite ease-out;
  transform-origin: center;
}

@keyframes ringPulse {
  0%   { r: 0.8px; opacity: 0.9; }
  100% { r: 4px; opacity: 0; }
}

.mapa-hubs-labels {
  pointer-events: none;
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 03 — A SOLUÇÃO: ESTRUTURA T50-PRO (ABSORÇÃO HÍBRIDA)
   ══════════════════════════════════════════════════════════════ */
.slide-camadas {
  align-items: center;
  justify-content: center;
  background: #0d1012;
  padding: 2rem clamp(2rem, 5vw, 6rem);
  width: 100%;
  height: 100%;
}

.camadas-grid-container {
  max-width: 1350px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 56% 44%;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.camadas-stage-col {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.camadas-stage {
  position: relative;
  width: 100%;
  max-width: 760px;
  aspect-ratio: 1000 / 600;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  transform-style: preserve-3d;
  cursor: pointer;
}

.camadas-render-img {
  width: 82%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.85));
  transform-style: preserve-3d;
  will-change: transform;
}

.camadas-lines-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.svg-line {
  fill: none;
  stroke: #ffffff;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.svg-dot {
  fill: #ffffff;
}

.svg-dot-pulse {
  fill: rgba(255, 255, 255, 0.4);
  animation: dotPulse 2s infinite ease-in-out;
}

.camadas-callout {
  position: absolute;
  z-index: 30;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.callout-c1 {
  top: -4%;
  left: -16%;
}

.callout-c2 {
  top: -6%;
  right: -6%;
}

.callout-c3 {
  bottom: -4%;
  left: -16%;
}

.callout-box {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.16);
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.callout-header-brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.callout-hexafibra-logo {
  height: 14px;
  width: auto;
  filter: brightness(0) invert(1);
}

.callout-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
}

.callout-title {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.callout-tag {
  font-size: clamp(0.7rem, 0.85vw, 0.8rem);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.camadas-info-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.8rem;
  z-index: 10;
}

.camadas-title-block {
  display: flex;
  flex-direction: column;
  line-height: 0.95;
}

.camadas-sup-label {
  font-family: 'Geist', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.3rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: rgba(255, 255, 255, 0.45);
}

.camadas-title-italic {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2.8rem, 4.5vw, 4.2rem);
  font-weight: 600;
  color: #ffffff;
}

.camadas-logo-brand {
  margin: 0.5rem 0;
}

.t50pro-logo-img {
  width: clamp(180px, 22vw, 320px);
  height: auto;
  display: block;
  filter: brightness(0) invert(1);
}

.camadas-text-desc {
  font-size: clamp(1.1rem, 1.4vw, 1.35rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 400;
}

.camadas-text-desc strong {
  color: #ffffff;
  font-weight: 600;
}

.highlight-absorcao-hibida {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.highlight-absorcao-hibida:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: #ffffff;
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 04 — ACABAMENTOS EM ALTO PADRÃO (FOTO QUINA + VERTICAL MAIOR)
   ══════════════════════════════════════════════════════════════ */
.slide-acabamentos {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d1012;
  padding: 2.2rem clamp(1.5rem, 3.5vw, 4.5rem);
  width: 100%;
  height: 100%;
}

.acab-container {
  max-width: 1440px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 46% 54%;
  gap: clamp(2rem, 3.5vw, 4rem);
  align-items: center;
  margin: 0 auto;
}

.acab-info-col {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.acab-title-block {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.acab-sup {
  font-size: clamp(0.7rem, 0.95vw, 0.85rem);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

.acab-title-italic {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2.2rem, 3.6vw, 3.5rem);
  color: #ffffff;
  margin-top: 0.2rem;
  font-weight: 400;
}

.acab-desc {
  font-size: clamp(0.9rem, 1.1vw, 1.1rem);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  margin: 0;
}

.acab-desc strong {
  color: #ffffff;
  font-weight: 600;
}

/* Foto da Quina grande e solta no canto esquerdo (sem caixa) */
.acab-quina-standalone {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0.5rem 0;
}

.acab-quina-standalone-img {
  width: clamp(240px, 22vw, 340px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.8));
  transition: transform 0.4s ease;
}

.acab-quina-standalone-img:hover {
  transform: scale(1.05) rotate(-2deg);
}

.acab-features-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.acab-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.8rem 1.1rem;
  border-radius: 12px;
}

.acab-feature-icon {
  color: #34d399;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 0.1rem;
}

.acab-feature-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.acab-feature-text strong {
  font-size: 0.88rem;
  color: #ffffff;
  font-weight: 600;
}

.acab-feature-text span {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
}

/* ── Frame para Imagem Vertical (MAIOR) ── */
.acab-vert-col {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.acab-vert-frame {
  position: relative;
  width: 100%;
  max-width: 540px;
  height: 82vh;
  max-height: 640px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.4s ease, border-color 0.4s ease;
}

.acab-vert-frame:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.acab-vert-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s ease;
}

.acab-vert-frame:hover .acab-vert-img {
  transform: scale(1.03);
}

.vert-img-overlay-badge {
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
  background: rgba(13, 16, 18, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 8px #34d399;
}

.vert-img-overlay-badge span {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.vert-frame-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 70%, rgba(13, 16, 18, 0.6) 100%);
  pointer-events: none;
}

/* ══════════════════════════════════════════════════════════════
   SLIDE BENEFÍCIOS CHAVE (5 CARDS DE VANTAGENS)
   ══════════════════════════════════════════════════════════════ */
.slide-beneficios {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d1012;
  padding: 2.5rem clamp(1.5rem, 4vw, 5rem);
  width: 100%;
  height: 100%;
}

.ben-container {
  max-width: 1440px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 3.5vw, 3.5rem);
  align-items: center;
  margin: 0 auto;
  padding: 0 clamp(1rem, 2vw, 2rem);
}

.ben-left-col {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 1.8vw, 1.8rem);
}

.ben-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  line-height: 1;
}

.ben-eyebrow {
  font-size: clamp(0.7rem, 0.95vw, 0.85rem);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

.ben-title {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2rem, 3.2vw, 3.2rem);
  color: #ffffff;
  margin-top: 0.3rem;
  font-weight: 400;
}

.ben-grid {
  display: flex;
  flex-direction: column;
  gap: clamp(0.55rem, 0.9vw, 0.85rem);
  width: 100%;
}

.ben-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: clamp(0.75rem, 1.2vw, 1.1rem) clamp(1rem, 1.4vw, 1.4rem);
  border-radius: 16px;
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  gap: 1.1rem;
}

.ben-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 255, 255, 0.05);
}

.ben-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 0;
  color: #ffffff;
  transition: all 0.3s ease;
}

.ben-card:hover .ben-icon-box {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.08);
}

.ben-icon-box svg {
  width: 22px;
  height: 22px;
}

.ben-card-text {
  font-size: clamp(0.85rem, 1vw, 1rem);
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 500;
  margin: 0;
}

.ben-right-col {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ben-image-frame {
  position: relative;
  width: 100%;
  height: clamp(380px, 58vh, 560px);
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
}

.ben-tatame-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s ease;
}

.ben-image-frame:hover .ben-tatame-img {
  transform: scale(1.03);
}

.ben-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.45) 100%);
  pointer-events: none;
}

.acab-vert-frame:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.035);
}

.vert-placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  z-index: 2;
}

.vert-placeholder-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vert-placeholder-icon svg {
  width: 24px;
  height: 24px;
}

.vert-placeholder-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 600;
  text-transform: uppercase;
}

.vert-placeholder-title {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.vert-placeholder-sub {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
  margin: 0;
}

.vert-frame-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

/* ══════════════════════════════
   SLIDE 04 — Superfície Perfeita (slide-02)
══════════════════════════════ */
.slide-02 {
  display: grid;
  grid-template-columns: 45% 55%;
  align-items: stretch;
  width: 100%;
  height: 100%;
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
  font-size: clamp(1rem, 1.6vw, 1.4rem);
  color: rgba(255,255,255,0.4);
  font-weight: 300;
  margin: 0;
  letter-spacing: 0.01em;
}
.s2-concept-key {
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 700;
  font-style: italic;
  text-transform: uppercase;
  font-size: clamp(3.2rem, 6vw, 6.2rem);
  color: #ffffff;
  letter-spacing: 0.04em;
  line-height: 0.92;
  transform: skewX(-5deg);
  display: inline-block;
}
.s2-concept-sub {
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  color: rgba(255, 255, 255, 0.65);
  font-weight: 300;
  margin: 0.6rem 0 0;
  letter-spacing: 0.02em;
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

.s2-line-wrap {
  position: relative;
  overflow: visible;
}

.s2-line {
  height: 2.5px;
  width: calc(100% + 55vw);
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.85) 0%,
    rgba(255,255,255,0.45) 40%,
    rgba(255,255,255,0.15) 75%,
    transparent 100%
  );
  transform-origin: left center;
}

/* ── Imagem (coluna direita) ── */
.s2-image-col {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
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

.s2-image-vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(13,16,18,0.5) 0%, transparent 20%),
    linear-gradient(to top,    rgba(13,16,18,0.5) 0%, transparent 20%);
  pointer-events: none;
}

/* ══════════════════════════════
   SLIDE 05 — Antes & Depois (slide-03)
══════════════════════════════ */
.slide-03 {
  display: grid;
  grid-template-columns: 55% 45%;
  align-items: center;
  padding: 4vw 5vw;
  gap: 4vw;
  background: #0d1012;
  width: 100%;
  height: 100%;
}

.s3-left {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.s3-compare {
  position: relative;
  width: 100%;
  height: 78vh;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  cursor: ew-resize;
}

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

.s3-depois-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

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

.s3-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

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

.s3-title-logo {
  max-width: clamp(140px, 18vw, 260px);
  height: auto;
  margin-top: 0.5rem;
  filter: brightness(0) invert(1) brightness(0.8) saturate(0);
  display: block;
}

.s3-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
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
  width: 3.5px;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 0 12px rgba(255,255,255,0.5);
  pointer-events: none;
}

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
   SLIDE 06 — Etapas do Projeto (slide-04)
══════════════════════════════ */
.slide-04 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4vw 6vw;
  background: #0d1012;
  width: 100%;
  height: 100%;
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
   SLIDE 07 — Quem São Nossos Clientes (slide-05)
══════════════════════════════ */
.slide-05 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vw 5vw;
  background: #0d1012;
  width: 100%;
  height: 100%;
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

@media (max-width: 1024px) {
  .mapa-container { grid-template-columns: 1fr; overflow-y: auto; }
  .s2-text, .s2-image-col, .s3-left, .s3-right { width: 100%; height: auto; }
  .slide-02, .slide-03 { flex-direction: column; overflow-y: auto; }
  .s5-grid { grid-template-columns: repeat(3, 1fr); }
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 09 — Orçamento & Investimento Comercial (slide-06)
══════════════════════════════════════════════════════════════ */
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

.s6-status-badge {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  transition: all 0.35s ease;
}

.s6-status-badge.is-special {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.35);
  color: #34d399;
}

.s6-total-amount-wrap {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.s6-strikethrough-amount {
  font-size: clamp(1.2rem, 2.2vw, 2rem);
  color: rgba(255, 255, 255, 0.35);
  text-decoration: line-through;
  font-weight: 400;
}

.s6-total-amount.is-special {
  color: #34d399;
}

.s6-discount-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(8px);
}

.s6-discount-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.s6-discount-toggle-btn.is-applied {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.45);
  color: #34d399;
  box-shadow: 0 0 25px rgba(16, 185, 129, 0.2);
}

.s6-toggle-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.s6-toggle-icon {
  width: 18px;
  height: 18px;
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

/* ══════════════════════════════════════════════════════════════
   SLIDE ABSORÇÃO HÍBRIDA (3D ISOMETRIC)
   ══════════════════════════════════════════════════════════════ */
.slide-absorcao {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d1012;
  padding: 2.5rem clamp(1.5rem, 4vw, 5rem);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.abs-container {
  max-width: 1440px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  margin: 0 auto;
  padding: 0 clamp(1rem, 2vw, 2rem);
}

/* Coluna Esquerda: Palco 3D */
.abs-left-col {
  position: relative;
  width: 100%;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.abs-stage-3d {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 2500px;
}

.abs-blocks-svg {
  width: 100%;
  height: auto;
  max-width: 440px;
  overflow: visible;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4));
}

.svg-block-base {
  fill: rgba(30, 34, 38, 0.95);
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 3px;
  stroke-linejoin: round;
}

.svg-block-soft {
  fill: rgba(56, 189, 248, 0.15);
  stroke: rgba(56, 189, 248, 0.4);
  stroke-width: 3px;
  stroke-linejoin: round;
}

/* SVG Lines conectando labels */
.abs-lines-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.svg-line {
  fill: none;
  stroke: rgba(255, 255, 255, 0.7);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}

.svg-dot {
  fill: #fff;
}

.svg-dot-pulse {
  fill: transparent;
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 1.5;
  animation: pulse-ring 2s infinite ease-out;
}

/* Callouts Floating */
.abs-callout {
  position: absolute;
  z-index: 20;
}
.callout-soft {
  top: 10%;
  left: 0;
}
.callout-base {
  bottom: 25%;
  right: -5%;
}

.callout-box {
  background: rgba(13, 16, 18, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 1.2rem 1.6rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 260px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

.callout-badge {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #38bdf8;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.callout-base .callout-badge {
  color: #f43f5e;
}

.callout-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
}

.callout-tag {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.4;
}

/* Coluna Direita: Textos e Controles */
.abs-right-col {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.abs-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.abs-eyebrow {
  font-size: clamp(0.7rem, 0.9vw, 0.85rem);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

.abs-title {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-style: italic;
  font-size: clamp(2.4rem, 3.8vw, 3.8rem);
  color: #ffffff;
  margin-top: 0.3rem;
  font-weight: 400;
}

.abs-lead {
  font-size: clamp(1rem, 1.15vw, 1.15rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 1.2rem;
  font-weight: 400;
}

.abs-controls-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.abs-controls-hint {
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

.abs-modes-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.abs-mode-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 1.6rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  color: #fff;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.abs-mode-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.abs-mode-btn.is-active {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.abs-btn-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.abs-btn-text strong {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.abs-btn-text span {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
}

.abs-btn-indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  flex-shrink: 0;
}

.abs-mode-btn.is-active .abs-btn-indicator {
  background: #38bdf8;
  box-shadow: 0 0 15px #38bdf8;
}

.abs-mode-btn.heavy-mode.is-active .abs-btn-indicator {
  background: #f43f5e;
  box-shadow: 0 0 15px #f43f5e;
}
</style>
