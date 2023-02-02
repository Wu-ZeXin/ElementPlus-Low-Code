import type { Ref } from "vue";

export interface MenuType {
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  itemArr: Array<MenuItemType>;
}

export interface MenuItemType {
  attr?: Recordable;
  event?: Recordable;
  itemArr?: Array<MenuItemType>;
  icon?: IconType;
  text?: string;
}
