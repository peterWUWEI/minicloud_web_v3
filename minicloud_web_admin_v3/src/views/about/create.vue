<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';
import FileUpload from 'primevue/fileupload';

const fileupload = ref();
const displayError = ref(false);
const uploadFinish = ref(false);
const uploadError = ref(null);
const uploadResponse = ref(null);
const uploadUrl = import.meta.env.VITE_BASE_URL + '/data/upload/single';
const newData = ref({
  jp: { title: '', content: '' },
  cn: { title: '', content: '' },
  tw: { title: '', content: '' },
  en: { title: '', content: '' }
});
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
</script>

<template>
  <div class="card">
    <form @submit.prevent="create_new_about">
      <Tabs value="jp">
        <TabList>
          <Tab v-for="lang in langs" :key="lang" :value="lang">{{
            tabNames[`${lang}`]
          }}</Tab>
          <Tab key="photo" value="upload">上传图片</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="lang in langs" :key="lang" :value="lang">
            <div class="card flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label>企业信息标题</label>
                <InputText v-model="newData[`${lang}`].title" type="text" required />
              </div>
              <div class="flex flex-col gap-2">
                <label>企业信息内容</label>
                <Textarea
                  rows="10"
                  cols="30"
                  v-model="newData[`${lang}`].content"
                  required
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel key="photo" value="upload">
            <FileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              :maxFileSize="5000000"
              @upload="onUpload"
              :auto="true"
              chooseLabel="Browse"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button label="提交" icon="pi pi-check" type="submit" severity="Primary" />
    </form>
  </div>
</template>
