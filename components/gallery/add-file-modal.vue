<script setup>
const route = useRoute()
import { useGalleryStore } from '~/stores/gallery'

const { addImages, getGalleryImages } = useGallery();

const galleryStore = useGalleryStore();
const { setFilesToStore } = galleryStore;
const fileInputRef = ref(null);

const props = defineProps({
    closeModal: Function
})

const filesToAdd = ref([]);

const handleFiles = (e) => {
    filesToAdd.value = Array.from(e);
}

async function submitFiles() {
    await addImages(filesToAdd.value, route.params.id);

    const files = await getGalleryImages(route.params.id);
    setFilesToStore(files);
    props.closeModal();
    fileInputRef.value.value = "";
}
</script>

<template>
    <UModal v-model="props.isOpen">
        <div class="p-4">
            <UCard>
                <template #header>
                    Dodaj pliki
                </template>

                <UFormGroup label="Załączniki" name="file" required>
                    <UInput ref="fileInputRef" type="file" multiple @change="handleFiles"
                        accept="image/png, image/gif, image/jpeg" />
                </UFormGroup>

                <template #footer>
                    <div class="flex justify-between">
                        <UButton color="yellow" @click="props.closeModal">
                            Zamknij
                        </UButton>
                        <UButton @click="submitFiles">
                            Dodaj
                        </UButton>
                    </div>
                </template>
            </UCard>
        </div>
    </UModal>
</template>