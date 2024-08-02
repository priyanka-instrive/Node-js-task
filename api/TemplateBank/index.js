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

//ScopeOfWork sub Schema

// Define reusable schema for checked, date, and comment fields
const commonSchema = new Schema({
  checked: { type: Boolean, default: false },
  date: { type: Date, required: false },
  comment: { type: String, required: false, default: "" },
  file: [{ type: String, required: false }],
});

// Define each specific schema using commonSchema for reusable fields
const commercialContractsSchema = new Schema({
  legal_advice: commonSchema,
  contract_drafting: commonSchema,
  contract_review: commonSchema,
  negotiation: commonSchema,
  regulatory: commonSchema,
  others: commonSchema,
  comment: { type: String, required: false, default: "" },
  file: [{ type: String, required: false }],
});

// Schema for competition
const competitionSchema = new Schema({
  transactional_work: {
    merger_control_advice: commonSchema,
    advice: commonSchema,
  },
  behavioural_work: {
    cartel_investigation: commonSchema,
    antitrust_investigation: commonSchema,
    state_aid_investigation: commonSchema,
    advice: commonSchema,
    others: commonSchema,
  },
  comment: { type: String, required: false, default: "" },
  file: [{ type: String, required: false }],
});

const dueDiligenceSchema = new Schema({
  checked: { type: Boolean, default: false },
  date: { type: Date, required: false },
  comment: { type: String, required: false, default: "" },
  red_flag_only: { type: Boolean, required: false },
  vendor_idd: { type: Boolean, required: false },
  online_data_room: { type: Boolean, required: false },
  key_area_of_focus: [{ type: String, required: false }],
});

const transactionDocSchema = new Schema({
  checked: { type: Boolean, default: false },
  date: { type: Date, required: false },
  comment: { type: String, required: false, default: "" },
  draft_main_doc: { type: Boolean, required: false },
  review_main_doc: { type: Boolean, required: false },
  file: [{ type: String, required: false }],
});

const corporateMASchema = new Schema({
  term_sheet_negotiation: commonSchema,
  due_diligence: dueDiligenceSchema,
  regulatory: commonSchema,
  transaction_doc: transactionDocSchema,
  wi_policy: commonSchema,
  financing: commonSchema,
  signing_process: commonSchema,
  closing_process: commonSchema,
  others: commonSchema,
  comment: { type: String, required: false, default: "" },
  file: [{ type: String, required: false }],
});

const dataProtectionPrivacySchema = new Schema({
  data_protection_programme: commonSchema,
  new_processing_system: commonSchema,
  review_data_protection: commonSchema,
  localise_data_protection: commonSchema,
  advice_change_law: commonSchema,
  data_protection_reprepared: commonSchema,
  direct_marketing: commonSchema,
  record_retention: commonSchema,
  data_security_breach: commonSchema,
  exercise_data_subject_rights: commonSchema,
  data_protection_regulatory: commonSchema,
  retainer_ad: commonSchema,
  data_protection_training: commonSchema,
  others: commonSchema,
  comment: { type: String, required: false, default: "" },
  file: [{ type: String, required: false }],
});

const employmentSchema = new Schema({
  generalHRLegalAdvice: commonSchema,
  reviewOfHRContracts: commonSchema,
  draftingReviewingEmploymentContracts: commonSchema,
  advisingOnRestrictionsForNewHires: commonSchema,
  redundancy: commonSchema,
  dismissalSettlementAgreement: commonSchema,
  employmentBenefits: commonSchema,
  consultantsContractorsArrangements: commonSchema,
  supplyOfStaffArrangements: commonSchema,
  HRAspectsOfOutsourcingInsourcing: commonSchema,
  adviceInRespectOfGrievance: commonSchema,
  adviceInRespectOfDisciplinaryProcess: commonSchema,
  crossBorderAdvisoryProject: commonSchema,
  immigrationVisas: commonSchema,
  discriminationDiversityEqualOpportunities: commonSchema,
  employmentInvestigation: commonSchema,
  newProposedEmploymentLegislation: commonSchema,
  reportingObligations: commonSchema,
  protectingConfidentialInformation: commonSchema,
  performanceManagement: commonSchema,
  longTermSickness: commonSchema,
  remunerationPackageIncentivesDesign: commonSchema,
  ongoingRemunerationIncentivesAdvice: commonSchema,
  whistleblowing: commonSchema,
  employeeHealthSafety: commonSchema,
  adviceRelatedToPensions: commonSchema,
  other: commonSchema,
  comment: { type: String, required: false, default: "" },
  file: [{ type: String, required: false }],
});

