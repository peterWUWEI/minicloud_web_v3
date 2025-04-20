<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';

const investorInfo = ref(null);
const sustainability = ref(null);

onMounted(async () => {
  investorInfo.value = await DataService.getByCategory('investorInfo');
  sustainability.value = await DataService.getByCategory('sustainability');
});
</script>

<template>
  <div class="card">
    <DataTable :value="investorInfo" tableStyle="min-width: 50rem">
      <template #header>
        <div class="text-xl font-bold">投资者信息</div>
      </template>
      <Column field="id" header="ID" style="width: 250px"></Column>
      <Column field="data.jp.title" header="标题" style="width: 250px"></Column>
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
  <div class="card">
    <DataTable :value="sustainability" tableStyle="min-width: 50rem">
      <template #header>
        <div class="text-xl font-bold">可持续发展信息</div>
      </template>
      <Column field="id" header="ID" style="width: 250px"></Column>
      <Column field="data.jp.title" header="标题" style="width: 250px"></Column>
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
