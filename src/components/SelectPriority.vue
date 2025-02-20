<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { taskProp } from '@/model';
const { value, handleChange, disabled ,index} = defineProps<{
    value: string,
    handleChange: (value: taskProp['isCompleted']) => void;
    disabled: boolean
    index:number
}>()

const dropdownOpen = ref(false);


const priorityOptions = [
    { value: "Low", label: "Low", color: "green" },
    { value: "Medium", label: "Medium", color: "yellow" },
    { value: "High", label: "High", color: "red" }
];

const toggleDropdown = () => {
    if (!disabled) {

        dropdownOpen.value = !dropdownOpen.value;
    }
};



// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement | null;  
    if (target && !target.closest(`#custom-dropdown-${index}`)) {
        dropdownOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
    <div :class="['custom-dropdown',{'border':!disabled}]" :id="`custom-dropdown-${index}`">
        <div class="selected-option" @click="toggleDropdown">
            <svg class="flag-icon" :fill="priorityOptions.find(opt => opt.value === value)?.color" viewBox="0 0 24 24">
                <path d="M4 2v20h2v-8h7l1 2h6v-8h-6l-1-2H4z" />
            </svg>
            {{ value }}
        </div>
        <ul v-if="dropdownOpen" class="dropdown-list">
            <li v-for="option in priorityOptions" :key="option.value"
                @click="handleChange(option.value as taskProp['isCompleted'])">
                <svg class="flag-icon" :fill="option.color" viewBox="0 0 24 24">
                    <path d="M4 2v20h2v-8h7l1 2h6v-8h-6l-1-2H4z" />
                </svg>
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.custom-dropdown {
    position: relative;
    width: 150px;
    cursor: pointer;
    border-radius: 5px;
    padding: 5px;
    font-size: 14px;
}
.border{
    background-color: white;
    border: 1px solid #ccc;

}

.selected-option {
    display: flex;
    align-items: center;
    gap: 8px;
}

.flag-icon {
    width: 16px;
    height: 16px;
}

.dropdown-list {
    position: absolute;
    top: 60%;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 5px 0;
    z-index: 100;
}

.dropdown-list li {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.dropdown-list li:hover {
    background-color: #f3f3f3;
}
</style>
