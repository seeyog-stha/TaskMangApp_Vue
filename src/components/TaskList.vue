<script setup lang="ts">
import { ref } from 'vue';
import { getStore, setStore } from '@/utils/utils';
import TaskCard from './TaskCard.vue';
import type { taskProp } from '@/model';
const {taskStore,updateTask } = defineProps<{
    taskStore: taskProp[]
    updateTask: (value:taskProp[])=>void;
}>()

const handleDelete=(id:string)=>{
    const newValue=taskStore.filter((task)=>task.id!==id)
    console.log(newValue)
    updateTask(newValue)
    setStore("task",newValue)

}
const handleEdit=(task:taskProp)=>{
    const newValue=taskStore.map((obj)=>obj.id==task.id?task:obj)
    console.log(newValue)
    updateTask(newValue)
    setStore("task",newValue)

}


</script>
<template>
    <table>
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
        <tbody>
            <tr v-for="(task, index) in taskStore" :key="task.id">
                <TaskCard :index="index" :task="task" :handleDelete="handleDelete"
                :handleEdit="handleEdit"/>
               
            </tr>
        </tbody>
    </table>
</template>