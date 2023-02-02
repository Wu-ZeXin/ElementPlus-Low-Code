<template>
  <el-table
    v-loading="loading"
    :data="data"
    :ref="tableOption.ref"
    v-bind="tableOption.attr"
    v-on="tableOption.event || {}"
  >
    <el-table-column
      v-for="(tableColumn, index) of tableOption.columnArr"
      :key="setKey(index, tableColumn.attr?.label)"
      v-bind="tableColumn.attr"
    >
      <template #header v-if="tableColumn.headerSlotName || tableColumn.headerSlotConfig">
        <BasicComponent
          v-if="tableColumn.headerSlotConfig"
          :elementOption="tableColumn.headerSlotConfig"
        />
        <slot v-if="tableColumn.headerSlotName" :name="tableColumn.headerSlotName"></slot>
      </template>

      <template
        #default="scope"
        v-if="tableColumn.defaultSlotName || tableColumn.defaultSlotConfig"
      >
        <BasicComponent
          v-if="tableColumn.defaultSlotConfig && typeof tableColumn.defaultSlotConfig === 'object'"
          :elementOption="defaultSlotConfigHandle(tableColumn.defaultSlotConfig as CompType)"
          v-model="scope.row[tableColumn.attr?.prop]"
          v-on="eventHandle(scope, tableColumn.defaultSlotConfig as CompType) || {}"
        />
        <BasicComponent
          v-if="tableColumn.defaultSlotConfig && Array.isArray(tableColumn.defaultSlotConfig)"
          v-for="config of tableColumn.defaultSlotConfig"
          :elementOption="defaultSlotConfigHandle(config as CompType)"
          v-on="eventHandle(scope, config as CompType) || {}"
        />
        <slot
          v-if="tableColumn.defaultSlotName"
          :name="tableColumn.defaultSlotName"
          :currentCellData="scope"
        ></slot>
      </template>
    </el-table-column>
    <template #append>
      <BasicComponent
        v-if="tableOption.appendSlotConfig"
        :elementOption="tableOption.appendSlotConfig"
      />
      <slot v-else name="tableAppend"></slot>
    </template>
    <template #empty>
      <BasicComponent
        v-if="tableOption.emptySlotConfig"
        :elementOption="tableOption.emptySlotConfig"
      />
      <slot v-else name="tableEmpty"></slot>
    </template>
  </el-table>
</template>

<script setup lang="ts">
  import type { TableType } from "../type";
  import { ref, watch, onBeforeMount } from "vue";

  const props = defineProps<{
    tableOption: TableType;
  }>();

  onBeforeMount(() => {
    if (props.tableOption.loading) {
      loading.value = props.tableOption.loading.value;
    }
  });

  const data = props.tableOption.data;
  const loading = ref(false);
  watch(
    () => props.tableOption.loading,
    () => {
      if (props.tableOption.loading) {
        loading.value = props.tableOption.loading.value;
      }
    },
    { deep: true },
  );

  /**
   * 设置表格列的 key 值
   * @param index { number } 表单项或表单项子组件的在数组的位置
   * @param label { string } 表单项的 prop 值或 子组件的 label 值
   * @return string 对应表格列的 key 值
   * @author 吴泽鑫 2022-11-12
   */
  const setKey = (index: number, label: string | undefined) => {
    if (typeof label === "undefined") {
      return index;
    } else {
      return index + label;
    }
  };
  /**
   * 处理defaultSlotConfig的事件对象
   * @param currentCellData { Object } 当前行数据对象
   * @param events { Object } 当前列的事件对象
   * @return Object 事件对象
   * @author 吴泽鑫 2022-12-08
   */
  const eventHandle = function (currentCellData: any, config: any) {
    if (!config.event) return;
    const eventObj = {};
    Object.keys(config.event).forEach((event) => {
      eventObj[event] = function () {
        config.event[event](currentCellData, ...arguments);
      };
    });
    return eventObj;
  };

  /**
   * 处理defaultSlotConfig
   * @param config { Object } 当前列的配置对象
   * @return Object 除去事件对象的当前列配置对象
   * @author 吴泽鑫 2022-12-08
   */
  const defaultSlotConfigHandle = function (config: CompType) {
    const { comp, data, key, attr, content, children, ref } = config;
    return {
      comp,
      data,
      key,
      attr,
      content,
      children,
      ref,
    };
  };
</script>

<style scoped lang="less"></style>
