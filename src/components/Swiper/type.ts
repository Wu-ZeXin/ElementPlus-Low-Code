import type { Ref } from "vue";

interface SwiperSlideType {
  attr?: Recordable;
  swiperSlideDefault?: CompType;
  isActiveSlotName?: String;
  isPrevSlotName?: String;
  isNextSlotName?: String;
  isVisibleSlotName?: String;
  isDuplicateSlotName?: String;
}

interface ButtonSlotConfig {
  attr?: Recordable;
  childNode?: CompType;
}

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
