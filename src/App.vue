<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { getStore, setStore } from './utils/utils';
import ToggleButton from './components/ToggleButton.vue';
const isDarkMode = ref(getStore("theme"))
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

<template>
  <div class="container">

    <header>
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
  /* width: 100vw; */
  background-color: #2C3930;
  padding: 15px;
  text-align: center;
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
}
.theme-container{
  display: flex;
  color: white;
  gap: 5px;
}
</style>
