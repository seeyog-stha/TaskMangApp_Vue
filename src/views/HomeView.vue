<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import { ref } from 'vue';
import { getStore } from '@/utils/utils';
import type { taskProp } from '@/model';

const intialTaskStore = getStore("task")
const taskStore = ref(intialTaskStore)
const updateTaskStore = (newValue: taskProp[]) => {
  taskStore.value = newValue
}
</script>

<template>
  <main>
  
    <TaskFilter :updateTask="updateTaskStore" :initialTaskStore="intialTaskStore" class="sticky" />
    <div class="container">
      <div class="tasklist-container">

        <TaskList :taskStore="taskStore" :updateTask="updateTaskStore" class="tasklist"/>
      </div>
      <div class="taskform-container">

        <TaskForm :taskStore="taskStore" :updateTask="updateTaskStore" class="taskform" />
      </div>

    </div>

  </main>
</template>
<style scoped>
main .container {

  display: flex;
  justify-content: space-between;
  padding: 10px;
  
}
.tasklist-container{
  width: 60%;

}
.tasklist{
  width: 100%;
}
.taskform-container{
  width: 35%;
  display: flex;
  justify-content: center;
}


.taskform{
  width: 30%;
  position: fixed;
  padding: 10px;
}

.sticky {
  position: sticky;
  top: 70px;
  z-index: 100;
  padding: 15px;
  z-index: 100;
  background-color: #3F4F44;
  color: white;
}
</style>