<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';

const teammemberData = ref(null);

onMounted(async () => {
  teammemberData.value = await DataService.getByCategory('teammembers');
});
</script>

<template>
  <div class="card">
    <DataTable :value="teammemberData" tableStyle="min-width: 50rem">
      <template #header>
        <div class="text-xl font-bold">公司成员</div>
      </template>
      <Column field="id" header="ID" style="width: 250px"></Column>
      <Column field="data.jp.name" header="成员姓名" style="width: 250px"></Column>
      <Column field="data.jp.title" header="成员职能" style="width: 250px"></Column>
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
