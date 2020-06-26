export class Filter {
  id: number;
  name: string;
  description: string;
  defaultValue: string | null;
  booleanQuery: string;
  defaultFilterName: string | null;
  defaultFilterId: number;
  booleanQueryAsString: string;
  booleanQueryAsLinq: string;
  folderId: number;
  key: number;
  isExistingFilter: boolean;
  isDeleted: boolean;
  deleterUserId: number | null;
  deletionTime: string | null;
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  creationTime: string;
  creatorUserId: number;
}

export class FilterColumn {
  dataType: string;
  subDataType: string | null;
  defaultValue: string | number | null;
  maxlength: number;
  id: string | number;
  name: string;
}
