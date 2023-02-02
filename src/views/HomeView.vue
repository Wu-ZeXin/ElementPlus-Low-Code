<template>
  <AppLocalePicker :show-text="true"></AppLocalePicker>
  <div class="container">
    <h1>ElementPlus Low Code</h1>
  </div>
</template>

<script setup lang="ts">
  import { AppLocalePicker } from "@/components/Application";
</script>

<style scoped lang="less">
  .container {
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {
      font-size: 50px;
      font-weight: 700;
    }
  }
</style>
