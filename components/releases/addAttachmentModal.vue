<script setup>
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const route = useRoute()
import { useAttachmentsStore } from '~/stores/attachments'

const attachmentsStore = useAttachmentsStore();
const { setAttachmentsToStore } = attachmentsStore;
const props = defineProps({
    closeModal: Function
})

const { addAttachments, getAttachments } = useAttachments();

const filesToAdd = ref([]);
const fileInputRef = ref(null);

const handleFiles = (e) => {
    filesToAdd.value = Array.from(e);
}

async function submitFiles() {
    await addAttachments(filesToAdd.value, route.params.id);

    const files = await getAttachments(route.params.id);
    setAttachmentsToStore(files);
    props.closeModal();
    fileInputRef.value.value = "";
}
</script>
<template>
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
                    <UButton color="yellow" @click="closeModal">
                        Zamknij
                    </UButton>
                    <UButton @click="submitFiles">
                        Dodaj
                    </UButton>
                </div>
            </template>
        </UCard>
    </div>
</template>