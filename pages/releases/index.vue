<script setup>
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const { queryDocsByCollection } = useFirebase()
import { useReleaseStore } from '~/stores/release'

const releaseStore = useReleaseStore();
const { addReleases } = releaseStore;

const releases = computed(() => releaseStore.getReleases);


function clearCodeFromHtmlTags(code) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = code;
    return tempElement.textContent || tempElement.innerText || '';
}

onMounted(async () => {
    const response = await queryDocsByCollection(['users', auth.currentUser.uid, 'releases'])
    addReleases(response)
})

</script>

<template>
    <UiLoadingspinner v-if="!releases.length" />
    <UContainer class="flex flex-col items-start h-screen w-full" v-else>
        <UButton color="green" variant="solid" class="mb-6" to="/releases/new">Dodaj nową</UButton>
        <UBlogList v-if="releases.length" orientation="vertical" class="relative group flex flex-col w-full gap-y-6">
            <UBlogPost v-for="release in releases" :key="release.id" :title="release.title"
                :description="clearCodeFromHtmlTags(release.content)">
                <template #default>
                    <UButton color="orange" variant="link" :to="`/releases/${release.id}`">Edytuj</UButton>
                </template>
            </UBlogPost>
        </UBlogList>
        <h2 v-else>Nie masz jeszcze publikacji</h2>
    </UContainer>
</template>