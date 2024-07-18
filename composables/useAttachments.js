import { backendLink } from "~/config";
import { getAuth } from 'firebase/auth';
const auth = getAuth();
export const useAttachments = () => {
    async function addAttachment(attachment, id) {
        // Create a FormData object
        const formData = new FormData();
        formData.append('attachment', attachment);
      
        // Send the request without setting the Content-Type header
        const response = await fetch(`${backendLink}/attachments/add?userId=${auth.currentUser.uid}&releaseId=${id}`, {
          method: "POST",
          body: formData,
        });
      
        // Check if the response is okay
        if (!response.ok) {
          throw new Error('Failed to upload attachment');
        }
      
        // Parse and return the response data
        const data = await response.json();
        return data;
      }

      async function addAttachments(attachments, id) {
        // Create a FormData object
        const formData = new FormData();
        attachments.forEach((attachment) => {
          formData.append('attachments', attachment);
        });
      
        // Send the request without setting the Content-Type header
        const response = await fetch(`${backendLink}/attachments/add-attachments?userId=${auth.currentUser.uid}&releaseId=${id}`, {
          method: "POST",
          body: formData,
        });
      
        // Check if the response is okay
        if (!response.ok) {
          throw new Error('Failed to upload gallery images');
        }
      
        // Parse and return the response data
        const data = await response.json();
        return data;
      }

      async function removeAttachment(releaseId, name) {
        const response = await fetch(`${backendLink}/attachments/remove?userId=${auth.currentUser.uid}&name=${name}&releaseId=${releaseId}`, {
          method: "DELETE",
        });
      
        if (!response.ok) {
          throw new Error('Failed to remove attachment');
        }

        const data = await response.json();
        return data;
      }

      async function getAttachments(collectionName) {
        const response = await fetch(`${backendLink}/attachments/get?userId=${auth.currentUser.uid}&releaseId=${collectionName}`);
      
        if (!response.ok) {
          throw new Error('Failed to get attachments');
        }
      
        const data = await response.json();
        return data;        
      }
  
    return {
        addAttachment,
        addAttachments,
        getAttachments,
        removeAttachment
    };
  };
  