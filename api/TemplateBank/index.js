const { Schema, default: mongoose } = require("mongoose");
const { dbConn } = require("../../system/db/mongo");

//company_conflict_check
const PersonContactSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});

const BriefDescriptionMatterSchema = new Schema({
  file: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  chineseWallsAgreement: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
  noteToLegalServices: {
    type: Boolean,
    default: false,
  },
  rfpAccessOption: {
    type: String,
    enum: ["conflict_check_clearance", "fast_track"],
    required: true,
  },
});

const CompanyConflictCheckSchema = new Schema({
  conflict_check: {
    type: String,
    required: true,
  },
  person_contact: [PersonContactSchema],
  email: [
    {
      type: String,
      required: true,
    },
  ],
  counter_name: [
    {
      type: String,
      required: true,
    },
  ],
  brief_description_matter: BriefDescriptionMatterSchema,
});

//Preliminary Information Schema
const GoverningLawSchema = new Schema({
  jurisdiction: {
    type: String,
    required: true,
  },
  governingLaw_legal_document: [
    {
      country: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  language_of_legal_document: [
    {
      language: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  prefer_language_of_correspondence: [
    {
      language: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
});

const ProjectInfoSchema = new Schema({
  project_name: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  complexity: {
    type: Number,
  },
  comment: {
    type: String,
  },
  objective_of_project: {
    type: String,
  },
  file: [
    {
      type: String,
    },
  ],
});

const DeadlineSchema = new Schema({
  confirmationDate: {
    type: Date,
    required: true,
  },
  proposalSubmissionDate: {
    type: Date,
    required: true,
  },
  time_zone: {
    type: String,
    required: true,
  },
});

const RfpTermsConditionSchema = new Schema({
  termsConditionsPreAgreed: {
    type: Boolean,
    default: false,
  },
  termsConditionsAgreement: {
    type: String,
    enum: ["agreed_with_winner", "our_terms", "add_file", "middle_of_the_road"],
    required: false,
  },
  termsConditionsFile: {
    type: String,
  },
});

const PreliminaryInformationSchema = new Schema({
  project_info: [ProjectInfoSchema],
  governing_law: [GoverningLawSchema],
  deadlines: [DeadlineSchema],
  ecw: {
    type: Boolean,
    default: false,
  },
  rfp_terms_condition: RfpTermsConditionSchema,
});

//ScopeOfWork Main Schema//
const CommercialContractsSchema = new Schema({
  legal_advice: {
    date: { type: Date },
    comment: { type: String },
  },
  contract_drafting: {
    date: { type: Date },
    comment: { type: String },
  },
  contract_review: {
    date: { type: Date },
    comment: { type: String },
  },
  negotiation: {
    date: { type: Date },
    comment: { type: String },
  },
  regulatory: {
    date: { type: Date },
    comment: { type: String },
  },
  others: {
    date: { type: Date },
    comment: { type: String },
  },
  comment: { type: String },
  file: [{ type: String }],
});

const BehaviouralWorkSchema = new Schema({
  cartel_investigation: {
    date: { type: Date },
    comment: { type: String },
  },
  antitrust_investigation: {
    date: { type: Date },
    comment: { type: String },
  },
  state_aid_investigation: {
    date: { type: Date },
    comment: { type: String },
  },
  others: {
    date: { type: Date },
    comment: { type: String },
  },
});

const CompetitionSchema = new Schema({
  transactional_work: {
    merger_control_advice: {
      date: { type: Date },
      comment: { type: String },
    },
    advice: {
      date: { type: Date },
      comment: { type: String },
    },
  },
  behavioural_work: BehaviouralWorkSchema,
  file: [{ type: String }],
});

// Corporate M&A Schema
const CorporateMASchema = new Schema({
  term_sheet_negotiation: {
    date: { type: Date },
    comment: { type: String },
  },
  due_diligence: {
    date: { type: Date },
    comment: { type: String },
    red_flag_only: { type: Boolean },
    vendor_idd: { type: Boolean },
    online_data_room: { type: Boolean },
    key_area_of_focus: [{ type: String }],
  },
  regulatory: {
    date: { type: Date },
    comment: { type: String },
  },
  transaction_doc: [
    {
      date: { type: Date },
      comment: { type: String },
    },
  ],
  draft_main_doc: { type: Boolean },
  review_main_doc: { type: Boolean },
  wi_policy: {
    date: { type: Date },
    comment: { type: String },
  },
  financing: {
    date: { type: Date },
    comment: { type: String },
  },
  signing_process: {
    date: { type: Date },
    comment: { type: String },
  },
  closing_process: {
    date: { type: Date },
    comment: { type: String },
  },
  others: {
    date: { type: Date },
    comment: { type: String },
  },
  file: [{ type: String }],
});

// Data Protection & Privacy Schema
const DataProtectionPrivacySchema = new Schema({
  data_protection_programme: {
    date: { type: Date },
    comment: { type: String },
  },
  new_processing_system: {
    date: { type: Date },
    comment: { type: String },
  },
  review_data_protection: {
    date: { type: Date },
    comment: { type: String },
  },
  localise_data_protection: {
    date: { type: Date },
    comment: { type: String },
  },
  advice_change_law: {
    date: { type: Date },
    comment: { type: String },
  },
  data_protection_reprepared: {
    date: { type: Date },
    comment: { type: String },
  },
  direct_marketing: {
    date: { type: Date },
    comment: { type: String },
  },
  record_rentation: {
    date: { type: Date },
    comment: { type: String },
  },
  data_security_breach: {
    date: { type: Date },
    comment: { type: String },
  },
  excercise_data_subject_rights: {
    date: { type: Date },
    comment: { type: String },
  },
  data_protection_regulatory: {
    date: { type: Date },
    comment: { type: String },
  },
  retainer_ad: {
    date: { type: Date },
    comment: { type: String },
  },
  data_protecting_training: {
    date: { type: Date },
    comment: { type: String },
  },
  others: {
    date: { type: Date },
    comment: { type: String },
  },
  file: [{ type: String }],
});

// Employment Schema
const EmploymentSchema = new Schema({
  generalHRLegalAdvice: {
    date: { type: Date },
    comment: { type: String },
  },
  reviewOfHRContracts: {
    date: { type: Date },
    comment: { type: String },
  },
  draftingReviewingEmploymentContracts: {
    date: { type: Date },
    comment: { type: String },
  },
  advisingOnRestrictionsForNewHires: {
    date: { type: Date },
    comment: { type: String },
  },
  redundancy: {
    date: { type: Date },
    comment: { type: String },
  },
  dismissalSettlementAgreement: {
    date: { type: Date },
    comment: { type: String },
  },
  employmentBenefits: {
    date: { type: Date },
    comment: { type: String },
  },
  consultantsContractorsArrangements: {
    date: { type: Date },
    comment: { type: String },
  },
  supplyOfStaffArrangements: {
    date: { type: Date },
    comment: { type: String },
  },
  HRAspectsOfOutsourcingInsourcing: {
    date: { type: Date },
    comment: { type: String },
  },
  adviceInRespectOfGrievance: {
    date: { type: Date },
    comment: { type: String },
  },
  adviceInRespectOfDisciplinaryProcess: {
    date: { type: Date },
    comment: { type: String },
  },
  crossBorderAdvisoryProject: {
    date: { type: Date },
    comment: { type: String },
  },
  immigrationVisas: {
    date: { type: Date },
    comment: { type: String },
  },
  discriminationDiversityEqualOpportunities: {
    date: { type: Date },
    comment: { type: String },
  },
  employmentInvestigation: {
    date: { type: Date },
    comment: { type: String },
  },
  newProposedEmploymentLegislation: {
    date: { type: Date },
    comment: { type: String },
  },
  reportingObligations: {
    date: { type: Date },
    comment: { type: String },
  },
  protectingConfidentialInformation: {
    date: { type: Date },
    comment: { type: String },
  },
  performanceManagement: {
    date: { type: Date },
    comment: { type: String },
  },
  longTermSickness: {
    date: { type: Date },
    comment: { type: String },
  },
  remunerationPackageIncentivesDesign: {
    date: { type: Date },
    comment: { type: String },
  },
  ongoingRemunerationIncentivesAdvice: {
    date: { type: Date },
    comment: { type: String },
  },
  whistleblowing: {
    date: { type: Date },
    comment: { type: String },
  },
  employeeHealthSafety: {
    date: { type: Date },
    comment: { type: String },
  },
  adviceRelatedToPensions: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
  comment: { type: String },
  file: [{ type: String }],
});

const derivativesStructureProductSchema = new Schema({
  structure_credit_product: {
    date: { type: Date },
    comment: { type: String },
  },
  structure_equity_product: {
    date: { type: Date },
    comment: { type: String },
  },
  interest_inflation_product: {
    date: { type: Date },
    comment: { type: String },
  },
  commodity_transaction: {
    date: { type: Date },
    comment: { type: String },
  },
  etp_platform: {
    date: { type: Date },
    comment: { type: String },
  },
  prime_brokerage_agreements: {
    date: { type: Date },
    comment: { type: String },
  },
  credit_risk_mitigation: {
    date: { type: Date },
    comment: { type: String },
  },
  repos_securities_landing: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
});

const FinancingCapitalMarketSchema = new Schema({
  exclusivity: {
    nonExclusiveBasis: {
      type: Boolean,
      comment: { type: String },
    },
    exclusiveBasis: {
      type: Boolean,
      comment: { type: String },
    },
  },
  asset_leasing_finance: {
    date: { type: Date },
    comment: { type: String },
    structuring: { type: Boolean },
    documentation: { type: Boolean },
    advisory: { type: Boolean },
    due_diligence: { type: Boolean },
  },
  corporate_lending: {
    date: { type: Date },
    comment: { type: String },
  },
  debt_capital_markets: {
    date: { type: Date },
    comment: { type: String },
  },
  equity_capital_markets: {
    date: { type: Date },
    comment: { type: String },
  },
  islamic_finance: {
    date: { type: Date },
    comment: { type: String },
  },
  leveraged_acquisition_finance: {
    date: { type: Date },
    comment: { type: String },
  },
  real_estate_finance: {
    date: { type: Date },
    comment: { type: String },
  },
  securitisation: {
    date: { type: Date },
    comment: { type: String },
  },
  derivatives_structure_product: derivativesStructureProductSchema,
  trade_commodities_finance: {
    date: { type: Date },
    comment: { type: String },
  },
  corporate_trust: {
    date: { type: Date },
    comment: { type: String },
  },
  others: {
    date: { type: Date },
    comment: { type: String },
  },
  regulatory_compliance: {
    date: { type: Date },
    comment: { type: String },
  },
  enforcement: {
    date: { type: Date },
    comment: { type: String },
  },
  file: [{ type: String }],
});

// Project Financing Schema
const ProjectFinancingSchema = new Schema({
  tender_phase: {
    date: { type: Date },
    comment: { type: String },
  },
  structuring_establishment_of_SPV_vehicle: {
    date: { type: Date },
    comment: { type: String },
  },
  due_diligence: {
    date: { type: Date },
    comment: { type: String },
  },
  sponsor_documents: {
    date: { type: Date },
    comment: { type: String },
  },
  project_agreements: {
    date: { type: Date },
    comment: { type: String },
  },
  financing: {
    date: { type: Date },
    comment: { type: String },
  },
  closing: {
    date: { type: Date },
    comment: { type: String },
  },
  comment: { type: String },
  file: [{ type: String }],
});

const USMarketingSchema = new Schema({
  advisingUSPrivatePlacementExemptions: { type: Boolean, default: false },
  providingUSSecuritiesLawOpinion: { type: Boolean, default: false },
  completingUSRegulationDFilings: { type: Boolean, default: false },
});

const Phase2Schema = new Schema({
  marketing: { type: Boolean, default: false },
  reviewingPitchBookTeaser: { type: Boolean, default: false },
  marketingAdviceSellingRestrictions: { type: Boolean, default: false },
  fundInterestsIntoEUJurisdictionsUnderAIFMD: { type: Boolean, default: false },
  allRelevantNonUSAndNonEUJurisdictions: { type: Boolean, default: false },
  marketingInTheUS: { type: USMarketingSchema, default: {} },
  comment: { type: String },
});

const Phase3Schema = new Schema({
  drafting_ppm: {
    date: { type: Date },
    comment: { type: String },
  },
  core_documents: {
    date: { type: Date },
    comment: { type: String },
  },
  ancillary_documents: {
    date: { type: Date },
    comment: { type: String },
  },
  comment: { type: String },
});

const Phase4Schema = new Schema({
  entity_establishment: {
    date: { type: Date },
    comment: { type: String },
  },
  negotiation: {
    date: { type: Date },
    comment: { type: String },
  },
  closing: {
    date: { type: Date },
    comment: { type: String },
  },
  comment: { type: String },
});

const Phase5Schema = new Schema({
  post_closing: {
    date: { type: Date },
    comment: { type: String },
  },
  optional_workstream: {
    date: { type: Date },
    comment: { type: String },
  },
  comment: { type: String },
});

const FundFormationSchema = new Schema({
  phase_1: {
    structuring: {
      date: { type: Date },
      comment: { type: String },
    },
    term_sheet: {
      date: { type: Date },
      comment: { type: String },
    },
    comment: { type: String },
  },
  phase_2: Phase2Schema,
  phase_3: Phase3Schema,
  phase_4: Phase4Schema,
  phase_5: Phase5Schema,
  file: [{ type: String }],
});

// Fund Investment Schema
const FundInvestmentSchema = new Schema({
  summarising_key_terms: {
    date: { type: Date },
    comment: { type: String },
  },
  negotiating_with_legal_counsel: {
    date: { type: Date },
    comment: { type: String },
  },
  related_tax_advice: {
    date: { type: Date },
    comment: { type: String },
  },
  assistance_in_execution_and_closing: {
    date: { type: Date },
    comment: { type: String },
  },
  file: [{ type: String }],
});

// IP Schema
const IPSchema = new Schema({
  portfolio_management: {
    date: { type: Date },
    comment: { type: String },
  },
  commercialisation: {
    date: { type: Date },
    comment: { type: String },
  },
  enforcement: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
  file: [{ type: String }],
});

// IT Subschemas
const CategorySchema = new Schema({
  privacy_cyber_security: {
    date: { type: Date },
    comment: { type: String },
  },
  outsourcing_commercial_contract: {
    date: { type: Date },
    comment: { type: String },
  },
  tech_joint_ventures: {
    date: { type: Date },
    comment: { type: String },
  },
  licensing: {
    date: { type: Date },
    comment: { type: String },
  },
  fintech: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
});

const PhasesSchema = new Schema({
  kick_off: {
    date: { type: Date },
    comment: { type: String },
  },
  documentation_preparation_review: {
    date: { type: Date },
    comment: { type: String },
  },
  negotiation: {
    date: { type: Date },
    comment: { type: String },
  },
  closing: {
    date: { type: Date },
    comment: { type: String },
  },
  memo_of_advice: {
    date: { type: Date },
    comment: { type: String },
  },
});

const ITSchema = new Schema({
  category: CategorySchema,
  phases: PhasesSchema,
  file: [{ type: String }],
});

// Litigation Schema
const LitigationSchema = new Schema({
  investigation_phase: {
    date: { type: Date },
    comment: { type: String },
  },
  pleading: {
    date: { type: Date },
    comment: { type: String },
  },
  dispositive_motion: {
    date: { type: Date },
    comment: { type: String },
  },
  exchange_evidence: {
    date: { type: Date },
    comment: { type: String },
  },
  pre_trial: {
    date: { type: Date },
    comment: { type: String },
  },
  trial: {
    date: { type: Date },
    comment: { type: String },
  },
  settlement: {
    date: { type: Date },
    comment: { type: String },
  },
  appeal: {
    date: { type: Date },
    comment: { type: String },
  },
  enforcement: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
  comment: { type: String },
  file: [{ type: String }],
});

// Arbitration Schema
const ArbitrationSchema = new Schema({
  investigation_phase: {
    date: { type: Date },
    comment: { type: String },
  },
  arbitration: {
    date: { type: Date },
    comment: { type: String },
  },
  initial_memoranda: {
    date: { type: Date },
    comment: { type: String },
  },
  exchange_evidence: {
    date: { type: Date },
    comment: { type: String },
  },
  additional_memoranda: {
    date: { type: Date },
    comment: { type: String },
  },
  hearing: {
    date: { type: Date },
    comment: { type: String },
  },
  post_hearing_memoranda: {
    date: { type: Date },
    comment: { type: String },
  },
  settlement: {
    date: { type: Date },
    comment: { type: String },
  },
  appeal: {
    date: { type: Date },
    comment: { type: String },
  },
  enforcement: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
  file: [{ type: String }],
});

// Restructuring Schema
const RestructuringSchema = new Schema({
  role: {
    type: String,
    enum: [
      "Company",
      "Creditors",
      "Shareholder/Investor",
      "Insolvency administrator",
      "Facility Agent / Trustee",
      "Accountant",
      "Financial Adviser",
      "Other",
    ],
  },
  rescue_securitisations: {
    date: { type: Date },
    comment: { type: String },
  },
  moratorium_debts: {
    date: { type: Date },
    comment: { type: String },
  },
  debt_equity_swaps: {
    date: { type: Date },
    comment: { type: String },
  },
  corporate_restructuring: {
    date: { type: Date },
    comment: { type: String },
  },
  corporate_finance_transaction: {
    date: { type: Date },
    comment: { type: String },
  },
  structure_receiverships: {
    date: { type: Date },
    comment: { type: String },
  },
  insolvency_process: {
    date: { type: Date },
    comment: { type: String },
  },
  contingency_planning: {
    date: { type: Date },
    comment: { type: String },
  },
  enforcing_security: {
    date: { type: Date },
    comment: { type: String },
  },
  distress_debt_trading: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
  file: [{ type: String }],
});

// Insolvency Schema
const InsolvencySchema = new Schema({
  role: {
    type: String,
    enum: [
      "Company",
      "Creditors",
      "Shareholder/Investor",
      "Insolvency administrator",
      "Facility Agent / Trustee",
      "Accountant",
      "Financial Adviser",
      "Other",
    ],
  },
  formal_insolvencies: {
    date: { type: Date },
    comment: { type: String },
  },
  litigation_resolution: {
    date: { type: Date },
    comment: { type: String },
  },
  purchase_sale_claims: {
    date: { type: Date },
    comment: { type: String },
  },
  advice_relation_avoidance_action: {
    date: { type: Date },
    comment: { type: String },
  },
  advice_regulatory_finance_issue: {
    date: { type: Date },
    comment: { type: String },
  },
  investigation: {
    date: { type: Date },
    comment: { type: String },
  },
  fraud_asset_tracing: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
  file: [{ type: String }],
});

// Regulatory Subschemas
const ScopingQuestionSchema = new Schema({
  regulated_industry_type: {
    type: String,
    enum: [
      "Agriculture",
      "Consumer",
      "Energy & Resources",
      "Financial Services",
      "Government",
      "Industrials",
      "Life Sciences & Healthcare",
      "Real estate",
      "TMT",
      "Transportation & Logistics",
      "Other",
    ],
  },
  list_jurisdiction: { type: String },
  target_entities: { type: String },
  internal_entities: { type: String },
});

const BestCharactersInvolveSchema = new Schema({
  regulatory_perimeter: {
    date: { type: Date },
    comment: { type: String },
  },
  licence_application: {
    date: { type: Date },
    comment: { type: String },
  },
  ownership: {
    date: { type: Date },
    comment: { type: String },
  },
  foreign_direct_investment: {
    date: { type: Date },
    comment: { type: String },
  },
  assistant_preparation: {
    date: { type: Date },
    comment: { type: String },
  },
  regulatory_audit: {
    date: { type: Date },
    comment: { type: String },
  },
  assistance_internal_reorganisation: {
    date: { type: Date },
    comment: { type: String },
  },
  material_regulatory: {
    date: { type: Date },
    comment: { type: String },
  },
  assistance_regulatory: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
});

const RegulatorySchema = new Schema({
  scoping_question: ScopingQuestionSchema,
  best_characters_involve: BestCharactersInvolveSchema,
  file: [{ type: String }],
});

// Tax Subschemas
const TypeSchema = new Schema({
  transactional_tax: {
    date: { type: Date },
    comment: { type: String },
  },
  tax_investigation: {
    date: { type: Date },
    comment: { type: String },
  },
  transfer_pricing: {
    date: { type: Date },
    comment: { type: String },
  },
  indirect_tax: {
    date: { type: Date },
    comment: { type: String },
  },
  tax_planning: {
    date: { type: Date },
    comment: { type: String },
  },
  tax_policy: {
    date: { type: Date },
    comment: { type: String },
  },
  other: {
    date: { type: Date },
    comment: { type: String },
  },
});

const TaxSchema = new Schema({
  type: TypeSchema,
  staged_approach: {
    date: { type: Date },
    comment: { type: String },
  },
  implementation: {
    corporate_in_charge: {
      date: { type: Date },
      comment: { type: String },
    },
    legal_service_provider_implementation: {
      date: { type: Date },
      comment: { type: String },
    },
  },
  file: [{ type: String }],
});

// Other Schema
const OtherSchema = new Schema({
  other: { type: String },
  file: [{ type: String }],
  date: { type: Date },
});

const MainScopeOfWorkSchema = new Schema({
  scope_name: {
    type: String,
    enum: [
      "Commercial contracts",
      "Competition",
      "Corporate M&A",
      "Data protection & privacy",
      "Employment",
      "Financing & capital markets",
      "(Infrastructure) projects & financing",
      "Fund formation",
      "Fund investment",
      "IP",
      "IT",
      "Litigation",
      "Arbitration",
      "Restructuring",
      "Insolvency",
      "Regulatory",
      "Tax",
      "Other",
    ],
  },
  commercial_contracts: CommercialContractsSchema,
  competition: CompetitionSchema,
  corporate_ma: CorporateMASchema,
  data_protection_privacy: DataProtectionPrivacySchema,
  employment: EmploymentSchema,
  financing_capital_market: FinancingCapitalMarketSchema,
  project_financing: ProjectFinancingSchema,
  fund_formation: FundFormationSchema,
  fund_investment: FundInvestmentSchema,
  ip: IPSchema,
  it: ITSchema,
  litigation: LitigationSchema,
  arbitration: ArbitrationSchema,
  restructuring: RestructuringSchema,
  insolvency: InsolvencySchema,
  regulatory: RegulatorySchema,
  tax: TaxSchema,
  other: OtherSchema,
});

//Pricing Schema//

const ModelSchema = new Schema({
  estimate: {
    comment: { type: String },
  },
  fixed_fee: {
    comment: { type: String },
  },
  capped_fee: {
    comment: { type: String },
  },
  hourly_rate_fee: {
    comment: { type: String },
  },
  blended_rates: {
    comment: { type: String },
  },
  contingent_fee: {
    comment: { type: String },
  },
  abort_discount: {
    comment: { type: String },
  },
  success_fee: {
    comment: { type: String },
  },
  reverse_auction: {
    comment: { type: String },
  },
  free_initial_advice: {
    comment: { type: String },
  },
  retainer: {
    comment: { type: String },
  },
  budget_for_project: {
    amount: { type: Number },
    comment: { type: String },
  },
  other: {
    comment: { type: String },
  },
});

// Pricing Schema
const PricingSchema = new Schema({
  currency: { type: String, required: true },
  model: ModelSchema,
});

// Expenses Schema
const ExpensesSchema = new Schema({
  if_expense_not_covered: {
    percentage_of_total_fee: { type: Boolean },
    included_service_fee: { type: Boolean },
    admin_only: { type: Boolean },
    other: {
      comment: { type: String },
    },
    travel_categories: {
      same_as_client: { type: Boolean },
    },
    travel_class: {
      type: String,
      enum: ["economy", "business"],
    },
    hotel: {
      type: String,
      enum: ["3 stars", "4 stars", "5 stars"],
    },
  },
});

// Taxes Schema
const TaxesSchema = new Schema({
  bidder_to_indicate: {
    comment: { type: String },
  },
});

// AssumptionExclusion Schema
const AssumptionExclusionSchema = new Schema({
  type: {
    type: String,
    enum: ["BiddersNotAdd", "BiddersCanAdd"],
  },
});

// ExpectedCompletionDateOfInstruction Schema
const ExpectedCompletionDateOfInstructionSchema = new Schema({
  type: Boolean,
  select_duration: {
    type: String,
    enum: ["1-2", "2-4", "4-8", "8-12", "12-16", "16-24", "24-40", "40-48"],
  },
  comment: { type: String },
});

// WorkProductFormat Schema
const WorkProductFormatSchema = new Schema({
  type: Boolean,
  email: { type: Boolean },
  memo: { type: Boolean },
  power_point_slides: { type: Boolean },
  legal_opinion: { type: Boolean },
  legal_document_drafting: {
    type: Boolean,
  },
  comment: { type: String },
});

// FollowingJurisdiction Schema
const FollowingJurisdictionSchema = new Schema({
  type: Boolean,
  country: { type: String },
  comment: { type: String },
});

// Main Schema
const pricingMainSchema = new Schema({
  pricing: PricingSchema,
  expenses: ExpensesSchema,
  taxes: TaxesSchema,
  assumption_exclusion: AssumptionExclusionSchema,
  expected_completion_date_of_instruction:
    ExpectedCompletionDateOfInstructionSchema,
  work_product_format: WorkProductFormatSchema,
  following_jurisdiction: FollowingJurisdictionSchema,
  lsp_local_legal_counsel: {
    type: Boolean,
    comment: { type: String },
  },
  select_engage_local_legal_counsel: {
    type: Boolean,
    comment: { type: String },
  },
  tax_advice_excluded: {
    type: Boolean,
    comment: { type: String },
  },
  no_travel_expected: {
    type: Boolean,
    comment: { type: String },
  },
  other: {
    type: Boolean,
    comment: { type: String },
  },
});

//otherKeyInformationMainSchema

const KeyTeamMemberSchema = new Schema({
  location_of_lead_partner: { type: String, required: true },
  comment: { type: String },
});

// Biographies Schema
const BiographiesSchema = new Schema({
  type: Boolean,
  with_picture: { type: Boolean },
  not_more_dn_1_page: {
    type: Boolean,
  },
  comment: { type: String },
});

// DiversityEquityInclusion Schema
const DiversityEquityInclusionSchema = new Schema({
  type: Boolean,
  comment: { type: String },
  team_lead_dei_requirement: { type: Boolean },
  key_team_member: { type: Boolean },
  other: {
    type: String,
    comment: { type: String },
  },
});

// DisaggregationService Subschemas
const TechnologySchema = new Schema({
  description: {
    type: Boolean,
    comment: { type: String },
  },
  other: {
    type: Boolean,
    comment: { type: String },
  },
});

const OutsourcingSchema = new Schema({
  name_of_service: {
    type: Boolean,
  },
  other: {
    type: Boolean,
    comment: { type: String },
  },
  expected_efficiency: {
    type: Boolean,
    comment: { type: String },
  },
  other: {
    type: Boolean,
    comment: { type: String },
  },
});

const DisaggregationServiceSchema = new Schema({
  type: Boolean,
  technology: TechnologySchema,
  outsourcing: OutsourcingSchema,
});

const ClarificationMethodSchema = new Schema({
  email: { type: Boolean, default: false },
  videoAudioConference: { type: Boolean, default: false },
  both: { type: Boolean, default: false },
});

const AdditionalInformationSchema = new Schema({
  believeInformationSufficient: { type: Boolean, default: false },
  entertainRequestsForClarificationBy: {
    type: ClarificationMethodSchema,
    default: {},
  },
  comment: { type: String },
});

const OtherKeyInformationSchema = new Schema({
  key_team_member: KeyTeamMemberSchema,
  biographies: BiographiesSchema,
  staffing_project_management: {
    type: Boolean,
    comment: { type: String },
  },
  diversity_equity_inclusion: DiversityEquityInclusionSchema,
  credential: {
    type: Boolean,
    comment: { type: String },
  },
  disaggregation_service: DisaggregationServiceSchema,
  what_your_usp: {
    type: Boolean,
    comment: { type: String },
  },
  additional_information: {
    type: AdditionalInformationSchema,
    default: {},
  },
  presentation_of_fee_proposal: {
    type: Boolean,
    organizing_meeting: {
      type: Boolean,
    },
    comment: { type: String },
  },
  video: {
    type: Boolean,
    comment: { type: String },
  },
  other: {
    type: String,
    comment: { type: String },
  },
});

//Final Schema
const rfpSchema = new Schema({
  company_conflict_check: CompanyConflictCheckSchema,
  Preliminary_information: [PreliminaryInformationSchema],
  scope_of_work: [MainScopeOfWorkSchema],
  pricing: pricingMainSchema,
  other_key_information: OtherKeyInformationSchema,
});

const Rfp = dbConn.model("Rfp", rfpSchema, "rfps");

module.exports = Rfp;
