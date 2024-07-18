import {defineStore} from 'pinia';

export const useGalleryStore = defineStore({
    id: 'gallery-store',
    state: () => {
      return {
        galleries: [],
        files: [],
      }
    },
    actions: {
      addGalleryToStore(gallery) {
        this.galleries.push(gallery)
      },
      addGalleriesToStore(galleries) {
        this.galleries = galleries
      },
      setFilesToStore(files) {
        this.files = files
      },
      removeFileFromStore(file) {
        this.files = this.files.filter(f => f !== file)
      },
      removeFilesFromStore() {
        this.files = []
      }
    },
    getters: {
      getGalleryByIdFromStore(id) {
        return this.galleries.find(gallery => gallery.id === id)
      },
      getGalleriesFromStore() {
        return this.galleries
      },
      getFilesFromStore() {
        return this.files
      }
    }
  }
)