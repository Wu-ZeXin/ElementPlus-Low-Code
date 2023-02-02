<template>
  <el-dialog v-model="dialogVisible.value" v-bind="attr" v-on="event || {}">
    <template v-if="header" #header>
      <BasicComponent :elementOption="header" />
    </template>
    <template v-for="(dialogItem, index) in content" :key="index">
      <BasicForm
        v-if="dialogItem.type === 'Form'"
        :formOption="<ContentFormType>dialogItem"
      ></BasicForm>
      <BasicTable
        v-else-if="dialogItem.type === 'Table'"
        :tableOption="<ContentTableType>dialogItem"
      >
      </BasicTable>
      <BasicComponent v-else :elementOption="dialogItem" />
    </template>
    <template v-if="footer" #footer>
      <BasicComponent :elementOption="footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { Ref } from "vue";
  import { BasicForm } from "@/components/Form";
  import { BasicTable } from "@/components/Table";
  import type { ContentType, ContentFormType, ContentTableType } from "../type";

  defineProps<{
    dialogVisible: Ref<boolean>;
    attr?: { type: Object; default: {} };
    event?: { type: Object; default: {} };
    header?: CompType;
    content?: Array<ContentType>;
    footer?: CompType;
  }>();
</script>

<style lang="less"></style>
