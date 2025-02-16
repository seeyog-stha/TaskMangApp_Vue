<script setup lang="ts">
import { ref } from 'vue';
import { formatDate, setStore, getStore } from '@/utils/utils';
import generateUniqueId from 'generate-unique-id';
import type { taskProp } from '@/model';
import DatePicker from './DatePicker.vue';

const { taskStore, updateTask } = defineProps<{
    taskStore: taskProp[]
    updateTask: (value: taskProp[]) => void;
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
        id: idvalue,
        isCompleted: false,
        ...store.value
    }

    const updatedStore = taskStore ? [...taskStore, newTask] : [newTask];

    updateTask(updatedStore)

    const isSubmitted = setStore("task", updatedStore);
    console.log("is", isSubmitted)
}
const handleChange = (key: 'date', value: string) => {
    store.value[key] = value
}

</script>
<template>

    <form @submit.prevent="handleSubmit">
        <h4 class="title">Add New Task</h4>
        <div class="input-container">
            <label for="title" class="input-label">Title:</label>
            <input type="text" id="title" v-model="store.title" class="input-field"
                placeholder="Title here..." maxlength="50" required>
        </div>

        <DatePicker title="Date" :value="store.date" :handleChange="handleChange" />
        <div class="select-container">
            <label for="priority" class="select-label">Priority:</label>
            <select id="priority" v-model="store.priority" class="select-select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>

        <input type="submit" value="Submit" class="custom-button">


    </form>

</template>
<style scoped>
.title {
    font-size: 16px;
    font-weight: bold;
    text-decoration: underline;
    text-align: center;
}

form {
    display: flex;
    flex-flow: column;
    gap: 5px;
    /* position: fixed; */
}

</style>