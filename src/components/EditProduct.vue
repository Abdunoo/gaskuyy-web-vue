<template>
<div class="relative flex-grow-0 w-full h-full p-4 bg-white rounded-lg">
   <div class="absolute inset-0 p-4 overflow-auto">
      <span class="" @click="$emit('closeEdit')">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
         </svg>
      </span>
      <div>
         <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">Image:</label>
            <img :src="product.image_url" alt="" class="w-14 h-14">
            <input v-on:change="handleImageUpload" class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
         </div>
         <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">Name:</label>
            <input v-model="product.title" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Name">
         </div>
         <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">Price:</label>
            <input v-model="product.price" type="number" class="w-full p-2 border border-gray-300 rounded" placeholder="price">
         </div>
         <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">Discount:</label>
            <input v-model="product.discount" type="number" class="w-full p-2 border border-gray-300 rounded" placeholder="discount">
         </div>
         <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">Stock:</label>
            <input v-model="product.qty" type="number" class="w-full p-2 border border-gray-300 rounded" placeholder="stock">
         </div>
         <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-600">Category:</label>
            <select id="countries" v-model="product.category" :value="product.category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="Tennis">Tennis</option>
                  <option value="Running">Running</option>
                  <option value="Outdoor">Outdoor</option>
               </select>
         </div>
         <button @click="saveProduk() " class="flex items-center justify-center p-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700">
            <span>Save</span>
         </button>
         <div style="height: 250px; width: max-content;"></div>

      </div>
   </div>
</div>
</template>

<script>
import axios from "axios";
import {
   useToast
} from 'vue-toast-notification';
import { makeRequest } from '@/helpers/api';

export default {
   nema: "EditProduct",
   props: {
      id: {
         type: Number,
         required: true,
      },
   },

   data() {
      return {
         product: {}
      }
   },
   methods: {
      async getProductById(id) {
         let response = await makeRequest({
            url: `product/${id}`,
            method: 'GET'
         })
         this.product = response.data;
      },
      async saveProduk() {
         let url = 'product';
         if (this.product.id) {
            url += `/${this.product.id}`
         }
         let response = await makeRequest({
            url: `${url}`,
            data: this.product,
            method: 'POST',
            headers: {
               'Content-Type': 'multipart/form-data' 
            }
         })
         setTimeout(() => {
            this.$emit('closeEdit')
         }, 500);
         let toast = useToast();
         toast.info('success update product', {
            position: 'top-right',
            duration: 5000
         })
      },
      handleImageUpload(event) {
         const selectedFile = event.target.files[0];

         // Validation (optional)
         if (!selectedFile || !selectedFile.type.match('image/*')) {
            alert('Please select a valid image file.');
            return;
         }

         this.product.image_url = selectedFile;

         // // File processing or upload logic
         // const reader = new FileReader();
         // reader.onload = (e) => {
         //    this.product.image_url = e.target.result; // Update data property
         // };
         // reader.readAsDataURL(selectedFile);
      },
   },
   mounted() {
      console.log('mounted edit')
      if (this.id != 0) {
         this.getProductById(this.id)
      } else {
         this.product = {}
      }
   }
}
</script>
