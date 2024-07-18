import { backendLink } from "~/config";
import { getAuth } from 'firebase/auth';
const auth = getAuth();
export const useReleases = () => {
    async function addRelease(release) {
      const response = await fetch(`${backendLink}/releases/new?userId=${auth.currentUser.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(release),
      });
      const data = await response.json();
      return data;
    }

    async function deleteRelease(releaseId) {
      const response = await fetch(`${backendLink}/releases/delete/${releaseId}?userId=${auth.currentUser.uid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    }

    async function getReleases() {
      const response = await fetch(`${backendLink}/releases/get-all?userId=${auth.currentUser.uid}`);
      const data = await response.json();
      return data;
    }

    async function getRelease(releaseId) {
      const response = await fetch(`${backendLink}/releases/${releaseId}?userId=${auth.currentUser.uid}`);
      const data = await response.json();
      return data;
    }

    async function updateRelease(release, id) {
      const response = await fetch(`${backendLink}/releases/update/${id}?userId=${auth.currentUser.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(release),
      });
      const data = await response.json();
      return data;
    }
  
    return {
        addRelease,
        deleteRelease,
        getRelease,
        getReleases,
        updateRelease
    };
  };
  