<script setup>
import CardElement from '@/components/elements/CardElement.vue'
import EmployeeForm from '@/components/forms/EmployeeForm.vue'
</script>

<template>
  <div class="flex flex-row gap-8 h-fit w-full">
    <CardElement class="bg-white w-1/2">
      <div class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">Quick Action: Add User</h2>
        <EmployeeForm />
      </div>
    </CardElement>

    <CardElement class="bg-white w-1/2">
      <h2 class="text-lg font-semibold mb-4">Quick Action: View Recently Added Employees</h2>
    </CardElement>
  </div>
</template>
