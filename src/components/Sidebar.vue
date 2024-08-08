<template>
    <div class="flex-col hidden w-1/5 px-4 pt-4 space-y-8 bg-white lg:flex">
        <span class="text-2xl font-bold text-center text-blue-400">Gaskuyy</span>
        <div class="px-0 space-y-2 text-sm font-medium cursor-pointer">
            <div @click="dropdown = !dropdown"
                class="flex justify-between px-5 py-3 text-sm bg-white rounded-lg hover:text-white hover:bg-blue-400">
                <span>Home</span>
            </div>
            <div v-if="dropdown" class="pl-4 space-y-0">
                <div @click="category = ''" class="flex px-5 py-3 space-x-1 text-sm text-center rounded-lg">
                    <span>All </span><span>Shoes</span>
                </div>
                <div @click="category = 'Outdoor'" class="px-5 py-3 text-sm rounded-lg">
                    <span>Outdoor</span>
                </div>
                <div @click="category = 'Tennis'" class="px-5 py-3 text-sm rounded-lg">
                    <span>Tennis</span>
                </div>
                <div @click="category = 'Running'" class="px-5 py-3 text-sm rounded-lg">
                    <span>Running</span>
                </div>
            </div>
            <div @click="this.$router.push('/cart')"
                class="px-5 py-3 text-sm bg-white rounded-lg hover:text-white hover:bg-blue-400">
                <span>Keranjang</span>
            </div>
            <div v-if="role == 'admin'" @click="this.$router.push('/admin')"
                class="px-5 py-3 text-sm bg-white rounded-lg hover:text-white hover:bg-blue-400">
                <span>Admin</span>
            </div>
            <div class="px-5 py-3 text-sm bg-white rounded-lg hover:text-white hover:bg-blue-400">
                <span>Profil</span>
            </div>
            <div @click="this.$router.push('/login')"
                class="px-5 py-3 text-sm bg-white rounded-lg hover:text-white hover:bg-blue-400">
                <span>Logout</span>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    emits: ['update:category'],
    props: {
        role: {
            type: String,
            default: null
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            dropdown: false,
            category: '',
            role: ''
        })
    }
}
</script>