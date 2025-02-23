<script setup lang="ts">
import type { taskProp } from '@/model';
import { ref, watch } from 'vue';
import { getStore, setStore } from '@/utils/utils';
import SelectSort from './SelectSort.vue';
const { taskStore, updateTask, handleDrawerVisible } = defineProps<{
    taskStore: taskProp[]
    updateTask: (value: taskProp[]) => void;
    handleDrawerVisible: (value: boolean) => void;
}>()

const dateOptions = ["Ascending", "Descending"]
const priorityOptions = ["Ascending", "Descending"]
const statusOptions = ["Pending", "In Progress", "Completed"]
const priorityOrder: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3
};


const filterStatus = ref("None")


const sort = ref({ sortDate: "None", sortPriority: "None" })




// change the list on change of status
watch(filterStatus, (newValue) => {
    const store = getStore("task")
    let newTask;
    if (filterStatus.value !== "None") {

        newTask = store.filter((task: taskProp) => task.isCompleted === newValue);
    }
    else {
        newTask = store
    }

    updateTask(newTask);
});

// change the list on change of sort
watch(sort, (newValue) => {
    console.log("newvalue", newValue)
    let sortedTasks = [...taskStore];

    if (newValue.sortDate === "Ascending") {
        sortedTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (newValue.sortDate === "Descending") {
        sortedTasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    // Sort by priority
    if (newValue.sortPriority === "Ascending") {
        console.log("asc")
        sortedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }
    else if (newValue.sortPriority === "Descending") {
        console.log("des")
        sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    // If no sorting options are selected, just return the original tasks
    if (newValue.sortDate === "None" && newValue.sortPriority === "None") {
        sortedTasks = [...taskStore];
    }
    updateTask(sortedTasks);
}, { deep: true });

const handleSortChange = (key: string, value: string) => {
    console.log("key", key, "value", value)
    if (key == "date")
        sort.value.sortDate = value
    else if (key == "priority")
        sort.value.sortPriority = value
    else if (key == "status")
        filterStatus.value = value
}

</script>
<template>
    <div class="drawer-container" @click="handleDrawerVisible(false)">
        <div class="filter-container" @click.stop>
            <div class="button-container">

                <button class="close-button" @click="handleDrawerVisible(false)">X</button>
            </div>

            <div class="filter-button">
                <div>

                    <!-- filter a/c to status  -->
                    <p class="title">Status:</p>
                    <SelectSort title="Filter by status" :value="filterStatus" :handleChange="handleSortChange"
                        :options="statusOptions" selectkey="status" />


                </div>
                <div>

                    <!-- sort a/c to date    -->
                    <p class="title">Due Date:</p>
                    <SelectSort title="Sort by date" :value="sort.sortDate" :handleChange="handleSortChange"
                        :options="dateOptions" selectkey="date" />



                </div>
                <div>


                    <!-- sort a/c to priority    -->
                    <p class="title">Priority:</p>
                    <SelectSort title="Sort by priority" :value="sort.sortPriority" :handleChange="handleSortChange"
                        :options="priorityOptions" selectkey="priority" />
                </div>

            </div>
        </div>



    </div>
</template>
<style scoped>
.drawer-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 100;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(0.5px);
}

.drawer-container .filter-container {
    background-color:  var(--bg-color);
    width: 15vw;
    height: 100vh;
    padding: 5vh 1vw;
    border-radius: 10px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}

.button-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 5px;
}

.title {
    font-weight: 90;
    font-size: 0.8em;
    color: black;
}

.close-button {
    height: 2vw;
    width: 2vw;
    border-radius: 100%;
    padding: 0.5vw;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);


}

.filter-button {
    margin-top: 10vh;
}

@media only screen and (max-width: 600px) {
    .drawer-container .filter-container {

        width: 70vw;


    }

    .close-button {
        height: 30px;
        width: 30px;
        padding: 5px;
        /* border: 1px solid black; */
    }




}
</style>