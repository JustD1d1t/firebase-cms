<script setup>
import { getAuth } from 'firebase/auth';
const auth = getAuth();
import { useGalleryStore } from '~/stores/gallery'
const { getGalleries } = useGallery();

const galleryStore = useGalleryStore();
const { addGalleriesToStore } = galleryStore;

const galleries = computed(() => galleryStore.getGalleriesFromStore);

const { data, status } = useAsyncData(getGalleries);

watch(data, (newData) => {
    addGalleriesToStore(newData.data)
})

</script>

<template>
    <UiLoadingspinner v-if="status === 'pending'" />
    <UContainer class="flex flex-col items-start  w-full" v-else>
        <UButton color="green" variant="solid" class="mb-6" to="/gallery/new">Dodaj nową</UButton>
        <UBlogList v-if="galleries.length" orientation="vertical" class="relative group flex flex-col w-full gap-y-6">
            <UBlogPost v-for="gallery in galleries" :key="gallery.id" :title="gallery.title">
                <template #default>
                    <UButton color="orange" variant="link" :to="`/gallery/${gallery.id}`">Edytuj</UButton>
                </template>
            </UBlogPost>
        </UBlogList>
        <h2 v-else>Nie masz jeszcze zdjęc</h2>
    </UContainer>
</template>~/stores/gallery