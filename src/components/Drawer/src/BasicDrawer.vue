<template>
  <el-drawer
    v-model="drawerOption.drawer"
    :ref="drawerOption.ref"
    v-bind="drawerOption.attr"
    v-on="drawerOption.event || {}"
  >
    <template #header v-if="drawerOption.headerSlotConfig || drawerOption.headerSlotName">
      <BasicComponent
        v-if="drawerOption.headerSlotConfig"
        :elementOption="drawerOption.headerSlotConfig"
      />
      <slot v-if="drawerOption.headerSlotName" :name="drawerOption.headerSlotName"></slot>
    </template>
    <template v-if="drawerOption.content || drawerOption.defaultSlotName">
      <BasicComponent
        v-if="drawerOption.content"
        v-for="element of drawerOption.content"
        :elementOption="element"
      />
      <slot v-if="drawerOption.defaultSlotName" :name="drawerOption.defaultSlotName"></slot>
    </template>
    <template #footer v-if="drawerOption.footerSlotConfig || drawerOption.footerSlotName">
      <BasicComponent
        v-if="drawerOption.footerSlotConfig"
        :elementOption="drawerOption.footerSlotConfig"
      />
      <slot v-if="drawerOption.footerSlotName" :name="drawerOption.footerSlotName"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import type { DrawerType } from "../type";

  defineProps<{
    drawerOption: DrawerType;
  }>();
</script>

<style scoped lang="less"></style>
