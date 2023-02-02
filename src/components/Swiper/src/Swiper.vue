<template>
  <template v-if="swiperOption.buttonPrevSlotConfig">
    <div v-bind="swiperOption.buttonPrevSlotConfig.attr" slot="button-prev">
      <BasicComponent
        v-if="swiperOption.buttonPrevSlotConfig.childNode"
        :elementOption="swiperOption.buttonPrevSlotConfig.childNode"
      ></BasicComponent>
    </div>
  </template>
  <template v-if="swiperOption.buttonNextSlotConfig">
    <div v-bind="swiperOption.buttonNextSlotConfig.attr" slot="button-next">
      <BasicComponent
        v-if="swiperOption.buttonNextSlotConfig.childNode"
        :elementOption="swiperOption.buttonNextSlotConfig.childNode"
      ></BasicComponent>
    </div>
  </template>
  <swiper :ref="swiperOption.ref" v-bind="swiperOption.attr" v-on="swiperOption.event || {}">
    <template v-for="swiperSlideOption in swiperOption.swiperSlide">
      <swiper-slide v-if="swiperSlideOption.isActiveSlotName" v-slot="{ isActive }">
        <slot :name="swiperSlideOption.isActiveSlotName" :isActive="isActive"></slot>
      </swiper-slide>
      <swiper-slide v-else-if="swiperSlideOption.isPrevSlotName" v-slot="{ isPrev }">
        <slot :name="swiperSlideOption.isPrevSlotName" :isPrev="isPrev"></slot>
      </swiper-slide>
      <swiper-slide v-else-if="swiperSlideOption.isNextSlotName" v-slot="{ isNext }">
        <slot :name="swiperSlideOption.isNextSlotName" :isNext="isNext"></slot>
      </swiper-slide>
      <swiper-slide v-else-if="swiperSlideOption.isVisibleSlotName" v-slot="{ isVisible }">
        <slot :name="swiperSlideOption.isVisibleSlotName" :isVisible="isVisible"></slot>
      </swiper-slide>
      <swiper-slide v-else-if="swiperSlideOption.isDuplicateSlotName" v-slot="{ isDuplicate }">
        <slot :name="swiperSlideOption.isDuplicateSlotName" :isDuplicate="isDuplicate"></slot>
      </swiper-slide>
      <swiper-slide v-else v-bind="swiperSlideOption.attr">
        <BasicComponent :elementOption="swiperSlideOption.swiperSlideDefault"></BasicComponent>
      </swiper-slide>
    </template>
    <template v-if="swiperOption.containerStartSlotConfig" v-slot:container-start>
      <BasicComponent :elementOption="swiperOption.containerStartSlotConfig"></BasicComponent>
    </template>
    <template v-if="swiperOption.containerEndSlotConfig" v-slot:container-end>
      <BasicComponent :elementOption="swiperOption.containerEndSlotConfig"></BasicComponent>
    </template>
    <template v-if="swiperOption.wrapperStartSlotConfig" v-slot:wrapper-start>
      <BasicComponent :elementOption="swiperOption.wrapperStartSlotConfig"></BasicComponent>
    </template>
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
