# Use Swiper at Vue

## 一、安装Swiper、vue-awesome-swiper

```shell
npm install swiper@8.4.5 vue-awesome-swiper@5.0.1
```

## 二、实现Swiper低代码方式封装

- 组件——`components/Swiper/src/Swiper.vue`

  ```vue
  <template>
    <!-- 自定义轮播键—上一页 -->
    <template v-if="swiperOption.buttonPrevSlotConfig">
      <div v-bind="swiperOption.buttonPrevSlotConfig.attr" slot="button-prev">
        <BasicComponent
          v-if="swiperOption.buttonPrevSlotConfig.childNode"
          :elementOption="swiperOption.buttonPrevSlotConfig.childNode"
        ></BasicComponent>
      </div>
    </template>
    <!-- 自定义轮播键—下一页 -->
    <template v-if="swiperOption.buttonNextSlotConfig">
      <div v-bind="swiperOption.buttonNextSlotConfig.attr" slot="button-next">
        <BasicComponent
          v-if="swiperOption.buttonNextSlotConfig.childNode"
          :elementOption="swiperOption.buttonNextSlotConfig.childNode"
        ></BasicComponent>
      </div>
    </template>
    <!-- 轮播图组件 -->
    <swiper :ref="swiperOption.ref" v-bind="swiperOption.attr" v-on="swiperOption.event || {}">
      <template v-for="swiperSlideOption in swiperOption.swiperSlide">
    	  <!-- 当前激活的轮播页插槽 -->
        <swiper-slide v-if="swiperSlideOption.isActiveSlotName" v-slot="{ isActive }">
          <slot :name="swiperSlideOption.isActiveSlotName" :isActive="isActive"></slot>
        </swiper-slide>
    	  <!-- 当前激活的轮播页上一页插槽 -->
        <swiper-slide v-else-if="swiperSlideOption.isPrevSlotName" v-slot="{ isPrev }">
          <slot :name="swiperSlideOption.isPrevSlotName" :isPrev="isPrev"></slot>
        </swiper-slide>
    	  <!-- 当前激活的轮播页下一页插槽 -->
        <swiper-slide v-else-if="swiperSlideOption.isNextSlotName" v-slot="{ isNext }">
          <slot :name="swiperSlideOption.isNextSlotName" :isNext="isNext"></slot>
        </swiper-slide>
    	  <!-- 轮播页是否可见 -->
        <swiper-slide v-else-if="swiperSlideOption.isVisibleSlotName" v-slot="{ isVisible }">
          <slot :name="swiperSlideOption.isVisibleSlotName" :isVisible="isVisible"></slot>
        </swiper-slide>
    	  <!--  -->
        <swiper-slide v-else-if="swiperSlideOption.isDuplicateSlotName" v-slot="{ isDuplicate }">
          <slot :name="swiperSlideOption.isDuplicateSlotName" :isDuplicate="isDuplicate"></slot>
        </swiper-slide>
    	  <!-- 默认轮播页 -->
        <swiper-slide v-else v-bind="swiperSlideOption.attr">
          <BasicComponent :elementOption="swiperSlideOption.swiperSlideDefault"></BasicComponent>
        </swiper-slide>
      </template>
    	<!--  -->
      <template v-if="swiperOption.containerStartSlotConfig" v-slot:container-start>
        <BasicComponent :elementOption="swiperOption.containerStartSlotConfig"></BasicComponent>
      </template>
      <!--  -->
      <template v-if="swiperOption.containerEndSlotConfig" v-slot:container-end>
        <BasicComponent :elementOption="swiperOption.containerEndSlotConfig"></BasicComponent>
      </template>
      <!--  -->
      <template v-if="swiperOption.wrapperStartSlotConfig" v-slot:wrapper-start>
        <BasicComponent :elementOption="swiperOption.wrapperStartSlotConfig"></BasicComponent>
      </template>
      <!--  -->
      <template v-if="swiperOption.wrapperEndSlotConfig" v-slot:wrapper-end>
        <BasicComponent :elementOption="swiperOption.wrapperEndSlotConfig"></BasicComponent>
      </template>
    </swiper>
  </template>
  
  <script setup lang="ts">
    import { Swiper, SwiperSlide } from "swiper/vue";
    import type { SwiperType } from "../type";
    import "swiper/css/bundle";
  
    defineProps<{
      swiperOption: SwiperType;
    }>();
  </script>
  
  <style scoped lang="less"></style>
  ```

- 组件类型文件——`components/Swiper/types.ts`

  ```ts
  import type { Ref } from "vue";
  
  // 单个轮播项渲染对象的数据类型
  interface SwiperSlideType {
    attr?: Recordable;
    swiperSlideDefault?: CompType;
    isActiveSlotName?: String;
    isPrevSlotName?: String;
    isNextSlotName?: String;
    isVisibleSlotName?: String;
    isDuplicateSlotName?: String;
  }
  
  // 轮播按钮渲染对象的数据类型
  interface ButtonSlotConfig {
    attr?: Recordable;
    childNode?: CompType;
  }
  
  // 轮播渲染对象的数据类型
  export interface SwiperType {
    attr?: Recordable;
    event?: Recordable;
    ref?: Ref<T>;
    swiperSlide: Array<SwiperSlideType>;
    containerStartSlotConfig?: CompType;
    containerEndSlotConfig?: CompType;
    wrapperStartSlotConfig?: CompType;
    wrapperEndSlotConfig?: CompType;
    buttonNextSlotConfig?: ButtonSlotConfig;
    buttonPrevSlotConfig?: ButtonSlotConfig;
  }
  ```

- 特性

  1. Swiper组件的渲染配置对象需使用响应式`reactive`

- 参数`json`格式

  ```json
  
  ```

- 