<script setup>

import { ref } from 'vue';
import { formatDate, setStore, getStore } from '@/utils/utils';
const initialValue = {
    title: "",
    date: formatDate(Date.now()),
    priority: "low"


}
const store = ref(initialValue);
const handleSubmit = () => {
    const localstore = getStore("task")
    const updatedStore = localstore ? [...localstore, store.value] : [store.value];

    const isSubmitted = setStore("task", updatedStore);
    console.log("is", isSubmitted)
}

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <label for="title">Title</label>
        <input type="text" v-model="store.title" placeholder="Title" id="title">
        <label for="date">Date</label>
        <input type="date" v-model="store.date" id="date">
        <label for="priority">Priority</label>
        <select v-model="store.priority">
            <option>low</option>
            <option>medium</option>
            <option>high</option>
        </select>
        <input type="submit" value="Submit">


    </form>

</template>
<style scoped>
form {
    display: flex;
    flex-flow: column;
}
</style>