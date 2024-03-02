<template>
<div routerli class="pl-1 space-y-1 bg-white rounded-lg">
   <img @click="toDetail(product.id)" src="./assets/item1.png" />
   <p @click="toDetail(product.id)" class="text-base font-semibold text-gray-500">{{ product.title }}</p>
   <p class="flex justify-between font-sans text-sm font-medium text-gray-600">
      Rp {{ product.price }}
      <span @click="addToCart()" class="p-2 text-white bg-blue-400 rounded-tl-lg rounded-br-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
         </svg>
      </span>
   </p>
</div>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
import {
   useToast
} from 'vue-toast-notification';
import { apiUrl } from "./api";

export default {
   name: "Card",
   components: {
      useToast
   },
   props: {
      product: {
         type: Object,
         required: true,
      },
   },
   methods: {
      toDetail(id) {
         let url = "/product/" + id;
         this.$router.push({
            path: url,
         });
      },
      addToCart() {
         let toast = useToast();
         toast.info('success add to cart', {
            position: 'top-right',
            duration: 5000
         })
         const params = {
            productId: this.product.id,
            qty: 1
         };
         axios.post(`${apiUrl}cart`, params)
            .then(() => {
               console.log('Cart updated successfully!');

            })
            .catch(error => {
               console.error('Error updating cart:', error);
            });

      },
   }
};
</script>
