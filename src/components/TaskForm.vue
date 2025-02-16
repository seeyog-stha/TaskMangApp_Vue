<script setup lang="ts">

import { ref } from 'vue';
import { formatDate, setStore, getStore } from '@/utils/utils';
import generateUniqueId from 'generate-unique-id';
import type { taskProp } from '@/model';

const { taskStore } = defineProps<{
    taskStore: taskProp[]
}>()
const emit = defineEmits<{
    (event: 'update-task', value: taskProp[]): void
}>()

const initialValue = {
    title: "",
    date: formatDate(Date.now()),
    priority: "low"


}
const store = ref(initialValue);
const handleSubmit = () => {
    const idvalue = generateUniqueId();
    const newTask = {
        id:idvalue,
        isCompleted: false,
        ...store.value
    }

    const updatedStore = taskStore ? [...taskStore, newTask] : [newTask];

    emit("update-task", updatedStore)

    const isSubmitted = setStore("task", updatedStore);
    console.log("is", isSubmitted)
}

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <label for="title">Title</label>
        <input type="text" v-model="store.title" placeholder="Title" id="title" maxlength="50">
        <label for="date">Date</label>
        <input type="date" v-model="store.date" id="date">
        <label for="priority">Priority</label>
        <select v-model="store.priority">
            <option>low</option>
            <option>medium</option>
            <option>high</option>
        </select>
        <input type="submit" value="Submit">


    </form>

</template>
<style scoped>
form {
    display: flex;
    flex-flow: column;
}
</style>