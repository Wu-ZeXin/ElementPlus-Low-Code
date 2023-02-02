<template>
  <el-dropdown
    v-bind="dropdownOption.attr"
    v-on="dropdownOption.event || {}"
    :ref="dropdownOption.ref"
    class="default-style"
  >
    <span class="el-dropdown-link">
      <Icon
        v-if="dropdownOption.icon?.prefixIcon"
        :isSvgIcon="dropdownOption.icon?.isSvgIcon"
        :name="dropdownOption.icon?.prefixIcon"
        :size="dropdownOption.icon?.size"
        :color="dropdownOption.icon?.color"
        :style="dropdownOption.icon?.style"
      />
      <slot>
        <BasicComponent
          v-if="dropdownOption.titleConfig"
          :elementOption="dropdownOption.titleConfig"
        ></BasicComponent>
      </slot>
      <Icon
        v-if="dropdownOption.icon?.suffixIcon"
        :isSvgIcon="dropdownOption.icon?.isSvgIcon"
        :name="dropdownOption.icon?.suffixIcon"
        :size="dropdownOption.icon?.size"
        :color="dropdownOption.icon?.color"
        :style="dropdownOption.icon?.style"
      />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) of dropdownOption.itemArr"
          :key="index"
          v-bind="item.attr"
          >
          <Icon
            v-if="item.icon"
            :isSvgIcon="item.icon.isSvgIcon"
            :name="item.icon.name"
            :size="item.icon.size"
            :color="item.icon.color"
            :style="item.icon.style"
          />
          <BasicComponent
            v-if="(typeof item.content !== 'string')"
            :elementOption="(item.content as CompType)"
          ></BasicComponent>
          <span v-else>{{ item.content }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import type { DropdownType } from "../type";
  import { Icon } from "@/components/Icon";
  import BasicComponent from "@/components/BasicComponent/src/BasicComponent.vue";

  defineProps<{
    dropdownOption: DropdownType;
  }>();
</script>

<style scoped lang="less">
  span {
    display: flex;
  }

  .default-style {
    cursor: pointer;
  }
</style>
