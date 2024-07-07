<script setup>
import {ref, computed} from 'vue'
import {RepoInfoClient} from '@/clients/RepoInfoClient.js'
import {appendNewGroupToLocalStorage} from "@/utils/appendNewGroupToLocalStorage.js";
import {debounce} from "@/utils/debounce.js";
import {nanoid} from "nanoid";

const emit = defineEmits(['newGroups'])

const myForm = ref(null)
const name = ref('')
const repoInfoClient = ref(new RepoInfoClient())
const repos = ref([{id: nanoid(3), link: '', isValid: false}])

const addRepo = () => {
  repos.value.push({id: nanoid(3), link: '', isValid: false})
};

const removeRepo = (index) => {
  repos.value.splice(index, 1)
};

const validateRepoLink = async (link) => {
  const response = await repoInfoClient.value.validateRepo(link)

  updateRepoLinkValidity(link, response.ok)
}

const isAllReposValid = computed(() => {
  return repos.value.every((repo) => repo.isValid && repo.link !== '')
})

const saveGroup = async () => {
  const response = await repoInfoClient.value.saveRepoGroup(repos.value, name)

  if (response.ok) {
    const newGroups = appendNewGroupToLocalStorage(await response.json(), name.value)

    emit('newGroups', newGroups)
    resetFormState()
  }

  switch (response.status) {
    case 409:
      alert('Bad group name')
      break
    case 500:
      alert('Server error')
      break
    default:
      break
  }
}

const resetFormState = () => {
  myForm.value.reset()
  repos.value = [{id: nanoid(3), link: '', isValid: false}]
  name.value = ''
}

const updateRepoLinkValidity = (link, isValid) => {
  repos.value = repos.value.map((repo) => {
    if (repo.link === link) {
      repo.isValid = isValid

      return repo
    }
    return repo
  })
}

const handleRepoInputChange = debounce(validateRepoLink, 500)
</script>

<template>
  <form ref="myForm" class="groupsWrapper" @submit.prevent="saveGroup">
    <input v-model="name" placeholder="Enter name of repos group" required/>
    <input
        v-for="repo in repos"
        :key="repo.id"
        v-model="repo.link"
        :class="{ valid: repo.isValid, invalid: !repo.isValid }"
        @input="(event) => {
        handleRepoInputChange(event.target.value)
      }"
        placeholder="Paste your link here"
        required
    />
    <button @click="addRepo">Add repo link</button>
    <button v-if="repos.length > 1" @click="removeRepo(repos.length - 1)">Remove repo link</button>
    <button type="submit" :disabled="!isAllReposValid">Save group</button>
  </form>
</template>

<style scoped>
.groupsWrapper {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
  padding: 0 1%;
}

input::placeholder {
  text-align: center;
}

.valid {
  border: 3px solid rgb(0, 255, 0);
  border-radius: 3px;
}

.invalid {
  border: 3px solid red;
  border-radius: 3px;
}
</style>
