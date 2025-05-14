<script setup>
import ButtonBlock from '@/components/blocks/ButtonBlock.vue'
import CardElement from '@/components/elements/CardElement.vue'
import EmployeeForm from '@/components/forms/EmployeeForm.vue'
import { useEmployeeStore } from '@/stores/employee'

const storeEmployee = useEmployeeStore()
</script>

<template>
  <div class="flex flex-wrap sm:flex-nowrap sm:flex-row gap-8 h-fit w-full">
    <CardElement class="bg-white w-full">
      <div class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">Quick Action: Add User</h2>
        <EmployeeForm />
      </div>
    </CardElement>

    <CardElement class="bg-white w-full">
      <h2 class="text-lg font-semibold mb-4">Quick Action: View Recently Added Employees</h2>
      <div class="flex flex-col gap-6">
        <table class="min-w-full text-sm text-left text-gray-700">
          <thead class="bg-gray-200 text-xs uppercase text-gray-500 border-b">
            <tr>
              <th scope="col" class="px-4 py-2">Name</th>
              <th scope="col" class="px-4 py-2">Date Of Employment</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="employee in storeEmployee.employees
                .slice()
                .sort((a, b) => b.id - a.id)
                .slice(0, 5)"
              :key="employee.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="px-4 py-2">{{ employee.fullName }}</td>
              <td class="px-4 py-2">{{ employee.dateOfEmployment }}</td>
            </tr>
          </tbody>
        </table>

        <ButtonBlock class="w-fit self-end" link="employees" type="secondary">See all</ButtonBlock>
      </div>
    </CardElement>
  </div>
</template>
