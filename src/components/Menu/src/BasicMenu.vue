<template>
  <el-menu v-bind="menuOption.attr" v-on="menuOption.event || {}" :ref="menuOption.ref">
    <MenuItem
      v-for="(menuItem, index) in menuOption.itemArr"
      :key="index + menuItem.attr?.index"
      :menuItemInfo="menuItem"
    />
  </el-menu>
</template>

<script setup lang="ts">
  import type { MenuType } from "../type";
  import { MenuItem } from "..";

  defineProps<{
    menuOption: MenuType;
  }>();
</script>

<style scoped lang="less"></style>
