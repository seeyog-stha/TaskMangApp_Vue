<script setup lang="ts">

// expected props are title checked updated isDisabled
// title gives the name to the component 
// checked provide checked-value to the component 
// updateChecked is the function to updated checked-value 
// isDisabled to disable the component 
const { title, checked=false, updateChecked, isDisabled=false } = defineProps < {
    title?: string,
    checked: boolean ,
    isDisabled?:boolean,
    updateChecked: () => void;
} > ()

</script>
<template>
    <div class="checkbox-container">
        <!-- Checklist -->
        <div class="checklist">
            <label class="toggle-label">
                <input type="checkbox"
                :disabled="isDisabled" :checked="checked"
                @change="updateChecked" class="checkbox-input" />
                <div class="toggle-container">
                    <div class="toggle-knob"></div>
                </div>
            </label>
            <span class="label-text">{{ title }}</span>
        </div>
    </div>
</template>
<style scoped>
.checkbox-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.checklist {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.toggle-label {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.checkbox-input {
    display: none;
}

.toggle-container {
    width: 40px;
    height: 20px;
    border-radius: 9999px;
    background-color: #DCD7C9;
    position: relative;
    transition: background-color 0.3s ease-in-out;
}

.checkbox-input:checked+.toggle-container {
    background-color: #A27B5C;
}

.toggle-knob {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease-in-out;
}

.checkbox-input:checked+.toggle-container .toggle-knob {
    transform: translateX(20px);
}

.label-text {
    font-size: 0.875rem;
    /* Text size for the label */
}
</style>