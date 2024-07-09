<script setup lang="ts">
const { logoutUser } = useFirebaseAuth();
const editor = useEditor({
    content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    extensions: [TiptapStarterKit],
});
const links = [{
    label: 'Home',
    icon: 'i-heroicons-home'
}, {
    label: 'Inbox',
    icon: 'i-heroicons-inbox',
    badge: '4'
}, {
    label: 'Users',
    icon: 'i-heroicons-user-group'
}, {
    label: 'logout',
    icon: 'i-heroicons-user-group',
    click: () => {
        logoutUser();
    }
}, {
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [{
        label: 'General'
    }, {
        label: 'Members'
    }, {
        label: 'Notifications'
    }]
}]

onBeforeUnmount(() => {
    unref(editor).destroy();
});
</script>
<template>
    <UDashboardLayout>
        <UDashboardPanel :width="250">
            <UDashboardNavbar>
                <template #left>
                    <h2>logo</h2>
                </template>
            </UDashboardNavbar>

            <UDashboardSidebar>
                <UDashboardSidebarLinks :links="links" />
            </UDashboardSidebar>
        </UDashboardPanel>

        <slot />
        <div>
            <div v-if="editor">
                <button @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }">
                    bold
                </button>
                <button @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }">
                    italic
                </button>
                <button @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }">
                    strike
                </button>
                <button @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }">
                    code
                </button>
                <button @click="editor.chain().focus().unsetAllMarks().run()">
                    clear marks
                </button>
                <button @click="editor.chain().focus().clearNodes().run()">
                    clear nodes
                </button>
                <button @click="editor.chain().focus().setParagraph().run()"
                    :class="{ 'is-active': editor.isActive('paragraph') }">
                    paragraph
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    h1
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    h2
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                    h3
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                    h4
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                    h5
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                    h6
                </button>
                <button @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }">
                    bullet list
                </button>
                <button @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }">
                    ordered list
                </button>
                <button @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'is-active': editor.isActive('codeBlock') }">
                    code block
                </button>
                <button @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'is-active': editor.isActive('blockquote') }">
                    blockquote
                </button>
                <button @click="editor.chain().focus().setHorizontalRule().run()">
                    horizontal rule
                </button>
                <button @click="editor.chain().focus().setHardBreak().run()">
                    hard break
                </button>
                <button @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()">
                    undo
                </button>
                <button @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()">
                    redo
                </button>
            </div>
            <TiptapEditorContent :editor="editor" />
        </div>
    </UDashboardLayout>
</template>