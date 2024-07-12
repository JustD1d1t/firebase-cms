import {defineStore} from 'pinia';

export const useAttachmentsStore = defineStore({
    id: 'attachments-store',
    state: () => {
      return {
        attachments: [],
      }
    },
    actions: {
      addAttachments(attachments) {
        this.attachments = [...this.attachments, ...attachments]
      },
      setAttachments(attachments) {
        this.attachments = attachments
      },
      removeAttachment(attachment) {
        this.attachments = this.attachments.filter((att) => att !== attachment)
      },
      removeAttachments() {
        this.attachments = []
      }
    },
    getters: {
      getAttachments() {
        return this.attachments
      }
    }
})