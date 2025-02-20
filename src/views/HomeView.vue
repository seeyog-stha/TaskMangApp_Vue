<script setup lang="ts">
import AddModal from '@/components/AddModal.vue';
import TaskList from '@/components/TaskList.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import { ref } from 'vue';
import { getStore } from '@/utils/utils';
import type { taskProp } from '@/model';

const intialTaskStore = getStore("task") ?? []
const taskStore = ref(intialTaskStore)
const isModalVisible = ref(false)
const updateTaskStore = (newValue: taskProp[]) => {
  taskStore.value = newValue
}
const handleModalVisible=(value:boolean)=>{
  console.log("trigger")
  isModalVisible.value = value
}
</script>

<template>
  <main>

    <!-- task filter component  -->

    <TaskFilter :updateTask="updateTaskStore" :initialTaskStore="intialTaskStore" :taskStore="taskStore" :handleModalVisible="handleModalVisible"
      class="sticky" />
    <div class="tasklist-container">
      <!-- task list component  -->

      <TaskList :taskStore="taskStore" :updateTask="updateTaskStore" class="tasklist" />
    </div>


  </main>
  <!-- add new task modal  -->
  <AddModal :taskStore="taskStore" :updateTask="updateTaskStore" class="taskform" v-if="isModalVisible" :handleModalVisible="handleModalVisible"/>
</template>
<style scoped>

.tasklist-container{
  padding: 2vh 4vw;
}

.sticky {
  position: sticky;
  top: 50px;
  z-index: 100;
  padding: 5px;
  z-index: 100;
}

</style>