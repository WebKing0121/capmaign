export class LandingPageCategory {
  categoryId: number;
  category: string;
  templateCount: number;
}

export class LandingPageTemplate {
  organizationUnitId: number;
  name: string;
  description: string | null;
  templateURL: string;
  templateType: number;
  categoryId: number;
  category: string;
  folderId: number;
  pageStatus: string;
  template: string | null;
  id: number;
}

export class LandingPage {
  pageNames: string;
  externalPageDisplayName: string | null;
  pageDescription: string | null;
  pageStatus: string;
  externalURL: string;
  organizationUnitId: number | null;
  isDeleted: boolean;
  deleterUserId: number | null;
  deletionTime: string | null;
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  creationTime: string;
  creatorUserId: number;
  id: number;
}
