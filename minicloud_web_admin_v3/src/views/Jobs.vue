<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';

const jobData = ref(null);

onMounted(async () => {
  jobData.value = await DataService.getByCategory('jobs');
});
</script>

<template>
  <div class="card">
    <DataTable :value="jobData" tableStyle="min-width: 50rem">
      <template #header>
        <div class="text-xl font-bold">招聘信息</div>
      </template>
      <Column field="id" header="ID" style="width: 250px"></Column>
      <Column field="data.jp.title" header="招聘岗位" style="width: 250px"></Column>
      <Column style="width: 10rem">
        <template #body>
          <div class="flex flex-wrap gap-2">
            <Button type="button" icon="pi pi-pencil" rounded severity="success" />
            <Button type="button" icon="pi pi-trash" rounded severity="danger" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
