<script setup>
import { object, string } from 'yup';
import { getAuth } from 'firebase/auth';
const auth = getAuth();
import { useReleaseStore } from '~/stores/release'
import { useAttachmentsStore } from '~/stores/attachments'
const router = useRouter();
const { addRelease } = useReleases();
const attachmentsStore = useAttachmentsStore();
const { addAttachmentsToStore } = attachmentsStore;
const { addAttachments } = useAttachments();

const releaseStore = useReleaseStore();
const { addReleaseToStore } = releaseStore;

const schema = object({
    title: string().required('Required'),
})
const files = ref([])


const state = reactive({
    title: undefined,
    content: undefined,
})

async function onSubmit(event) {
    const data = await addRelease({
        title: state.title,
        content: state.content
    })
    addReleaseToStore({
        id: data.id,
        content: event.data.content,
        title: event.data.title
    })

    await addAttachments(files.value, data.id);

    addAttachmentsToStore(files.value);
    router.back();
}

const handleFiles = (e) => {
    files.value = e
}
</script>

<template>
    <UContainer class="flex justify-center  w-full">
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