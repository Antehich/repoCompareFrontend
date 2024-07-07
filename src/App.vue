<script setup>
import GroupsControl from './components/GroupsControl.vue'
import DifferenceDisplay from './components/DifferenceDisplay.vue'
import {ref, onMounted} from 'vue'

const groups = ref({})
onMounted(() => {
  groups.value = JSON.parse(localStorage.getItem('myGroups'))
})
</script>

<template>
  <main>
    <div class="wrapper">
      <GroupsControl @newGroups="(newGroups) => (groups = newGroups)"/>
      <div class="delimiter"></div>
      <DifferenceDisplay :groups="groups"/>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: rgba(15, 13, 28, 0.5);
  border-radius: 12px;
  padding: 10px;
  box-sizing: border-box;
  
}

.delimiter {
  border-left: 1px solid #000;
  height: 100%
}
</style>
