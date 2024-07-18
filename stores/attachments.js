import {defineStore} from 'pinia';

export const useAttachmentsStore = defineStore({
    id: 'attachments-store',
    state: () => {
      return {
        attachments: [],
      }
    },
    actions: {
      addAttachmentsToStore(attachments) {
        this.attachments = [...this.attachments, ...attachments]
      },
      setAttachmentsToStore(attachments) {
        this.attachments = attachments
      },
      removeAttachmentFromStore(attachment) {
        this.attachments = this.attachments.filter((att) => att !== attachment)
      },
      removeAttachmentsFromStore() {
        this.attachments = []
      }
    },
    getters: {
      getAttachmentsFromStore() {
        return this.attachments
      }
    }
})