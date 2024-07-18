<script setup>
const props = defineProps({
    menu: {
        type: Object,
        required: true,
        default: () => { },
    }
})
</script>
<template>
    <div class="w-full">
        <h3>{{ menu.name }}</h3>
    </div>
</template>