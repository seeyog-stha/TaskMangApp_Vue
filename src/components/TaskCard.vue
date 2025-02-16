<script setup lang="ts">
import { ref } from 'vue'
interface taskProp {
    title: string,
    date: Date,
    priority: string
}
const { index, task } = defineProps<{
    index: number,
    task: taskProp
}>()
const isEditable= ref(false)
const toggleEditable = () => {
  isEditable.value = !isEditable.value
}
</script>
<template>
    <td>{{ index + 1 }}</td>
    <td><input type="text" v-model="task.title" :disabled="!isEditable" ></td>
    <td><input type="date" v-model="task.date" :disabled="!isEditable"></td>
    <td>
        <select v-model="task.priority" :disabled="!isEditable">
            <option>low</option>
            <option>medium</option>
            <option>high</option>
        </select>
    </td>
    <td>
        <button @click="toggleEditable" v-if="!isEditable">Edit</button>
        <button @click="toggleEditable" v-if="isEditable">Save</button>
        <button>delete</button>
    </td>

</template>
