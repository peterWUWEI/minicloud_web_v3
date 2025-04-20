<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter } from 'vue-router';

const router = useRouter();
const fileupload = ref();
const displayError = ref(false);
const uploadFinish = ref(false);
const uploadError = ref(null);
const uploadResponse = ref(null);
const serviceData = ref(null);
const uploadUrl = import.meta.env.VITE_BASE_URL + '/data/upload/single';

function handleUpload() {
  fileupload.value.upload();
}

const onUpload = (event) => {
  //   console.log(event.xhr.response);
  uploadFinish.value = true;
  uploadResponse.value = JSON.parse(event.xhr.response);
  // Refresh the data table
  DataService.reload();
};

const onUploadError = (event) => {
  displayError.value = true;
  uploadError.value = JSON.parse(event.xhr.response)?.error;
  // Access the FileUpload component via ref and clear the file list
  if (fileupload.value) {
    fileupload.value.clear();
  }
};

const EditById = (id) => {
  router.push(`/services/edit/${id}`);
};

onMounted(async () => {
  serviceData.value = await DataService.getByCategory('services');
});
</script>

<template>
  <div class="card">
    <DataTable :value="serviceData" tableStyle="min-width: 50rem">
      <template #header>
        <div class="text-xl font-bold">产品服务</div>
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
