<script setup lang="ts">
// expected props are title value handleChange isDisabled
// title gives the name to the component 
// value provide value to the component 
// handleChange is the function to updated value
// isDisabled to disable the component 
const { title, value, handleChange, isDisabled = false } = defineProps<{
    title: string,
    value: string | Date,
    isDisabled?: boolean,
    handleChange: (value: string) => void;
}>()
const handleDate = (event: Event) => {
    const input = event.target as HTMLInputElement
    handleChange(input.value)
}
</script>
<template>
    <label class="date-container">
        <span class="date-label ">{{ title }}:</span>
        <input type="date" id="date-input" :disabled="isDisabled" :value="value" @change="(event) => handleDate(event)"
            class="date-input" />
    </label>
</template>
<style scoped>
.date-container {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    margin: 1vh 0;
}

.date-label {
    font-size: 0.875rem;

}

.date-input {
    border: 1px solid #d1d5db;

    font-size: 0.875rem;

    border-radius: 0.5rem;

    padding: 0.5rem 1rem;

    box-shadow: 1px solid#8ca3ec;

    outline: none;

    transition: box-shadow 0.3s ease-in-out;
}

.date-input:focus {
    border-color: #4860b5;
}
</style>