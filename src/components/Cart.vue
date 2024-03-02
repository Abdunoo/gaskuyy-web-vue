<template>
<div class="relative flex-grow-0 w-screen h-screen bg-gray-100">
   <div class="absolute inset-0 px-4 space-y-4 overflow-y-auto">
      <div class="flex items-center justify-between w-full pt-4">
         <div class="p-2 text-black bg-white rounded-full" @click="this.$router.back()">
            <span class="">
               <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
               </svg>

            </span>
         </div>
         <span class="text-lg font-medium text-black">KeranjangKu</span>
         <span></span>
      </div>
      <div class="flex w-full space-x-4">
         <div class="w-full h-full">
            <p class="font-sans text-base font-medium">{{lstCart.length}} item</p>
            <div v-if="lstCart.length == 0" class="flex flex-col items-center justify-center w-full h-full">
               <span class="text-lg font-semibold text-center">Keranjang Anda Kosong</span>
               <span class="text-lg font-semibold text-center">Ayo Belanja Sekarang</span>
            </div>
            <div v-for="(cart, index) in lstCart" class="flex flex-col w-full h-full">
               <div class="flex w-full pt-4 space-x-2">
                  <div class="flex flex-col items-center justify-between px-4 py-2 text-white bg-blue-400 rounded-xl">
                     <svg @click="plus(cart.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                     </svg>
                     <span>{{ cart.qty }}</span>
                     <svg @click="minus(cart.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                     </svg>
                  </div>
                  <div class="items-center w-full rounded-lg">
                     <div class="flex p-2 space-x-4 bg-white rounded-lg">
                        <img src="./assets/item1.png" class="w-1/3 py-2 bg-gray-300 rounded-xl h-1/3" alt="" />
                        <div class="flex flex-col justify-center">
                           <p class="text-base font-medium text-gray-500">
                              {{ cart.product.title }}
                           </p>
                           <p class="font-sans text-sm font-medium text-gray-600">
                              Rp {{ cart.product.price }}
                           </p>
                        </div>
                     </div>
                  </div>
                  <div @click="remove(cart.id)" class="flex items-center justify-center px-4 py-2 text-white bg-red-400 rounded-xl">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                     </svg>
                  </div>
               </div>
            </div>
         </div>
         <div v-if="lstCart.length != 0" class="flex-col w-full px-4 py-4 mt-10 bg-white rounded-lg md:flex max-sm:hidden">
            <div class="flex flex-col w-full py-4 space-y-2">
               <p class="flex items-center justify-between font-sans">
                  <span class="text-gray-600">Total Harga Barang</span>
                  <span class="text-blue-400">Rp 400000 - Rp 20000</span>
               </p>

               <p class="flex items-center justify-between font-sans">
                  <span class="text-gray-600">Ongkos Kirim</span>
                  <span class="text-blue-400">Rp 10000</span>
               </p>
               <p class="text-gray-600 border-b-2 border-dashed"></p>
               <p class="flex items-center justify-between font-sans">
                  <span class="text-gray-600">Total harga</span>
                  <span class="text-blue-400">Rp 400000</span>
               </p>
            </div>
            <button class="flex items-center justify-center w-full py-3 bg-blue-400 rounded-xl">
               <span class="text-sm font-medium text-white">Checkout</span>
            </button>
         </div>
      </div>
      <div v-if="lstCart.length != 0" class="w-full md:hidden" style="height: 300px"></div>
   </div>
   <div v-if="lstCart.length != 0" class="fixed bottom-0 left-0 right-0 px-4 pb-4 bg-white md:hidden">
      <div class="flex flex-col w-full py-4 space-y-2">
         <p class="flex items-center justify-between font-sans">
            <span class="text-gray-600">Total Harga Barang</span>
            <span class="text-blue-400">Rp 400000 - Rp 20000</span>
         </p>

         <p class="flex items-center justify-between font-sans">
            <span class="text-gray-600">Ongkos Kirim</span>
            <span class="text-blue-400">Rp 10000</span>
         </p>
         <p class="text-gray-600 border-b-2 border-dashed"></p>
         <p class="flex items-center justify-between font-sans">
            <span class="text-gray-600">Total harga</span>
            <span class="text-blue-400">Rp 400000</span>
         </p>
      </div>
      <button class="flex items-center justify-center w-full py-3 bg-blue-400 rounded-xl">
         <span class="text-sm font-medium text-white">Checkout</span>
      </button>
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
   name: "Cart",
   data() {
      return {
         lstCart: [],
         selected: {}
      };
   },
   methods: {
      getCartData() {
         axios
            .get(`${apiUrl}cart`)
            .then((response) => {
               this.lstCart = response.data;
               console.log('Cart data retrieved successfully:', this.lstCart);
            }).catch((error) => console.log(error));
         console.log('test cart page ' + this.lstCart)
      },
      plus(id) {
         this.selected = this.lstCart.find(p => p.id == id)
         this.selected.qty++
         this.updateCartData(this.selected)
      },
      minus(id) {
         this.selected = this.lstCart.find(p => p.id == id)
         this.selected.qty--
         this.updateCartData(this.selected)
      },
      updateCartData(selected) {
         axios.post(`${apiUrl}cart`, selected)
            .then(response => {
               console.log('Cart updated successfully!');
            })
            .catch(error => {
               console.error('Error updating cart:', error);
            });
         setTimeout(() => {
            this.getCartData()
         }, 5000);
      },
      remove(id) {
         let toast = useToast();
         toast.info('success remove product', {
            position: 'top-right',
            duration: 5000
         })
         axios.delete(`${apiUrl}cart/${id}`)
            .then(response => {
               console.log('Cart delete successfully!');
            })
            .catch(error => {
               console.error('Error delete cart:', error);
            });
         setTimeout(() => {
            this.getCartData()
         }, 500);
      }
   },
   mounted() {
      this.getCartData()
   },
};
</script>
