<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { taskProp } from '@/model';
import ToggleButton from './ToggleButton.vue';
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
    <div class="container">
        <div class="filter-container">
            <div>

                <!-- enable filter      -->
               <ToggleButton title="Enable Filter" :checked="isFilterEnabled"  :updateChecked="handleIsFilterEnabled"/>

                <!-- enable status filter  -->
                <ToggleButton  :isDisabled="!isFilterEnabled"  :title="`${isFilterEnabled ? 'Completed' : 'Pending'}`":checked="filterStatus"  :updateChecked="handleSortByStatus"/>
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
            <input type="text" id="searchvalue" v-model="searchValue" class="input-field"
                placeholder="Search" maxlength="50">
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
.date{
    width: 20vw;
}

</style>