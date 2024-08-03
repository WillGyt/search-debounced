<script setup lang="ts">
import { useGetFiles } from '~/composables/files/use-get-files';

const { data: files, search, status } = useGetFiles();

const columns = [
  { label: 'File name', key: 'name' },
  { label: 'Created at', key: 'created_at' },
];
</script>

<template>
  <UContainer class="flex flex-col justify-center mt-10 py-10 w-[600px]">
    <h2 class="font-bold text-xl mb-5 border-b-2">Files</h2>

    <div class="flex mb-3">
      <UInput
        placeholder="Search for files..."
        v-model="search"
      ></UInput>
    </div>

    <!-- To display the results -->
    <p class="text-gray-400 mb-2 text-sm">Only shows the first 30 results</p>
    <UTable
      :columns="columns"
      :rows="files ?? []"
    >
      <template #created_at-data="{ row }">
        {{ useDateFormat(row.created_at, 'DD MMM YYYY') }}
      </template>
      <template #empty-state>
        <div class="flex justify-center p-10 text-sm text-gray-400">
          No files found
        </div>
      </template>
    </UTable>
  </UContainer>
</template>
