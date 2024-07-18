<script setup>
const { logoutUser } = useFirebaseAuth();
const editor = useEditor({
    content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    extensions: [TiptapStarterKit],
});
const links = [
    {
        label: 'Publikacje',
        icon: 'i-heroicons-newspaper',
        to: '/releases'
    },
    {
        label: 'Galerie',
        icon: 'i-heroicons-newspaper',
        to: '/gallery'
    },
    {
        label: 'Menu',
        icon: 'i-heroicons-newspaper',
        to: '/menu'
    },
    {
        label: 'logout',
        icon: 'i-heroicons-user-group',
        click: () => {
            logoutUser();
        }
    },
    // {
    //     label: 'Settings',
    //     icon: 'i-heroicons-cog-8-tooth',
    //     children: [{
    //         label: 'General'
    //     }, {
    //         label: 'Members'
    //     }, {
    //         label: 'Notifications'
    //     }]
    // }
]

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
        <div class="mt-10 w-full overflow-auto">
            <slot />
        </div>

    </UDashboardLayout>
</template>