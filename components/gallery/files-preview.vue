<script setup>
const route = useRoute();
import { getAuth } from 'firebase/auth';
const auth = getAuth();
import { useGalleryStore } from '~/stores/gallery'

const galleryStore = useGalleryStore();
const { removeFileFromStore } = galleryStore;
const { removeFile } = useGallery();

const props = defineProps({
    files: Array,
})

const remove = async (file) => {
    await removeFile(route.params.id, file.metadata.name);
    removeFileFromStore(file);
}
</script>
<template>
    <div class="grid grid-cols-4 gap-4 w-full">
        <div v-for="file in files" :key="file.item.name || file.metadata.name" class="file-preview">
            <div class="file-preview__image">
                <img :src="file.url" alt="preview" />
            </div>
            <div class="file-preview__title">
                <p>{{ file.item.name || file.metadata.name }}</p>
            </div>
            <div class="file-preview__actions">
                <button @click="remove(file)">
                    <nuxt-icon name="trash" />
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.file-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 2px solid gray;
    position: relative;

    &__actions {
        position: absolute;
        top: 0;
        right: 0;
        background-color: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        color: black;
    }

    &__image {
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 100%;
            object-fit: contain;
        }
    }

    &__title {
        text-align: center;
        word-break: break-all;
    }

}
</style>