const derivativesStructureProductSchema = new Schema({
  structure_credit_product: commonSchema,
  structure_equity_product: commonSchema,
  interest_inflation_product: commonSchema,
  commodity_transaction: commonSchema,
  etp_platform: commonSchema,
  prime_brokerage_agreements: commonSchema,
  credit_risk_mitigation: commonSchema,
  repos_securities_lending: commonSchema,
  other: commonSchema,
});

const financingCapitalMarketSchema = new Schema({
  exclusivity: {
    nonExclusiveBasis: {
      checked: { type: Boolean, default: false },
      comment: { type: String, required: false, default: "" },
    },
    exclusiveBasis: {
      checked: { type: Boolean, default: false },
      comment: { type: String },
    },
  },
  asset_leasing_finance: {
    checked: { type: Boolean, default: false },
    date: { type: Date, required: false },
    comment: { type: String, required: false, default: "" },
    structuring: { type: Boolean, required: false },
    documentation: { type: Boolean, required: false },
    advisory: { type: Boolean, required: false },
    due_diligence: { type: Boolean, required: false },
  },
  corporate_lending: commonSchema,
  debt_capital_markets: commonSchema,
  equity_capital_markets: commonSchema,
  islamic_finance: commonSchema,
  leveraged_acquisition_finance: commonSchema,
  real_estate_finance: commonSchema,
  securitisation: commonSchema,
  derivatives_structure_product: derivativesStructureProductSchema,
  trade_commodities_finance: commonSchema,
  corporate_trust: commonSchema,
  others: commonSchema,
  regulatory_compliance: commonSchema,
  enforcement: commonSchema,
  file: [{ type: String, required: false }],
});

const usMarketingSchema = new Schema({
  advisingUSPrivatePlacementExemptions: { type: Boolean, default: false },
  providingUSSecuritiesLawOpinion: { type: Boolean, default: false },
  completingUSRegulationDFilings: { type: Boolean, default: false },
});

const phase2Schema = new Schema({
  marketing: { type: Boolean, default: false },
  reviewingPitchBookTeaser: { type: Boolean, default: false },
  marketingAdviceSellingRestrictions: { type: Boolean, default: false },
  fundInterestsIntoEUJurisdictionsUnderAIFMD: { type: Boolean, default: false },
  allRelevantNonUSAndNonEUJurisdictions: { type: Boolean, default: false },
  marketingInTheUS: usMarketingSchema,
  comment: { type: String, required: false, default: "" },
});

const phase3Schema = new Schema({
  drafting_ppm: commonSchema,
  core_documents: commonSchema,
  ancillary_documents: commonSchema,
  comment: { type: String, required: false, default: "" },
});

const phase4Schema = new Schema({
  entity_establishment: commonSchema,
  negotiation: commonSchema,
  closing: commonSchema,
  comment: { type: String, required: false, default: "" },
});

const phase5Schema = new Schema({
  post_closing: commonSchema,
  optional_workstream: commonSchema,
  comment: { type: String, required: false, default: "" },
});

const fundFormationSchema = new Schema({
  phase_1: {
    structuring: commonSchema,
    term_sheet: commonSchema,
    comment: { type: String, required: false, default: "" },
  },
  phase_2: phase2Schema,
  phase_3: phase3Schema,
  phase_4: phase4Schema,
  phase_5: phase5Schema,
  file: [{ type: String, required: false }],
});
const fundInvestmentSchema = new Schema({
  summarising_key_terms: commonSchema,
  negotiating_with_legal_counsel: commonSchema,
  related_tax_advice: commonSchema,
  assistance_in_execution_and_closing: commonSchema,
  file: [{ type: String, required: false }],
});

const ipSchema = new Schema({
  portfolio_management: commonSchema,
  commercialisation: commonSchema,
  enforcement: commonSchema,
  other: commonSchema,
  file: [{ type: String, required: false }],
});

const categorySchema = new Schema({
  privacy_cyber_security: commonSchema,
  outsourcing_commercial_contract: commonSchema,
  tech_joint_ventures: commonSchema,
  licensing: commonSchema,
  fintech: commonSchema,
  other: commonSchema,
});

const phasesSchema = new Schema({
  kick_off: commonSchema,
  documentation_preparation_review: commonSchema,
  negotiation: commonSchema,
  closing: commonSchema,
  memo_of_advice: commonSchema,
});

