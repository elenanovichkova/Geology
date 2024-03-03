"use client";
import { Field, Formik, Form, FormikProps } from "formik";
import React from "react";
import MyGoogleMap from "@/components/googleMap/googleMap.component";
import { API, Sample } from "@/services/api";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

const NewSampleSchema = Yup.object().shape({
  category: Yup.string().max(255, "Too Long!").required("Required"),
  sampleId: Yup.string().max(255, "Too Long!").required("Required"),
  collectorName: Yup.string().max(255, "Too Long!"),
  advisorOtherName: Yup.string().max(255, "Too Long!"),
  collectionYear: Yup.date(),
  collectionReasonOther: Yup.string().max(255, "Too Long!"),
  shortDescription: Yup.string().max(255, "Too Long!"),
  longDescription: Yup.string().max(255, "Too Long!").required("Required"),
  sampleFormOther: Yup.string().max(255, "Too Long!"),
  sampleTypeOther: Yup.string().max(255, "Too Long!"),
  storageBuildingOther: Yup.string().max(255, "Too Long!"),
  storageRoomOther: Yup.string().max(255, "Too Long!"),
  storageDetails: Yup.string().max(255, "Too Long!"),
  storageDuration: Yup.number(),
});

export default function NewSample() {
  return (
    <div>
      <div>
        <h2 className="text-center mb-6 font-semibold text-2xl">
          New Sample Form
        </h2>
      </div>
      <Link href="newsample/success">Test modal</Link>
      <p className="text-center text-sm mb-2">
        Please fill out the form to the best of your ability. The fields marked
        with an asterisk (*) are required to be completed.
      </p>

      <Formik
        initialValues={{
          category: "",
          sampleId: "",
          collectorName: "",
          advisorName: "",
          advisorOtherName: "",
          collectionYear: 2024,
          collectionReason: [],
          collectionReasonOther: "",
          collectionLocation: [],
          shortDescription: "",
          longDescription: "",
          sampleForm: [],
          sampleFormOther: "",
          sampleType: [],
          sampleTypeOther: "",
          sampleImg: "",
          storageBuilding: "",
          storageBuildingOther: "",
          storageRoom: "",
          storageRoomOther: "",
          storageDetails: "",
          storageDuration: 10,
        }}
        validationSchema={NewSampleSchema}
        onSubmit={async (values, actions) => {
          console.log("=============== form values", values);
          actions.setSubmitting(true);
          API.addSample(values).then(() => {
            actions.setSubmitting(false);
          });
          // setTimeout(() => {
          //   actions.setSubmitting(false);
          // }, 100);
        }}
      >
        {(props: FormikProps<Sample>) => (
          <Form>
            <fieldset className="border border-black p-4">
              <fieldset className="border border-black p-4">
                <legend className="float-none w-auto text-xl">
                  Sample Identification
                </legend>
                <div>
                  <label className="mb-1 block">
                    Is the sample entry for one or multiple bulk samples? *
                  </label>
                </div>
                <div>
                  <small className="font-thin text-sm block text-muted">
                    Please select one from the following.
                  </small>
                </div>
                {props.errors.category && props.touched.category ? (
                  <div className="text-red-500">{props.errors.category}</div>
                ) : null}

                <div>
                  <label htmlFor="category">
                    <Field
                      className="mb-2 mr-2"
                      type="radio"
                      name="category"
                      value="singleSpecimen"
                    />
                    Single Specimen
                  </label>
                </div>
                <div className="mb-2">
                  <label htmlFor="category">
                    <Field
                      className="mb-2 mr-2"
                      type="radio"
                      name="category"
                      value="Collection"
                    />
                    Collection
                  </label>
                </div>

                {/* <hr className="h-px my-2" /> */}
                <div>
                  <label className="block" htmlFor="sampleId">
                    Sample ID *
                  </label>
                </div>
                <div>
                  <Field
                    className="inline-input"
                    type="text"
                    name="sampleId"
                    placeholder="enter sample id..."
                  />
                  {props.errors.sampleId && props.touched.sampleId ? (
                    <div className="text-red-500">{props.errors.sampleId}</div>
                  ) : null}
                </div>
                <div className="">
                  <small className="font-thin text-sm block text-muted">
                    Sample ID may contain letters, numbers, and valid special
                    characters./,:-#_
                  </small>
                </div>
              </fieldset>
              <fieldset className="border border-black p-4">
                <legend className="float-none w-auto p-2  text-xl">
                  Collector Info
                </legend>
                <div className="mb-3">
                  <label className="inline-block" htmlFor="collectorName">
                    Collector Name
                  </label>
                  <Field
                    className="inline-input"
                    type="text"
                    name="collectorName"
                    placeholder="Enter full name here..."
                  />
                  {props.errors.collectorName && props.touched.collectorName ? (
                    <div className="text-red-500">
                      {props.errors.collectorName}
                    </div>
                  ) : null}
                  <small className="font-thin text-sm block text-muted">
                    Enter full name as first and last name. ex. John Doe
                  </small>
                </div>
                <div className="mb-3">
                  <label className="inline-block" htmlFor="advisorName">
                    Advisor
                  </label>
                  <Field
                    name="advisorName"
                    as="select"
                    className="inline-input"
                  >
                    <option value="">Select</option>
                    <option value="Dave">Dave</option>
                    <option value="Ben">Ben</option>
                    <option value="Other">Other</option>
                  </Field>
                  <small className="font-thin text-sm block text-muted">
                    From the dropdown, select an Advisor.
                  </small>
                  {props.values.advisorName === "other" && (
                    <Field
                      className="inline-input"
                      type="text"
                      name="collectionReasonOther"
                    />
                  )}
                </div>
                {props.values.advisorName === "Other" && (
                  <div className="mb-3">
                    <label className="inline-block" htmlFor="advisorOtherName">
                      Other Adviser Name
                    </label>
                    <Field
                      className="inline-input"
                      type="text"
                      name="advisorOtherName"
                      placeholder="enter the name of the adviser"
                    />
                    {props.errors.advisorOtherName &&
                    props.touched.advisorOtherName ? (
                      <div className="text-red-500">
                        {props.errors.advisorOtherName}
                      </div>
                    ) : null}
                    <small className="font-thin text-sm block text-muted">
                      Enter the name of the adviser.
                    </small>
                  </div>
                )}
                <div className="mb-3">
                  <label className="inline-block" htmlFor="collectionYear">
                    Year Collected
                  </label>
                  <Field
                    className="inline-input"
                    type="text"
                    name="collectionYear"
                    placeholder="enter the year this sample was collected"
                  />
                  {props.errors.collectionYear &&
                  props.touched.collectionYear ? (
                    <div className="text-red-500">
                      {props.errors.collectionYear}
                    </div>
                  ) : null}
                  <small className="font-thin text-sm block text-muted">
                    Enter the year of when this sample was collected.
                  </small>
                </div>
                <div className="mb-3">
                  <div>
                    <label className="mb-1 block">
                      Purpose of Sample Collection
                    </label>
                  </div>
                  <div>
                    <small className="font-thin text-sm block text-muted">
                      Select all that apply.
                    </small>
                  </div>
                  <div>
                    <label
                      className="inline-block mr-2"
                      htmlFor="collectionReason"
                    >
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="collectionReason"
                        value="teaching"
                      />
                      Teaching
                    </label>
                    <label
                      className="inline-block mr-2"
                      htmlFor="collectionReason"
                    >
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="collectionReason"
                        value="research"
                      />
                      Research
                    </label>
                    <label
                      className="inline-block mr-2"
                      htmlFor="collectionReason"
                    >
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="collectionReason"
                        value="other"
                      />
                      Other
                    </label>
                    {props.values.collectionReason &&
                      props.values.collectionReason.find(
                        (reason) => reason == "other"
                      ) === "other" && (
                        <div className="mb-4">
                          <label
                            className="inline-block"
                            htmlFor="advisorOtherName"
                          >
                            Other Purpose of Sample Collection
                          </label>
                          <Field
                            className="inline-input"
                            type="text"
                            name="collectionReasonOther"
                          />
                          {props.errors.collectionReasonOther &&
                          props.touched.collectionReasonOther ? (
                            <div className="text-red-500">
                              {props.errors.collectionReasonOther}
                            </div>
                          ) : null}
                        </div>
                      )}
                  </div>
                </div>
              </fieldset>
              <fieldset className="border border-black p-4">
                <legend className="float-none w-auto p-2  text-xl">
                  Sample Collection Location
                </legend>

                <MyGoogleMap mode="create" />
              </fieldset>
              <fieldset className="border border-black p-4">
                <legend className="float-none w-auto p-2  text-xl">
                  Sample Specs
                </legend>
                <div className="mb-3">
                  <label className="inline-block" htmlFor="shortDescription">
                    Short Description
                  </label>
                  <Field
                    className="inline-input"
                    type="text"
                    name="shortDescription"
                    placeholder="Enter geologic name of sample here.."
                  />
                  {props.errors.shortDescription &&
                  props.touched.shortDescription ? (
                    <div className="text-red-500">
                      {props.errors.shortDescription}
                    </div>
                  ) : null}
                  <small className="font-thin text-sm block text-muted">
                    Enter a specific geologic name or a reference to the sample.
                    ex. quartz.
                  </small>
                </div>

                <div className="mb-3">
                  <div>
                    <label className="mb-1 block">Sample Form</label>
                  </div>
                  <div>
                    <small className="font-thin text-sm block text-muted">
                      Select all that apply.
                    </small>
                  </div>
                  <div>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleForm"
                        value="handSample"
                      />
                      Hand Sample
                    </label>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleForm"
                        value="mineralSeparate"
                      />
                      Mineral Separate
                    </label>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleForm"
                        value="thinSection"
                      />
                      Thin Section
                    </label>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleForm"
                        value="other"
                      />
                      Other
                    </label>
                    {props.values.sampleForm &&
                      props.values.sampleForm.find(
                        (reason) => reason == "other"
                      ) === "other" && (
                        <div className="mb-4">
                          <label
                            className="inline-block"
                            htmlFor="advisorOtherName"
                          >
                            Other Sample Form
                          </label>
                          <Field
                            className="inline-input"
                            type="text"
                            name="sampleFormOther"
                          />
                          {props.errors.sampleFormOther &&
                          props.touched.sampleFormOther ? (
                            <div className="text-red-500">
                              {props.errors.sampleFormOther}
                            </div>
                          ) : null}
                        </div>
                      )}
                  </div>
                </div>

                <div className="mb-3">
                  <div>
                    <label className="mb-1 block">Sample Type</label>
                  </div>
                  <div>
                    <small className="font-thin text-sm block text-muted">
                      Select all that apply.
                    </small>
                  </div>
                  <div>
                    <label className="inline-block mr-2" htmlFor="sampleType">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleType"
                        value="rock"
                      />
                      Rock
                    </label>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleType"
                        value="mineral"
                      />
                      Mineral
                    </label>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleType"
                        value="fossil"
                      />
                      Fossil
                    </label>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleType"
                        value="soil"
                      />
                      Soil
                    </label>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleType"
                        value="water"
                      />
                      Water
                    </label>
                    <label className="inline-block mr-2" htmlFor="sampleForm">
                      <Field
                        className="mb-2 mr-2"
                        type="checkbox"
                        name="sampleType"
                        value="other"
                      />
                      Other
                    </label>
                    {props.values.sampleType &&
                      props.values.sampleType.find(
                        (reason) => reason == "other"
                      ) === "other" && (
                        <div className="mb-4">
                          <label
                            className="inline-block"
                            htmlFor="advisorOtherName"
                          >
                            Other Sample Type
                          </label>
                          <Field
                            className="inline-input"
                            type="text"
                            name="sampleTypeOther"
                          />
                          {props.errors.sampleTypeOther &&
                          props.touched.sampleTypeOther ? (
                            <div className="text-red-500">
                              {props.errors.sampleTypeOther}
                            </div>
                          ) : null}
                        </div>
                      )}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="sampleImg">Sample Image</label>
                  <Field type="file" name="sampleImg" />
                </div>
                <div className="mb-3">
                  <label className="inline-block" htmlFor="longDescription">
                    Detailed Description *
                  </label>
                  <Field
                    className="inline-input"
                    component="textarea"
                    rows="3"
                    name="longDescription"
                    placeholder="Describe the geologic details here..."
                  />
                  {props.errors.longDescription &&
                  props.touched.longDescription ? (
                    <div className="text-red-500">
                      {props.errors.longDescription}
                    </div>
                  ) : null}
                </div>
              </fieldset>

              <fieldset className="border border-black p-4">
                <legend className="float-none w-auto p-2  text-xl">
                  Storage Details
                </legend>
                <div className="mb-3">
                  <label className="inline-block" htmlFor="storageBuilding">
                    Storage Building
                  </label>
                  <Field
                    name="storageBuilding"
                    as="select"
                    className="inline-input"
                  >
                    <option value="">Select</option>
                    <option value="PS">PS (Physical Science)</option>
                    <option value="CH">CH (Colonial Hall)</option>
                    <option value="Other">Other</option>
                  </Field>
                  <small className="font-thin text-sm block text-muted">
                    From the dropdown, select which building this sample will be
                    stored in.
                  </small>
                </div>
                {props.values.storageBuilding === "Other" && (
                  <div className="mb-4">
                    <label className="inline-block" htmlFor="storageBuilding">
                      Other Storage Building
                    </label>
                    <Field
                      className="inline-input"
                      type="text"
                      name="storageBuildingOther"
                    />
                    {props.errors.storageBuildingOther &&
                    props.touched.storageBuildingOther ? (
                      <div className="text-red-500">
                        {props.errors.storageBuildingOther}
                      </div>
                    ) : null}
                  </div>
                )}
                <div className="mb-3">
                  <label className="inline-block" htmlFor="storageRoom">
                    Storage Room
                  </label>
                  <Field
                    name="storageRoom"
                    as="select"
                    className="inline-input"
                  >
                    <option value="">Select</option>
                    <option value="1">Room #1</option>
                    <option value="2">Room #2</option>
                    <option value="3">Room #3</option>
                    <option value="Other">Other</option>
                  </Field>
                  <small className="font-thin text-sm block text-muted">
                    From the dropdown, select which room this sample will be
                    stored in.
                  </small>
                </div>
                {props.values.storageRoom === "Other" && (
                  <div className="mb-4">
                    <label className="inline-block" htmlFor="storageRoomOther">
                      Other Storage Room
                    </label>
                    <Field
                      className="inline-input"
                      type="text"
                      name="storageRoomOther"
                    />
                    {props.errors.storageRoomOther &&
                    props.touched.storageRoomOther ? (
                      <div className="text-red-500">
                        {props.errors.storageRoomOther}
                      </div>
                    ) : null}
                  </div>
                )}

                <div className="mb-3">
                  <label className="inline-block" htmlFor="storageDetails">
                    Additional Storage Details
                  </label>
                  <Field
                    className="inline-input"
                    type="textarea"
                    name="storageDetails"
                    placeholder="Enter any additional storage details here"
                  />
                  {props.errors.storageDetails &&
                  props.touched.storageDetails ? (
                    <div className="text-red-500">
                      {props.errors.storageDetails}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label className="inline-block" htmlFor="storageDuration">
                    Storage Duration in years
                  </label>
                  <Field
                    className="inline-input"
                    type="text"
                    name="storageDuration"
                    placeholder="Enter number of years this sample should be stored in dataase for."
                  />
                  {props.errors.storageDuration &&
                  props.touched.storageDuration ? (
                    <div className="text-red-500">
                      {props.errors.storageDuration}
                    </div>
                  ) : null}
                </div>
              </fieldset>
              {!props.isValid && props.initialTouched && (
                <div className="text-center mt-2 text-red-500">
                  CORRECT ERRORS
                </div>
              )}
              <div className="text-center mt-2">
                <Link href="/">
                  <button
                    type="submit"
                    className="bg-tertiary-100 hover:bg-tertiary-200 text-white font-bold py-2 px-4 rounded"
                  >
                    CANCEL
                  </button>
                </Link>
                <button
                  type="submit"
                  className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded ml-3"
                >
                  SUBMIT
                </button>
                <button onClick={props.handleReset} className="ml-3">
                  Reset
                </button>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
}
