<script setup lang="ts">
import TaskForm from './TaskForm.vue';
import type { taskProp } from '@/model';
const { taskStore, updateTask, handleModalVisible } = defineProps<{
    taskStore: taskProp[]
    updateTask: (value: taskProp[]) => void;
    handleModalVisible: (value: boolean) => void;
}>()
</script>
<template>
    <div class="modal-container" @click="handleModalVisible(false)">
        <div class="form-container" @click.stop>
            <div class="button-container">

                <button class="close-button" @click="handleModalVisible(false)">X</button>
            </div>

            <TaskForm :taskStore="taskStore" :updateTask="updateTask" />
        </div>



    </div>
</template>
<style scoped>
.modal-container {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
}

.modal-container .form-container {
    background-color:  var(--bg-color);
    width: 30vw;
    height: 65vh;
    padding: 5vh 4vw;
    border-radius: 10px;
    /* border: 2px solid black ; */
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}

.button-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
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

@media only screen and (max-width: 600px) {
    .modal-container .form-container {

        width: 80vw;
        height: 60vh;
        padding-right:20px;   

    }
    
    .close-button{
        height: 20px;
        width: 20px;
        padding: 2px;
        /* border: 1px solid black; */
    }
}
</style>