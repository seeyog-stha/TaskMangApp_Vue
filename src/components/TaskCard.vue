<script setup lang="ts">
import { ref } from 'vue'
import type { taskProp } from '@/model';
const { index, task, handleDelete, handleEdit } = defineProps<{
    index: number,
    task: taskProp,
    handleDelete: (id: string) => void;
    handleEdit: (task: taskProp) => void;
}>()
const isEditable = ref(false)
const taskData = ref(task)
const toggleEditable = () => {
    isEditable.value = !isEditable.value
}
const handleSave = () => {
    handleEdit(taskData.value)
    isEditable.value = false
}
const handleIsChecked = () => {
    taskData.value.isCompleted = !taskData.value.isCompleted
    handleEdit(taskData.value)
}
const computePriority = () => {
    if (taskData.value.priority == "low")
        return "low-priority"
    else if (taskData.value.priority == "medium")
        return "medium-priority"
    else
        return "high-priority"
}

</script>
<template>
    <td>{{ index + 1 }}</td>
    <td><input type="text" v-model="taskData.title" :disabled="!isEditable" class="input-style" maxlength="50" required>
    </td>
    <td><input type="date" v-model="taskData.date" :disabled="!isEditable" class="input-style"></td>
    <td :class="computePriority()">
        <select v-model="taskData.priority" :disabled="!isEditable" class="input-style">
            <option>low</option>
            <option>medium</option>
            <option>high</option>
        </select>
    </td>
    <td>
        <input type="checkbox" :id="`checkbox-${taskData.id}`" :checked="taskData.isCompleted"
            @change="handleIsChecked" />
        <label :for="`checkbox-${taskData.id}`" v-if="taskData.isCompleted">Completed</label>
        <label :for="`checkbox-${taskData.id}`" v-if="!taskData.isCompleted">Pending</label>
    </td>
    <td>
        <!-- edit button  -->
        <button @click="toggleEditable" v-if="!isEditable">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>

        </button>
        <!-- save button  -->
        <button @click="handleSave" v-if="isEditable">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2Z"></path>
                <path d="M7 3v5h8V3"></path>
                <path d="M10 14h4"></path>
            </svg>

        </button>
        <!-- delete button  -->
        <button @click="handleDelete(task.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"></path>
            </svg>
        </button>
    </td>

</template>
<style scoped>
.low-priority {
    background-color: lightgreen;
    color: black;
}


.medium-priority {
    background-color: lightyellow;
    color: black;
}

.high-priority {
    background-color: lightcoral;
    color: black;
}

input:disabled,
select:disabled {
    background-color: transparent;
    border: none;
}

/* Hide dropdown icon of select when disabled */
select:disabled {
    -webkit-appearance: none;
    /* For Safari */
    -moz-appearance: none;
    /* For Firefox */
    appearance: none;
    /* For modern browsers */
    background-image: none;
    /* Remove background image (dropdown icon) */
}

input:disabled,
select:disabled {
    color: inherit;
}

.input-style {
    width: 100%;
    padding: 8px 2px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    outline: none;
    transition: border-color 0.3s ease-in-out;
}
button{
    border-radius: 90%;
    margin: 0px 3px;
}
</style>
