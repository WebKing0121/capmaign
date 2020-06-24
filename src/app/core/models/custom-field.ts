export class CustomField {
  name: string | null;
  displayName: string;
  mappedDBField: string;
  defaultValue: string | number | null;
  fieldDataType: string;
  isSelected: boolean;
  isDeleted: boolean;
  deleterUserId: number | null;
  deletionTime: string | null;
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  creationTime: string;
  creatorUserId: number | null;
  id: number;
}
