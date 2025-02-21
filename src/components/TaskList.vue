<script setup lang="ts">
import notFoundImage from "@/assets/notfound.png";
import { getStore, setStore } from '@/utils/utils';
import TaskCard from './TaskCard.vue';
import type { taskProp } from '@/model';
const { taskStore, updateTask } = defineProps<{
    taskStore: taskProp[]
    updateTask: (value: taskProp[]) => void;
}>()
 
// function to handle delete 
// function requires id as parameter to delete the specific task 
const handleDelete = (id: string) => {
    const newValue = taskStore.filter((task) => task.id !== id)
    updateTask(newValue)
    setStore("task", newValue)

}
// function to handle edit 
// function requies the task as prameter to edit the specific task 
const handleEdit = (task: taskProp) => {
    const store = getStore("task")
    const newValue = store.map((obj:taskProp) => obj.id == task.id ? task : obj)
    console.log(newValue)
    updateTask(newValue)
    setStore("task", newValue)

}


</script>
<template class="table-container">
    <div class="table-wrapper scrollbar" v-if="taskStore?.length > 0">

        <table class="custom-table">
            <!-- table header  -->
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>

            <!-- tbody with animation  -->
            <transition-group name="task" tag="tbody">

                <tr v-for="(task, index) in taskStore" :key="task.id" class="task-item">
                    <TaskCard :index="index" :task="task" :handleDelete="handleDelete" :handleEdit="handleEdit" />

                </tr>
            </transition-group>

        </table>
    </div>
    <!-- show not found if no data  -->
    <div v-else class="not-found">
        <img :src="notFoundImage" alt="not-found"/>

    </div>
</template>
<style>
.not-found {
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Container Styling */
.table-container {
   
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-wrapper{
    max-height: 75vh; 
    min-height: 75vh;
    overflow-y: auto;
    border-radius: 8px;
}

/* Table Styling */
.custom-table {
    width: 100%;
    border-collapse: collapse;
    /* overflow: hidden; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



.custom-table th {
    padding: 5px; 
    text-align: left;
    font-weight: 500;
    font-size: 1em;
    color:#4860b5;
}

/* Table Rows */
.custom-table td {
    padding: 5px;
    text-align: center;
    font-weight: 90;
    font-size: 1.5em;
}

.custom-table tr{
    border-bottom: 1px solid whitesmoke;
}




/* Row Hover Effect */
tbody tr:hover {
    background-color: #f3f4f6;
    cursor: pointer;
}


.task-item {

    transition: transform 0.2s ease-in-out;
}

/* Add animation */
.task-enter-active {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Remove animation */
.task-leave-active {
    animation: fadeOut 0.3s ease-in-out;
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(10px);
    }
}

@media only screen and (max-width: 600px) {
  .not-found img{
    width: 80%;
  }
}

</style>