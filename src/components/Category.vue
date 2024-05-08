<template>
<div v-if="category == 'all'" class="w-full space-y-2">
   <div class="flex justify-between">
      <span class="text-base font-medium text-gray-500">Popular Shoes</span>
      <span class="text-xs font-medium text-blue-400">See all</span>
   </div>
   <div class="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <Card v-for="(product, index) in lstProducts" :key="index" :product="product"></Card>
   </div>
</div>

<div class="w-full space-y-2">
   <div v-if="category == 'all'" class="flex justify-between">
      <span class="text-base font-medium text-gray-500">New Arrivals</span>
      <span class="text-xs font-medium text-blue-400">See all</span>
   </div>
   <div v-if="category == 'all'" class="flex md:space-x-4">
      <div class="relative hidden w-full grid-cols-2 gap-2 bg-white rounded-lg md:grid">
         <div class="py-4 pl-4">
            <p class="text-xs">Summer Sale</p>
            <p class="font-sans text-4xl font-bold text-orange-600">15% OFF</p>
         </div>
         <div class="flex flex-col items-start justify-center">
            <span class="font-sans text-xs font-semibold text-gray-500 -rotate-12 text-start"><span class="text-start">NEW!!!</span></span>
            <span class="absolute bottom-0 right-0 -rotate-12"><img src="./assets/item4.png" alt="" class="" /></span>
         </div>
      </div>
      <div class="relative grid w-full grid-cols-2 gap-2 bg-white rounded-lg">
         <div class="py-4 pl-4">
            <p class="text-xs">Summer Sale</p>
            <p class="font-sans text-4xl font-bold text-orange-600">15% OFF</p>
         </div>
         <div class="flex flex-col items-start justify-center">
            <span class="font-sans text-xs font-semibold text-gray-500 -rotate-12 text-start"><span class="text-start">NEW!!!</span></span>
            <span class="absolute bottom-0 right-0 -rotate-12"><img src="./assets/item4.png" alt="" class="" /></span>
         </div>
      </div>
   </div>
   <div class="w-full space-y-2">
      <div class="flex justify-between">
         <span class="text-base font-medium text-gray-500">{{ category }} Shoes</span>
         <span class="text-xs font-medium text-blue-400">See all</span>
      </div>
      <div class="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
         <Card v-for="(product, index) in lstProducts" :key="index" :product="product"></Card>
      </div>
   </div>
</div>
</template>

<script>
import {
   defineComponent
} from "vue";
import Card from "./Card.vue";
import axios from "axios";

export default {
   name: "Category",
   components: {
      Card,
   },
   props: {
      search: {
         type: String,
         required: false,
      },
   },

   data() {
      return {
         dropdown: false,
         showMenu: true,
         lstProducts: [],
         category: "",
      };
   },
   methods: {
      
      performSearch(newSearchValue) {
         if (newSearchValue != null || newSearchValue != undefined) {
            this.getProduct(this.category, newSearchValue)
         } 
      }
   },

   async getProduct(cat, search) {
         let url = `${apiUrl}product?page=1&limit=100&search=${search}`;
         if (cat != "all") {
            url += `&category=${cat}`;
         }
            // axios
            //    .get(url)
            //    .then((response) => (
            //       this.lstProducts = response.data
                  
            //    ))
            //    .catch((error) => console.log(error));
            //    console.log('lst produk = '+ lstProducts)

            const response = axios.get(url);
            this.lstProducts

      },

   mounted() {
      this.category = this.$route.params.cat;
      console.log("mounted " + this.category);
      this.performSearch("")
      setTimeout(() => {
         console.log(this.lstProducts)
      }, 500);
   },
   watch: {
      "$route.params.cat": {
         handler: function (category) {
            this.category = category;
            console.log(this.category);
            this.getProduct(this.category, "");
         },
         deep: true,
         immediate: true,
      },
      search(newSearchValue) {
         if (newSearchValue != null || newSearchValue != '' || newSearchValue != undefined) {
            console.log('Search value changed to:', newSearchValue);

            setTimeout(() => {
               this.performSearch(newSearchValue);
            }, 1000);
         } else {
            this.getProduct(this.category, "");
            console.log('search value null')
         }
      },
   },
};
</script>
