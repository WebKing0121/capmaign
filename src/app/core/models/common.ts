export class NgSelectData {
  value: string;
  label: string;
}

export class GridColumn {
  columnName: string;
  columnOrder: number;
  columnWidth: number;
  fieldName: string;
  gridType: null | string;
  tenantId: null | number;
  userId: null | number;
}
