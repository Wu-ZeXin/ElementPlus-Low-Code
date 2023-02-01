<template>
  <el-dropdown placement="bottom" trigger="click" @command="toggleLocale">
    <div>
      <span v-if="showText">{{ language }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="language_item of Object.values(LOCALE)"
          :command="language_item[0]"
          >{{ language_item[1] }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { unref, computed } from "vue";
  import type { LocaleType } from "#/setting";
  import { useLocale } from "@/locales/useLocale";
  import { LOCALE } from "@/settings/localeSetting";

  defineProps<{
    showText: boolean;
  }>();

  const { changeLocale, getLocale } = useLocale();

  /**
   * 依据本地语言 lang 切换语言配置
   * @param lang
   */
  async function toggleLocale(lang: LocaleType) {
    await changeLocale(lang as LocaleType);
    location.reload();
  }

  /**
   * 依据项目语言配置+项目运行语言配置 locale，返回下拉菜单文本显示内容
   */
  const language = computed(() => {
    const locale = unref(getLocale);
    for (let i = 0; i < Object.values(LOCALE).length; i++) {
      if (Object.values(LOCALE)[i][0] === locale) {
        return Object.values(LOCALE)[i][1];
      }
    }
  });
</script>

<style scoped lang="less">
  span {
    margin-left: 5px;
  }

  .loading {
    background: "rgba(0, 0, 0, 1)";
  }
</style>
