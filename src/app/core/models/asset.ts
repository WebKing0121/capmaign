export class Asset {
  fileName: string;
  fileSize: number;
  imgPhysicalPath: string;
  lastModificationTime: string | null;
  creationTime: string;
  organizationUnitId: number;
  isDeleted: boolean;
  deleterUserId: number | null;
  deletionTime: string | null;
  lastModifierUserId: number | null;
  creatorUserId: number;
  id: number;
}
