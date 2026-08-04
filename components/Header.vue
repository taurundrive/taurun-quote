<template>
  <!-- Header limpo e profissional com a logo oficial da Taurun e navegação por abas -->
  <header class="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Logotipo Oficial da Marca Taurun & Abas -->
      <div class="flex items-center gap-6">
        <img
          src="/logo-taurun.png"
          alt="Taurun Tatames"
          class="h-8 sm:h-9 w-auto object-contain brightness-0 invert dark:brightness-100 dark:invert-0 transition-all cursor-pointer"
          @click="emit('changeTab', 'form')"
        />

        <!-- Navegação por Abas no Header (Desktop) -->
        <nav class="hidden sm:flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border/80">
          <button
            type="button"
            @click="emit('changeTab', 'form')"
            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2"
            :class="activeTab === 'form' 
              ? 'bg-card text-foreground shadow-sm border border-border/60' 
              : 'text-muted-foreground hover:text-foreground'"
          >
            <Calculator class="w-3.5 h-3.5" />
            <span>Simulador Comercial</span>
          </button>

          <button
            type="button"
            @click="emit('changeTab', 'list')"
            class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2"
            :class="activeTab === 'list' 
              ? 'bg-card text-foreground shadow-sm border border-border/60' 
              : 'text-muted-foreground hover:text-foreground'"
          >
            <Presentation class="w-3.5 h-3.5" />
            <span>Apresentações Salvas</span>
            <span
              v-if="(savedCount || 0) > 0"
              class="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-primary/20 text-foreground border border-primary/30"
            >
              {{ savedCount }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Direita: Abas Mobile & Alternador de Tema -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Alternador mobile de abas -->
        <div class="flex sm:hidden items-center gap-1 bg-secondary/60 p-1 rounded-lg border border-border">
          <button
            @click="emit('changeTab', 'form')"
            class="p-1.5 rounded-md text-xs font-bold"
            :class="activeTab === 'form' ? 'bg-card text-foreground' : 'text-muted-foreground'"
          >
            <Calculator class="w-4 h-4" />
          </button>
          <button
            @click="emit('changeTab', 'list')"
            class="p-1.5 rounded-md text-xs font-bold relative"
            :class="activeTab === 'list' ? 'bg-card text-foreground' : 'text-muted-foreground'"
          >
            <Presentation class="w-4 h-4" />
            <span v-if="(savedCount || 0) > 0" class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>

        <button
          @click="onToggleTheme"
          type="button"
          aria-label="Alternar tema visual"
          class="p-2 rounded-lg bg-secondary/60 border border-border text-muted-foreground hover:text-foreground transition-all duration-150 active:scale-95"
        >
          <Sun v-if="isDark" class="w-4 h-4" />
          <Moon v-else class="w-4 h-4" />
        </button>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { Sun, Moon, Calculator, Presentation } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    isDark: boolean
    activeTab?: 'form' | 'list'
    savedCount?: number
  }>(),
  {
    activeTab: 'form',
    savedCount: 0
  }
)

const emit = defineEmits<{
  (e: 'toggleTheme'): void
  (e: 'changeTab', tab: 'form' | 'list'): void
}>()

const onToggleTheme = () => {
  emit('toggleTheme')
}
</script>
