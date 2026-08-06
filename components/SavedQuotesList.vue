<template>
  <!-- Componente da Aba de Apresentações e Orçamentos Salvos -->
  <div class="space-y-6">
    
    <!-- Cabeçalho da Aba de Salvos -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
      <div class="space-y-1">
        <h2 class="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
          <Presentation class="w-6 h-6 text-foreground" />
          <span>Apresentações & Orçamentos Montados</span>
        </h2>
        <p class="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          Lista de propostas registradas pelos consultores com acionamento direto da apresentação comercial interativa.
        </p>
      </div>

      <button
        type="button"
        @click="emit('newQuote')"
        class="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow"
      >
        <Plus class="w-4 h-4" />
        <span>Montar Novo Orçamento</span>
      </button>
    </div>

    <!-- Lista de Cards de Apresentações -->
    <div v-if="quote.savedQuotes.value.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div
        v-for="item in quote.savedQuotes.value"
        :key="item.id"
        class="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-5 border border-border hover:border-foreground/20 transition-all duration-300 shadow-lg group relative overflow-hidden"
      >
        
        <!-- Topo: Cliente, Data e Consultor -->
        <div class="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
          <div class="space-y-1 min-w-0">
            <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">
              Cliente / Academia
            </span>
            <h3 class="text-base sm:text-lg font-bold text-foreground truncate group-hover:text-foreground">
              {{ item.clientName }}
            </h3>
            <p v-if="item.clientPhone" class="text-xs text-muted-foreground flex items-center gap-1">
              <Phone class="w-3 h-3 text-muted-foreground" />
              {{ item.clientPhone }}
            </p>
          </div>

          <div class="flex flex-col items-end gap-1.5 shrink-0">
            <span class="text-[11px] font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md border border-border">
              {{ item.createdAt }}
            </span>
            <span class="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
              <UserCheck class="w-3.5 h-3.5 text-muted-foreground" />
              {{ item.sellerName }}
            </span>
          </div>
        </div>

        <!-- Meio: Detalhamento dos Produtos -->
        <div class="space-y-2.5 text-xs">
          <!-- Produto Principal -->
          <div class="bg-secondary/30 rounded-xl p-3 border border-border/80 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <Package class="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <span class="font-bold text-foreground block text-xs sm:text-sm">{{ item.productName }}</span>
                <span class="text-muted-foreground text-[11px]">{{ item.quantityM2 }} m² × {{ quote.formatCurrency(item.pricePerM2) }}</span>
              </div>
            </div>
            <strong class="font-bold text-foreground text-xs sm:text-sm">{{ quote.formatCurrency(item.totalTatamePrice) }}</strong>
          </div>

          <!-- Adicional Vinil Click -->
          <div v-if="item.hasVinilClick" class="bg-secondary/20 rounded-xl p-3 border border-border/60 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <Layers class="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <span class="font-semibold text-foreground block text-xs">Proteções de parede Vinil Click</span>
                <span class="text-muted-foreground text-[11px]">{{ item.vinilQuantity }} un. × {{ quote.formatCurrency(item.vinilUnitPrice) }}</span>
              </div>
            </div>
            <strong class="font-semibold text-foreground text-xs">{{ quote.formatCurrency(item.totalVinilPrice) }}</strong>
          </div>
        </div>

        <!-- Rodapé: Total Geral e Ações -->
        <div class="pt-3 border-t border-border/60 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">
              Investimento Total
            </span>
            <span class="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
              {{ quote.formatCurrency(item.grandTotal) }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Botão Editar no Formulário -->
            <button
              type="button"
              @click="handleEditInForm(item)"
              title="Carregar no Simulador para Editar"
              class="p-2.5 rounded-xl border border-border bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <Edit3 class="w-4 h-4" />
            </button>

            <!-- Botão Excluir -->
            <button
              type="button"
              @click="quote.deleteSavedQuote(item.id)"
              title="Excluir Orçamento"
              class="p-2.5 rounded-xl border border-border bg-secondary/60 text-muted-foreground hover:text-red-400 hover:border-red-500/40 transition-all"
            >
              <Trash2 class="w-4 h-4" />
            </button>

            <!-- Botão Primário: Ver Apresentação Comercial -->
            <button
              type="button"
              @click="handleViewPresentation(item)"
              class="inline-flex items-center gap-2 bg-foreground text-background font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow"
            >
              <Play class="w-3.5 h-3.5 fill-current" />
              <span>Ver Apresentação</span>
            </button>
          </div>
        </div>

      </div>

    </div>

    <!-- Empty State se não houver orçamentos -->
    <div v-else class="glass-panel rounded-2xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
      <div class="w-16 h-16 rounded-full bg-secondary border border-border mx-auto flex items-center justify-center text-muted-foreground">
        <Presentation class="w-8 h-8" />
      </div>
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-foreground">Nenhuma Apresentação Salva</h3>
        <p class="text-xs text-muted-foreground leading-relaxed">
          Preencha a calculadora para gerar e registrar as apresentações comerciais dos seus clientes.
        </p>
      </div>
      <button
        type="button"
        @click="emit('newQuote')"
        class="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-xs px-4 py-2.5 rounded-xl hover:opacity-90 transition-all"
      >
        <Plus class="w-4 h-4" />
        <span>Criar Primeiro Orçamento</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useQuote, type SavedQuote } from '~/composables/useQuote'
import { useRouter } from 'vue-router'
import {
  Presentation,
  Plus,
  Phone,
  UserCheck,
  Package,
  Layers,
  Edit3,
  Trash2,
  Play
} from 'lucide-vue-next'

const quote = useQuote()
const router = useRouter()

const emit = defineEmits<{
  (e: 'newQuote'): void
  (e: 'editInForm'): void
}>()

// Carrega os dados na sessão ativa do useQuote e redireciona para a apresentação
const handleViewPresentation = (item: SavedQuote) => {
  quote.loadSavedQuoteIntoActive(item)
  const pid = item.selectedProductId
  let targetPath = '/apresentacao/revestimento'
  if (pid === 't50-pro') targetPath = '/apresentacao/t50-pro'
  if (pid === 't50-gold') targetPath = '/apresentacao/t50-gold'
  router.push(targetPath)
}

// Carrega os dados na sessão ativa e muda para a aba do simulador
const handleEditInForm = (item: SavedQuote) => {
  quote.loadSavedQuoteIntoActive(item)
  emit('editInForm')
}
</script>
