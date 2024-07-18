<script setup>
import { getAuth } from 'firebase/auth';
const auth = getAuth();
import { useReleaseStore } from '~/stores/release'

const releaseStore = useReleaseStore();
const { addReleasesToStore, deleteReleaseFromStore } = releaseStore;
const { deleteRelease, getReleases } = useReleases();

const releases = computed(() => releaseStore.getReleasesFromStore);


function clearCodeFromHtmlTags(code) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = code;
    return tempElement.textContent || tempElement.innerText || '';
}
const remove = async (id) => {
    try {
        await deleteRelease(id);
        deleteReleaseFromStore(id);
    } catch (error) {
        console.log(error)
    }
}

const { data, status } = useAsyncData(getReleases);

watch(data, (newData) => {
    addReleasesToStore(newData.data)
})

</script>

<template>
    <UiLoadingspinner v-if="status === 'pending'" />
    <UContainer class="flex flex-col items-start  w-full" v-else>
        <UButton color="green" variant="solid" class="mb-6" to="/releases/new">Dodaj nową</UButton>
        <UBlogList v-if="releases.length" orientation="vertical" class="relative group flex flex-col w-full gap-y-6">
            <UBlogPost v-for="release in releases" :key="release.id" :title="release.title"
                :description="clearCodeFromHtmlTags(release.content)">
                <template #default>
                    <UButton color="orange" variant="link" :to="`/releases/${release.id}`">Edytuj</UButton>
                    <UButton color="red" variant="solid" @click="() => remove(release.id)">Usuń</UButton>
                </template>
            </UBlogPost>
        </UBlogList>
        <h2 v-else>Nie masz jeszcze publikacji</h2>
    </UContainer>
</template>