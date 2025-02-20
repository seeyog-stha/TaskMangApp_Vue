<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { getStore, setStore } from './utils/utils';
import ToggleButton from './components/ToggleButton.vue';
const isDarkMode = ref(getStore("theme")??false)
const toggleTheme=async()=>{
  isDarkMode.value = !isDarkMode.value;
  await nextTick()
  setStore("theme",isDarkMode.value)
  document.documentElement.classList.toggle("dark-mode");
}
onMounted(()=>{
  if (isDarkMode.value) {
        document.documentElement.classList.add("dark-mode");
      }
})

</script>

<template >
  <div class="container">

    <header class="primary-bg">
      <div class="title">
        <h2 >Task Management System</h2>
      </div>
      <div class="theme-container">
        <p>Theme</p>
        <ToggleButton :checked="isDarkMode" :updateChecked="toggleTheme"/>
      </div>

    </header>

    <RouterView />
  </div>
</template>
<style scoped>

.container {
  display: flex;
  flex-flow: column;
}

header {
  position: sticky;
  top:0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
}

header h2 {
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
}

.title{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
}
.theme-container{
  display: flex;
  color: white;
  gap: 5px;
  align-items: center;
}
</style>
