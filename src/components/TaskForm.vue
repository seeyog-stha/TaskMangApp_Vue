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
    priority: "Low"


}
const store = ref(initialValue);
const msg = ref("")
// function to handel submit function 
const handleSubmit = () => {
    const idvalue = generateUniqueId();
    const newTask = {
        id: idvalue,
        isCompleted: "Pending",
        ...store.value
    } as taskProp
    try {


        const updatedStore = taskStore ? [...taskStore, newTask] : [newTask];


        setStore("task", updatedStore);
        updateTask(updatedStore)
        // reset the value 
        store.value = {
            title: "",
            date: formatDate(Date.now()),
            priority: "Low"


        }
        msg.value = "Task added!!"
    } catch {
        msg.value = "Error while adding Task"

    } finally {
        setTimeout(() => {
            msg.value = ""
        }, 3000);
    }

}
const handleDateChange = (value: string) => {
    store.value.date = value
}
const handlePriorityChange =(value:string)=>{
    store.value.priority=value
}

const getButtonClass = (priority: string) => {
    return `custom-button btn ${store.value.priority === priority ? '' : 'inactive'}`;
};

</script>
<template>

    <form @submit.prevent="handleSubmit">
        <h4 class="title primary-color">Add New Task</h4>
        <!-- title  -->
         <div class="input-container">
            <label for="title" class="input-label ">Title:</label>
            <input type="text" id="title" v-model="store.title" class="input-field" placeholder="Title here..."
                maxlength="50" required>
        </div>
        <!-- date picker  -->

        <DatePicker title="Date" :value="store.date" :handleChange="handleDateChange" />
        <!-- priority  -->
        <div>
            <p class="select-label">Priority:</p>
            <div class="btn-group">

                <button :class="getButtonClass('Low')" @click="handlePriorityChange('Low')" type="button">Low</button>
                <button :class="getButtonClass('Medium')" @click="handlePriorityChange('Medium')" type="button">Medium</button>
                <button :class="getButtonClass('High')" @click="handlePriorityChange('High')" type="button">High</button>
            </div>
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

.notification {
    font-size: 0.875rem;
    text-align: center;

}

.btn-group {
    display: flex;
    justify-content: space-between;
}
.inactive{
    background-color: #fde4e4;
    color: #4c64b3;
}
.btn{
    width: 30%;
    margin-bottom: 2vh;
    outline: #4c64b3;
    
}
</style>