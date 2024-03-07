import { string } from "yup";

interface labels {
  [label: string]: string;
}

interface labelArrays {
  [label: string]: string[];
}

export const LABELS: labels = {
  singleSpecimen: "Single Specimen",
};

const mineralSeparate = "mineral separate";
const thinSection = "thin section";
const handSample = "hand sample";

export const LABELARRAYS: labelArrays = {
  sampleForm: [mineralSeparate, thinSection, handSample],
};
