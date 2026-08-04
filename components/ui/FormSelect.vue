<template>
  <!-- Select estilizado monocromático -->
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
      <component :is="icon" v-if="icon" class="w-3.5 h-3.5 text-muted-foreground" />
      {{ label }}
    </label>

    <div class="relative flex items-center">
      <div v-if="icon" class="absolute left-3.5 text-muted-foreground pointer-events-none">
        <component :is="icon" class="w-4 h-4" />
      </div>

      <select
        :id="id"
        :value="modelValue"
        @change="onChange"
        class="w-full bg-secondary/40 text-foreground text-sm rounded-xl border border-border px-3.5 py-2.5 outline-none transition-colors duration-150 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 appearance-none pr-10 cursor-pointer"
        :class="[icon ? 'pl-10' : '']"
      >
        <option
          v-for="opt in options"
          :key="opt.id || opt.value"
          :value="opt.id || opt.value"
          class="bg-card text-foreground py-2"
        >
          {{ opt.name || opt.label }}
        </option>
      </select>

      <div class="absolute right-3.5 text-muted-foreground pointer-events-none">
        <ChevronDown class="w-4 h-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

export interface SelectOption {
  id?: string
  value?: string
  name?: string
  label?: string
}

defineProps<{
  id: string
  label?: string
  modelValue: string
  options: SelectOption[]
  icon?: Component
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>
