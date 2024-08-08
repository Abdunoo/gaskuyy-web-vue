<template>
   <div class="relative flex flex-grow-0 w-screen h-screen">
      <Sidebar v-if="showMenu" :role="role" @update:category="category" />
      <div class="relative flex-grow-0 w-screen h-screen">
         <div class="absolute inset-0 w-auto h-full px-4 overflow-auto bg-gray-100">
            <header class="flex flex-col py-4 space-y-4">
               <div class="flex items-center justify-between w-full">
                  <span @click="showMenu = !showMenu" class="hidden text-black lg:flex">
                     <span class="material-symbols-outlined">menu</span>
                  </span>
                  <span class="text-black lg:hidden">
                     <span class="material-symbols-outlined">menu</span>
                  </span>
                  <span class="text-3xl font-bold text-black">Explore</span>
                  <span @click="this.$router.push('/cart')" class="p-2 bg-white rounded-full flex items-center">
                     <span class="material-symbols-outlined">shopping_bag</span>
                  </span>
               </div>
               <div class="flex items-center justify-between w-full mb-4 space-x-4">
                  <div class="flex w-full space-x-1 text-base bg-white shadow rounded-xl">
                     <span class="py-3 pl-4 flex items-center text-gray-400">
                        <span class="material-symbols-outlined">search</span>
                     </span>
                     <input v-model="searchData" @search="onInputDebounced" type="text" name="" id=""
                        placeholder="looking for shoes" ondragenter=""
                        class="flex-1 block w-full p-2 py-3 pr-4 rounded-l-md focus:outline-none rounded-xl" />
                  </div>
                  <div class="p-2 flex items-center text-white bg-blue-400 rounded-full">
                     <span class="material-symbols-outlined">shopping_bag</span>
                  </div>
               </div>
            </header>
            <main class="space-y-4 overflow-hidden">
               <div class="relative flex flex-col flex-grow w-full h-20 space-y-6 lg:hidden">
                  <div
                     class="absolute inset-0 flex items-center justify-start space-x-4 overflow-visible overflow-x-auto md">
                     <div @click="category = ''"
                        class="flex px-5 py-3 space-x-1 text-sm text-center bg-white rounded-lg">
                        <span>All </span><span>Shoes</span>
                     </div>
                     <div @click="category = 'Outdoor'" class="px-5 py-3 text-sm bg-white rounded-lg">
                        <span>Outdoor</span>
                     </div>
                     <div @click="category = 'Tennis'" class="px-5 py-3 text-sm bg-white rounded-lg">
                        <span>Tennis</span>
                     </div>
                     <div @click="category = 'Running'" class="px-5 py-3 text-sm bg-white rounded-lg">
                        <span>Running</span>
                     </div>
                  </div>
               </div>
               <div class="w-full space-y-2">
                  <div v-if="!category && !searchData" class="flex justify-between">
                     <span class="text-base font-medium text-gray-500">New Arrivals</span>
                     <span class="text-xs font-medium text-blue-400">See all</span>
                  </div>
                  <div v-if="!category && !searchData" class="flex md:space-x-4">
                     <div class="relative hidden w-full grid-cols-2 gap-2 bg-white rounded-lg md:grid">
                        <div class="py-4 pl-4">
                           <p class="text-xs">Summer Sale</p>
                           <p class="font-sans text-4xl font-bold text-orange-600">15% OFF</p>
                        </div>
                        <div class="flex flex-col items-start justify-center">
                           <span class="font-sans text-xs font-semibold text-gray-500 -rotate-12 text-start"><span
                                 class="text-start">NEW!!!</span></span>
                           <span class="absolute bottom-0 right-0 -rotate-12"><img src="../components/assets/item4.png"
                                 alt="" class="" /></span>
                        </div>
                     </div>
                     <div class="relative grid w-full grid-cols-2 gap-2 bg-white rounded-lg">
                        <div class="py-4 pl-4">
                           <p class="text-xs">Summer Sale</p>
                           <p class="font-sans text-4xl font-bold text-orange-600">15% OFF</p>
                        </div>
                        <div class="flex flex-col items-start justify-center">
                           <span class="font-sans text-xs font-semibold text-gray-500 -rotate-12 text-start"><span
                                 class="text-start">NEW!!!</span></span>
                           <span class="absolute bottom-0 right-0 -rotate-12"><img src="../components/assets/item3.png"
                                 alt="" class="" /></span>
                        </div>
                     </div>
                  </div>
                  <div class="w-full space-y-2">
                     <div class="flex justify-between">
                        <span class="text-base font-medium text-gray-500">{{ category }} Shoes</span>
                        <span class="text-xs font-medium text-blue-400">See all</span>
                     </div>
                     <div class="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                        <Card v-for="(product, index) in lstProducts" :key="index" :product="product"></Card>
                     </div>
                     <div v-if="isLoading" class="loading-indicator">Loading...</div>
                     <div ref="sentinel" class="sentinel"></div>
                  </div>
               </div>
               <div
                  class="fixed bottom-0 left-0 right-0 flex justify-around w-full py-4 space-x-12 bg-white shadow md:max-w-full lg:hidden">
                  <div class="flex justify-around w-1/2">
                     <svg @click="this.$router.push('/dashboard')" class="w-6 h-6 text-blue-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                           d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9" />
                     </svg>
                     <svg v-if="role == 'admin'" @click="this.$router.push('/admin')" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
                        class="w-6 h-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                           d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                     </svg>
                  </div>
                  <div class="flex justify-around w-1/2">
                     <svg @click="this.$router.push('/login')" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" data-slot="icon"
                        class="w-6 h-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                           d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                     </svg>
                     <svg class="w-6 h-6 text-gray-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                           d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                     </svg>
                  </div>
               </div>
               <div class="relative flex items-center justify-center flex-grow-0 lg:hidden">
                  <div class="fixed left-auto right-auto rounded-full center bottom-6 ">
                     <div @click="this.$router.push('/cart')" class="p-4 bg-blue-400 rounded-full ">
                        <svg class="w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                           fill="none" viewBox="0 0 18 20">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                              d="M12 9V4a3 3 0 0 0-6 0v5m9.92 10H2.08a1 1 0 0 1-1-1.077L2 6h14l.917 11.923A1 1 0 0 1 15.92 19Z" />
                        </svg>
                     </div>
                  </div>
               </div>
            </main>
            <footer>
               <div class="pb-4">
                  <div class="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8">
                     <div class="md:flex md:justify-between">
                        <div class="mb-6 md:mb-0">
                           <a href="https://sandbox2.panemu.com/abdundev/" class="flex items-center">
                              <img class="h-8 me-3" alt="FlowBite Logo"
                                 src="https://sandbox2.panemu.com/abdundev/assets/brand.png" />
                              <span
                                 class="self-center text-2xl font-semibold text-teal-400 whitespace-nowrap">Gaskuyy</span>
                           </a>
                        </div>
                        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                           <div>
                              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                 Resources
                              </h2>
                              <ul class="font-medium text-gray-500 dark:text-gray-400">
                                 <li class="mb-4">
                                    <a href="https://github.com/Abdunoo" class="hover:underline">Github</a>
                                 </li>
                                 <li>
                                    <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                                 </li>
                              </ul>
                           </div>
                           <div>
                              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                 Follow us
                              </h2>
                              <ul class="font-medium text-gray-500 dark:text-gray-400">
                                 <li class="mb-4">
                                    <a href="https://github.com/Abdunoo" class="hover:underline">Github</a>
                                 </li>
                                 <li>
                                    <a href="https://www.instagram.com/abdun_000/" class="hover:underline">Instagram</a>
                                 </li>
                              </ul>
                           </div>
                           <div>
                              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                 Legal
                              </h2>
                              <ul class="font-medium text-gray-500 dark:text-gray-400">
                                 <li class="mb-4">
                                    <a href="#" class="hover:underline">Privacy Policy</a>
                                 </li>
                                 <li>
                                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                     <div class="sm:flex sm:items-center sm:justify-between">
                        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023
                           <a href="https://flowbite.com/" class="hover:underline">Abdundev</a>.
                           All Rights Reserved.
                        </span>
                        <div class="flex mt-4 sm:justify-center sm:mt-0">
                           <a href="https://www.facebook.com/nafi.speed.39" class="text-gray-500 hover:text-gray-900">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 8 19">
                                 <path fill-rule="evenodd"
                                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                    clip-rule="evenodd" />
                              </svg>
                              <span class="sr-only">Facebook page</span>
                           </a>
                           <a href="#" class="text-gray-500 hover:text-gray-900 ms-5">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 21 16">
                                 <path
                                    d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                              </svg>
                              <span class="sr-only">Discord community</span>
                           </a>
                           <a href="#" class="text-gray-500 hover:text-gray-900 ms-5">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 17">
                                 <path fill-rule="evenodd"
                                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                                    clip-rule="evenodd" />
                              </svg>
                              <span class="sr-only">Twitter page</span>
                           </a>
                           <a href="https://github.com/Abdunoo" class="text-gray-500 hover:text-gray-900 ms-5">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                 <path fill-rule="evenodd"
                                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                    clip-rule="evenodd" />
                              </svg>
                              <span class="sr-only">GitHub account</span>
                           </a>
                           <a href="#" class="text-gray-500 hover:text-gray-900 ms-5">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                 <path fill-rule="evenodd"
                                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                                    clip-rule="evenodd" />
                              </svg>
                              <span class="sr-only">Dribbble account</span>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </footer>
         </div>
      </div>
   </div>
