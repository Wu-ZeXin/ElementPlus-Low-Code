<template>
  <!-- 没有子节点，使用 el-menu-item 渲染 -->
  <el-menu-item
    v-if="!menuItemInfo.itemArr || !menuItemInfo.itemArr.length"
    v-bind="menuItemInfo.attr"
    v-on="menuItemInfo.event || {}"
  >
    <Icon
      v-if="menuItemInfo.icon?.name"
      :isSvgIcon="menuItemInfo.icon?.isSvgIcon"
      :name="menuItemInfo.icon?.name"
      :color="menuItemInfo.icon?.color"
      :size="menuItemInfo.icon?.size"
      :style="menuItemInfo.icon?.style"
    >
    </Icon>
    <template #title>{{ menuItemInfo.text }}</template>
  </el-menu-item>

  <!-- 有子节点，使用 el-sub-menu 渲染 -->
  <el-sub-menu v-else v-bind="menuItemInfo.attr" v-on="menuItemInfo.event || {}">
    <template #title>
      <Icon
        v-if="menuItemInfo.icon?.name"
        :isSvgIcon="menuItemInfo.icon?.isSvgIcon"
        :name="menuItemInfo.icon?.name"
        :color="menuItemInfo.icon?.color"
        :size="menuItemInfo.icon?.size"
        :style="menuItemInfo.icon?.style"
      >
      </Icon>
      <span>{{ menuItemInfo.text }}</span>
    </template>
    <!-- 循环渲染 -->
    <MenuItem
      v-for="(subMenuItem, index) in menuItemInfo.itemArr"
      :key="index + subMenuItem.attr?.index"
      :menuItemInfo="subMenuItem"
    />
  </el-sub-menu>
</template>

<script setup lang="ts">
  import type { MenuItemType } from "../type";
  import { MenuItem } from "..";
  import { Icon } from "@/components/Icon";

  defineProps<{
    menuItemInfo: MenuItemType;
  }>();
</script>

<style scoped lang="less"></style>