const itSchema = new Schema({
  category: categorySchema,
  phases: phasesSchema,
  file: [{ type: String, required: false }],
});

const litigationSchema = new Schema({
  investigation_phase: commonSchema,
  pleading: commonSchema,
  dispositive_motion: commonSchema,
  exchange_evidence: commonSchema,
  pre_trial: commonSchema,
  trial: commonSchema,
  settlement: commonSchema,
  appeal: commonSchema,
  enforcement: commonSchema,
  other: commonSchema,
  comment: { type: String, required: false, default: "" },
  file: [{ type: String, required: false }],
});
const arbitrationSchema = new Schema({
  investigation_phase: commonSchema,
  arbitration: commonSchema,
  initial_memoranda: commonSchema,
  exchange_evidence: commonSchema,
  additional_memoranda: commonSchema,
  hearing: commonSchema,
  post_hearing_memoranda: commonSchema,
  settlement: commonSchema,
  appeal: commonSchema,
  enforcement: commonSchema,
  other: commonSchema,
  file: [{ type: String, required: false }],
});

const restructuringSchema = new Schema({
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
    required: false,
  },
  rescue_securitisations: commonSchema,
  moratorium_debts: commonSchema,
  debt_equity_swaps: commonSchema,
  corporate_restructuring: commonSchema,
  corporate_finance_transaction: commonSchema,
  structure_receiverships: commonSchema,
  insolvency_process: commonSchema,
  contingency_planning: commonSchema,
  enforcing_security: commonSchema,
  distress_debt_trading: commonSchema,
  other: commonSchema,
  file: [{ type: String, required: false }],
});

const insolvencySchema = new Schema({
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
    required: false,
  },
  formal_insolvencies: commonSchema,
  litigation_resolution: commonSchema,
  purchase_sale_claims: commonSchema,
  advice_relation_avoidance_action: commonSchema,
  advice_regulatory_finance_issue: commonSchema,
  investigation: commonSchema,
  fraud_asset_tracing: commonSchema,
  other: commonSchema,
  file: [{ type: String, required: false }],
});

const scopingQuestionSchema = new Schema({
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
    required: false,
  },
  list_jurisdiction: { type: String, required: false },
  target_entities: { type: String, required: false },
  internal_entities: { type: String, required: false },
});

const bestCharactersInvolveSchema = new Schema({
  regulatory_perimeter: commonSchema,
  licence_application: commonSchema,
  ownership: commonSchema,
  foreign_direct_investment: commonSchema,
  assistant_preparation: commonSchema,
  regulatory_audit: commonSchema,
  assistance_internal_reorganisation: commonSchema,
  material_regulatory: commonSchema,
  assistance_regulatory: commonSchema,
  other: commonSchema,
});

const regulatorySchema = new Schema({
  scoping_question: scopingQuestionSchema,
  best_characters_involve: bestCharactersInvolveSchema,
  file: [{ type: String, required: false }],
});

const typeSchema = new Schema({
  transactional_tax: commonSchema,
  tax_investigation: commonSchema,
  transfer_pricing: commonSchema,
  indirect_tax: commonSchema,
  tax_planning: commonSchema,
  tax_policy: commonSchema,
  other: commonSchema,
});

const taxSchema = new Schema({
  type: typeSchema,
  staged_approach: commonSchema,
  implementation: {
    corporate_in_charge: commonSchema,
    legal_service_provider_implementation: commonSchema,
  },
  file: [{ type: String, required: false }],
});

const otherSchema = new Schema({
  description: { type: String, required: false },
  file: [{ type: String, required: false }],
  expected_completion_date: { type: Date, required: false },
});

