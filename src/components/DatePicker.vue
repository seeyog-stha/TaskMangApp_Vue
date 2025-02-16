<script setup lang="ts">
const { title, value, handleChange, isDisabled=false } = defineProps < {
    title: string,
    value: string|Date,
    isDisabled?:boolean,
    handleChange: () => void;
} > ()
</script>
<template>
    <label class="date-container">
        <span class="date-label">{{ title }}:</span>
        <input type="date" id="date-input" :disabled="isDisabled" :value="value" @change="handleChange" class="date-input" />
    </label>
</template>
<style scoped>
.date-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;

}

.date-label {
    font-size: 0.875rem;

}

.date-input {
    border: 1px solid #d1d5db;

    font-size: 0.875rem;

    border-radius: 0.5rem;

    padding: 0.5rem 1rem;

    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    outline: none;

    transition: box-shadow 0.3s ease-in-out;
}

.date-input:focus {
    
    box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.5);
}
</style>