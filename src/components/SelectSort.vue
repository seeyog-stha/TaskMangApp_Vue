<script setup lang="ts">
import { ref } from 'vue';
// expected props 
const { title, value, handleChange, options,selectkey} = defineProps<{
    title: string,
    value: string,
    handleChange: (key: string, value: string) => void;
    options: string[]
    selectkey: string

}>()

const isDropdownOpen = ref(false)
const handleSort = (event: Event) => {
    const input = event.target as HTMLSelectElement
    handleChange(selectkey, input.value)
}
</script>
<template>
    <div class="select-container date">
        <select :id="title" :value="value" @change="handleSort" class="select-select" @focus="isDropdownOpen = true"
            @blur="isDropdownOpen = false">
            <option v-if="!isDropdownOpen" value="None">{{ title }}</option>
            <option v-if="isDropdownOpen" value="None">None</option>
            <option v-for="(option, index) in options" :key="index">{{ option }}</option>
        </select>
    </div>

</template>