<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter } from 'vue-router';

const aboutData = ref(null);
const router = useRouter();

const EditById = (id) => {
  router.push(`/services/edit/${id}`);
};

onMounted(async () => {
  aboutData.value = await DataService.getByCategory('about');
});
</script>

<template>
  <div class="card">
    <DataTable :value="aboutData" tableStyle="min-width: 50rem">
      <template #header>
        <div class="text-xl font-bold">企业信息</div>
      </template>
      <Column field="id" header="ID" style="width: 250px"></Column>
      <Column field="data.jp.title" header="标题" style="width: 250px"></Column>
      <Column style="width: 10rem">
        <template #body="{ data }">
          <div class="flex flex-wrap gap-2">
            <Button
              type="button"
              icon="pi pi-pencil"
              rounded
              severity="success"
              @click="EditById(data.id)"
            />
            <Button
              type="button"
              icon="pi pi-trash"
              rounded
              severity="danger"
              @click="deleteById(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
