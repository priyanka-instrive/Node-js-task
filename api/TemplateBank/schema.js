const Joi = require("joi");

const company_conflict_check = Joi.object({
  conflict_check: Joi.string().required(),
  person_contact: Joi.array().items(
    Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
    })
  ),
  email: Joi.array().items(Joi.string().email()).required(),
  counter_name: Joi.array().items(Joi.string()).required(),
  brief_description_matter: Joi.object({
    file: Joi.array().items(Joi.string().uri()).required(),
    description: Joi.string().required(),
    chineseWallsAgreement: Joi.boolean().required(),
    date: Joi.date().required(),
    noteToLegalServices: Joi.boolean().required(),
    rfpAccessOption: Joi.string().required(),
  }).required(),
});

const Preliminary_information = Joi.array().items(
  Joi.object({
    project_info: Joi.array().items(
      Joi.object({
        project_name: Joi.string().required(),
        project_description: Joi.string().required(),
        complexity: Joi.number().integer().required(),
        comment: Joi.string().allow(""),
        objective_of_project: Joi.string().required(),
        file: Joi.array().items(Joi.string().uri()).required(),
      })
    ),
    governing_law: Joi.array().items(
      Joi.object({
        jurisdiction: Joi.string().required(),
        governingLaw_legal_document: Joi.array().items(
          Joi.object({
            country: Joi.string().required(),
            comment: Joi.string().allow(""),
          })
        ),
        language_of_legal_document: Joi.array().items(
          Joi.object({
            language: Joi.string().required(),
            comment: Joi.string().allow(""),
          })
        ),
        prefer_language_of_correspondence: Joi.array().items(
          Joi.object({
            language: Joi.string().required(),
            comment: Joi.string().allow(""),
          })
        ),
      })
    ),
    deadlines: Joi.array().items(
      Joi.object({
        confirmationDate: Joi.date().required(),
        proposalSubmissionDate: Joi.date().required(),
        time_zone: Joi.string().required(),
      })
    ),
    ecw: Joi.boolean().required(),
    rfp_terms_condition: Joi.object({
      termsConditionsPreAgreed: Joi.boolean().required(),
      termsConditionsAgreement: Joi.string().required(),
      termsConditionsFile: Joi.string().uri().required(),
    }).required(),
  })
);

const commonSchema = Joi.object({
  checked: Joi.boolean().default(false),
  date: Joi.date().optional().allow(null),
  comment: Joi.string().optional().allow("").default(""),
  file: Joi.array().items(Joi.string()).optional().allow(null),
});

// Define the commercialContractsSchema using the common schema for reusable fields
const CommercialContractsSchema = Joi.object({
  legal_advice: commonSchema,
  contract_drafting: commonSchema,
  contract_review: commonSchema,
  negotiation: commonSchema,
  regulatory: commonSchema,
  others: commonSchema,
  comment: Joi.string().optional().allow("").default(""),
  file: Joi.array().items(Joi.string()).optional().allow(null),
});

const behaviouralWorkSchema = Joi.object({
  cartel_investigation: commonSchema,
  antitrust_investigation: commonSchema,
  state_aid_investigation: commonSchema,
  advice: commonSchema,
  others: commonSchema,
});

const CompetitionSchema = Joi.object({
  transactional_work: Joi.object({
    merger_control_advice: commonSchema,
    advice: commonSchema,
  }),
  behavioural_work: behaviouralWorkSchema,
  comment: Joi.string().optional().allow("").default(""),
  file: Joi.array().items(Joi.string()).optional().allow(null),
});

const dueDiligenceSchema = Joi.object({
  checked: Joi.boolean().default(false),
  date: Joi.date().optional().allow(null),
  comment: Joi.string().optional().allow("").default(""),
  red_flag_only: Joi.boolean().optional().allow(null),
  vendor_idd: Joi.boolean().optional().allow(null),
  online_data_room: Joi.boolean().optional().allow(null),
  key_area_of_focus: Joi.array().items(Joi.string()).optional().allow(null),
});

const transactionDocSchema = Joi.object({
  checked: Joi.boolean().default(false),
  date: Joi.date().optional().allow(null),
  comment: Joi.string().optional().allow("").default(""),
  draft_main_doc: Joi.boolean().optional().allow(null),
  review_main_doc: Joi.boolean().optional().allow(null),
  file: Joi.array().items(Joi.string()).optional().allow(null),
});

// Define the corporateMASchema using the common schema, dueDiligenceSchema, and transactionDocSchema for reusable fields
const CorporateMASchema = Joi.object({
  term_sheet_negotiation: commonSchema,
  due_diligence: dueDiligenceSchema,
  regulatory: commonSchema,
  transaction_doc: transactionDocSchema,
  wi_policy: commonSchema,
  financing: commonSchema,
  signing_process: commonSchema,
  closing_process: commonSchema,
  others: commonSchema,
  comment: Joi.string().optional().allow("").default(""),
  file: Joi.array().items(Joi.string()).optional().allow(null),
});

