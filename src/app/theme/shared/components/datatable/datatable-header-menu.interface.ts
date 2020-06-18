import { DataTableSource } from '@app-components/datatable/datatable-source';

export interface DatatableHeaderMenuInterface {
  setDataSource: (tableSource: DataTableSource<any>) => void;
}
