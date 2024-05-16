<template>
   <div routerli class="bg-white rounded-lg flex flex-col h-full justify-between space-y-4">
      <div>
         <figure class="">
            <img @click="toDetail(product.id)" :src="product.image_url" class="w-full h-full object-contain" />
         </figure>
         <p @click="toDetail(product.id)" class="pl-1 text-base font-semibold text-gray-500">{{ product.title }}</p>
      </div>
      <p class="flex justify-between pl-1 font-sans text-sm font-medium text-gray-600">
         Rp {{ product.price }}
         <span @click="addToCart()" class="p-2 text-white bg-blue-400 rounded-tl-lg rounded-br-lg"><svg
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"
               class="w-4 h-4">
               <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
         </span>
      </p>
   </div>
</template>

<script>
import { makeRequest } from "@/helpers/api";

export default {
   name: "Card",
   components: {},
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
      async addToCart() {
         try {
            const params = {
               product_id: this.product.id,
               qty: 1
            };
            let response = await makeRequest({
               url: `cart`,
               method: 'POST',
               data: params
            })
            if (response.code == '200') {
               this.$toast.success('Produk berhasil ditambahkan ke keranjang');
            }            
         } catch (error) {
            this.$toast.error('Error = '+ error);
         }
      },
   }
};
</script>
