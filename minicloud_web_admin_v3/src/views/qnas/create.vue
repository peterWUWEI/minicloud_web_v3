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
  jp: { question: '', answer: '' },
  cn: { question: '', answer: '' },
  tw: { question: '', answer: '' },
  en: { question: '', answer: '' }
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

const createNewQna = async () => {
  try {
    await DataService.put({
      category: 'qnas',
      id: newId.value,
      data: newData.value
    });
    router.push(`/qnas`);
  } catch (err) {
    errorMsg.value = err;
    visible.value = true;
  }
};

const isSubmitDisabled = computed(() => {
  const allFilled =
    newData.value.jp?.question &&
    newData.value.cn?.question &&
    newData.value.tw?.question &&
    newData.value.en?.question &&
    newData.value.jp?.answer &&
    newData.value.cn?.answer &&
    newData.value.tw?.answer &&
    newData.value.en?.answer;
  return !allFilled;
});
</script>

<template>
  <Dialog v-model:visible="visible" modal header="出错啦" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ errorMsg }}</span>
  </Dialog>
  <div class="card">
    <form @submit.prevent="createNewQna">
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
                  rows="3"
                  cols="30"
                  v-model="newData[`${lang}`].question"
                  :invalid="!newData[`${lang}`].question"
                  variant="filled"
                  placeholder="该内容必须填写"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label>解答</label>
                <Textarea
                  rows="3"
                  cols="30"
                  v-model="newData[`${lang}`].answer"
                  :invalid="!newData[`${lang}`].answer"
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
