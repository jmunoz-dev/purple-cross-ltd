<script setup>
import { ref, computed, watch } from 'vue'
import ButtonBlock from '../blocks/ButtonBlock.vue'
import IconBlock from '../blocks/IconBlock.vue'
import InputControl from '../controls/InputControl.vue'

const props = defineProps({
  data: { type: Array, required: true },
  columns: {
    type: Array,
    required: true,
    default: () => [], // [{ key: 'fullName', label: 'Name', sortable: true }, ...]
  },
  perPage: {
    type: Number,
    default: 5,
  },
})

const currentPage = ref(1)
const searchQuery = ref('')
const sortKey = ref('fullName')
const sortAsc = ref(true)
const isLoading = ref(false)
const paginatedData = ref([])

const searchableKeys = computed(() =>
  props.columns.filter((col) => col.searchable !== false).map((col) => col.key),
)

const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return props.data.filter((entry) =>
    searchableKeys.value.some((key) => (entry[key] ?? '').toString().toLowerCase().includes(query)),
  )
})

const sortedData = computed(() => {
  const isValidSortKey = props.columns.some((col) => col.key === sortKey.value)
  if (!isValidSortKey) return filteredData.value

  return [...filteredData.value].sort((a, b) => {
    const aVal = a[sortKey.value] ?? ''
    const bVal = b[sortKey.value] ?? ''
    return sortAsc.value
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal))
  })
})

const totalPages = computed(() => Math.ceil(sortedData.value.length / props.perPage))

const loadPage = () => {
  isLoading.value = true
  setTimeout(() => {
    const start = (currentPage.value - 1) * props.perPage
    const end = start + props.perPage
    paginatedData.value = sortedData.value.slice(start, end)
    isLoading.value = false
  }, 800)
}

watch([currentPage, searchQuery, sortKey, sortAsc], loadPage, { immediate: true })

const changeSort = (key) => {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}
</script>

<template>
  <div>
    <!-- Filter Input -->
    <div class="mb-4">
      <InputControl
        type="text"
        name="Search by"
        v-model="searchQuery"
        label="Search"
        placeholder="Search by name, occupation, department"
        class="w-full"
      ></InputControl>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto relative bg-white shadow rounded-lg min-h-[300px]">
      <table class="w-full min-w-[600px] text-sm text-left text-text">
        <thead class="bg-light uppercase text-xs text-gray-500 border-b border-neutral">
          <tr>
            <th
              v-for="(col, index) in columns"
              :key="col.key"
              @click="col.sortable ? changeSort(col.key) : null"
              class="px-6 py-3 cursor-pointer"
              :class="{
                'sticky left-0 z-10 bg-white border-r': index === 0,
              }"
            >
              {{ col.label }}
              <IconBlock
                v-if="col.sortable && sortKey === col.key"
                :name="sortAsc ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="inline-block w-4 h-4 ml-1"
              />
            </th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!isLoading && paginatedData.length === 0">
            <td :colspan="columns.length + 1" class="text-center px-6 py-4 text-gray-400">
              No results found.
            </td>
          </tr>

          <tr v-if="isLoading">
            <td :colspan="columns.length + 1" class="text-center px-6 py-4 text-gray-400">
              Loading...
            </td>
          </tr>
          <tr
            v-for="employee in paginatedData"
            :key="employee.id"
            class="border-b hover:bg-light transition"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap"
              :class="{
                'sticky-col': column.key === columns[0].key,
                'bg-white': column.key === columns[0].key,
              }"
            >
              {{ employee[column.key] }}
            </td>
            <td class="px-6 py-4 flex gap-2">
              <IconBlock
                name="mdi:pencil"
                class="cursor-pointer text-blue-500"
                @click="$emit('edit', employee.id)"
              />
              <IconBlock
                name="mdi:delete"
                class="cursor-pointer text-red-500"
                @click="$emit('delete', employee.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-end gap-2">
      <ButtonBlock @click="currentPage--" :disabled="currentPage === 1" type="secondary">
        Previous
      </ButtonBlock>
      <span class="px-2 text-sm self-center">Page {{ currentPage }} of {{ totalPages }}</span>

      <ButtonBlock @click="currentPage++" :disabled="currentPage === totalPages" type="secondary">
        Next
      </ButtonBlock>
    </div>
  </div>
</template>
