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
const handleIsChecked=()=>{
    taskData.value.isCompleted = !taskData.value.isCompleted
    handleEdit(taskData.value)
}

</script>
<template>
    <td>{{ index + 1 }}</td>
    <td><input type="text" v-model="taskData.title" :disabled="!isEditable" maxlength="50"></td>
    <td><input type="date" v-model="taskData.date" :disabled="!isEditable"></td>
    <td>
        <select v-model="taskData.priority" :disabled="!isEditable">
            <option>low</option>
            <option>medium</option>
            <option>high</option>
        </select>
    </td>
    <td>
        <input type="checkbox" :id="`checkbox-${taskData.id}`" :checked="taskData.isCompleted" @change="handleIsChecked"/>
        <label :for="`checkbox-${taskData.id}`" v-if="taskData.isCompleted">Completed</label>
        <label :for="`checkbox-${taskData.id}`" v-if="!taskData.isCompleted">Pending</label>
    </td>
    <td>
        <button @click="toggleEditable" v-if="!isEditable">Edit</button>
        <button @click="handleSave" v-if="isEditable">Save</button>
        <button @click="handleDelete(task.id)">delete</button>
    </td>

</template>
