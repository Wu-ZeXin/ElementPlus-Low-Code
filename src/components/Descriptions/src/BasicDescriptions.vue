<template>
  <el-descriptions
    v-bind="descriptionsOption.attr"
    v-on="descriptionsOption.event || {}"
    :ref="descriptionsOption.ref"
  >
    <template #title v-if="descriptionsOption.titleSlotName || descriptionsOption.titleSlotConfig">
      <slot v-if="descriptionsOption.titleSlotConfig">
        <BasicComponent :elementOption="descriptionsOption.titleSlotConfig" />
      </slot>
      <slot
        v-if="descriptionsOption.titleSlotName"
        :name="descriptionsOption.titleSlotName"
      ></slot>
    </template>
    <template #extra v-if="descriptionsOption.extraSlotName || descriptionsOption.extraSlotConfig">
      <slot v-if="descriptionsOption.extraSlotConfig">
        <BasicComponent :elementOption="descriptionsOption.extraSlotConfig" />
      </slot>
      <slot
        v-if="descriptionsOption.extraSlotName"
        :name="descriptionsOption.extraSlotName"
      ></slot>
    </template>
    <el-descriptions-item
      v-for="(descriptionsItem, index) of descriptionsOption.itemArr"
      :key="index + `${descriptionsItem.attr?.label}`"
      v-bind="descriptionsItem.attr"
      v-on="descriptionsItem.event || {}"
    >
      <template #label v-if="descriptionsItem.labelSlotName || descriptionsItem.labelSlotConfig">
        <slot v-if="descriptionsItem.labelSlotConfig">
          <BasicComponent :elementOption="descriptionsItem.labelSlotConfig" />
        </slot>
        <slot
          v-if="descriptionsItem.labelSlotName"
          :name="descriptionsItem.labelSlotName"
        ></slot>
      </template>
      <template #default>
        <BasicComponent
          v-if="descriptionsItem.defaultSlotConfig"
          :elementOption="descriptionsItem.defaultSlotConfig"
        />
        <slot
          v-if="descriptionsItem.defaultSlotName"
          :name="descriptionsItem.defaultSlotName"
        ></slot>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
  import type { DescriptionsType } from "../type";

  defineProps<{
    descriptionsOption: DescriptionsType;
  }>();
</script>

<style scoped lang="less"></style>
