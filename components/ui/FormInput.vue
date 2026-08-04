<template>
  <!-- Input modular limpo e sem poluição visual -->
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
      <component :is="icon" v-if="icon" class="w-3.5 h-3.5 text-muted-foreground" />
      {{ label }}
      <span v-if="required" class="text-destructive">*</span>
    </label>

    <div class="relative flex items-center">
      <!-- Ícone interno à esquerda -->
      <div v-if="icon" class="absolute left-3.5 text-muted-foreground pointer-events-none">
        <component :is="icon" class="w-4 h-4" />
      </div>

      <!-- Input element -->
      <input
        :id="id"
        :type="type || 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        @input="onInput"
        :class="[
          'w-full bg-secondary/40 text-foreground text-sm rounded-xl border border-border px-3.5 py-2.5 outline-none transition-colors duration-150 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 placeholder:text-muted-foreground/60',
          icon ? 'pl-10' : '',
          readonly ? 'opacity-90 cursor-not-allowed bg-secondary/70 font-bold text-foreground' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
      />

      <!-- Sufixo opcional (ex: m², R$) -->
      <div v-if="suffix" class="absolute right-3.5 text-xs font-medium text-muted-foreground pointer-events-none bg-card px-1.5 py-0.5 rounded border border-border/50">
        {{ suffix }}
      </div>
    </div>

    <p v-if="hint" class="text-[11px] text-muted-foreground/80 mt-1">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  id: string
  label?: string
  modelValue: string | number
  type?: string
  placeholder?: string
  icon?: Component
  suffix?: string
  hint?: string
  readonly?: boolean
  disabled?: boolean
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', event: Event): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', e)
}
</script>
