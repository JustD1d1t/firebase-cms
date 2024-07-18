<script setup>
import { object, string } from 'yup';
import { getAuth } from 'firebase/auth';
const route = useRoute()
import { useAttachmentsStore } from '~/stores/attachments'
const router = useRouter();
const { getRelease, updateRelease } = useReleases();

const attachmentsStore = useAttachmentsStore();
const { getAttachments } = useAttachments();
const { setAttachmentsToStore } = attachmentsStore;
const isLoading = ref(false);

const attachments = computed(() => attachmentsStore.getAttachmentsFromStore);

const schema = object({
    title: string().required('Required'),
})

const isOpen = ref(false);

const state = reactive({
    title: undefined,
    content: undefined,
})

async function onSubmit(event) {
    await updateRelease(
        {
            title: state.title,
            content: state.content,
        },
        route.params.id
    );
    router.back();
}

const closeModal = () => {
    isOpen.value = false;
}

const { status } = useAsyncData(async () => {
    const release = await getRelease(route.params.id);
    state.title = release.data.title;
    state.content = release.data.content;
    const files = await getAttachments(route.params.id);
    setAttachmentsToStore(files)
});
</script>

<template>
    <UiLoadingspinner v-if="status === 'pending'" />
    <UContainer class="flex justify-center w-full" v-else>
        <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
            <UFormGroup label="Tytuł" name="title" required>
                <UInput v-model="state.title" />
            </UFormGroup>

            <h3 v-if="attachments.length">Pliki</h3>
            <div class="flex gap-x-2">
                <UButton color='green' @click="isOpen = true">Dodaj pliki</UButton>
            </div>
            <ReleasesAttachment v-for="file in attachments" :key="file.item.fullPath" :file="file" />

            <UiTiptap v-model="state.content" :modelValue="state.content" />

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
        <UModal v-model="isOpen">
            <ReleasesAddAttachmentModal :closeModal="closeModal" />
        </UModal>
    </UContainer>
</template>