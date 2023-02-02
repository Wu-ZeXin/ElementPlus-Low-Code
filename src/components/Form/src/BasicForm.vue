<template>
  <el-form :model="data" v-bind="formOption.attr" :ref="setRef()">
    <el-row
      v-for="(item, index) of formOption.itemArr"
      :key="index"
      justify="space-between"
      class="default-form"
    >
      <el-col
        v-for="(formItem, index) of item"
        :key="setKey(index, formItem.attr?.prop)"
        :span="setSpan(item, formItem.span)"
        v-bind="formItem.colAttr"
      >
        <el-form-item v-bind="formItem.attr">
          <BasicComponent
            :elementOption="formItem.component"
            v-model="data[formItem.attr?.prop]"
            @click="
              triggerEvent(
                formItem.component.publicEvent,
                formItem.component.event?.submit,
                formItem.component.event?.reset,
              )
            "
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import { ref, unref } from "vue";
  import type { FormType, FormItemType } from "../type";

  const props = defineProps<{
    // 表单数据
    formOption: FormType;
  }>();

  const data = props.formOption.mode;

  // 表单Ref
  const formRef = ref();

  const setRef = function () {
    return typeof props.formOption.ref === "undefined" ? formRef : props.formOption.ref;
  };

  /**
   * 子组件触发的公共事件
   * @param val { string } 公共事件字符串
   * @return function 公共事件
   * @author 吴泽鑫 2022-11-12
   */
  const triggerEvent = (val: string | undefined, submit: Function, reset: Function) => {
    if (val === "submit" || submit) {
      (function () {
        setRef().value.validate((valid: boolean) => {
          if (!valid) return;
          submit && submit(unref(data));
          if (val === "reset") {
            setRef().value.resetFields();
          }
        });
      })();
    } else if (val === "reset" || reset) {
      (function () {
        reset && reset();
        setRef().value.resetFields();
      })();
    }
  };

  /**
   * 计算表单项的span
   * @param formItem { Array<FormItemType> } 表单一行的表单项数组
   * @param val { string | number } 表单项指定的 span 值
   * @return number span的值
   * @author 吴泽鑫 2022-11-12
   */
  const setSpan = (formItem: Array<FormItemType>, val: string | number | undefined) => {
    let spanValue = 24;
    let spanIndex = 0;
    formItem.forEach((item) => {
      if (item.hasOwnProperty("span")) {
        let value = typeof item.span === "string" ? parseInt(item.span) : (item.span as number);
        spanValue = spanValue - value;
        spanIndex++;
      }
    });
    if (val !== undefined) {
      return val;
    } else {
      return spanValue / (formItem.length - spanIndex);
    }
  };

  /**
   * 设置表单项或表单项子组件的 key 值
   * @param index { number } 表单项或表单项子组件的在数组的位置
   * @param prop { string } 表单项的 prop 值或 子组件的 label 值
   * @return string 对应表单项或表单项子组件的 key 值
   * @author 吴泽鑫 2022-11-12
   */
  const setKey = (index: number, prop: string | undefined) => {
    if (typeof prop === "undefined") {
      return index;
    } else {
      return index + prop;
    }
  };
</script>

<style scoped lang="less">
  .default-form {
    width: 100%;
    white-space: nowrap;
  }
</style>
