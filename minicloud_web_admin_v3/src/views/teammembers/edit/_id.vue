<script setup>
import { onMounted, computed, ref } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const visible = ref(false);
const teammember = ref(null);
const errorMsg = ref(null);
const status = ref('');
const newId = ref(null);
const tabValue = ref('jp');
const thumbnailUrl = ref(null);
const presignedUrl = import.meta.env.VITE_BASE_URL + '/generate-presigned-url';
const currData = ref({
  jp: { title: '', name: '', desc: '' },
  cn: { title: '', name: '', desc: '' },
  tw: { title: '', name: '', desc: '' },
  en: { title: '', name: '', desc: '' }
});
const router = useRouter();
const route = useRoute();
const toast = useToast();

const langs = ref(['jp', 'cn', 'tw', 'en']);
const tabTitles = ref(['jp', 'cn', 'tw', 'en', 'photo']);
const tabNames = ref({
  jp: '日本語',
  cn: '简体中文',
  tw: '繁體中文',
  en: 'English',
  photo: '上传图片/确认提交'
});

const uploadImage = async (event) => {
  const file = event.target.files[0];
  try {
    // Step 1: Check file type:
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('上传的文件仅限图片格式');
    }
    // Step 2: Check size:
    if (file.size > 1024 * 1024 * 5) {
      throw new Error('上传的图片不可以超过5MB');
    }
    const filetype = file.name.split('.')[1];
    // get presigned URL
    newId.value = new Date().getTime().toString();
    const { data } = await axios.post(presignedUrl, {
      id: newId.value,
      filetype: filetype
    });
    status.value = '图片上传中...';

    // Upload to S3
    await fetch(data, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Length': new Blob([file]).size }
    });
    status.value = '上传成功';
    toast.add({
      severity: 'info',
      summary: 'Success',
      detail: '上传成功',
      life: 3000
    });
    thumbnailUrl.value = `https://minicloud-thumbnails.s3.amazonaws.com/uploads/${newId.value}/thumbnail.jpg`;
  } catch (err) {
    // handle error here to warn users
    errorMsg.value = err;
    visible.value = true;
  }
};

const updateTeammember = async () => {
  await DataService.update({
    category: 'teammembers',
    id: route.params.id,
    data: currData.value,
    image_url: thumbnailUrl.value
  });
  router.push(`/teammembers`);
};
onMounted(async () => {
  teammember.value = await DataService.findById(route.params.id);
  thumbnailUrl.value = teammember.value.image_url;
  currData.value = teammember.value.data;
});
const isSubmitDisabled = computed(() => {
  const allFilled =
    currData.value.jp?.title &&
    currData.value.cn?.title &&
    currData.value.tw?.title &&
    currData.value.en?.title &&
    currData.value.jp?.name &&
    currData.value.cn?.name &&
    currData.value.tw?.name &&
    currData.value.en?.name &&
    currData.value.jp?.desc &&
    currData.value.cn?.desc &&
    currData.value.tw?.desc &&
    currData.value.en?.desc;
  return !allFilled;
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="出错啦" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ errorMsg }}</span>
  </Dialog>
  <div class="card">
    <form @submit.prevent="updateTeammember">
      <Tabs :value="tabValue">
        <TabList>
          <Tab v-for="tab in tabTitles" :key="tab" :value="tab" @click="tabValue = tab">{{
            tabNames[`${tab}`]
          }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="(lang, index) in langs" :key="index" :value="lang">
            <div class="card flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label>成员职能</label>
                <InputText
                  v-model="currData[`${lang}`].title"
                  :invalid="!currData[`${lang}`].title"
                  variant="filled"
                  placeholder="该内容必须填写"
                  type="text"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>成员姓名</label>
                <InputText
                  v-model="currData[`${lang}`].name"
                  :invalid="!currData[`${lang}`].name"
                  variant="filled"
                  placeholder="该内容必须填写"
                  type="text"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>成员简介</label>
                <Textarea
                  v-model="currData[`${lang}`].desc"
                  :invalid="!currData[`${lang}`].desc"
                  variant="filled"
                  placeholder="该内容必须填写"
                  rows="10"
                  cols="30"
                  required
                />
              </div>
              <div class="card flex flex-col items-center gap-6">
                <Button
                  label="下一步"
                  @click="tabValue = tabTitles[index + 1]"
                  severity="Primary"
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel key="photo" value="photo">
            <div class="card flex flex-col items-center gap-6">
              <div class="card flex flex-col gap-6 items-center justify-center">
                <Toast />
                <input type="file" @change="uploadImage" />
                <div v-if="status">{{ status }}</div>
                <img v-if="thumbnailUrl" :src="thumbnailUrl" />
              </div>
            </div>
            <div class="card flex flex-col items-center gap-6">
              <Button
                label="提交"
                icon="pi pi-check"
                type="submit"
                severity="Primary"
                :disabled="isSubmitDisabled"
              />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </form>
  </div>
</template>
