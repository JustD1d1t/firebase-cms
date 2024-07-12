<script setup>
import { object, string } from 'yup';
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const { addDocument, saveFile } = useFirebase();
import { useReleaseStore } from '~/stores/release'
import { useAttachmentsStore } from '~/stores/attachments'
const router = useRouter();

const attachmentsStore = useAttachmentsStore();
const { addAttachments } = attachmentsStore;

const releaseStore = useReleaseStore();
const { addRelease } = releaseStore;

const schema = object({
    title: string().required('Required'),
})
const files = ref([])


const state = reactive({
    title: undefined,
    content: undefined,
})

async function onSubmit(event) {
    const addDocumentResponse = await addDocument(['users', auth.currentUser.uid, 'releases'], {
        content: event.data.content,
        title: event.data.title
    })
    addRelease({
        id: addDocumentResponse.id,
        content: event.data.content,
        title: event.data.title
    })

    Array.from(files.value).forEach(file => {
        saveFile(`releases/${auth.currentUser.uid}/${addDocumentResponse.id}`, file)
    })

    addAttachments(files.value);
    router.back();
}

const handleFiles = (e) => {
    files.value = e
}
</script>

<template>
    <UContainer class="flex justify-center h-screen w-full">
        <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
            <UFormGroup label="Tytuł" name="title" required>
                <UInput v-model="state.title" />
            </UFormGroup>

            <UFormGroup label="Załączniki" name="file" required>
                <UInput v-model="state.files" type="file" multiple @change="handleFiles" />
            </UFormGroup>

            <UiTiptap v-model="state.content" />

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
    </UContainer>
</template>