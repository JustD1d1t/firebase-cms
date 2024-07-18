import { backendLink } from "~/config";
import { getAuth } from 'firebase/auth';
const auth = getAuth();
export const useGallery = () => {
    async function getGalleries() {
        const response = await fetch(`${backendLink}/gallery/get?userId=${auth.currentUser.uid}`);
        const data = await response.json();
        return data;
    }

    async function getGalleryImages(galleryId) {
      const response = await fetch(`${backendLink}/gallery/getImages?userId=${auth.currentUser.uid}&galleryId=${galleryId}`);
      const data = await response.json();
      return data;
    }

    async function queryGallery(galleryId) {
        const response = await fetch(`${backendLink}/gallery/query?userId=${auth.currentUser.uid}&galleryId=${galleryId}`);
        const data = await response.json();
        return data;
    }

    async function updateGallery(gallery, id) {
      const response = await fetch(`${backendLink}/gallery/update/${id}?userId=${auth.currentUser.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gallery),
      });
      const data = await response.json();
      return data;
    }

    async function addGallery(gallery) {
      const response = await fetch(`${backendLink}/gallery/new?userId=${auth.currentUser.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gallery),
      });
      const data = await response.json();
      return data;
    }

    async function removeFiles(id) {
      const response = await fetch(`${backendLink}/gallery/remove-files/?userId=${auth.currentUser.uid}&galleryId=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    }

    async function removeFile(id, name) {
      const response = await fetch(`${backendLink}/gallery/remove-file/?userId=${auth.currentUser.uid}&galleryId=${id}&name=${name}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data
    }

    async function addImage(image, id) {
      // Create a FormData object
      const formData = new FormData();
      formData.append('image', image);
    
      // Send the request without setting the Content-Type header
      const response = await fetch(`${backendLink}/gallery/add-image?userId=${auth.currentUser.uid}&galleryId=${id}`, {
        method: "POST",
        body: formData,
      });
    
      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Failed to upload gallery image');
      }
    
      // Parse and return the response data
      const data = await response.json();
      return data;
    }

    async function addImages(images, id) {
      // Create a FormData object
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });
    
      // Send the request without setting the Content-Type header
      const response = await fetch(`${backendLink}/gallery/add-images?userId=${auth.currentUser.uid}&galleryId=${id}`, {
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
  
    return {
        addGallery,
        addImage,
        addImages,
        getGalleries,
        getGalleryImages,
        queryGallery,
        removeFile,
        removeFiles,
        updateGallery
    };
  };
  