<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { taskProp } from '@/model';
import { getStore } from '@/utils/utils';
import FilterDrawer from './FilterDrawer.vue';
// expected props 
const { updateTask, taskStore, handleModalVisible, isModalVisible } = defineProps<{
    taskStore: taskProp[]
    updateTask: (value: taskProp[]) => void;
    handleModalVisible: (value: boolean) => void;
    isModalVisible: boolean


}>()
const isDrawerVisible = ref(false)

const searchValue = ref("")


// change list on change of search value 
watch(searchValue, (newValue) => {
    const store = getStore("task")

    const searchTask = store.filter((task: taskProp) => task.title.toLowerCase().includes(newValue.toLowerCase()));
    console.log(searchTask)
    updateTask(searchTask)

});

const handleDrawerVisible = (value: boolean) => {
    isDrawerVisible.value = value;
};

</script>
<template>
    <div class="container">
        <div class="filter-container">
            <button @click="handleDrawerVisible(true)" :class="{ 'active': isDrawerVisible }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20">
                    <path
                        d="M27.49 2h-22A1.54 1.54 0 0 0 4 3.53v2a1.53 1.53 0 0 0 .31.93l7.83 10.36a4.32 4.32 0 0 1 .86 2.59v4.92a3.57 3.57 0 0 0 1.36 2.8l3.22 2.5a1.52 1.52 0 0 0 .93.32 1.44 1.44 0 0 0 .67-.16 1.5 1.5 0 0 0 .82-1.37v-9a4.32 4.32 0 0 1 .86-2.6l7.83-10.35a1.53 1.53 0 0 0 .31-.93v-2A1.52 1.52 0 0 0 27.49 2zM27 5.39l-7.73 10.22A6.37 6.37 0 0 0 18 19.43v8l-2.45-1.89a1.57 1.57 0 0 1-.55-1.21v-4.92a6.29 6.29 0 0 0-1.27-3.79L6 5.39V4h21z"
                        fill="currentColor" />
                </svg>

                <span>filter</span></button>

            <button @click="handleModalVisible(true)" :class="{ 'active': isModalVisible }">+ Add Task</button>
        </div>
        <div class="search-container">
            <!-- search bar -->

            <div class="input-container">

                <input type="text" id="searchvalue" v-model="searchValue" class="input-field" placeholder="Search"
                    maxlength="50">
            </div>

        </div>
    </div>
    <FilterDrawer :taskStore="taskStore" :updateTask="updateTask" :handleDrawerVisible="handleDrawerVisible"
        v-show="isDrawerVisible" />
</template>
<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    padding:10px;
    border-bottom: 1px solid whitesmoke;
}

.container .filter-container {
    display: flex;
    gap: 1vw;
    padding: 7px;
}

.filter-container button {
    padding: 1px 10px;
    font-size: 14px;
    font-weight: 500;
    background-color: transparent;
    border: 1px solid #4860b5;
    color: #4860b5;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
    display: flex;
    align-items: center;
    gap: 3;
}

.filter-container button:hover {

    background-color: #4860b5;
    color: white
}

.filter-container .active {

    background-color: #415cc0;
    color: white
}



.container .search-container {
    padding-right: 5vw;
    width: 20vw;

}






@media only screen and (max-width: 600px) {
    .container {
        flex-direction: column;
        gap: 10px;
        padding: 5px 20px;
    }

    .container .filter-container {
        width: 100%;
        justify-content: space-between;
        padding: 0;
    }

    .container .search-container {

        width: 90%;
        display: flex;
        justify-content: center;
        padding: 0;

    }

    .container .search-container .input-container {
        width: 100%;
    }



}
</style>