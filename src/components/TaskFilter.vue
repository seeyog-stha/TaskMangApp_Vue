<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { taskProp } from '@/model';
import ToggleButton from './ToggleButton.vue';
import { getStore } from '@/utils/utils';
// expected props 
const { updateTask, taskStore } = defineProps<{
    taskStore: taskProp[]
    updateTask: (value: taskProp[]) => void;

}>()
const isFilterEnabled = ref(false)
const filterStatus = ref(false)
const sortDate = ref("None")
const searchValue = ref("")

// function to handle enable filter 
const handleIsFilterEnabled = async () => {
    isFilterEnabled.value = !isFilterEnabled.value;
    await nextTick();
    if (!isFilterEnabled.value) {
        // if off reset the value to initial value 
        filterStatus.value = false
        const store = getStore("task")
        updateTask([...store])
    } else {
        // sort the data ac to status 
        handleSortByStatus()
    }

}
// function to handle status 
const handleSortByStatus = async () => {
    filterStatus.value = !filterStatus.value;
    await nextTick();
    const store = getStore("task")

    const newTask = store.filter((task: taskProp) => task.isCompleted === filterStatus.value);


    updateTask(newTask);
};
// change the list on change of sortDate 
watch(sortDate, (newValue) => {
    let sortedTasks = [...taskStore];

    if (newValue === "Ascending") {
        sortedTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (newValue === "Descending") {
        sortedTasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    updateTask(sortedTasks);
});
// change list on change of search value 
watch(searchValue, (newValue) => {
    const store = getStore("task")

    const searchTask = store.filter((task: taskProp) => task.title.toLowerCase().includes(newValue.toLowerCase()));
    console.log(searchTask)
    updateTask(searchTask)

});

</script>
<template>
    <div class="container">
        <div class="filter-container">
            <div>

                <!-- enable filter      -->
                <ToggleButton title="Enable Filter" :checked="isFilterEnabled" :updateChecked="handleIsFilterEnabled" />

                <!-- enable status filter  -->
                <ToggleButton :isDisabled="!isFilterEnabled" :title="`${filterStatus ? 'Completed' : 'Pending'}`"
                    :checked="filterStatus" :updateChecked="handleSortByStatus" />
            </div>
            <div>

                <!-- sort a/c to date    -->
                <div class="select-container date">

                    <label for="sortDate" class="select-label">Sort by date:</label>
                    <select v-model="sortDate" id="sortDate" class="select-select">
                        <option>None</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                </div>
            </div>

        </div>
        <div class="search-container">
            <!-- search bar -->

            <div class="input-container">
                <input type="text" id="searchvalue" v-model="searchValue" class="input-field" placeholder="Search"
                    maxlength="50">
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}

.container .filter-container {
    width: 50%;
    display: flex;
    justify-content: space-between;
}

.container .filter-container>div {
    display: flex;
    gap: 15px;
    align-items: center;
}

.date {
    width: 20vw;
}

@media only screen and (max-width: 600px) {
    .container {
        flex-direction: column;
        gap: 10px;
    }

    .container .filter-container {
        width: 100%;
        gap: 10px;
    }

    .container .filter-container>div {

        gap: 3px;

    }

    .date {
        width: 40vw;
    }
}
</style>