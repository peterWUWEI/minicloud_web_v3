<script setup>
import { ref, computed } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const visible = ref(false);
const errorMsg = ref(null);
const newId = ref(null);
const tabValue = ref('jp');
const router = useRouter();
const newData = ref({
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
const langs = ref(['jp', 'cn', 'tw', 'en']);
const tabTitles = ref(['jp', 'cn', 'tw', 'en', 'submit']);
const tabNames = ref({
  jp: '日本語',
  cn: '简体中文',
  tw: '繁體中文',
  en: 'English',
  submit: '提交'
});

const createNewJob = async () => {
  try {
    await DataService.put({
      category: 'jobs',
      id: newId.value,
      data: newData.value
    });
    router.push(`/jobs`);
  } catch (err) {
    errorMsg.value = err;
    visible.value = true;
  }
};

const isSubmitDisabled = computed(() => {
  const allFilled =
    newData.value.jp?.title &&
    newData.value.cn?.title &&
    newData.value.tw?.title &&
    newData.value.en?.title &&
    newData.value.jp?.overview &&
    newData.value.cn?.overview &&
    newData.value.tw?.overview &&
    newData.value.en?.overview &&
    newData.value.jp?.description &&
    newData.value.cn?.description &&
    newData.value.tw?.description &&
    newData.value.en?.description &&
    newData.value.jp?.primary_requirements &&
    newData.value.cn?.primary_requirements &&
    newData.value.tw?.primary_requirements &&
    newData.value.en?.primary_requirements &&
    newData.value.jp?.additional_requirements &&
    newData.value.cn?.additional_requirements &&
    newData.value.tw?.additional_requirements &&
    newData.value.en?.additional_requirements &&
    newData.value.jp?.benefits &&
    newData.value.cn?.benefits &&
    newData.value.tw?.benefits &&
    newData.value.en?.benefits;

  return !allFilled;
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="出错啦" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ errorMsg }}</span>
  </Dialog>
  <div class="card">
    <form @submit.prevent="createNewJob">
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
                  v-model="newData[`${lang}`].title"
                  :invalid="!newData[`${lang}`].title"
                  variant="filled"
                  placeholder="该内容必须填写"
                  type="text"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>简介</label>
                <Textarea
                  rows="10"
                  cols="30"
                  v-model="newData[`${lang}`].overview"
                  :invalid="!newData[`${lang}`].overview"
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
                  v-model="newData[`${lang}`].description"
                  :invalid="!newData[`${lang}`].description"
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
                  v-model="newData[`${lang}`].primary_requirements"
                  :invalid="!newData[`${lang}`].primary_requirements"
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
                  v-model="newData[`${lang}`].additional_requirements"
                  :invalid="!newData[`${lang}`].additional_requirements"
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
                  v-model="newData[`${lang}`].benefits"
                  :invalid="!newData[`${lang}`].benefits"
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
