<script setup>
import { onMounted, watch } from 'vue';
import { useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';

const emit = defineEmits(['update:modelValue']);
const props = defineProps(['modelValue']);

const editor = useEditor({
    extensions: [
        StarterKit,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
    ],
    content: props.modelValue,
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML());
    },
});

onMounted(() => {
    if (props.modelValue && editor.value) {
        editor.value.commands.setContent(props.modelValue);
    }
});

watch(() => props.modelValue, (newValue) => {
    if (newValue !== editor.value.getHTML()) {
        editor.value.commands.setContent(newValue);
    }
});
</script>
<template>
    <div v-if="editor" class="container tiptap">
        <div class="control-group">
            <div class="button-group">
                <button type="button" @click="editor.chain().focus().setTextAlign('left').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                    <nuxt-icon name="align-left" />
                </button>
                <button type="button" @click="editor.chain().focus().setTextAlign('center').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                    <nuxt-icon name="align-center" />
                </button>
                <button type="button" @click="editor.chain().focus().setTextAlign('right').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                    <nuxt-icon name="align-right" />
                </button>
                <button type="button" @click="editor.chain().focus().setTextAlign('justify').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                    <nuxt-icon name="align-justify" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }">
                    <nuxt-icon name="bold" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }">
                    <nuxt-icon name="italic" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }">
                    <nuxt-icon name="strike" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }">
                    <nuxt-icon name="code" />
                </button>
                <button type="button" @click="editor.chain().focus().setParagraph().run()"
                    :class="{ 'is-active': editor.isActive('paragraph') }">
                    P
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    H1
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    H2
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                    H3
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                    H4
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                    H5
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                    H6
                </button>
                <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }">
                    <nuxt-icon name="bullet-list" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }">
                    <nuxt-icon name="ordered-list" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'is-active': editor.isActive('blockquote') }">
                    <nuxt-icon name="quotes" />
                </button>
                <button type="button" @click="editor.chain().focus().setHardBreak().run()">
                    Break
                </button>
                <button type="button" @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()">
                    <nuxt-icon name="undo" />
                </button>
                <button type="button" @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()">
                    <nuxt-icon name="redo" />
                </button>
            </div>
        </div>
        <TiptapEditorContent :editor="editor" class="border h-96" />
    </div>
</template>

<style lang="scss" scoped>
.tiptap {
    .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: .25rem;

        button {
            border-radius: .5rem;
            border: none;
            color: var(--black);
            font-family: inherit;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.15;
            margin: none;
            padding: .375rem .625rem;
            transition: all .2s cubic-bezier(.65, .05, .36, 1);
        }
    }
}
</style>