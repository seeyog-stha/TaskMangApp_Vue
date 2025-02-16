<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { taskProp } from '@/model';
const { updateTask, initialTaskStore } = defineProps<{
    initialTaskStore: taskProp[]
    updateTask: (value: taskProp[]) => void;
}>()
const isFilterEnabled = ref(false)
const filterStatus = ref(false)
const sortDate = ref("None")
const searchValue = ref("")
const handleIsFilterEnabled = async () => {
    isFilterEnabled.value = !isFilterEnabled.value;
    await nextTick();
    if (!isFilterEnabled.value) {
        updateTask([...initialTaskStore])
    } else {
        handleSortByStatus()
    }

}
const handleSortByStatus = async () => {
    filterStatus.value = !filterStatus.value;
    console.log("filter", filterStatus.value);
    console.log("initialTaskStore", initialTaskStore);

    await nextTick(); // Ensure state updates before filtering

    const newTask = initialTaskStore.filter((task) => task.isCompleted === filterStatus.value);
    console.log("Filtered Tasks:", newTask);

    updateTask(newTask);
};
watch(sortDate, (newValue) => {
    let sortedTasks = [...initialTaskStore];

    if (newValue === "Ascending") {
        sortedTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (newValue === "Descending") {
        sortedTasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    updateTask(sortedTasks);
});
watch(searchValue, (newValue) => {
    
    const searchTask = initialTaskStore.filter((task) => task.title.toLowerCase().includes(newValue.toLowerCase()));
    console.log(searchTask)
    updateTask(searchTask)

});

</script>
<template>
    <div>
        <label for="isFilterEnabled">Enable Filter</label>
        <input type="checkbox" :checked="isFilterEnabled" @change="handleIsFilterEnabled" id="isFilterEnabled">

        <label for="sortStatus" v-if="filterStatus">Completed</label>
        <label for="sortStatus" v-if="!filterStatus">Pending</label>
        <input type="checkbox" :disabled="!isFilterEnabled" id="sortStatus" :checked="filterStatus"
            @change="handleSortByStatus">

        <label for="sortDate">Sort by date:</label>
        <select v-model="sortDate" id="sortDate">
            <option>None</option>
            <option>Ascending</option>
            <option>Descending</option>
        </select>
        <label for="search">Search:</label>
        <input type="text" v-model="searchValue" id="search"/>
    </div>
</template>