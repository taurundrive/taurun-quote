<template>
  <!-- Formulário da Tela 01 - Limpo, modular e sem adereços artificiais -->
  <div class="glass-panel rounded-2xl p-6 sm:p-8 space-y-8">
    
    <!-- Cabeçalho do Formulário -->
    <div class="flex items-center justify-between border-b border-border/60 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-foreground">
          <FileText class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-base font-bold text-foreground tracking-tight">Dados do Orçamento</h2>
          <p class="text-xs text-muted-foreground">Preencha as informações do cliente e os detalhes do produto.</p>
        </div>
      </div>
    </div>

    <!-- Seção 1: Dados do Cliente -->
    <div class="space-y-4">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
        <User class="w-3.5 h-3.5" />
        1. Informações do Cliente
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          id="clientName"
          label="Nome do Cliente"
          v-model="quote.clientName.value"
          placeholder="Ex: Rodrigo Silva"
          :icon="User"
          required
        />

        <FormInput
          id="clientPhone"
          label="Telefone do Cliente"
          :model-value="quote.clientPhone.value"
          @input="onPhoneInput"
          placeholder="(11) 99999-9999"
          :icon="Phone"
          hint="Formatação automática de DDD"
        />
      </div>
    </div>

    <!-- Seção 2: Produto e Metragem -->
    <div class="space-y-4 pt-2">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
        <Package class="w-3.5 h-3.5" />
        2. Produto e Metragem
      </h3>

      <FormSelect
        id="productSelect"
        label="Tipo de Produto"
        :model-value="quote.selectedProductId.value"
        @update:model-value="onProductChange"
        :options="quote.PRODUCTS"
        :icon="Package"
      />

      <!-- Descrição do Produto Selecionado -->
      <div class="bg-secondary/40 border border-border rounded-xl p-3.5 flex items-start gap-3">
        <Info class="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p class="text-xs text-muted-foreground leading-relaxed">
          <strong class="text-foreground font-semibold">{{ quote.selectedProduct.value.name }}:</strong>
          {{ quote.selectedProduct.value.description }}
        </p>
      </div>

      <!-- Valores por m² e Quantidade -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormInput
          id="pricePerM2"
          label="Valor do m² (R$)"
          type="number"
          v-model.number="quote.pricePerM2.value"
          placeholder="0.00"
          :icon="DollarSign"
          suffix="R$/m²"
          hint="Editável se houver negociação"
        />

        <FormInput
          id="quantityM2"
          label="Quantidade de m²"
          type="number"
          v-model.number="quote.quantityM2.value"
          placeholder="0"
          :icon="Maximize2"
          suffix="m²"
        />

        <!-- Valor Total do Tatame -->
        <div class="space-y-1.5">
          <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Calculator class="w-3.5 h-3.5 text-muted-foreground" />
            Valor Total Tatame
          </label>
          <div class="w-full bg-secondary/80 text-foreground font-extrabold text-base rounded-xl border border-border px-3.5 py-2.5 flex items-center justify-between">
            <span>{{ quote.formatCurrency(quote.totalTatamePrice.value) }}</span>
            <CheckCircle2 class="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
          <p class="text-[11px] text-muted-foreground">Calculado automaticamente</p>
        </div>
      </div>
    </div>

    <!-- Seção 3: Adicional Proteções de Parede Vinil Click -->
    <div class="space-y-4 pt-2 border-t border-border">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Layers class="w-3.5 h-3.5" />
          3. Adicional Proteções de Parede Vinil Click
        </h3>
        <button
          v-if="quote.hasVinilClick.value"
          @click="quote.resetVinilClick"
          type="button"
          class="text-[11px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <RotateCcw class="w-3 h-3" />
          Resetar
        </button>
      </div>

      <FormToggle
        v-model="quote.hasVinilClick.value"
        label="Vai ter Proteção de Parede Vinil Click?"
        description="Ative para adicionar proteções de parede em vinil click ao orçamento."
        :icon="Layers"
      />

      <!-- Campos de Vinil Click -->
      <Transition name="expand">
        <div v-if="quote.hasVinilClick.value" class="bg-secondary/30 border border-border rounded-xl p-4 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <FormInput
              id="vinilQuantity"
              label="Quantidade Vinil"
              type="number"
              v-model.number="quote.vinilQuantity.value"
              placeholder="0"
              :icon="Hash"
              suffix="unid"
            />

            <FormInput
              id="vinilUnitPrice"
              label="Valor Unitário (R$)"
              type="number"
              v-model.number="quote.vinilUnitPrice.value"
              placeholder="0.00"
              :icon="Tag"
              suffix="R$"
            />

            <div class="space-y-1.5">
              <label class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Calculator class="w-3.5 h-3.5 text-muted-foreground" />
                Valor Total Vinil
              </label>
              <div class="w-full bg-card text-foreground font-bold text-sm rounded-xl border border-border px-3.5 py-2.5 flex items-center justify-between">
                <span class="font-extrabold">{{ quote.formatCurrency(quote.totalVinilPrice.value) }}</span>
              </div>
              <p class="text-[11px] text-muted-foreground">Qtd × Valor Unitário</p>
            </div>

          </div>
        </div>
      </Transition>
    </div>

    <!-- Seção 4: Vendedor Responsável -->
    <div class="space-y-4 pt-2 border-t border-border">
      <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
        <UserCheck class="w-3.5 h-3.5" />
        4. Vendedor Responsável
      </h3>

      <FormSelect
        id="sellerSelect"
        label="Nome do Vendedor"
        v-model="quote.selectedSellerId.value"
        :options="quote.SELLERS"
        :icon="UserCheck"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { useQuote } from '~/composables/useQuote'
import FormInput from '~/components/ui/FormInput.vue'
import FormSelect from '~/components/ui/FormSelect.vue'
import FormToggle from '~/components/ui/FormToggle.vue'
import {
  FileText,
  User,
  Phone,
  Package,
  DollarSign,
  Maximize2,
  Calculator,
  CheckCircle2,
  Layers,
  Hash,
  Tag,
  UserCheck,
  Info,
  RotateCcw
} from 'lucide-vue-next'

const quote = useQuote()

const onPhoneInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  quote.applyPhoneMask(input.value)
}

const onProductChange = (productId: string) => {
  quote.setProduct(productId)
}
</script>
