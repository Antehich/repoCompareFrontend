<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['selectedGroup'])

defineProps({
  groups: {}
})

const selected = ref('')


</script>

<template>
  <select v-model="selected" class="groupSelect" @change="emit('selectedGroup', selected)" required>
    <option disabled selected>Select your option</option>
    <option v-for="(key) in Object.keys(groups)" :value="key" :key="key">
      {{ groups[key] }}
    </option>
  </select>
</template>

<style scoped>
.groupSelect {
  width: 20%;
}
</style>