const projectFinancingSchema = new Schema({
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

// Main Scope of Work Schema
const mainScopeOfWorkSchema = new Schema({
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
    required: false,
  },
  commercial_contracts: { type: commercialContractsSchema, required: false },
  competition: { type: competitionSchema, required: false },
  corporate_ma: { type: corporateMASchema, required: false },
  data_protection_privacy: {
    type: dataProtectionPrivacySchema,
    required: false,
  },
  employment: { type: employmentSchema, required: false },
  financing_capital_market: {
    type: financingCapitalMarketSchema,
    required: false,
  },
  project_financing: { type: projectFinancingSchema, required: false },
  fund_formation: { type: fundFormationSchema, required: false },
  fund_investment: { type: fundInvestmentSchema, required: false },
  ip: { type: ipSchema, required: false },
  it: { type: itSchema, required: false },
  litigation: { type: litigationSchema, required: false },
  arbitration: { type: arbitrationSchema, required: false },
  restructuring: { type: restructuringSchema, required: false },
  insolvency: { type: insolvencySchema, required: false },
  regulatory: { type: regulatorySchema, required: false },
  tax: { type: taxSchema, required: false },
  other: { type: otherSchema, required: false },
});

//Pricing Schema//

const commentSchema = new mongoose.Schema({
  checked: { type: Boolean, required: true },
  comment: { type: String, default: "" },
});

const budgetForProjectSchema = new mongoose.Schema({
  checked: { type: Boolean, required: true },
  amount: { type: Number, required: true },
  comment: { type: String, default: "" },
});

const ifExpenseNotCoveredSchema = new mongoose.Schema({
  percentage_of_total_fee: { type: Boolean, required: true },
  included_service_fee: { type: Boolean, required: true },
  admin_only: { type: Boolean, required: true },
  other: { type: commentSchema, required: true },
  travel_categories: {
    type: new mongoose.Schema({
      same_as_client: { type: Boolean, required: true },
    }),
    required: true,
  },
  travel_class: { type: String, required: true },
  hotel: { type: String, required: true },
});

// const pricingSchema = new mongoose.Schema({
//   pricing: {
//     currency: { type: String, required: true },
//     model: {
//       estimate: { type: commentSchema, required: true },
//       fixed_fee: { type: commentSchema, required: true },
//       capped_fee: { type: commentSchema, required: true },
//       hourly_rate_fee: { type: commentSchema, required: true },
//       blended_rates: { type: commentSchema, required: true },
//       contingent_fee: { type: commentSchema, required: true },
//       abort_discount: { type: commentSchema, required: true },
//       success_fee: { type: commentSchema, required: true },
//       reverse_auction: { type: commentSchema, required: true },
//       free_initial_advice: { type: commentSchema, required: true },
//       retainer: { type: commentSchema, required: true },
//       budget_for_project: { type: budgetForProjectSchema, required: true },
//       other: { type: commentSchema, required: true },
//     },
//   },
//   expenses: {
//     if_expense_not_covered: { type: ifExpenseNotCoveredSchema, required: true },
//   },
//   taxes: {
//     bidder_to_indicate: { type: commentSchema, required: true },
//   },
//   assumption_exclusion: {
//     type: { type: String, required: true },
//   },
//   expected_completion_date_of_instruction: {
//     checked: { type: Boolean, required: true },
//     select_duration: { type: String, required: true },
//     comment: { type: String, default: "" },
//   },
//   work_product_format: {
//     checked: { type: Boolean, required: true },
//     email: { type: Boolean, required: true },
//     memo: { type: Boolean, required: true },
//     power_point_slides: { type: Boolean, required: true },
//     legal_opinion: { type: Boolean, required: true },
//     legal_document_drafting: { type: Boolean, required: true },
//     comment: { type: String, default: "" },
//   },
//   following_jurisdiction: {
//     checked: { type: Boolean, required: true },
//     country: { type: String, required: true },
//     comment: { type: String, default: "" },
//   },
//   lsp_local_legal_counsel: { type: commentSchema, required: true },
//   select_engage_local_legal_counsel: { type: commentSchema, required: true },
//   tax_advice_excluded: { type: commentSchema, required: true },
//   no_travel_expected: { type: commentSchema, required: true },
//   other: { type: commentSchema, required: true },
// });

const ExpensesSchema = new Schema({
  if_expense_not_covered: {
    percentage_of_total_fee: { type: Boolean, default: false },
    included_service_fee: { type: Boolean, default: false },
    admin_only: { type: Boolean, default: false },
    other: {
      checked: { type: Boolean, default: false },
      comment: { type: String },
    },
    travel_categories: {
      same_as_client: { type: Boolean, default: false },
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

const TaxesSchema = new Schema({
  bidder_to_indicate: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
});

const AssumptionExclusionSchema = new Schema({
  type: {
    type: String,
    enum: ["BiddersNotAdd", "BiddersCanAdd"],
  },
});

const ExpectedCompletionDateOfInstructionSchema = new Schema({
  checked: { type: Boolean, default: false },
  select_duration: {
    type: String,
    enum: ["1-2", "2-4", "4-8", "8-12", "12-16", "16-24", "24-40", "40-48"],
  },
  comment: { type: String },
});

const WorkProductFormatSchema = new Schema({
  checked: { type: Boolean, default: false },
  email: { type: Boolean, default: false },
  memo: { type: Boolean, default: false },
  power_point_slides: { type: Boolean, default: false },
  legal_opinion: { type: Boolean, default: false },
  legal_document_drafting: {
    type: Boolean,
    default: false,
  },
  comment: { type: String },
});

const FollowingJurisdictionSchema = new Schema({
  checked: { type: Boolean, default: false },
  country: { type: String },
  comment: { type: String },
});

const pricingSchema = new Schema({
  currency: { type: String, required: true },
  model: {
    estimate: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    fixed_fee: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    capped_fee: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    hourly_rate_fee: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    blended_rates: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    contingent_fee: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    abort_discount: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    success_fee: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    reverse_auction: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    free_initial_advice: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    retainer: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
    budget_for_project: {
      checked: { type: Boolean, required: true },
      amount: { type: Number, required: true },
      comment: { type: String, default: "" },
    },
    other: {
      checked: { type: Boolean, required: true },
      comment: { type: String, default: "" },
    },
  },
  expenses: {
    if_expense_not_covered: {
      percentage_of_total_fee: { type: Boolean },
      included_service_fee: { type: Boolean },
      admin_only: { type: Boolean },
      other: {
        checked: { type: Boolean },
        comment: { type: String, default: "" },
      },
    },
  },
  taxes: {
    bidder_to_indicate: {
      checked: { type: Boolean },
      comment: { type: String, default: "" },
    },
  },
  assumption_exclusion: {
    type: { type: String },
  },
  expected_completion_date_of_instruction: {
    checked: { type: Boolean },
    select_duration: { type: String },
    comment: { type: String, default: "" },
  },
  work_product_format: {
    checked: { type: Boolean },
    email: { type: Boolean },
    memo: { type: Boolean },
    power_point_slides: { type: Boolean },
    legal_opinion: { type: Boolean },
    legal_document_drafting: { type: Boolean },
    comment: { type: String, default: "" },
  },
  following_jurisdiction: {
    checked: { type: Boolean },
    country: { type: String },
    comment: { type: String, default: "" },
  },
  lsp_local_legal_counsel: {
    checked: { type: Boolean },
    comment: { type: String, default: "" },
  },
  select_engage_local_legal_counsel: {
    checked: { type: Boolean },
    comment: { type: String, default: "" },
  },
  tax_advice_excluded: {
    checked: { type: Boolean },
    comment: { type: String, default: "" },
  },
  no_travel_expected: {
    checked: { type: Boolean },
    comment: { type: String, default: "" },
  },
  other: {
    checked: { type: Boolean },
    comment: { type: String, default: "" },
  },
});

//otherKeyInformationMainSchema

const KeyTeamMemberSchema = new Schema({
  location_of_lead_partner: { type: String, required: true },
  comment: { type: String },
});

const BiographiesSchema = new Schema({
  checked: { type: Boolean, default: false },
  with_picture: { type: Boolean, default: false },
  not_more_dn_1_page: { type: Boolean, default: false },
  comment: { type: String },
});

const DiversityEquityInclusionSchema = new Schema({
  checked: { type: Boolean, default: false },
  comment: { type: String },
  team_lead_dei_requirement: { type: Boolean, default: false },
  key_team_member: { type: Boolean, default: false },
  other: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
});

const TechnologySchema = new Schema({
  description: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
  other: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
});

const OutsourcingSchema = new Schema({
  name_of_service: { type: Boolean, default: false },
  other: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
  expected_efficiency: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
});

const DisaggregationServiceSchema = new Schema({
  checked: { type: Boolean, default: false },
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
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
  diversity_equity_inclusion: DiversityEquityInclusionSchema,
  credential: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
  disaggregation_service: DisaggregationServiceSchema,
  what_your_usp: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
  additional_information: {
    type: AdditionalInformationSchema,
    default: {},
  },
  presentation_of_fee_proposal: {
    checked: { type: Boolean, default: false },
    organizing_meeting: { type: Boolean, default: false },
    comment: { type: String },
  },
  video: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
  other: {
    checked: { type: Boolean, default: false },
    comment: { type: String },
  },
});

//Final rfp  Schema
const rfpSchema = new Schema({
  company_conflict_check: CompanyConflictCheckSchema,
  Preliminary_information: [PreliminaryInformationSchema],
  scope_of_work: mainScopeOfWorkSchema,
  pricing: pricingSchema,
  other_key_information: OtherKeyInformationSchema,
});

const Rfp = dbConn.model("Rfp", rfpSchema, "rfps");

module.exports = Rfp;
