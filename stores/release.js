import {defineStore} from 'pinia';

export const useReleaseStore = defineStore({
    id: 'release-store',
    state: () => {
      return {
        releases: [],
      }
    },
    actions: {
      addReleaseToStore(release) {
        this.releases.push(release)
      },
      addReleasesToStore(releases) {
        this.releases = [...releases]
      },
      updateReleaseToStore(release) {
        const index = this.releases.findIndex(r => r.id === release.id)
        this.releases[index] = release
      },
      deleteReleaseFromStore(id) {
        this.releases = this.releases.filter(r => r.id !== id)
      }
    },
    getters: {
      getReleaseByIdFromStore(id) {
        return this.releases.find(r => r.id === id)
      },
      getReleasesFromStore() {
        return this.releases
      }
    }
  })