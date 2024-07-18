<template>
    <div class="flex w-full">
      <!-- Left side: Adding items -->
      <div class="w-1/6 p-4">
        <h2 class="text-xl font-bold mb-4">Menu Settings</h2>
        <div class="flex flex-col mb-4">
          <input v-model="menuName" placeholder="Menu Name" class="border p-1 w-full mb-6" />
          <input v-model="newItemLabel" placeholder="Label" class="border p-1 w-full mb-2" />
          <input v-model="newItemUrl" placeholder="URL" class="border p-1 w-full mb-2" />
          <button @click="addItem" class="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
          <button @click="handleSubmit" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Submit</button>
        </div>
      </div>
  
      <!-- Right side: Menu tree -->
      <div class="w-5/6 p-4">
        <h2 class="text-xl font-bold mb-4">Menu Tree</h2>
        <draggable v-model="menu" group="menu-items" item-key="id">
          <template #item="{ element }">
            <div class="mb-2">
              <p @click="editItem(element)" class="cursor-pointer px-2 py-1 rounded mr-2">{{ element.label }}</p>
              <label for="url" v-if="editingItem === element">
                URL:
                <input v-model="element.url" id="url" class="border p-1 mb-2 w-full" />
              </label>
              <draggable v-if="element.children" v-model="element.children" group="menu-items" item-key="id">
                <template #item="{ element: child }">
                  <div class="ml-4 mb-2">
                    <p @click="editItem(child)" class="cursor-pointer px-2 py-1 rounded mr-2">{{ child.label }}</p>
                    <label for="url" v-if="editingItem === child">
                      URL:
                      <input v-model="child.url" id="url" class="border p-1 mb-2 w-full" />
                    </label>
                  </div>
                </template>
              </draggable>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth } from 'firebase/auth';
  import draggable from 'vuedraggable';
  
  const auth = getAuth();
  const { addDocument } = useFirebase();
  
  const menu = ref([]);
  
  let menuName = ref('My Menu');
  let newItemLabel = ref('');
  let newItemUrl = ref('');
  let editingItem = ref(null);
  
  const addItem = () => {
    if (newItemLabel.value.trim() === '') return;
  
    const newItem = {
      label: newItemLabel.value,
      url: newItemUrl.value,
      children: []
    };
  
    menu.value.unshift(newItem);
  
    // Clear inputs
    newItemLabel.value = '';
    newItemUrl.value = '';
  };
  
  const editItem = (item) => {
    editingItem.value = item === editingItem.value ? null : item;
  };
  
  const handleSubmit = async () => {
    // Example: Submit menu data to Firebase
    const data = {
      name: menuName.value,
      items: menu.value
    };
    
    try {
      await addDocument(['users', auth.currentUser.uid, 'menus'], data);
    } catch (error) {
      console.error('Error submitting menu:', error);
    }
  };
  </script>