<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
  {
    label: '主页',
    items: [
      {
        label: '产品服务',
        items: [
          {
            label: '服务列表',
            icon: 'pi pi-fw pi-list',
            to: '/services'
          },
          {
            label: '添加新服务',
            icon: 'pi pi-fw pi-plus',
            to: '/services/create'
          }
        ]
      },
      {
        label: '企业信息',
        items: [
          {
            label: '企业信息列表',
            icon: 'pi pi-fw pi-list',
            to: '/about'
          },
          {
            label: '添加新的企业信息',
            icon: 'pi pi-fw pi-plus',
            to: '/about/create'
          }
        ]
      },
      { label: '公司概要', icon: 'pi pi-fw pi-building', to: '/companyInfo' },
      {
        label: '公司成员',
        items: [
          {
            label: '公司成员列表',
            icon: 'pi pi-fw pi-users',
            to: '/teammembers'
          },
          {
            label: '添加新的公司成员',
            icon: 'pi pi-fw pi-user-plus',
            to: '/teammembers/create'
          }
        ]
      },
      { label: '网站政策', icon: 'pi pi-fw pi-book', to: '/sitepolicy' },
      {
        label: '联系我们',
        items: [
          {
            label: '联系方式列表',
            icon: 'pi pi-fw pi-phone',
            to: '/contacts'
          },
          {
            label: '添加新的联系方式',
            icon: 'pi pi-fw pi-plus',
            to: '/contacts/create'
          }
        ]
      },
      {
        label: '公司新闻',
        items: [
          {
            label: '公司新闻列表',
            icon: 'pi pi-fw pi-file-pdf',
            to: '/news'
          },
          {
            label: '添加新的公司新闻',
            icon: 'pi pi-fw pi-plus',
            to: '/news/create'
          }
        ]
      },
      {
        label: '招聘信息',
        items: [
          {
            label: '招聘信息列表',
            icon: 'pi pi-fw pi-id-card',
            to: '/jobs'
          },
          {
            label: '添加新的招聘信息',
            icon: 'pi pi-fw pi-user-plus',
            to: '/jobs/create'
          }
        ]
      },
      {
        label: '常见疑问',
        items: [
          {
            label: '常见疑问列表',
            icon: 'pi pi-fw pi-question-circle',
            to: '/qnas'
          },
          {
            label: '添加新的常见疑问',
            icon: 'pi pi-fw pi-plus',
            to: '/qnas/create'
          }
        ]
      },
      {
        label: '其他板块',
        items: [
          {
            label: '常见疑问列表',
            icon: 'pi pi-fw pi-info-circle',
            to: '/others'
          },
          {
            label: '添加新的常见疑问',
            icon: 'pi pi-fw pi-plus',
            to: '/others/create'
          }
        ]
      }
    ]
  }
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
