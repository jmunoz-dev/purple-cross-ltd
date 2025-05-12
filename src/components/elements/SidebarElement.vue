<script setup>
  import IconBlock from '../blocks/IconBlock.vue'
</script>

<template>
  <aside class="w-64 bg-primary text-white flex flex-col">
    <div class="h-16 px-6 py-4 text-xl font-bold border-b border-secondary">Purple Cross</div>
    <nav class="flex-1 p-4 p-y-2">
      <RouterLink to="/" class="block px-4 py-2 rounded hover:bg-secondary transition">
        <div class="flex">
          <IconBlock name="material-symbols:dashboard-rounded" />
          Dashboard
        </div>
      </RouterLink>
      <RouterLink to="/employees" class="block px-4 py-2 rounded hover:bg-secondary transition"> Employees </RouterLink>
    </nav>
  </aside>
</template>
