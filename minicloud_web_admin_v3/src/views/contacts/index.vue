<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const contactData = ref(null);

const editById = (id) => {
  router.push(`/contacts/edit/${id}`);
};

const deleteById = async (id) => {
  await DataService.deleteById('contacts', id);
  router.go();
};

const confirmDelete = async (id) => {
  confirm.require({
    message: '删除这条记录将无法复原！',
    header: '请再次确认',
    icon: 'pi pi-info-circle',
    rejectLabel: '取消',
    rejectProps: {
      label: '取消',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: '删除',
      severity: 'danger'
    },
    accept: async () => {
      await deleteById(id);
      toast.add({
        severity: 'info',
        summary: '确认',
        detail: '记录删除成功',
        life: 2000
      });
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: '取消操作',
        detail: '您已取消删除操作',
        life: 2000
      });
    }
  });
};

onMounted(async () => {
  contactData.value = await DataService.getByCategory('contacts');
});
</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="card">
    <DataTable :value="contactData" tableStyle="min-width: 50rem">
      <template #header>
        <div class="text-xl font-bold">联系我们</div>
      </template>
      <Column field="id" header="ID" style="width: 250px"></Column>
      <Column field="data.jp.title" header="联系方式" style="width: 250px"></Column>
      <Column style="width: 10rem">
        <template #body="{ data }">
          <div class="flex flex-wrap gap-2">
            <Button
              type="button"
              icon="pi pi-pencil"
              rounded
              severity="success"
              @click="editById(data.id)"
            />
            <Button
              type="button"
              icon="pi pi-trash"
              rounded
              severity="danger"
              @click="confirmDelete(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
