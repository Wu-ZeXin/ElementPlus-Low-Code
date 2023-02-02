<template>
  <div v-if="typeof isVisible !== 'undefined' ? isVisible.value : true" class="icon-style">
    <SvgIcon v-if="isSvgIcon" :name="name" :size="typeof size !== 'undefined' ? size : 14" :style="style"></SvgIcon>
    <el-icon v-else :color="color" :size="typeof size !== 'undefined' ? size : 14" :style="style">
      <component :is="name"></component>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
  import { SvgIcon } from "@/components/Icon";
  import type { Ref } from "vue";

  defineProps<{
    isVisible?: Ref<Boolean>,
    isSvgIcon: boolean,
    name: string,
    size?: number | string,
    color?: string,
    style?: object,
  }>();
</script>

<style scoped lang="less">
  .icon-style {
    display: flex;
    align-items: center;
  }
</style>
