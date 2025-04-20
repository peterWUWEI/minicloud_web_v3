<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';

const companyInfoData = ref(null);
const langs = ref(['jp', 'cn', 'tw', 'en']);
const tabNames = ref({ jp: '日本語', cn: '简体中文', tw: '繁體中文', en: 'English' });

onMounted(async () => {
  companyInfoData.value = await DataService.findByCategory('companyInfo');
});
</script>

<template>
  <div class="card">
    <Tabs value="jp">
      <TabList>
        <Tab v-for="lang in langs" :key="lang" :value="lang">{{
          tabNames[`${lang}`]
        }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="lang in langs" :key="lang" :value="lang">
          <div class="card flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label>企业名称</label>
              <InputText type="text" :value="companyInfoData?.data[`${lang}`].name" />
            </div>
            <div class="flex flex-col gap-2">
              <label>注册地址</label>
              <InputText type="text" :value="companyInfoData?.data[`${lang}`].address" />
            </div>
            <div class="flex flex-col gap-2">
              <label>成立时间</label>
              <InputText
                type="text"
                :value="companyInfoData?.data[`${lang}`].established_date"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label>注册资本</label>
              <InputText type="text" :value="companyInfoData?.data[`${lang}`].fund" />
            </div>
            <div class="flex flex-col gap-2">
              <label>主业务</label>
              <InputText
                type="text"
                :value="companyInfoData?.data[`${lang}`].business_content"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label>里程碑</label>
              <Textarea
                v-model="value"
                rows="5"
                cols="30"
                :value="companyInfoData?.data[`${lang}`].milestones"
              />
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <Button label="Save" icon="pi pi-check" severity="Primary" disabled />
  </div>
</template>
