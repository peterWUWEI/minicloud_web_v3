<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter } from 'vue-router';

const router = useRouter();
const sitepolicyData = ref(null);
const currData = ref({
  jp: { title: '', content: '' },
  cn: { title: '', content: '' },
  tw: { title: '', content: '' },
  en: { title: '', content: '' }
});
const tabValue = ref('jp');
const langs = ref(['jp', 'cn', 'tw', 'en']);
const tabTitles = ref(['jp', 'cn', 'tw', 'en', 'submit']);
const tabNames = ref({
  jp: '日本語',
  cn: '简体中文',
  tw: '繁體中文',
  en: 'English',
  submit: '保存更改'
});

const saveChanges = async () => {
  await DataService.update({
    category: 'policies',
    id: sitepolicyData.value.id,
    data: currData.value
  });
  router.go();
};

onMounted(async () => {
  sitepolicyData.value = await DataService.findByCategory('policies');
  currData.value = sitepolicyData.value.data;
});
</script>

<template>
  <div class="card">
    <Tabs :value="tabValue">
      <TabList>
        <Tab v-for="tab in tabTitles" :key="tab" :value="tab" @click="tabValue = tab">{{
          tabNames[`${tab}`]
        }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="(lang, index) in langs" :key="lang" :value="lang">
          <div class="card flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label>网站政策名称</label>
              <InputText type="text" v-model="currData[`${lang}`].title" />
            </div>
            <div class="flex flex-col gap-2">
              <label>网站政策内容</label>
              <Textarea v-model="currData[`${lang}`].content" rows="20" cols="30" />
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
              label="保存更改"
              icon="pi pi-check"
              @click="saveChanges"
              severity="Primary"
            />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
