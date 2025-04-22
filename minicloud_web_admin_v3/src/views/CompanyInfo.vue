<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';
import { useRouter } from 'vue-router';

const router = useRouter();
const companyInfoData = ref(null);
const currData = ref({
  jp: {
    name: '',
    address: '',
    established_date: '',
    fund: '',
    business_content: '',
    milestones: ''
  },
  cn: {
    name: '',
    address: '',
    established_date: '',
    fund: '',
    business_content: '',
    milestones: ''
  },
  tw: {
    name: '',
    address: '',
    established_date: '',
    fund: '',
    business_content: '',
    milestones: ''
  },
  en: {
    name: '',
    address: '',
    established_date: '',
    fund: '',
    business_content: '',
    milestones: ''
  }
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
    category: 'companyInfo',
    id: companyInfoData.value.id,
    data: currData.value
  });
  router.go();
};

onMounted(async () => {
  companyInfoData.value = await DataService.findByCategory('companyInfo');
  currData.value = companyInfoData.value.data;
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
        <TabPanel v-for="(lang, index) in langs" :key="index" :value="lang">
          <div class="card flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label>企业名称</label>
              <InputText type="text" v-model="currData[`${lang}`].name" />
            </div>
            <div class="flex flex-col gap-2">
              <label>注册地址</label>
              <InputText type="text" v-model="currData[`${lang}`].address" />
            </div>
            <div class="flex flex-col gap-2">
              <label>成立时间</label>
              <InputText type="text" v-model="currData[`${lang}`].established_date" />
            </div>
            <div class="flex flex-col gap-2">
              <label>注册资本</label>
              <InputText type="text" v-model="currData[`${lang}`].fund" />
            </div>
            <div class="flex flex-col gap-2">
              <label>主业务</label>
              <InputText type="text" v-model="currData[`${lang}`].business_content" />
            </div>
            <div class="flex flex-col gap-2">
              <label>里程碑</label>
              <Textarea rows="5" cols="30" v-model="currData[`${lang}`].milestones" />
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
