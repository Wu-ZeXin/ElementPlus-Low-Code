<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { useLocale } from "@/locales/useLocale";

const { getElLocale } = useLocale();
</script>

<template>
  <el-config-provider :locale="getElLocale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped lang="less">
</style>
