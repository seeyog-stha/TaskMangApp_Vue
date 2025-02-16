<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';
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
    <p>hi there</p>

    <TaskList :taskStore="taskStore" @update-task="updateTaskStore"/>
    <TaskForm :taskStore="taskStore" @update-task="updateTaskStore" />
  </main>
</template>
