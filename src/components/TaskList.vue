<script setup>
import { ref } from 'vue';
import { getStore } from '@/utils/utils';
import TaskCard from './TaskCard.vue';
const initialList = getStore("task")
const taskList = ref(initialList)
</script>
<template>
    <table>
        <thead>
            <tr>
                <th>S.N.</th>
                <th>Title</th>
                <th>Date</th>
                <th>Priority</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in taskList" :key="index">
                <TaskCard :index="index" :task="task"/>
               
            </tr>
        </tbody>
    </table>
</template>