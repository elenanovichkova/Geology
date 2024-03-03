import * as path from "path";
import * as fs from "fs";
import { parse } from "csv-parse";

export const Parse = () => {
  const filePath = path.resolve(__dirname, "./../../../public/");

  const headers = [
    "sampleId",
    "collectorName",
    "advisorName",
    "yearCollected",
    "locationCoordinates",
    "shortDescription",
    "detailedDescription",
    "storageDetails",
  ];

  type Sample = {
    sampleId: string;
    collectorName: string;
    advisorName: string;
    yearCollected: number;
    locationCoordinates: string;
    shortDescription: string;
    detailedDescription: string;
    storageDetails: string;
  };

  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: headers,
    },
    (error, result: Sample[]) => {
      if (error) {
        console.log(error);
      }

      console.log("Result", result);
    }
  );
};
