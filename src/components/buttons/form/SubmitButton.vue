<template>
  <button
    v-bind="{ ...$attrs }"
    class="bg-[#3C81FC] flex flex-row hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
    <slot>Save</slot>
  </button>
</template>
