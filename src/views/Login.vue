<template>
<div class="flex items-center justify-center h-screen bg-zinc-300 dark:bg-gray-800">
   <div class="w-full max-w-md p-6 mx-4 text-gray-600 bg-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:text-gray-300">
      <h2 class="mb-4 text-2xl font-semibold">Login</h2>
      <form>
         <div class="mb-4">
            <label class="block text-sm font-medium">Username</label>
            <input type="text" value="Jos Soross" class="w-full p-2 mt-1 rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-500" placeholder="Enter your username">
         </div>
         <div class="mb-4">
            <label class="block text-sm font-medium">Password</label>
            <input type="password" value="jospwd123" class="w-full p-2 mt-1 rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-500" placeholder="Enter your password">
         </div>
         <div class="flex gap-4 text-gray-300">
            <button @click="$router.push('/dashboard'), asAdmin()" type="button" class="w-full p-2 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">Login
               as Admin</button>
            <button @click="$router.push('/dashboard')" type="button" class="w-full p-2 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">Login
               as User</button>
         </div>
      </form>
   </div>
</div>
</template>

<script>
export default {
   name: "Login",
   data() {
      return {
			
      }
   },
   methods: {
      asAdmin() {
         localStorage.setItem('role', 'admin')
      }
   },
}
</script>
