import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs, 
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where,
  } from "firebase/firestore/lite";
  import {
    collection as colletionFs,
    getFirestore as getFs,
    doc as docFirestore,
    onSnapshot,
  } from "firebase/firestore";
  
  import {
    getStorage,
    deleteObject,
    ref as storRef,
    uploadBytes,
    uploadString,
    getDownloadURL,
    listAll,
    getMetadata,   
  } from "firebase/storage";
  
  const savePhotoStringToStorageWithId = async (
    collectionName,
    docId,
    imageUrl
  ) => {
    try {
      const storage = getStorage();
      const storageRef = storRef(storage, `${collectionName}/${docId}.jpeg`);
      await uploadString(storageRef, imageUrl, "data_url");
    } catch (error) {
      console.error("Error saving photo and document:", error);
      throw error;
    }
  };

  const saveFile = async (collectionName, file, metadata = {}) => {
    try {
      const storage = getStorage();
      const storageRef = storRef(storage, `${collectionName}/${file.name}`);
      const res = await uploadBytes(storageRef, file, { customMetadata: metadata });
      return res;
    } catch (error) {
      console.error("Error saving photo and document:", error);
      throw error;
    }
  }

  const getFiles = async(collectionName) => {
    const storage = getStorage();
    const listRef = storRef(storage, collectionName);
    const res = await listAll(listRef);
    return res.items;
  }

  const getFilesWithUrl = async(collectionName) => {
    const storage = getStorage();
    const listRef = storRef(storage, collectionName);
    const res = await listAll(listRef);
    
    // Map items to an array of promises
    const filePromises = res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      const metadata = await getMetadata(itemRef);
      return { url, item: itemRef, metadata };
    });
    
    // Wait for all promises to resolve
    const files = await Promise.all(filePromises);
    
    return files;
  }
  
  const savePhotoToStorageWithId = async (
    collectionName,
    docId,
    document,
    photoBase64
  ) => {
    try {
      // Prześlij zdjęcie do Firebase Storage
      const storage = getStorage();
      const storageRef = storRef(storage, `${collectionName}/${docId}.jpeg`);
      const blob = await fetch(`data:image/jpeg;base64,${photoBase64}`).then(
        (res) => res.blob()
      );
      await uploadBytes(storageRef, blob);
  
      // Dodaj dane do Firestore
      const docRef = doc(getFirestore(), collectionName, docId);
      await setDoc(docRef, {
        ...document,
        photoUrl: `gs://${storageRef.bucket}/${storageRef.fullPath}`, // Przypisz URL zdjęcia z Firebase Storage
      });
  
    } catch (error) {
      throw error;
    }
  };
  
  const getPhotoById = async (collection, photoId) => {
    const storage = getStorage();
    try {
      const url = await getDownloadURL(
        storRef(storage, `${collection}/${photoId}.jpeg`)
      );
      return url;
    } catch (error) {
      return undefined;
    }
  };

  const removeFileFromStorage = async (collection, fileId) => {
    const storage = getStorage();
    try {
      const desertRef = storRef(storage, `${collection}/${fileId}`);
      deleteObject(desertRef);
    } catch (error) {
      console.error("Error removing file from storage:", error);
      throw error;
    }
  }
  
  const removePhotoFromStorage = async (collection, photoId) => {
    const storage = getStorage();
    try {
      const desertRef = storRef(storage, `${collection}/${photoId}.jpeg`);
      deleteObject(desertRef);
    } catch (error) {
      console.error("Error removing photo from storage:", error);
      throw error;
    }
  };
  
  const queryDocsByCollection = async (sequence) => {
    const q = query(collection(getFirestore(), ...sequence));
    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  };
  
  const queryDoc = async (sequence, id) => {
    const q = doc(getFirestore(), ...sequence, id);
    const docSnap = await getDoc(q);
    return {
      ...docSnap.data(),
      id,
    };
  };
  
  const queryDocsInCollection = async (sequence, key, value, statement) => {
    const q = query(
      collection(getFirestore(), ...sequence),
      where(key, statement ? statement : "==", value)
    );
    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  };
  
  const onSnapshotCollection = async (sequence, cb) => {
    const q = query(colletionFs(getFs(), ...sequence));
    onSnapshot(q, (snapshot) => {
      const newDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      cb(newDocs);
    });
  };
  
  const onSnapshotDoc = async (sequence, cb) => {
    const db = getFs();
    const docRef = docFirestore(db, ...sequence);
    unsubscribe = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          cb(data);
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.log("Error listening to document: ", error);
      }
    );
  };
  
  const clearSnapshot = () => {
    unsubscribe();
  };
  
  const deleteDocument = async (sequence) => {
    return await deleteDoc(doc(getFirestore(), ...sequence));
  };
  
  const addDocument = async (sequence, data) => {
    return await addDoc(collection(getFirestore(), ...sequence), data);
  };
  
  const updateDocument = async (sequence, data) => {
    return await updateDoc(doc(getFirestore(), ...sequence), data);
  };
  
  const setDocument = async (sequence, data) => {
    return await setDoc(doc(getFirestore(), ...sequence), data);
  };
  
  export const useFirebase = () => {
    return {
      addDocument,
      clearSnapshot,
      deleteDocument,
      getFiles,
      getFilesWithUrl,
      onSnapshotCollection,
      onSnapshotDoc,
      queryDoc,
      queryDocsByCollection,
      queryDocsInCollection,
      setDocument,
      updateDocument,
      savePhotoToStorageWithId,
      getPhotoById,
      removePhotoFromStorage,
      removeFileFromStorage,
      saveFile,
      savePhotoStringToStorageWithId,
    };
  };
  