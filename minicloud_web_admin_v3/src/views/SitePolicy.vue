<script setup>
import { onMounted, ref } from 'vue';
import { DataService } from '@/service/DataService';

const sitepolicyData = ref(null);
const langs = ref(['jp', 'cn', 'tw', 'en']);
const tabNames = ref({ jp: '日本語', cn: '简体中文', tw: '繁體中文', en: 'English' });

onMounted(async () => {
  sitepolicyData.value = await DataService.findByCategory('policies');
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
              <label>网站政策名称</label>
              <InputText type="text" :value="sitepolicyData?.data[`${lang}`].title" />
            </div>
            <div class="flex flex-col gap-2">
              <label>网站政策内容</label>
              <Textarea
                v-model="value"
                rows="20"
                cols="30"
                :value="sitepolicyData?.data[`${lang}`].content"
              />
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <Button label="保存" icon="pi pi-check" severity="Primary" disabled />
  </div>
</template>
