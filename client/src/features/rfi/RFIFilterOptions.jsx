export const currentStatusOptions = [
  { value: "all", label: "All" },
  { value: "1", label: "1. Build Review" },
  { value: "2", label: "2. PSDP notified" },
  { value: "3", label: "3. PSDP Approved" },
  { value: "4", label: "4. Design Review" },
  { value: "5", label: "5. Sent for Redesign" },
  { value: "6", label: "6. Design Complete" },
  { value: "7", label: "7. Design Approved" },
  { value: "8", label: "8. Build Approved, Commercial Review" },
  { value: "9", label: "9. Commercial Approved" },
  { value: "10", label: "10. Rejected" },
  { value: "11", label: "11. Complete" },
];

export const statusEntegroOptions = [
  { value: "all", label: "All" },
  { value: "0", label: "0. Rejected" },
  { value: "1", label: "1. Handed over" },
  { value: "2", label: "2. On Hold" },
  { value: "3", label: "3. Awaiting Forecast" },
  { value: "4", label: "4. Missed it date" },
  { value: "5", label: "5. In Progress" },
  { value: "6", label: "6. Design Complete" },
  { value: "7", label: "7. Returned RFI" },
  { value: "8", label: "8. Wayleave Required" },
  { value: "9", label: "9. Survey Required" },
  { value: "10", label: "10. RMO Required" },
  { value: "11", label: "11. For Assessment" },
];

export const sortOptions = [
  {
    value: "id-desc",
    label: "Created Date (Latest first)",
  },
  {
    value: "id-asc",
    label: "Created Date (Oldest first)",
  },
];

// RFI Assessor name_of_resource_1
export const RfiAssessor = [
  {
    value: "John O'Driscoll",
    label: "John O'Driscoll",
  },
  {
    value: "Joeffred Alinday",
    label: "Joeffred Alinday",
  },
  {
    value: "Van Espique",
    label: "Van Espique",
  },
  {
    value: "IMMCO",
    label: "IMMCO",
  },
];
// survey_required, wayleave_required, t1_application, awaiting_nbi
export const YesNoOptions = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

// Priority/NBIQ - priority_nbiq
export const PriorityOptions = [
  {
    value: "High",
    label: "High",
  },
  {
    value: "Medium",
    label: "Medium",
  },
  {
    value: "Low",
    label: "Low",
  },
  {
    value: "NBIQ",
    label: "NBIQ",
  },
];

// Difficulty - difficulty
export const DifficultyOptions = [
  {
    value: "1-Low",
    label: "1-Low",
  },
  {
    value: "2-Medium",
    label: "2-Medium",
  },
  {
    value: "3-High",
    label: "3-High",
  },
];

// Billing -billing
export const BillingOptions = [
  {
    value: "Payable",
    label: "Payable",
  },
  {
    value: "Non Payable",
    label: "Non Payable",
  },
];

// RFI Root Cause - rfi_root_cause
export const RfiRootCauseOptions = [
  {
    value: "Build Issues",
    label: "Build Issues",
  },
  {
    value: "Design and Survey (Duct Capacity)",
    label: "Design and Survey (Duct Capacity)",
  },
  {
    value: "Design and Survey (ESB Conflict)",
    label: "Design and Survey (ESB Conflict)",
  },
  {
    value: "Design and Survey (Others)",
    label: "Design and Survey (Others)",
  },
];

// Forecast Status - forecast_stautus
export const ForecastStatusOptions = [
  { value: "Complete", label: "Complete" },
  { value: "With IMMCO", label: "With IMMCO" },
  { value: "For QC", label: "For QC" },
  { value: "On Hold", label: "On Hold" },
  { value: "Queue", label: "Queue" },
  { value: "To be Assessed", label: "To be Assessed" },
  { value: "With Smartech", label: "With Smartech" },
];

// Reason for On hold - reason_for_on_hold
export const ReasonForOnHoldOptions = [
  { value: "Wayleave", label: "Wayleave" },
  { value: "Survey", label: "Survey" },
  { value: "Internal Design Query", label: "Internal Design Query" },
  { value: "NBI Design Query", label: "NBI Design Query" },
  { value: "T1 Application", label: "T1 Application" },
  {
    value: "Others (See Forecast Notes)",
    label: "Others (See Forecast Notes)",
  },
];

// RFI Type - rfi_type
export const RfiTypeOptions = [
  {
    value: "Clause 12 Non-Blockage",
    label: "Clause 12 Non-Blockage",
  },
  {
    value: "Clause 40",
    label: "Clause 40",
  },
  {
    value: "EIR Make Ready",
    label: "EIR Make Ready",
  },
  {
    value: "ENET Make Ready",
    label: "ENET Make Ready",
  },
];

//-------------------Common Form-------------------------------------//
//---------------------QC Lead-----------------------------------------//

// QC Lead - name_of_resource_2
export const QCLead = [
  {
    value: "John O'Driscoll",
    label: "John O'Driscoll",
  },
  {
    value: "Aries Mendoza",
    label: "Aries Mendoza",
  },
  {
    value: "Seema Pawar",
    label: "Seema Pawar",
  },
  {
    value: "Van Carlo A Espique",
    label: "Van Carlo A Espique",
  },
  {
    value: "Pooria Ranjbar",
    label: "Pooria Ranjbar",
  },
];

// Reason for Delay - reason_for_delay
export const ReasonForDelayOptions = [
  { value: "Survey", label: "Survey" },
  { value: "Wayleave", label: "Wayleave" },
  { value: "Resources", label: "Resources" },
  { value: "NBI Queries", label: "NBI Queries" },
];

// Return Planner - return_planner
export const ReturnPlanner = [
  {
    value: "Aries Mendoza",
    label: "Aries Mendoza",
  },
  {
    value: "Anne Klarizze Oreta",
    label: "Anne Klarizze Oreta",
  },
  {
    value: "Dee Mar Zaldua",
    label: "Dee Mar Zaldua",
  },
  {
    value: "John O'Driscoll",
    label: "John O'Driscoll",
  },
  {
    value: "Seema Pawar",
    label: "Seema Pawar",
  },
  {
    value: "Van Carlo A Espique",
    label: "Van Carlo A Espique",
  },
];

// Wayleave layer - layer
export const LayerOptions = [
  { value: "Span", label: "Span" },
  { value: "Pole", label: "Pole" },
  { value: "MDU", label: "MDU" },
  { value: "E-Pole", label: "E-Pole" },
  { value: "Duct", label: "Duct" },
  { value: "Chamber", label: "Chamber" },
  { value: "Aerial span", label: "Aerial span" },
];

// Wayleave Status - wayleave_status
export const WayleaveStatusOptions = [
  { value: "Wayleave Required", label: "Wayleave Required" },
  { value: "Refused", label: "Refused" },
  { value: "Consented", label: "Consented" },
  { value: "Engaged", label: "Engaged" },
  { value: "Leaflet Drop", label: "Leaflet Drop" },
];
