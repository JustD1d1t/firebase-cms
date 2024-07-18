<script setup>
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const { queryDocsByCollection } = useFirebase()
const menuStore = useMenuStore();
const { addMenus } = menuStore;

const isLoading = ref(false);

const menus = computed(() => menuStore.getMenus);

onMounted(async () => {
    isLoading.value = true;
    const response = await queryDocsByCollection(['users', auth.currentUser.uid, 'menus']);
    addMenus(response);
    isLoading.value = false;
})
</script>
<template>
    <UiLoadingspinner v-if="isLoading" />
    <UContainer class="flex flex-col items-start  w-full" v-else>
        <UButton color="green" variant="solid" class="mb-6" to="/menu/new">Dodaj nową</UButton>
        <div v-if="menus.length" class="flex flex-col w-full">
            <MenuItem v-for="menu in menus" :key="menu.id" :menu="menu" />
        </div>
        <h2 v-else>Nie masz jeszcze menu</h2>
    </UContainer>
</template>