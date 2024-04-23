<script setup lang="ts">
import { computed } from 'vue'
import CloseButton from '@/components/buttons/header/CloseButton.vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  width: String,
})

const emit = defineEmits(['close', 'update:modelValue'])

const syncValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
const close = () => (syncValue.value = false)
</script>

<template>
  <div class="transition-wrapper">
    <Transition name="shift-up">
      <div
        class="modal fixed inset-0 left-0 z-[100] flex flex-col items-center justify-center overflow-hidden p-4"
        :class="syncValue && 'shown'"
        role="dialog"
        ref="modal"
        aria-modal="true"
        v-show="syncValue">
        <div @click="close" class="modal-backdrop fixed inset-0 bg-[#1114095c]" />
        <div
          class="modal-content w-full max-h-[800px] relative overflow-auto scrollbar-sm rounded-xl bg-white shadow-[#f2f23005] shadow-xl"
          :class="width ? width : 'max-w-[800px]'">
          <header class="sticky top-0 z-[1000]">
            <div class="mx-4 sm:mx-5">
              <div class="flex pt-6">
                <div>
                  <h2 v-if="title" class="text-[20px] text-left text-[#4E5964]">
                    {{ title }}
                  </h2>
                </div>
                <button @click="close" class="ml-auto top-[1.4rem] z-[1000]">
                  <CloseButton />
                </button>
              </div>
              <slot name="header"></slot>
            </div>
            <div class="my-4 h-px bg-slate-200" />
          </header>
          <div class="px-4 sm:px-5">
            <section class="pt-3">
              <slot name="body"></slot>
            </section>
            <footer class="py-5">
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