const DataProtectionPrivacySchema = Joi.object({
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
  comment: Joi.string().optional().default(""),
  file: Joi.array().items(Joi.string()).optional(),
});

const EmploymentSchema = Joi.object({
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
  comment: Joi.string().optional().default(""),
  file: Joi.array().items(Joi.string()).optional(),
});

const derivativesStructureProductSchema = Joi.object({
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

const FinancingCapitalMarketSchema = Joi.object({
  exclusivity: Joi.object({
    nonExclusiveBasis: Joi.object({
      checked: Joi.boolean().default(false),
      comment: Joi.string().allow("").optional().default(""),
    }),
    exclusiveBasis: Joi.object({
      checked: Joi.boolean().default(false),
      comment: Joi.string().allow("").optional().default(""),
    }),
  }),
  asset_leasing_finance: Joi.object({
    checked: Joi.boolean().default(false),
    date: Joi.date().optional(),
    comment: Joi.string().optional().default(""),
    structuring: Joi.boolean().optional(),
    documentation: Joi.boolean().optional(),
    advisory: Joi.boolean().optional(),
    due_diligence: Joi.boolean().optional(),
  }),
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
  file: Joi.array().items(Joi.string()).optional(),
});

const ProjectFinancingSchema = Joi.object({
  tender_phase: Joi.object({
    date: Joi.date().optional(),
    comment: Joi.string().allow("").optional(),
  }).optional(),
  structuring_establishment_of_SPV_vehicle: Joi.object({
    date: Joi.date().optional(),
    comment: Joi.string().allow("").optional(),
  }).optional(),
  due_diligence: Joi.object({
    date: Joi.date().optional(),
    comment: Joi.string().allow("").optional(),
  }).optional(),
  sponsor_documents: Joi.object({
    date: Joi.date().optional(),
    comment: Joi.string().allow("").optional(),
  }).optional(),
  project_agreements: Joi.object({
    date: Joi.date().optional(),
    comment: Joi.string().allow("").optional(),
  }).optional(),
  financing: Joi.object({
    date: Joi.date().optional(),
    comment: Joi.string().allow("").optional(),
  }).optional(),
  closing: Joi.object({
    date: Joi.date().optional(),
    comment: Joi.string().allow("").optional(),
  }).optional(),
  comment: Joi.string().allow("").optional(),
  file: Joi.array().items(Joi.string().optional()).optional(),
});
const usMarketingSchema = Joi.object({
  advisingUSPrivatePlacementExemptions: Joi.boolean().default(false),
  providingUSSecuritiesLawOpinion: Joi.boolean().default(false),
  completingUSRegulationDFilings: Joi.boolean().default(false),
});

const phase2Schema = Joi.object({
  marketing: Joi.boolean().default(false),
  reviewingPitchBookTeaser: Joi.boolean().default(false),
  marketingAdviceSellingRestrictions: Joi.boolean().default(false),
  fundInterestsIntoEUJurisdictionsUnderAIFMD: Joi.boolean().default(false),
  allRelevantNonUSAndNonEUJurisdictions: Joi.boolean().default(false),
  marketingInTheUS: usMarketingSchema.optional(),
  comment: Joi.string().allow("").optional().default(""),
});

const phase3Schema = Joi.object({
  drafting_ppm: commonSchema,
  core_documents: commonSchema,
  ancillary_documents: commonSchema,
  comment: Joi.string().allow("").optional().default(""),
});

const phase4Schema = Joi.object({
  entity_establishment: commonSchema,
  negotiation: commonSchema,
  closing: commonSchema,
  comment: Joi.string().allow("").optional().default(""),
});

const phase5Schema = Joi.object({
  post_closing: commonSchema,
  optional_workstream: commonSchema,
  comment: Joi.string().allow("").optional().default(""),
});

const FundFormationSchema = Joi.object({
  phase_1: Joi.object({
    structuring: commonSchema,
    term_sheet: commonSchema,
    comment: Joi.string().allow("").optional().default(""),
  }),
  phase_2: phase2Schema,
  phase_3: phase3Schema,
  phase_4: phase4Schema,
  phase_5: phase5Schema,
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const FundInvestmentSchema = Joi.object({
  summarising_key_terms: commonSchema,
  negotiating_with_legal_counsel: commonSchema,
  related_tax_advice: commonSchema,
  assistance_in_execution_and_closing: commonSchema,
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const IPSchema = Joi.object({
  portfolio_management: commonSchema,
  commercialisation: commonSchema,
  enforcement: commonSchema,
  other: commonSchema,
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const categorySchema = Joi.object({
  privacy_cyber_security: commonSchema,
  outsourcing_commercial_contract: commonSchema,
  tech_joint_ventures: commonSchema,
  licensing: commonSchema,
  fintech: commonSchema,
  other: commonSchema,
});

const phasesSchema = Joi.object({
  kick_off: commonSchema,
  documentation_preparation_review: commonSchema,
  negotiation: commonSchema,
  closing: commonSchema,
  memo_of_advice: commonSchema,
});

const ITSchema = Joi.object({
  category: categorySchema,
  phases: phasesSchema,
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const LitigationSchema = Joi.object({
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
  comment: Joi.string().allow("").optional().default(""),
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const ArbitrationSchema = Joi.object({
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
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const RestructuringSchema = Joi.object({
  role: Joi.string()
    .valid(
      "Company",
      "Creditors",
      "Shareholder/Investor",
      "Insolvency administrator",
      "Facility Agent / Trustee",
      "Accountant",
      "Financial Adviser",
      "Other"
    )
    .optional(),
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
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const InsolvencySchema = Joi.object({
  role: Joi.string()
    .valid(
      "Company",
      "Creditors",
      "Shareholder/Investor",
      "Insolvency administrator",
      "Facility Agent / Trustee",
      "Accountant",
      "Financial Adviser",
      "Other"
    )
    .optional(),
  formal_insolvencies: commonSchema,
  litigation_resolution: commonSchema,
  purchase_sale_claims: commonSchema,
  advice_relation_avoidance_action: commonSchema,
  advice_regulatory_finance_issue: commonSchema,
  investigation: commonSchema,
  fraud_asset_tracing: commonSchema,
  other: commonSchema,
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const scopingQuestionSchema = Joi.object({
  regulated_industry_type: Joi.string()
    .valid(
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
      "Other"
    )
    .optional(),
  list_jurisdiction: Joi.string().allow("").optional(),
  target_entities: Joi.string().allow("").optional(),
  internal_entities: Joi.string().allow("").optional(),
});

const bestCharactersInvolveSchema = Joi.object({
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

const RegulatorySchema = Joi.object({
  scoping_question: scopingQuestionSchema,
  best_characters_involve: bestCharactersInvolveSchema,
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const typeSchema = Joi.object({
  transactional_tax: commonSchema,
  tax_investigation: commonSchema,
  transfer_pricing: commonSchema,
  indirect_tax: commonSchema,
  tax_planning: commonSchema,
  tax_policy: commonSchema,
  other: commonSchema,
});

const TaxSchema = Joi.object({
  type: typeSchema,
  staged_approach: commonSchema,
  implementation: Joi.object({
    corporate_in_charge: commonSchema,
    legal_service_provider_implementation: commonSchema,
  }),
  file: Joi.array().items(Joi.string().optional()).optional(),
});

const OtherSchema = Joi.object({
  description: Joi.string().allow("").optional(),
  file: Joi.array().items(Joi.string().optional()).optional(),
  expected_completion_date: Joi.date().optional(),
});

const scopeOfWorkSchema = Joi.object({
  scope_name: Joi.string()
    .valid(
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
      "Other"
    )
    .required(),
  commercial_contracts: CommercialContractsSchema.optional(),
  competition: CompetitionSchema.optional(),
  corporate_ma: CorporateMASchema.optional(),
  data_protection_privacy: DataProtectionPrivacySchema.optional(),
  employment: EmploymentSchema.optional(),
  financing_capital_market: FinancingCapitalMarketSchema.optional(),
  project_financing: ProjectFinancingSchema.optional(),
  fund_formation: FundFormationSchema.optional(),
  fund_investment: FundInvestmentSchema.optional(),
  ip: IPSchema.optional(),
  it: ITSchema.optional(),
  litigation: LitigationSchema.optional(),
  arbitration: ArbitrationSchema.optional(),
  restructuring: RestructuringSchema.optional(),
  insolvency: InsolvencySchema.optional(),
  regulatory: RegulatorySchema.optional(),
  tax: TaxSchema.optional(),
  other: OtherSchema.optional(),
});

const pricing = Joi.object({
  currency: Joi.string().required(),
  model: Joi.object({
    estimate: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    fixed_fee: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    capped_fee: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    hourly_rate_fee: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    blended_rates: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    contingent_fee: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    abort_discount: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    success_fee: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    reverse_auction: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    free_initial_advice: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    retainer: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    budget_for_project: Joi.object({
      checked: Joi.boolean().required(),
      amount: Joi.number().required(),
      comment: Joi.string().allow(""),
    }).optional(),
    other: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
  }).required(),

  expenses: Joi.object({
    if_expense_not_covered: Joi.object({
      percentage_of_total_fee: Joi.boolean().optional(),
      included_service_fee: Joi.boolean().optional(),
      admin_only: Joi.boolean().optional(),
      other: Joi.object({
        checked: Joi.boolean().optional(),
        comment: Joi.string().allow(""),
      }).optional(),
    }).optional(),
  }).optional(),

  taxes: Joi.object({
    bidder_to_indicate: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).optional(),
  }).optional(),

  assumption_exclusion: Joi.object({
    type: Joi.string().optional(),
  }).optional(),

  expected_completion_date_of_instruction: Joi.object({
    checked: Joi.boolean().optional(),
    select_duration: Joi.string().optional(),
    comment: Joi.string().allow(""),
  }).optional(),

  work_product_format: Joi.object({
    checked: Joi.boolean().optional(),
    email: Joi.boolean().optional(),
    memo: Joi.boolean().optional(),
    power_point_slides: Joi.boolean().optional(),
    legal_opinion: Joi.boolean().optional(),
    legal_document_drafting: Joi.boolean().optional(),
    comment: Joi.string().allow(""),
  }).optional(),

  following_jurisdiction: Joi.object({
    checked: Joi.boolean().optional(),
    country: Joi.string().optional(),
    comment: Joi.string().allow(""),
  }).optional(),

  lsp_local_legal_counsel: Joi.object({
    checked: Joi.boolean().optional(),
    comment: Joi.string().allow(""),
  }).optional(),

  select_engage_local_legal_counsel: Joi.object({
    checked: Joi.boolean().optional(),
    comment: Joi.string().allow(""),
  }).optional(),

  tax_advice_excluded: Joi.object({
    checked: Joi.boolean().optional(),
    comment: Joi.string().allow(""),
  }).optional(),

  no_travel_expected: Joi.object({
    checked: Joi.boolean().optional(),
    comment: Joi.string().allow(""),
  }).optional(),

  other: Joi.object({
    checked: Joi.boolean().optional(),
    comment: Joi.string().allow(""),
  }).optional(),
}).required();

const other_key_information = Joi.object({
  key_team_member: Joi.object({
    location_of_lead_partner: Joi.string().required(),
    comment: Joi.string().allow(""),
  }).required(),
  biographies: Joi.object({
    checked: Joi.boolean().required(),
    with_picture: Joi.boolean().required(),
    not_more_dn_1_page: Joi.boolean().required(),
    comment: Joi.string().allow(""),
  }).required(),
  staffing_project_management: Joi.object({
    checked: Joi.boolean().required(),
    comment: Joi.string().allow(""),
  }).required(),
  diversity_equity_inclusion: Joi.object({
    checked: Joi.boolean().required(),
    team_lead_dei_requirement: Joi.boolean().required(),
    key_team_member: Joi.boolean().required(),
    comment: Joi.string().allow(""),
  }).required(),
  credential: Joi.object({
    checked: Joi.boolean().required(),
    comment: Joi.string().allow(""),
  }).required(),
  disaggregation_service: Joi.object({
    checked: Joi.boolean().required(),
    technology: Joi.object({
      checked: Joi.boolean().required(),
      comment: Joi.string().allow(""),
    }).required(),
    outsourcing: Joi.object({
      name_of_service: Joi.boolean().required(),
      other: Joi.object({
        checked: Joi.boolean().required(),
        comment: Joi.string().allow(""),
      }).required(),
      expected_efficiency: Joi.object({
        checked: Joi.boolean().required(),
        comment: Joi.string().allow(""),
      }).required(),
    }).required(),
  }).required(),
  what_your_usp: Joi.object({
    checked: Joi.boolean().required(),
    comment: Joi.string().allow(""),
  }).required(),
  additional_information: Joi.object({
    believeInformationSufficient: Joi.boolean().required(),
    entertainRequestsForClarificationBy: Joi.object({
      email: Joi.boolean().required(),
      videoAudioConference: Joi.boolean().required(),
      both: Joi.boolean().required(),
    }).required(),
    comment: Joi.string().allow(""),
  }).required(),
  presentation_of_fee_proposal: Joi.object({
    checked: Joi.boolean().required(),
    organizing_meeting: Joi.boolean().required(),
    comment: Joi.string().allow(""),
  }).required(),
  video: Joi.object({
    checked: Joi.boolean().required(),
    comment: Joi.string().allow(""),
  }).required(),
  other: Joi.object({
    checked: Joi.boolean().required(),
    comment: Joi.string().allow(""),
  }).required(),
});

const rfpSchema = {
  company_conflict_check,
  Preliminary_information,
  scope_of_work: scopeOfWorkSchema,
  pricing,
  other_key_information,
};

module.exports = {
  rfpSchema,
};
