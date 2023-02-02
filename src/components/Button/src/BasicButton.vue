<template>
  <el-col v-bind="btnOption.colAttr">
    <el-button v-bind="btnOption.attr" v-on="btnOption.event || {}">
      <template #icon v-if="btnOption.icon">
        <Icon
            v-if="btnOption.icon"
            :isSvgIcon="btnOption.icon?.isSvgIcon"
            :name="btnOption.icon?.name"
            :size="btnOption.icon?.size"
            :color="btnOption.icon?.color"
            :style="btnOption.icon?.style"
          />
        <slot name="btnIcon"></slot>
      </template>
      <template #default>
        <BasicComponent v-if="btnOption.content" :elementOption="btnOption.content" />
        <slot name="btnDefault"></slot>
      </template>
      <template #loading>
        <BasicComponent v-if="btnOption.loading" :elementOption="btnOption.loading" />
        <slot name="btnLoading"></slot>
      </template>
    </el-button>
  </el-col>
</template>

<script setup lang="ts">
  import type { ButtonType } from "../type";
  import { Icon } from "@/components/Icon";

  defineProps<{ btnOption: ButtonType }>();
</script>
