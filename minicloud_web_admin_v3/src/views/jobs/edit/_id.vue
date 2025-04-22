<script setup>
import { onMounted, computed, ref } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const visible = ref(false);
const job = ref(null);
const errorMsg = ref(null);
const newId = ref(null);
const tabValue = ref('jp');
const currData = ref({
  jp: {
    title: '',
    overview: '',
    description: '',
    primary_requirements: '',
    additional_requirements: '',
    business_content: '',
    benefits: ''
  },
  cn: {
    title: '',
    overview: '',
    description: '',
    primary_requirements: '',
    additional_requirements: '',
    business_content: '',
    benefits: ''
  },
  tw: {
    title: '',
    overview: '',
    description: '',
    primary_requirements: '',
    additional_requirements: '',
    business_content: '',
    benefits: ''
  },
  en: {
    title: '',
    overview: '',
    description: '',
    primary_requirements: '',
    additional_requirements: '',
    business_content: '',
    benefits: ''
  }
});
const router = useRouter();
const route = useRoute();
const toast = useToast();

const langs = ref(['jp', 'cn', 'tw', 'en']);
const tabTitles = ref(['jp', 'cn', 'tw', 'en', 'submit']);
const tabNames = ref({
  jp: '日本語',
  cn: '简体中文',
  tw: '繁體中文',
  en: 'English',
  submit: '提交'
});

const updateJob = async () => {
  await DataService.update({
    category: 'jobs',
    id: route.params.id,
    data: currData.value
  });
  router.push(`/jobs`);
};
onMounted(async () => {
  job.value = await DataService.findById(route.params.id);
  currData.value = job.value.data;
});
const isSubmitDisabled = computed(() => {
  const allFilled =
    currData.value.jp?.title &&
    currData.value.cn?.title &&
    currData.value.tw?.title &&
    currData.value.en?.title &&
    currData.value.jp?.overview &&
    currData.value.cn?.overview &&
    currData.value.tw?.overview &&
    currData.value.en?.overview &&
    currData.value.jp?.description &&
    currData.value.cn?.description &&
    currData.value.tw?.description &&
    currData.value.en?.description &&
    currData.value.jp?.primary_requirements &&
    currData.value.cn?.primary_requirements &&
    currData.value.tw?.primary_requirements &&
    currData.value.en?.primary_requirements &&
    currData.value.jp?.additional_requirements &&
    currData.value.cn?.additional_requirements &&
    currData.value.tw?.additional_requirements &&
    currData.value.en?.additional_requirements &&
    currData.value.jp?.benefits &&
    currData.value.cn?.benefits &&
    currData.value.tw?.benefits &&
    currData.value.en?.benefits;
  return !allFilled;
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="出错啦" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ errorMsg }}</span>
  </Dialog>
  <div class="card">
    <form @submit.prevent="updateJob">
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
                <label>招聘岗位名称</label>
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
                <label>简介</label>
                <Textarea
                  rows="3"
                  cols="30"
                  v-model="currData[`${lang}`].overview"
                  :invalid="!currData[`${lang}`].overview"
                  variant="filled"
                  placeholder="该内容必须填写"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>工作内容</label>
                <Textarea
                  rows="10"
                  cols="30"
                  v-model="currData[`${lang}`].description"
                  :invalid="!currData[`${lang}`].description"
                  variant="filled"
                  placeholder="该内容必须填写"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>必须的技能及经验</label>
                <Textarea
                  rows="10"
                  cols="30"
                  v-model="currData[`${lang}`].primary_requirements"
                  :invalid="!currData[`${lang}`].primary_requirements"
                  variant="filled"
                  placeholder="该内容必须填写"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>欢迎的能力</label>
                <Textarea
                  rows="10"
                  cols="30"
                  v-model="currData[`${lang}`].additional_requirements"
                  :invalid="!currData[`${lang}`].additional_requirements"
                  variant="filled"
                  placeholder="该内容必须填写"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>工作条件</label>
                <Textarea
                  rows="10"
                  cols="30"
                  v-model="currData[`${lang}`].benefits"
                  :invalid="!currData[`${lang}`].benefits"
                  variant="filled"
                  placeholder="该内容必须填写"
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
          <TabPanel key="submit" value="submit">
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
