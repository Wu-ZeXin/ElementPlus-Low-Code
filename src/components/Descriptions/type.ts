import type { Ref } from "vue";
export interface DescriptionsType {
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  itemArr: Array<DescriptionsItemType>;
  titleSlotConfig?: CompType;
  titleSlotName?: string;
  extraSlotConfig?: CompType;
  extraSlotName?: string;
}

interface DescriptionsItemType {
  attr?: Recordable;
  event?: Recordable;
  labelSlotName?: string;
  labelSlotConfig?: CompType;
  defaultSlotConfig?: CompType;
  defaultSlotName?: string;
}
