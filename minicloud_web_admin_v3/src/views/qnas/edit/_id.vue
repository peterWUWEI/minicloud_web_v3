<script setup>
import { onMounted, computed, ref } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const visible = ref(false);
const qna = ref(null);
const errorMsg = ref(null);
const status = ref('');
const newId = ref(null);
const tabValue = ref('jp');
const currData = ref({
  jp: { question: '', answer: '' },
  cn: { question: '', answer: '' },
  tw: { question: '', answer: '' },
  en: { question: '', answer: '' }
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

const updateQna = async () => {
  await DataService.update({
    category: 'qna',
    id: route.params.id,
    data: currData.value
  });
  router.push(`/qna`);
};
onMounted(async () => {
  qna.value = await DataService.findById(route.params.id);
  currData.value = qna.value.data;
});
const isSubmitDisabled = computed(() => {
  const allFilled =
    currData.value.jp?.question &&
    currData.value.cn?.question &&
    currData.value.tw?.question &&
    currData.value.en?.question &&
    currData.value.jp?.answer &&
    currData.value.cn?.answer &&
    currData.value.tw?.answer &&
    currData.value.en?.answer;
  return !allFilled;
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="出错啦" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ errorMsg }}</span>
  </Dialog>
  <div class="card">
    <form @submit.prevent="updateQna">
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
                <label>常见疑问</label>
                <Textarea
                  v-model="currData[`${lang}`].question"
                  :invalid="!currData[`${lang}`].question"
                  variant="filled"
                  placeholder="该内容必须填写"
                  rows="3"
                  cols="30"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>解答</label>
                <Textarea
                  v-model="currData[`${lang}`].answer"
                  :invalid="!currData[`${lang}`].answer"
                  variant="filled"
                  placeholder="该内容必须填写"
                  rows="3"
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