</template>
<script>
import { ref, reactive, toRefs, onMounted, onUnmounted, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import Card from '@/components/Card.vue';
import Sidebar from '@/components/Sidebar.vue';
import debounce from 'lodash.debounce';
import { makeRequest } from '@/helpers/api';

export default {
   name: "Dashboard",
   components: {
      Card,
      Sidebar
   },
   setup(props, { emit }) {
      const state = reactive({
         dropdown: true,
         showMenu: true,
         role: null,
         searchData: '',
         category: '',
         lstProducts: [],
      });

      const sentinel = ref(null);
      const page = ref(1);
      const isLoading = ref(false);

      const performSearch = async (newSearchValue) => {
         if (newSearchValue) {
            state.searchData = newSearchValue;
            page.value = 1; // Reset page number
            await getProduct(state.searchData, state.category);
         }
      };

      const getProduct = async (search = '', cat = '', append = false) => {
         if (isLoading.value) return;
         isLoading.value = true;
         let url = `product?page=${page.value}&limit=20`; // Adjust limit as needed
         if (search) url += `&search=${search}`;
         if (cat) url += `&category=${cat}`;

         try {
            const response = await makeRequest({ url, method: 'GET' });
            if (append) {
               state.lstProducts.push(...response.data); // Append new products
            } else {
               state.lstProducts = response.data; // Replace products
            }
            page.value++;
         } catch (error) {
            console.error('Failed to fetch products:', error);
         } finally {
            isLoading.value = false;
         }
      };

      const onInputDebounced = debounce((newSearchValue) => {
         performSearch(newSearchValue);
      }, 500);

      const { stop } = useIntersectionObserver(
         sentinel,
         ([{ isIntersecting }]) => {
            if (isIntersecting && !isLoading.value) {
               getProduct(state.searchData, state.category, true); // Append new products
            }
         },
         { threshold: 1.0 }
      );

      onMounted(async () => {
         state.role = localStorage.getItem('role');
         await getProduct();
         performSearch('');
      });

      onUnmounted(() => {
         stop(); // Clean up observer when component is unmounted
      });

      watch(() => state.category, (newCategory) => {
         page.value = 1; // Reset page number
         getProduct(state.searchData, newCategory);
      });

      watch(() => state.searchData, (newSearchData) => {
         onInputDebounced(newSearchData);
      });

      return {
         ...toRefs(state),
         performSearch,
         getProduct,
         onInputDebounced,
         sentinel,
         isLoading,
      };
   }
};
</script>
<style>
/* Hide scrollbar for Webkit (Safari, Chrome) */
::-webkit-scrollbar {
   display: none;
}

/* Hide scrollbar for IE and Edge */
::-webkit-scrollbar-thumb {
   display: none;
}
</style>
