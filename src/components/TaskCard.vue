<script setup lang="ts">
import { ref } from 'vue'
import type { taskProp } from '@/model';
import SelectPriority from './SelectPriority.vue';

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
// function to handle save 
const handleSave = () => {
    handleEdit(taskData.value)
    isEditable.value = false
}
// function to handle task completed 
const handleIsChecked = (event: Event) => {
    const input = event.target as HTMLSelectElement
    const value = input.value as taskProp['isCompleted'];
    taskData.value.isCompleted = value
    handleEdit(taskData.value)
}
const handlePriority=(value:taskProp['isCompleted'])=>{
    taskData.value.priority=value
}


</script>
<template>

    <!-- title  -->
    <td class="td-title"><input type="text" v-model="taskData.title" :disabled="!isEditable" class="input-style" maxlength="50" required>
    </td>
    <!-- date  -->
    <td><input type="date" v-model="taskData.date" :disabled="!isEditable" class="input-style"></td>
    <!-- priotity -->
    <td >
    
        <SelectPriority :value="taskData.priority" :handleChange="handlePriority" :disabled="!isEditable" :index="index"/>
        
    </td>
    <!-- is completed  -->
    <td>
        <select :id="`checkbox-${taskData.id}`" :value="taskData.isCompleted" @change="handleIsChecked($event)"
            class="input-style td-select">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
        </select>
       

    </td>
    <!-- buttons -->
    <td class="btn-group">
        <!-- edit button  -->
        <button @click="toggleEditable" v-if="!isEditable">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>

        </button>
        <!-- save button  -->
        <button @click="handleSave" v-if="isEditable" class="btn-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2Z"></path>
                <path d="M7 3v5h8V3"></path>
                <path d="M10 14h4"></path>
            </svg>

        </button>
        <!-- delete button  -->
        <button @click="handleDelete(task.id)" class="btn-red">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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
    padding: 5px 2px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    outline: none;
    transition: border-color 0.3s ease-in-out;
    text-transform: capitalize;
}

button {
    border-radius: 90%;
    margin: 0px 3px;
    color: gray;
    border-color: transparent;
    cursor: pointer;
    background-color: transparent;
}
.btn-red{
    color: red;
}
.btn-blue{
    color:#4860b5
}

button:hover {
    color: black;
}

/* for mobile screen  */
@media only screen and (max-width: 600px) {
    button {
        margin: 3px;
    }
    .btn-group{
        display: flex;
        flex-direction: row;
    }
    .td-title input{
        width: 30vw;
    }
    .td-select{
        width: 25vw;
    }
}
</style>
