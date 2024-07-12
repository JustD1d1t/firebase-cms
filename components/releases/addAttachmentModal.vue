<script setup>
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const route = useRoute()
import { useAttachmentsStore } from '~/stores/attachments'
const { saveFile, getFilesWithUrl } = useFirebase();

const attachmentsStore = useAttachmentsStore();
const { setAttachments } = attachmentsStore;
const props = defineProps({
    isOpen: Boolean,
    closeModal: Function
})

const filesToAdd = ref([]);
const fileInputRef = ref(null); // ref for the file input

const handleFiles = (e) => {
    filesToAdd.value = Array.from(e);
}

async function submitFiles() {
    const savePromises = filesToAdd.value.map(file =>
        saveFile(`releases/${auth.currentUser.uid}/${route.params.id}`, file)
    );

    await Promise.all(savePromises);

    const files = await getFilesWithUrl(`releases/${auth.currentUser.uid}/${route.params.id}`);
    setAttachments(files);
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
                    <UInput ref="fileInputRef" type="file" multiple @change="handleFiles" />
                </UFormGroup>

                <template #footer>
                    <div class="flex justify-between">
                        <UButton color="yellow" @click="isOpen = false">
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