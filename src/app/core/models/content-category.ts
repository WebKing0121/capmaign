export class ContentCategory {
  creationTime: string;
  creatorUserId: number | null;
  deleterUserId: number | null;
  deletionTime: string | null;
  id: number;
  isDeleted: boolean;
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  names: string;
  organizationUnitId: number;
  tenant: string | null;
  tenantId: number | null;
  templateCount?: number;
}
