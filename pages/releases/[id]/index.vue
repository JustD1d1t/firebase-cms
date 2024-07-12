<script setup>
import { object, string } from 'yup';
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const { saveFile, queryDoc, setDocument, getFilesWithUrl, removeFileFromStorage } = useFirebase();
const route = useRoute()
import { useAttachmentsStore } from '~/stores/attachments'
const router = useRouter();

const attachmentsStore = useAttachmentsStore();
const { removeAttachments, setAttachments } = attachmentsStore;
const isLoading = ref(false);

const attachments = computed(() => attachmentsStore.getAttachments);

const schema = object({
    title: string().required('Required'),
})

const isOpen = ref(false);

const state = reactive({
    title: undefined,
    content: undefined,
})

async function onSubmit(event) {
    await setDocument(['users', auth.currentUser.uid, 'releases', route.params.id], {
        content: state.content,
        title: state.title
    })
    router.back();
}

const removeFiles = async () => {
    const removalPromises = attachments.value.map(att =>
        removeFileFromStorage(`releases/${auth.currentUser.uid}/${route.params.id}`, att.item.name)
    );
    await Promise.all(removalPromises);
    removeAttachments();
}

const closeModal = () => {
    isOpen.value = false;
}

onMounted(async () => {
    isLoading.value = true;
    const response = await queryDoc(['users', auth.currentUser.uid, 'releases'], route.params.id)
    state.title = response.title;
    state.content = response.content;
    const files = await getFilesWithUrl(`releases/${auth.currentUser.uid}/${route.params.id}`);
    setAttachments(files)
    isLoading.value = false;
})
</script>

<template>
    <UiLoadingspinner v-if="isLoading" />
    <UContainer class="flex justify-center h-screen w-full" v-else>
        <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
            <UFormGroup label="Tytuł" name="title" required>
                <UInput v-model="state.title" />
            </UFormGroup>

            <h3 v-if="attachments.length">Pliki</h3>
            <div class="flex gap-x-2">
                <UButton color='red' @click="removeFiles">Usuń pliki</UButton>
                <UButton color='green' @click="isOpen = true">Dodaj pliki</UButton>
            </div>
            <ReleasesAttachment v-for="file in attachments" :key="file.item.fullPath" :file="file" />

            <UiTiptap v-model="state.content" :modelValue="state.content" />

            <UButton type="submit">
                Submit
            </UButton>
        </UForm>
        <ReleasesAddAttachmentModal :isOpen="isOpen" :closeModal="closeModal" />
    </UContainer>
</template>