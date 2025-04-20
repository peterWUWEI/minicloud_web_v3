<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';
import FileUpload from 'primevue/fileupload';
import { useRoute } from 'vue-router';
import Image from 'primevue/image';

const fileupload = ref();
const displayError = ref(false);
const uploadFinish = ref(false);
const uploadError = ref(null);
const uploadResponse = ref(null);
const uploadUrl = import.meta.env.VITE_BASE_URL + '/data/upload/single';
const service = ref(null);
const route = useRoute();

const langs = ref(['jp', 'cn', 'tw', 'en']);
const tabNames = ref({
  jp: '日本語',
  cn: '简体中文',
  tw: '繁體中文',
  en: 'English'
});

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

onMounted(async () => {
  service.value = await DataService.findById(route.params.id);
});
</script>

<template>
  <div class="card">
    <form @submit.prevent="">
      <Tabs value="jp">
        <TabList>
          <Tab v-for="lang in langs" :key="lang" :value="lang">{{
            tabNames[`${lang}`]
          }}</Tab>
          <Tab key="photo" value="upload">图片</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="lang in langs" :key="lang" :value="lang">
            <div class="card flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label>服务标题</label>
                <InputText :value="service?.data[`${lang}`].title" type="text" required />
              </div>
              <div class="flex flex-col gap-2">
                <label>服务内容</label>
                <Textarea
                  :value="service?.data[`${lang}`].content"
                  rows="10"
                  cols="30"
                  required
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel key="image" value="image">
            <Image :src="service?.image_url" alt="Image" width="250" />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button label="提交" icon="pi pi-check" type="submit" severity="Primary" />
    </form>
  </div>
</template>
