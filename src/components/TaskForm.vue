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
const msg = ref("")
// function to handel submit function 
const handleSubmit = () => {
    const idvalue = generateUniqueId();
    const newTask = {
        id: idvalue,
        isCompleted: false,
        ...store.value
    }
    try{
        
        
            const updatedStore = taskStore ? [...taskStore, newTask] : [newTask];
        
            
            setStore("task", updatedStore);
            updateTask(updatedStore)
            // reset the value 
            store.value = {
                title: "",
                date: formatDate(Date.now()),
                priority: "low"
        
        
            }
            msg.value = "Task added!!"
    }catch{
        msg.value = "Error while adding Task"

    }finally{
        setTimeout(() => {
         msg.value = ""
    }, 3000);
    }
 
}
const handleDateChange = (value: string) => {
    store.value.date = value
}

</script>
<template>

    <form @submit.prevent="handleSubmit">
        <h4 class="title">Add New Task</h4>
        <!-- title  -->
        <div class="input-container">
            <label for="title" class="input-label">Title:</label>
            <input type="text" id="title" v-model="store.title" class="input-field" placeholder="Title here..."
                maxlength="50" required>
        </div>
        <!-- date picker  -->

        <DatePicker title="Date" :value="store.date" :handleChange="handleDateChange" />
        <!-- priority  -->
        <div class="select-container">
            <label for="priority" class="select-label">Priority:</label>
            <select id="priority" v-model="store.priority" class="select-select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <!-- submit button  -->

        <input type="submit" value="Submit" class="custom-button">

        <!-- notification msg  -->
        <p class="notification">{{ msg }}</p>
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
.notification{
    font-size: 0.875rem;

}
</style>