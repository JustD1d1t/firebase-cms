<script setup>
import { object, string } from 'yup';
const route = useRoute()
import { useGalleryStore } from '~/stores/gallery'
const router = useRouter();

const { getGalleryImages, queryGallery, updateGallery, removeFiles } = useGallery();

const galleryStore = useGalleryStore();
const { setFilesToStore } = galleryStore;

const files = computed(() => galleryStore.getFilesFromStore);

const isOpen = ref(false);

const schema = object({
    title: string().required('Required'),
})

const state = reactive({
    title: undefined,
})

const closeModal = () => {
    isOpen.value = false;
}

const removeFilesFromGallery = async () => {
    await removeFiles(route.params.id);
    galleryStore.removeFilesFromStore();
}

async function onSubmit() {
    await updateGallery({ title: state.title }, route.params.id)
    router.back();
}


const { status } = useAsyncData(async () => {
    const response = await queryGallery(route.params.id);
    state.title = response.title;
    const data = await getGalleryImages(route.params.id);
    setFilesToStore(data);
});
</script>

<template>
    <UiLoadingspinner v-if="status === 'pending'" />
    <UContainer class="flex flex-wrap w-full" v-else>
        <div class="flex gap-x-2 my-2">
            <UButton color='red' @click="removeFilesFromGallery">Usuń pliki</UButton>
            <UButton color='green' @click="isOpen = true">Dodaj pliki</UButton>
        </div>
        <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
            <UFormGroup label="Tytuł" name="title" required>
                <UInput v-model="state.title" />
            </UFormGroup>
            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
        <GalleryFilesPreview :files="files" />
        <UModal v-model="isOpen">
            <GalleryAddFileModal :closeModal="closeModal" />
        </UModal>
    </UContainer>
</template>