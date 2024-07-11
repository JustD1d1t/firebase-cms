<script setup>
import { object, string } from 'yup';
import { getAuth } from 'firebase/auth';
import TextAlign from '@tiptap/extension-text-align'
const auth = getAuth();
const { addDocument, saveFile } = useFirebase();

const editor = useEditor({
    content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    extensions: [
        TiptapStarterKit,
        TiptapBold,
        TiptapItalic,
        TiptapLink,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
    ],
    onUpdate: ({ editor }) => {
        state.content = editor.getHTML();
    },
});

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

    Array.from(files.value).forEach(file => {
        saveFile(`releases/${auth.currentUser.uid}/${addDocumentResponse.id}`, file)
    })
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
            <tiptap-editor />


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