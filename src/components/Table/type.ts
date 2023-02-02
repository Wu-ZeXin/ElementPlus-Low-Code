import type { Ref } from "vue";

export interface TableType {
  data: Array<any>;
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  loading?: Ref<boolean>;
  columnArr: Array<TableColumnType>;
  appendSlotConfig?: CompType;
  emptySlotConfig?: CompType;
}

interface TableColumnType {
  headerSlotName?: string;
  headerSlotConfig?: CompType;
  defaultSlotName?: string;
  defaultSlotConfig?: CompType | Array<CompType>;
  attr?: Recordable;
}
