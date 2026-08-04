<template>
  <!-- Card Flutuante de Resumo Limpo e de Alta Precisão -->
  <div class="sticky top-24 space-y-6">
    
    <div class="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
      
      <!-- Cabeçalho do Resumo -->
      <div class="flex items-center justify-between border-b border-border pb-4">
        <div class="flex items-center gap-2">
          <FileCheck class="w-5 h-5 text-foreground" />
          <h3 class="font-bold text-foreground text-base tracking-tight">Resumo do Orçamento</h3>
        </div>
      </div>

      <!-- Card do Cliente -->
      <div class="bg-secondary/40 rounded-xl p-4 border border-border space-y-1.5">
        <div class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <User class="w-3.5 h-3.5 text-muted-foreground" />
          Cliente
        </div>
        <p class="text-base font-bold text-foreground truncate">
          {{ quote.clientName.value || 'Nome do Cliente não informado' }}
        </p>
        <p v-if="quote.clientPhone.value" class="text-xs text-muted-foreground flex items-center gap-1">
          <Phone class="w-3 h-3 text-muted-foreground" />
          {{ quote.clientPhone.value }}
        </p>
      </div>

      <!-- Detalhamento dos Itens do Orçamento -->
      <div class="space-y-3">
        <div class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Itens Selecionados
        </div>

        <!-- Item 1: Tatame principal -->
        <div class="bg-secondary/20 rounded-xl p-3.5 border border-border flex items-center justify-between transition-colors duration-150 hover:bg-secondary/30">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0 border border-border">
              <Package class="w-5 h-5" />
            </div>
            <div>
              <p class="text-sm font-bold text-foreground leading-tight">
                {{ quote.selectedProduct.value.name }}
              </p>
              <p class="text-xs text-muted-foreground">
                {{ quote.quantityM2.value }} m² × {{ quote.formatCurrency(quote.pricePerM2.value) }}
              </p>
            </div>
          </div>
          <div class="text-right font-bold text-foreground text-sm">
            {{ quote.formatCurrency(quote.totalTatamePrice.value) }}
          </div>
        </div>

        <!-- Item 2: Vinil Click (se ativado) -->
        <div v-if="quote.hasVinilClick.value" class="bg-secondary/20 rounded-xl p-3.5 border border-border flex items-center justify-between transition-colors duration-150 hover:bg-secondary/30">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0 border border-border">
              <Layers class="w-5 h-5" />
            </div>
            <div>
              <p class="text-sm font-bold text-foreground leading-tight">
                Proteções de Parede Vinil Click
              </p>
              <p class="text-xs text-muted-foreground">
                {{ quote.vinilQuantity.value }} unid × {{ quote.formatCurrency(quote.vinilUnitPrice.value) }}
              </p>
            </div>
          </div>
          <div class="text-right font-bold text-foreground text-sm">
            {{ quote.formatCurrency(quote.totalVinilPrice.value) }}
          </div>
        </div>

      </div>

      <!-- Divisor e Total Geral -->
      <div class="pt-4 border-t border-border space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Valor Total do Orçamento</span>
        </div>
        <div class="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          {{ quote.formatCurrency(quote.grandTotal.value) }}
        </div>
      </div>

      <!-- Botão Principal de Apresentação Comercial -->
      <button
        type="button"
        @click="onGenerateProposal"
        class="w-full bg-primary text-primary-foreground font-bold text-sm py-3.5 px-6 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 ease-out flex items-center justify-center gap-2 shadow"
      >
        <Presentation class="w-4 h-4" />
        <span>Gerar Apresentação Comercial</span>
        <ArrowRight class="w-4 h-4" />
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
import { useQuote } from '~/composables/useQuote'
import {
  FileCheck,
  User,
  Phone,
  Package,
  Layers,
  Presentation,
  ArrowRight
} from 'lucide-vue-next'

const quote = useQuote()

const emit = defineEmits<{
  (e: 'generate'): void
}>()

const onGenerateProposal = () => {
  emit('generate')
}
</script>
