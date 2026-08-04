<template>
  <!-- Toggle Switch estilizado em tom cinza monocromático premium -->
  <div
    class="flex items-center justify-between p-4 rounded-xl border transition-colors duration-150 cursor-pointer"
    :class="[
      modelValue
        ? 'bg-secondary/80 border-foreground/30 shadow-sm'
        : 'bg-secondary/30 border-border hover:border-border/80'
    ]"
    @click="toggle"
  >
    <div class="flex items-center gap-3">
      <div
        class="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
        :class="[modelValue ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground']"
      >
        <component :is="icon || Layers" class="w-5 h-5" />
      </div>
      <div>
        <p class="text-sm font-semibold text-foreground flex items-center gap-2">
          {{ label }}
        </p>
        <p v-if="description" class="text-xs text-muted-foreground">{{ description }}</p>
      </div>
    </div>

    <!-- Pílula do Switch Toggle -->
    <div
      class="w-11 h-6 rounded-full transition-colors relative p-0.5 flex items-center"
      :class="[modelValue ? 'bg-foreground' : 'bg-secondary border border-border']"
    >
      <div
        class="w-5 h-5 rounded-full transition-transform duration-200"
        :class="[
          modelValue ? 'translate-x-5 bg-background' : 'translate-x-0 bg-muted-foreground/60'
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { Layers } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: boolean
  label: string
  description?: string
  icon?: Component
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
