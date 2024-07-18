<script setup>
const props = defineProps({
    files: Array,
})
</script>
<template>
    <div class="flex flex-col gap-4">
        <!-- <div class="grid grid-cols-4 gap-4"> -->
        <div v-for="file in files" :key="file.name" class="file-preview">
            <div class="file-preview__image">
                <img :src="file.src" alt="preview" v-if="file.type.includes('image')" />
            </div>
            <div class="file-preview__title">
                <p>{{ file.name }}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.file-preview {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 2px solid gray;

    &__image {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        background-color: lightgray;
        margin-right: 1rem;

        img {
            height: 100%;
            object-fit: contain;
        }
    }

    &__title {
        text-align: center;
    }

}
</style>