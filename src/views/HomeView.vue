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
    <TaskFilter :updateTask="updateTaskStore" :initialTaskStore="intialTaskStore"/>
    <TaskList :taskStore="taskStore" :updateTask="updateTaskStore"/>
    <TaskForm :taskStore="taskStore" :updateTask="updateTaskStore" />
  </main>
</template>
