<script setup lang="ts">
import { useUserStore } from '../../stores/user'
const store = useUserStore()
function logout() {
  store.clearToken()
  window.location.reload()
}
</script>
<template>
  <div class="container mx-auto px-4 py-8 bg-gray-300 h-[100vh]">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-semibold mb-6">Dashboard</h1>
      <button type="button" v-on:click="logout">Logout</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <!-- Card 1: Users -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Users</h2>
        <p class="text-gray-600">Total: 100</p>
        <p class="text-gray-600">Active: 80</p>
        <p class="text-gray-600">Inactive: 20</p>
      </div>

      <!-- Card 2: Products -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Products</h2>
        <p class="text-gray-600">Total: 50</p>
        <p class="text-gray-600">In stock: 40</p>
        <p class="text-gray-600">Out of stock: 10</p>
      </div>

      <!-- Card 3: Sales -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Sales</h2>
        <p class="text-gray-600">Total: $5000</p>
        <p class="text-gray-600">Today: $1000</p>
        <p class="text-gray-600">Yesterday: $800</p>
      </div>
    </div>
  </div>
</template>
