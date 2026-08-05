<template>
  <!-- Tela 01 - Gerador de Orçamento e Apresentações Taurun -->
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    
    <!-- Header Global com Logo Oficial e Abas de Navegação -->
    <Header
      :is-dark="quote.isDarkMode.value"
      :active-tab="activeTab"
      :saved-count="quote.savedQuotes.value.length"
      @toggle-theme="quote.toggleTheme"
      @change-tab="tab => activeTab = tab"
    />

    <!-- Conteúdo Principal -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- ABA 1: Simulador Comercial (Formulário + Resumo) -->
      <div v-if="activeTab === 'form'" class="space-y-8">
        <!-- Cabeçalho do Simulador -->
        <div class="space-y-1.5">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Calculadora de Orçamento
          </h1>
          <p class="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Preencha os dados do cliente e configure a metragem do produto para gerar o orçamento e a apresentação comercial em tempo real.
          </p>
        </div>

        <!-- Grid Dupla (Esquerda: Form, Direita: Resumo) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div class="lg:col-span-7">
            <QuoteForm />
          </div>

          <div class="lg:col-span-5">
            <QuoteSummary @generate="handleGenerateProposal" />
          </div>

        </div>
      </div>

      <!-- ABA 2: Apresentações Salvas (Dashboard de Orçamentos Montados) -->
      <div v-else-if="activeTab === 'list'">
        <SavedQuotesList
          @new-quote="activeTab = 'form'"
          @edit-in-form="activeTab = 'form'"
        />
      </div>

    </main>

    <!-- Modal de Confirmação e Direcionamento -->
    <Transition name="modal">
      <div
        v-if="showModal"
        @click.self="showModal = false"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm cursor-pointer"
      >
        <div
          @click.stop
          class="glass-panel max-w-md w-full rounded-2xl p-6 space-y-6 text-center shadow-2xl border border-border cursor-default relative"
        >
          <!-- Botão Fechar X no canto do modal -->
          <button
            @click="showModal = false"
            type="button"
            class="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            ✕
          </button>
          
          <div class="w-14 h-14 rounded-full bg-secondary text-foreground border border-border mx-auto flex items-center justify-center">
            <CheckCircle2 class="w-8 h-8" />
          </div>

          <div class="space-y-1.5">
            <h3 class="text-lg font-bold text-foreground">Orçamento Registrado com Sucesso!</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Os dados de <strong>{{ lastSavedQuote?.clientName || quote.clientName.value || 'Cliente' }}</strong> foram salvos na lista de apresentações montadas.
            </p>
          </div>

          <!-- Resumo de confirmação -->
          <div class="bg-secondary/40 rounded-xl p-4 text-left space-y-2 text-xs border border-border">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Produto:</span>
              <span class="font-bold text-foreground">{{ lastSavedQuote?.productName || quote.selectedProduct.value.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Metragem:</span>
              <span class="font-bold text-foreground">{{ lastSavedQuote?.quantityM2 || quote.quantityM2.value }} m²</span>
            </div>
            <div v-if="lastSavedQuote?.hasVinilClick || quote.hasVinilClick.value" class="flex justify-between">
              <span class="text-muted-foreground">Proteções Vinil Click:</span>
              <span class="font-bold text-foreground">{{ lastSavedQuote?.vinilQuantity || quote.vinilQuantity.value }} un.</span>
            </div>
            <div class="flex justify-between border-t border-border pt-2 font-bold text-sm text-foreground">
              <span>Investimento Total:</span>
              <span>{{ quote.formatCurrency(lastSavedQuote?.grandTotal || quote.grandTotal.value) }}</span>
            </div>
          </div>

          <!-- Ações do Modal -->
          <div class="space-y-2.5">
            <button
              @click="handleOpenPresentation"
              type="button"
              class="w-full bg-foreground text-background font-bold text-sm py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow"
            >
              <Presentation class="w-4 h-4" />
              <span>Abrir Apresentação Comercial</span>
            </button>

            <button
              @click="handleGoToList"
              type="button"
              class="w-full bg-secondary/80 border border-border text-foreground font-bold text-xs py-2.5 rounded-xl hover:bg-secondary transition-all"
            >
              Ver Todas Apresentações Salvas
            </button>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Header from '~/components/Header.vue'
import QuoteForm from '~/components/QuoteForm.vue'
import QuoteSummary from '~/components/QuoteSummary.vue'
import SavedQuotesList from '~/components/SavedQuotesList.vue'
import { useQuote, type SavedQuote } from '~/composables/useQuote'
import { CheckCircle2, Presentation } from 'lucide-vue-next'

const quote = useQuote()
const router = useRouter()
const route = useRoute()

const activeTab = ref<'form' | 'list'>('form')

onMounted(() => {
  if (route.query.tab === 'list') {
    activeTab.value = 'list'
  }
})
const showModal = ref(false)
const lastSavedQuote = ref<SavedQuote | null>(null)

const handleGenerateProposal = () => {
  lastSavedQuote.value = quote.saveCurrentQuoteToList()
  showModal.value = true
}

const handleOpenPresentation = () => {
  showModal.value = false
  const targetPath = quote.selectedProductId.value === 't50-pro' ? '/apresentacao/t50-pro' : '/apresentacao/revestimento'
  router.push(targetPath)
}

const handleGoToList = () => {
  showModal.value = false
  activeTab.value = 'list'
}
</script>
