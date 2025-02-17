<script setup lang="ts">
import notFoundImage from "@/assets/notfound.avif";
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
    <div class="table-wrapper" v-if="taskStore?.length > 0">

        <table class="custom-table">
            <!-- table header  -->
            <thead>
                <tr>
                    <th>S.N.</th>
                    <th>Title</th>
                    <th>Date</th>
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
        <img :src="notFoundImage" alt="not-found" width="500" height="500" />

    </div>
</template>
<style>
.not-found {
    display: flex;
    justify-content: center;
}

/* Container Styling */
.table-container {
    background-color: white;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.table-wrapper{
    max-height: 75vh; 
    overflow-y: auto;
    border-radius: 8px;
}

/* Table Styling */
.custom-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Table Header */
.custom-table thead {
    background-color: #e5e7eb;
}

.custom-table th {
    padding: 12px;
    border: 1px solid #d1d5db;
    text-align: left;
    font-weight: 600;
    color: black;
}

/* Table Rows */
.custom-table td {
    padding: 12px;
    border: 1px solid #d1d5db;
    text-align: center;
    color: black;
}


.custom-table tbody tr:nth-child(even) {
    background-color: #f9fafb;
}

/* Row Hover Effect */
.custom-table tbody tr:hover {
    background-color: #f3f4f6;
    cursor: pointer;
}

/* Responsive Table */
@media (max-width: 768px) {

    .custom-table th,
    .custom-table td {
        padding: 8px;
        font-size: 14px;
    }
}

.task-item {
    background: #f3f3f3;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
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

</style>