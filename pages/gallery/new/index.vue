<script setup>
import { object, string } from 'yup';
const { addGallery, addImages } = useGallery();
import { useGalleryStore } from '~/stores/gallery'
const router = useRouter();

const galleryStore = useGalleryStore();
const { addGalleryToStore } = galleryStore;

const schema = object({
    title: string().required('Required'),
})
const files = ref([])


const state = reactive({
    title: undefined,
})

const filesWithPreview = ref([])

watch(files, (newFiles) => {
    const arr = [];
    Array.from(newFiles).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            arr.push({
                url: e.target.result,
                item: file,
            });
            if (arr.length === newFiles.length) {
                filesWithPreview.value = arr;
            }
        };
        reader.readAsDataURL(file);
    });
});

async function onSubmit(event) {
    const response = await addGallery({
        title: event.data.title,
    })

    await addImages(files.value, response.id);

    addGalleryToStore({
        title: event.data.title,
        id: response.id,
    })

    router.back();
}

const handleFiles = (e) => {
    files.value = e;
}
</script>

<template>
    <UContainer class="flex flex-col  w-full">
        <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
            <UFormGroup label="Tytuł folderu" name="title" required>
                <UInput v-model="state.title" />
            </UFormGroup>

            <UFormGroup label="Zdjęcia" name="file" required>
                <UInput v-model="state.files" type="file" multiple @change="handleFiles"
                    accept="image/png, image/gif, image/jpeg" />
            </UFormGroup>

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
        <GalleryFilesPreview :files="filesWithPreview" />
    </UContainer>
</template>