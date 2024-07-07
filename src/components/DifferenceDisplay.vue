<script setup>
import { ref } from 'vue'
import GroupSelect from './GroupSelect.vue'
import { RepoInfoClient } from '../clients/RepoInfoClient.js'

defineProps({
  groups: {}
})
const alpha = ref('')
const beta = ref('')
const data = ref(null)
const isFetching = ref(false)
const repoInfoClient = ref(new RepoInfoClient())

const computeReposDifference = async () => {
  data.value = null
  isFetching.value = true
  const response = await repoInfoClient.value.computeDifference(alpha, beta)

  if (response.ok) {
    data.value = await response.json()
    isFetching.value = false
    return
  }
  isFetching.value = false
  switch (response.status) {
    case 409:
      alert('Unknown group')
      break
    case 500:
      alert('Server error')
      break
    default:
      break
  }
}
</script>

<template>
  <div class="differenceWrapper">
    <div v-if="groups" class="groupSelection">
      <GroupSelect @selectedGroup="(group) => (alpha= group)" :groups="groups" />
      <button :disabled="isFetching" style="padding: 3px" @click="computeReposDifference">{{isFetching?"Waiting...":"Compute difference"}}</button>
      <GroupSelect @selectedGroup="(group) => (beta = group)" :groups="groups" />
    </div>
    <div v-if="data" class="linksWrapper">
      <a
        v-for="el in Object.keys(data)"
        :href="data[el]"
        :key="el"
        target="_blank"
        rel="noopener noreferrer"
        >{{ el }}</a
      >
    </div>
  </div>
</template>

<style scoped>
.differenceWrapper {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5vh;
  box-sizing: border-box;
  padding: 0 1vw;
  overflow-y: hidden;
}
.groupSelection {
  display: flex;
  justify-content: space-around;
}
.linksWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
}
.linksWrapper a {
  text-decoration: underline;
  color: rgb(0, 44, 166);
}
.linksWrapper a::before {
  content: '=>';
}
</style>