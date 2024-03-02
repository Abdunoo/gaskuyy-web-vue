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
            <label class="block mb-2 text-sm font-medium text-gray-600">Image Url:</label>
            <img src="./assets/item1.png" class="rounded-full h-14 w-14" alt="">
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
            <input v-model="product.category" type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Category">
         </div>
         <button @click="updateProduct(this.product) " class="flex items-center justify-center p-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700">
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
import { apiUrl } from "./api";
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
      getProductById(id) {
         axios
            .get(`${apiUrl}products/${id}`)
            .then((response) => (this.product = response.data))
            .catch((error) => console.log(error));
         console.log('get data product')
      },
      updateProduct(selected) {
         axios.post(`${apiUrl}products`, selected)
            .then(response => {
               console.log('product updated successfully!');
            })
            .catch(error => {
               console.error('Error updating cart:', error);
            });
         setTimeout(() => {
            this.$emit('closeEdit')
         }, 500);
         let toast = useToast();
         toast.info('success update product', {
            position: 'top-right',
            duration: 5000
         })
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
