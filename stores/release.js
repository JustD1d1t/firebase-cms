import {defineStore} from 'pinia';

export const useReleaseStore = defineStore({
    id: 'release-store',
    state: () => {
      return {
        releases: [],
      }
    },
    actions: {
      addRelease(release) {
        this.releases.push(release)
      },
      addReleases(releases) {
        this.releases = [...releases]
      },
      updateRelease(release) {
        const index = this.releases.findIndex(r => r.id === release.id)
        this.releases[index] = release
      }
    },
    getters: {
      getReleaseById(id) {
        return this.releases.find(r => r.id === id)
      },
      getReleases() {
        return this.releases
      }
    }
  })