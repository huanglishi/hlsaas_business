<template>
  <Card title="快捷入口" v-bind="$attrs">
    <CardGrid v-for="(item,index) in navItems" :key="index">
      <router-link :to="{ path: item.path }" custom  v-slot="{ navigate }">
        <span class="flex flex-col items-center" @click="navigate">
          <Icon :icon="item.icon" :color="item.color" size="20" />
          <span class="text-md mt-2">{{ item.title }}</span>
        </span>
      </router-link>
    </CardGrid>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { navItems } from './data';
  import { Icon } from '/@/components/Icon';

  const CardGrid = Card.Grid;
</script>
