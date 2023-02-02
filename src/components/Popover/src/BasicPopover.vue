<template>
  <el-popover
    v-if="
      typeof popoverOption.isShowPopover !== 'undefined' ? popoverOption.isShowPopover.value : true
    "
    v-bind="popoverOption.attr"
    v-on="popoverOption.event || {}"
    :ref="popoverOption.ref"
  >
    <template #reference>
      <BasicComponent
        v-if="popoverOption.referenceSlotConfig"
        :elementOption="popoverOption.referenceSlotConfig"
      />
      <slot v-if="popoverOption.referenceSlotName" :name="popoverOption.referenceSlotName"></slot>
    </template>

    <template #default>
      <BasicComponent
        v-if="popoverOption.defaultSlotConfig"
        :elementOption="popoverOption.defaultSlotConfig"
      />
      <slot v-if="popoverOption.defaultSlotName" :name="popoverOption.defaultSlotName"></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import type { PopoverType } from "../type";

  defineProps<{
    popoverOption: PopoverType;
  }>();
</script>

<style scoped lang="less"></style>
