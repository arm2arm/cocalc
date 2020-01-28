import { Map, Set } from "immutable";
import { TypedMap } from "../../app-framework";

export type upgrade_fields_type =
  | "disk_quota"
  | "memory"
  | "memory_request"
  | "cores"
  | "network"
  | "cpu_shares"
  | "mintime"
  | "member_host";

export const upgrade_fields: upgrade_fields_type[] = [
  "disk_quota",
  "memory",
  "memory_request",
  "cores",
  "network",
  "cpu_shares",
  "mintime",
  "member_host"
];

type Upgrades = { [field: upgrade_fields_type]: number };

export interface SiteLicense {
  id: string;
  title?: string;
  description?: string;
  expires?: Date;
  activates?: Date;
  created?: Date;
  last_used?: Date;
  users?: string[];
  restricted?: boolean;
  upgrades?: Upgrades;
  run_limit?: number;
  apply_limit?: number;
}

export type license_field_type =
  | "string"
  | "paragraph"
  | "date"
  | "account_id[]"
  | "boolean"
  | "upgrades"
  | "number"
  | "readonly";

export type license_field_names =
  | "id"
  | "title"
  | "description"
  | "expires"
  | "activates"
  | "created"
  | "last_used"
  | "users"
  | "restricted"
  | "upgrades"
  | "run_limit"
  | "apply_limit";

export const license_fields: {
  [field: license_field_names]: license_field_type;
} = {
  id: "readonly",
  title: "string",
  description: "paragraph",
  expires: "date",
  activates: "date",
  created: "readonly",
  last_used: "date",
  // users: "account_id[]",  // hide for now since not implemented at all
  // restricted: "boolean",  // hide for now since not implemented at all
  upgrades: "upgrades",
  run_limit: "number"
  //apply_limit: "number"
};

// export const source_fields = ["expires", "activates", "created", "last_used"];

export interface SiteLicensesState {
  view?: boolean; // if true, open for viewing/editing
  error?: string;
  loading?: boolean;
  creating?: boolean;
  site_licenses?: SiteLicense[];
  editing?: Set<string>; // id's of site licenses that are currently being edited.
  edits?: Map<string, TypedMap<SiteLicense>>;
}