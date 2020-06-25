export const DataFiltersMock = {
  result: {
    totalCount: 11,
    items: [
      {
        id: 37,
        name: 'City Address',
        description: 'Filter created in automation',
        defaultValue: null,
        // tslint:disable-next-line
        booleanQuery: 'PersonalAddressCity = \"Bangalore\" OR PersonalAddressCity = \"Delhi\" OR PersonalAddressCity = \"Kolkata\" OR (Record.EmailAddress = \"uarora@campaigntocash.com\")',
        defaultFilterName: null,
        defaultFilterId: 0,
        // tslint:disable-next-line
        booleanQueryAsString: '(PersonalAddressCity==\"Bangalore\"||PersonalAddressCity==\"Delhi\"||PersonalAddressCity==\"Kolkata\"||(Record.EmailAddress==\"uarora@campaigntocash.com\"))',
        // tslint:disable-next-line
        booleanQueryAsLinq: 'string.Compare(PersonalAddressCity,  \"Bangalore\", true) == 0 OR string.Compare(PersonalAddressCity,  \"Delhi\", true) == 0 OR string.Compare(PersonalAddressCity,  \"Kolkata\", true) == 0 OR (string.Compare(Record.EmailAddress,  \"uarora@campaigntocash.com\", true) == 0)',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: '2020-06-17T09:58:37.06Z',
        lastModifierUserId: 152,
        creationTime: '2020-04-17T09:50:34.397Z',
        creatorUserId: 1
      },
      {
        id: 14,
        name: 'filter test',
        description: 'Filter created in automation',
        defaultValue: null,
        booleanQuery: 'Gender = \"male\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        booleanQueryAsString: '(Gender==\"male\")',
        booleanQueryAsLinq: 'string.Compare(Gender,  \"male\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: '2020-05-13T08:05:31.227Z',
        lastModifierUserId: 152,
        creationTime: '2018-02-02T08:38:35.823Z',
        creatorUserId: 1
      },
      {
        id: 38,
        name: 'Email Campaign for Spring Summer Collection',
        description: null,
        defaultValue: null,
        booleanQuery: 'BillingAddressState = \"Delhi\" OR BillingAddressState = \"Karnataka\" OR BillingAddressState = \"West Bengal\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        // tslint:disable-next-line
        booleanQueryAsString: '(BillingAddressState==\"Delhi\"||BillingAddressState==\"Karnataka\"||BillingAddressState==\"West Bengal\")',
        // tslint:disable-next-line
        booleanQueryAsLinq: 'string.Compare(BillingAddressState,  \"Delhi\", true) == 0 OR string.Compare(BillingAddressState,  \"Karnataka\", true) == 0 OR string.Compare(BillingAddressState,  \"West Bengal\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: '2020-04-29T11:41:35.347Z',
        lastModifierUserId: 152,
        creationTime: '2020-04-27T03:19:55.873Z',
        creatorUserId: 152
      },
      {
        id: 30,
        name: 'Go Air-basis on income and office',
        description: 'Potential leads for business class',
        defaultValue: null,
        booleanQuery: 'NumericField1 = \"3000000\" OR CorporateAddressCity = \"Bangalore\" OR Company = \"Thoughtworks\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        booleanQueryAsString: '(NumericField1==\"3000000\"||CorporateAddressCity==\"Bangalore\"||Company==\"Thoughtworks\")',
        // tslint:disable-next-line
        booleanQueryAsLinq: 'NumericField1 == 3000000 OR string.Compare(CorporateAddressCity,  \"Bangalore\", true) == 0 OR string.Compare(Company,  \"Thoughtworks\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: '2019-06-05T09:31:28.927Z',
        lastModifierUserId: 1,
        creationTime: '2019-05-27T18:31:39.673Z',
        creatorUserId: 1
      },
      {
        id: 20,
        name: 'BASIS ON LOCATION AND REQUIREMENT',
        description: 'FILTER  FOR SORTING TYPE OF ORGANIZATION',
        defaultValue: null,
        // tslint:disable-next-line
        booleanQuery: 'NumberOfEmployees > \"1500\" OR AnnualRevenue >= \"50000\" OR CorporateAddressCountry = \"CANADA\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        // tslint:disable-next-line
        booleanQueryAsString: '(NumberOfEmployees>\"1500\"||AnnualRevenue>=\"50000\"||CorporateAddressCountry==\"CANADA\")',
        // tslint:disable-next-line
        booleanQueryAsLinq: 'NumberOfEmployees greater than 1500 OR AnnualRevenue greater than or equal to 50000 OR string.Compare(CorporateAddressCountry,  \"CANADA\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: '2019-01-16T09:49:03.037Z',
        lastModifierUserId: 1,
        creationTime: '2018-09-06T12:41:49.51Z',
        creatorUserId: 1
      },
      {
        id: 39,
        name: 'Filter for Demo',
        description: '',
        defaultValue: null,
        booleanQuery: 'PersonalAddressCity = \"Delhi\" OR PersonalAddressState = \"West Bengal\" OR PersonalAddressState = \"Karnataka\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        // tslint:disable-next-line
        booleanQueryAsString: '(PersonalAddressCity==\"Delhi\"||PersonalAddressState==\"West Bengal\"||PersonalAddressState==\"Karnataka\")',
        // tslint:disable-next-line
        booleanQueryAsLinq: 'string.Compare(PersonalAddressCity,  \"Delhi\", true) == 0 OR string.Compare(PersonalAddressState,  \"West Bengal\", true) == 0 OR string.Compare(PersonalAddressState,  \"Karnataka\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierUserId: null,
        creationTime: '2020-05-07T09:51:56.443Z',
        creatorUserId: 152
      },
      {
        id: 32,
        name: 'Demo Filter',
        description: '',
        defaultValue: null,
        booleanQuery: 'FirstName = \"Prasad\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        booleanQueryAsString: '(FirstName==\"Prasad\")',
        booleanQueryAsLinq: 'string.Compare(FirstName,  \"Prasad\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierUserId: null,
        creationTime: '2019-08-06T11:56:47.52Z',
        creatorUserId: 1
      },
      {
        id: 33,
        name: 'Record',
        description: 'Filter created in automation',
        defaultValue: null,
        booleanQuery: 'RecordType = \"Lead\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        booleanQueryAsString: '(RecordType==\"Lead\")',
        booleanQueryAsLinq: 'string.Compare(RecordType,  \"Lead\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierUserId: null,
        creationTime: '2020-01-15T09:30:27.477Z',
        creatorUserId: 1
      },
      {
        id: 34,
        name: 'Record',
        description: 'Filter created in automation',
        defaultValue: null,
        booleanQuery: 'RecordType = \"Lead\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        booleanQueryAsString: '(RecordType==\"Lead\")',
        booleanQueryAsLinq: 'string.Compare(RecordType,  \"Lead\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierUserId: null,
        creationTime: '2020-01-15T09:30:29.627Z',
        creatorUserId: 1
      },
      {
        id: 35,
        name: 'Ranbow filter',
        description: '',
        defaultValue: null,
        booleanQuery: 'FirstName like \"%abdul%\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        booleanQueryAsString: '(FirstNamelike\"abdul\")',
        booleanQueryAsLinq: 'FirstName != null && FirstName.ToLower().Contains(\"abdul\")',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierUserId: null,
        creationTime: '2020-04-14T03:16:08.08Z',
        creatorUserId: 149
      },
      {
        id: 36,
        name: 'New 1234',
        description: 'Filter created in automation',
        defaultValue: null,
        booleanQuery: 'Record.EmailAddress = \"prasad.undale@waiin.com\"',
        defaultFilterName: null,
        defaultFilterId: 0,
        booleanQueryAsString: '(Record.EmailAddress==\"prasad.undale@waiin.com\")',
        booleanQueryAsLinq: 'string.Compare(Record.EmailAddress,  \"prasad.undale@waiin.com\", true) == 0',
        folderId: 0,
        key: 0,
        isExistingFilter: false,
        isDeleted: false,
        deleterUserId: null,
        deletionTime: null,
        lastModificationTime: null,
        lastModifierUserId: null,
        creationTime: '2020-04-17T08:08:03.813Z',
        creatorUserId: 1
      }
    ]
  },
  targetUrl: null,
  success: true,
  error: null,
  unAuthorizedRequest: false,
  __abp: true
};

export const filterColumnsMock = {
  result: [
    {
      dataType: 'Text',
      subDataType: 'Guid',
      defaultValue: null,
      maxlength: 1000,
      id: 'AccountId',
      name: 'AccountId'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 130,
      id: 'AccountName',
      name: 'AccountName'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'AccountNumber',
      name: 'AccountNumber'
    },
    {
      dataType: 'Boolean',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'AccountOptOut',
      name: 'AccountOptOut'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 130,
      id: 'AccountOwner',
      name: 'AccountOwner'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 256,
      id: 'AccountSite',
      name: 'AccountSite'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 256,
      id: 'AccountType',
      name: 'AccountType'
    },
    {
      dataType: 'Numeric',
      subDataType: 'Double',
      defaultValue: null,
      maxlength: 1000,
      id: 'Amount',
      name: 'Amount'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField97',
      name: 'Annual Salary'
    },
    {
      dataType: 'Numeric',
      subDataType: 'Int',
      defaultValue: null,
      maxlength: 1000,
      id: 'AnnualRevenue',
      name: 'AnnualRevenue'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: 'AF',
      maxlength: 1000,
      id: 'TextField76',
      name: 'ashish'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 130,
      id: 'Assistant',
      name: 'Assistant'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 30,
      id: 'AssistantPhone',
      name: 'AssistantPhone'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'BillingAddressCity',
      name: 'BillingAddressCity'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'BillingAddressCountry',
      name: 'BillingAddressCountry'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'BillingAddressState',
      name: 'BillingAddressState'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'BillingAddressStreet1',
      name: 'BillingAddressStreet1'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'BillingAddressStreet2',
      name: 'BillingAddressStreet2'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'BillingAddressZip',
      name: 'BillingAddressZip'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Challange',
      name: 'Challange'
    },
    {
      dataType: 'Date',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'ClosingDate',
      name: 'ClosingDate'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'Company',
      name: 'Company'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'CompanyType',
      name: 'CompanyType'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'CorporateAddressCity',
      name: 'CorporateAddressCity'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'CorporateAddressCountry',
      name: 'CorporateAddressCountry'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'CorporateAddressState',
      name: 'CorporateAddressState'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'CorporateAddressStreet1',
      name: 'CorporateAddressStreet1'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'CorporateAddressStreet2',
      name: 'CorporateAddressStreet2'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'CorporateAddressZip',
      name: 'CorporateAddressZip'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 0,
      id: 'CreatedBy.UserName',
      name: 'CreatedBy'
    },
    {
      dataType: 'Date',
      subDataType: null,
      defaultValue: null,
      maxlength: 0,
      id: 'Record.CreationTime',
      name: 'CreatedDate'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField91',
      name: 'Current Company Name'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField84',
      name: 'Database Name'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField94',
      name: 'Date of Birth'
    },
    {
      dataType: 'Date',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'DOB',
      name: 'DOB'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 255,
      id: 'Record.EmailAddress',
      name: 'EmailAddress'
    },
    {
      dataType: 'Numeric',
      subDataType: 'Double',
      defaultValue: null,
      maxlength: 1000,
      id: 'ExpectedRevenue',
      name: 'ExpectedRevenue'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Experience',
      name: 'Experience'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 255,
      id: 'FaceBookURL',
      name: 'FaceBookURL'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 30,
      id: 'Fax',
      name: 'Fax'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: 'e',
      maxlength: 1000,
      id: 'TextField77',
      name: 'fdfd'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'FirstName',
      name: 'FirstName'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField99',
      name: 'Functional Area'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Gender',
      name: 'Gender'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 30,
      id: 'HomePhone',
      name: 'HomePhone'
    },
    {
      dataType: 'Numeric',
      subDataType: 'Int',
      defaultValue: null,
      maxlength: 1000,
      id: 'ImportedFileStagingId',
      name: 'ImportedFileStagingId'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'Industry',
      name: 'Industry'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField98',
      name: 'Industry'
    },
    {
      dataType: 'Boolean',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'IsSubscribed',
      name: 'IsSubscribed'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Language',
      name: 'Language'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 0,
      id: 'LastModified.UserName',
      name: 'LastModifiedBy'
    },
    {
      dataType: 'Date',
      subDataType: null,
      defaultValue: null,
      maxlength: 0,
      id: 'Record.LastModificationTime',
      name: 'LastModifiedDate'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'LastName',
      name: 'LastName'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'LeadAdditionalDatas',
      name: 'LeadAdditionalDatas'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 20,
      id: 'LeadGrade',
      name: 'LeadGrade'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 130,
      id: 'LeadOwner',
      name: 'LeadOwner'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 20,
      id: 'LeadScore',
      name: 'LeadScore'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 30,
      id: 'LeadSource',
      name: 'LeadSource'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'LeadStatus',
      name: 'LeadStatus'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 255,
      id: 'LinkedinURL',
      name: 'LinkedinURL'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Location',
      name: 'Location'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField86',
      name: 'Marital Status'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'MiddleName',
      name: 'MiddleName'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 30,
      id: 'MobileNumberOffice',
      name: 'MobileNumberOffice'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 30,
      id: 'MobileNumberPersonal',
      name: 'MobileNumberPersonal'
    },
    {
      dataType: 'Boolean',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'MobileOptOut',
      name: 'MobileOptOut'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 200,
      id: 'NextStep',
      name: 'NextStep'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField93',
      name: 'Notice Period'
    },
    {
      dataType: 'Numeric',
      subDataType: 'Int',
      defaultValue: null,
      maxlength: 1000,
      id: 'NumberOfEmployees',
      name: 'NumberOfEmployees'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 30,
      id: 'OfficePhone',
      name: 'OfficePhone'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'OrganizationalUnit',
      name: 'OrganizationalUnit'
    },
    {
      dataType: 'Numeric',
      subDataType: 'Int',
      defaultValue: null,
      maxlength: 1000,
      id: 'OrganizationUnitId',
      name: 'OrganizationUnitId'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField81',
      name: 'Other Number1'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField80',
      name: 'Other Number2'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField8',
      name: 'Other number3'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'OtherAddressCity',
      name: 'OtherAddressCity'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'OtherAddressCountry',
      name: 'OtherAddressCountry'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'OtherAddressState',
      name: 'OtherAddressState'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'OtherAddressStreet1',
      name: 'OtherAddressStreet1'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'OtherAddressStreet2',
      name: 'OtherAddressStreet2'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'OtherAddressZip',
      name: 'OtherAddressZip'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Ownership',
      name: 'Ownership'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'PersonalAddressApartment',
      name: 'PersonalAddressApartment'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'PersonalAddressCity',
      name: 'PersonalAddressCity'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'PersonalAddressCountry',
      name: 'PersonalAddressCountry'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'PersonalAddressState',
      name: 'PersonalAddressState'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'PersonalAddressStreet1',
      name: 'PersonalAddressStreet1'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'PersonalAddressStreet2',
      name: 'PersonalAddressStreet2'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'PersonalAddressZip',
      name: 'PersonalAddressZip'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 255,
      id: 'PersonalEmail',
      name: 'PersonalEmail'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'PersonalWebURL',
      name: 'PersonalWebURL'
    },
    {
      dataType: 'Boolean',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'PhoneOptOut',
      name: 'PhoneOptOut'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField79',
      name: 'Pincode'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField96',
      name: 'Post Graduation Degree'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField88',
      name: 'Post Graduation Specialization'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField87',
      name: 'Post Graduation University Name'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField95',
      name: 'Post Graduation Year'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: 'Assginment',
      maxlength: 1000,
      id: 'TextField75',
      name: 'Prashant'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 20,
      id: 'Probability',
      name: 'Probability'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 130,
      id: 'ProspectsOwner',
      name: 'ProspectsOwner'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 0,
      id: 'QRCode',
      name: 'QRCode'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 20,
      id: 'RecordStatus',
      name: 'RecordStatus'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 20,
      id: 'RecordType',
      name: 'RecordType'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField78',
      name: 'Requirement'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField1',
      name: 'Requirement Name'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Role',
      name: 'Role'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 20,
      id: 'Salutation',
      name: 'Salutation'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'ScorePerRule',
      name: 'ScorePerRule'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 255,
      id: 'SecondaryEmail',
      name: 'SecondaryEmail'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'SendableStatus',
      name: 'SendableStatus'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'ShippingAddressCity',
      name: 'ShippingAddressCity'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'ShippingAddressCountry',
      name: 'ShippingAddressCountry'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'ShippingAddressState',
      name: 'ShippingAddressState'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'ShippingAddressStreet1',
      name: 'ShippingAddressStreet1'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'ShippingAddressStreet2',
      name: 'ShippingAddressStreet2'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'ShippingAddressZip',
      name: 'ShippingAddressZip'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 20,
      id: 'SICCode',
      name: 'SICCode'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 255,
      id: 'SkypeID',
      name: 'SkypeID'
    },
    {
      dataType: 'Boolean',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'SocialOptOut',
      name: 'SocialOptOut'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField82',
      name: 'Source'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'Stage',
      name: 'Stage'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField83',
      name: 'Telecom Operator'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 20,
      id: 'TickerSymbol',
      name: 'TickerSymbol'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Timeline',
      name: 'Timeline'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'Title',
      name: 'Title'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField92',
      name: 'Total Experience'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 1000,
      id: 'TransactionType',
      name: 'TransactionType'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 255,
      id: 'TwitterURL',
      name: 'TwitterURL'
    },
    {
      dataType: 'Text',
      subDataType: '',
      defaultValue: null,
      maxlength: 50,
      id: 'Type',
      name: 'Type'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField90',
      name: 'Under Graduation Degree'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField9',
      name: 'Under Graduation Specialization'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField89',
      name: 'Under Graduation Year'
    },
    {
      dataType: 'Text',
      subDataType: null,
      defaultValue: null,
      maxlength: 1000,
      id: 'TextField85',
      name: 'Work Permit'
    }
  ],
  targetUrl: null,
  success: true,
  error: null,
  unAuthorizedRequest: false,
  __abp: true
};
