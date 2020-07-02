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
