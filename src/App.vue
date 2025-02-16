<script setup lang="ts">

</script>

<template>
  <div class="container">

    <header>
      <div class="title">
        <h2 >Task Management System</h2>
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
</style>
