<script setup>
import ButtonBlock from '@/components/blocks/ButtonBlock.vue'
import InputControl from '@/components/controls/InputControl.vue'
import CardElement from '@/components/elements/CardElement.vue'
</script>

<template>
  <div class="flex flex-row gap-8 h-fit w-full">
    <CardElement class="bg-white w-1/2">
      <div class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">Quick Action: Add User</h2>
        <div class="flex flex-wrap w-full justify-between gap-4 sm:gap-4">
          <InputControl
            class="w-1/2"
            type="text"
            name="Name"
            placeholder="John Doe"
            label="Name"
            description="Employee full name"
            :validate="[{ type: 'required' }]"
          ></InputControl>

          <InputControl
            class="w-2/5"
            type="text"
            name="Occupation"
            placeholder="Frontend Developer"
            label="Occupation"
            :validate="[{ type: 'required' }]"
          ></InputControl>

          <InputControl
            class="w-2/5"
            type="text"
            name="Department"
            placeholder="Engineering"
            label="Department"
            :validate="[{ type: 'required' }]"
          ></InputControl>

          <InputControl
            class="w-1/2"
            type="text"
            name="Date of employement"
            placeholder="25/05/2025"
            label="Occupation"
            format="date"
            :validate="[{ type: 'required' }, { type: 'date' }]"
          ></InputControl>
        </div>
        <div>
          <ButtonBlock type="secondary">Add new employee</ButtonBlock>
        </div>
      </div>
    </CardElement>

    <CardElement class="bg-white w-1/2">
      <h2 class="text-lg font-semibold mb-4">Quick Action: Add User</h2>

      <div class="flex gap-4 sm:gap-6">
        <InputControl
          type="text"
          name="Name"
          placeholder="John Doe"
          label="Name"
          description="Employee full name"
          :validate="[{ type: 'required' }]"
        ></InputControl>

        <InputControl
          type="text"
          name="Occupation"
          placeholder="Frontend Developer"
          label="Occupation"
          :validate="[{ type: 'required' }]"
        ></InputControl>
      </div>
    </CardElement>
  </div>
</template>
