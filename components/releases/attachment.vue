<script setup>
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const route = useRoute()
const props = defineProps({
    file: {
        type: Object,
        required: true,
    }
})
import { useAttachmentsStore } from '~/stores/attachments'
const attachmentsStore = useAttachmentsStore();
const { removeAttachment } = attachmentsStore;
const { removeFileFromStorage } = useFirebase();

const removeFile = async () => {
    await removeFileFromStorage(`releases/${auth.currentUser.uid}/${route.params.id}`, props.file.item.name)
    removeAttachment(props.file)
}
</script>
<template>
    <div class="flex">
        <a :href="file.url" target="_blank">{{ props.file.item.name }}</a>
        <UButton variant="ghost" color="red" @click="removeFile()">
            <nuxt-icon name="trash" />
        </UButton>
    </div>
</template>