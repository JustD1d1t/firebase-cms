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
const { removeAttachment } = useAttachments();
import { useAttachmentsStore } from '~/stores/attachments'
const attachmentsStore = useAttachmentsStore();
const { removeAttachmentFromStore } = attachmentsStore;

const removeFile = async (name) => {    
    removeAttachment(route.params.id, name)
    removeAttachmentFromStore(props.file)
}
</script>
<template>
    <div class="flex">
        <a :href="file.url" target="_blank">{{ props.file.metadata.name }}</a>
        <UButton variant="ghost" color="red" @click="removeFile(props.file.metadata.name)">
            <nuxt-icon name="trash" />
        </UButton>
    </div>
</template>