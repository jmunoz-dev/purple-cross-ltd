<template>
  <div class="flex h-dvh bg-light text-text">
    <!-- Sidebar -->
    <aside class="w-64 bg-primary text-white flex flex-col">
      <div class="px-6 py-4 text-xl font-bold border-b border-secondary">Purple Cross</div>
      <nav class="flex-1 p-4 space-y-2">
        <RouterLink to="/" class="block px-4 py-2 rounded hover:bg-secondary transition">
          Dashboard
        </RouterLink>
        <RouterLink to="/employees" class="block px-4 py-2 rounded hover:bg-secondary transition">
          Employees
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
      <header
        class="h-16 px-6 flex items-center justify-between bg-white border-b border-neutral shadow-sm"
      >
        <h1 class="text-lg">Employee Management</h1>
        <div class="flex items-center gap-2">
          <span class="text-sm">Welcome, John Doe</span>
          <div
            class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold"
          >
            JD
          </div>
        </div>
      </header>

      <!-- Content Slot -->
      <main class="p-6 overflow-y-auto flex-1 bg-light">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup></script>
