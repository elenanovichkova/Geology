"use client";
import { Field, Formik, Form, FormikProps } from "formik";
import React, { useState } from "react";
import MyGoogleMap from "@/components/googleMap/googleMap.component";
import Spinner from "@/components/spinner/spinner.component";
import { API, Sample, SearchLocationParams } from "@/services/api";
import SampleCard from "@/components/samplecard/samplecard.component";
import Link from "next/link";
import * as Yup from "yup";

const MapSearchSchema = Yup.object().shape({
  locationRectangleBounds: Yup.object({
    south: Yup.number().required(),
    west: Yup.number().required(),
    north: Yup.number().required(),
    east: Yup.number().required(),
  }).required("Required"),
});

export default function SearchMap() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  return (
    <div>
      <div className="grid md:grid-cols-4 md:gap-4 pb-4">
        <div className="mb-4 md:mb-0 md:col-start-2 md:col-span-1 lg:col-start-2 lg:col-span-1">
          <div className="text-end">
            <Link href="/search/filters">
              <button className="text-primary btn border-primary md:border-2 hover:bg-primary hover:text-white fill-current transition ease-out duration-500">
                <div className="">
                  <span className="">Filter Search</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="md:col-start-3 md:col-span-1 lg:col-start-3 lg:col-span-1">
          <div className="text-start">
            <Link href="/search/term">
              <button className="text-primary btn border-primary md:border-2 hover:bg-primary hover:text-white fill-current transition ease-out duration-500">
                <div className="">
                  <span className="">Text Search</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center mb-6 font-semibold text-2xl">Map Search</h2>
      </div>
      <p className="text-center text-sm mb-2">
        Please use map rectangular control to select the area to search and
        click SEARCH button
      </p>

      <Formik
        initialValues={{}}
        validationSchema={MapSearchSchema}
        onSubmit={async (values, actions) => {
          console.log("=============== form values", values);
          actions.setSubmitting(true);
          setLoading(true);
          if (!init) {
            setInit(true);
          }
          API.searchByLocation(values)
            .then((response) => {
              setSamples(response);
              actions.setSubmitting(false);
              setLoading(false);
            })
            .catch(() => {
              actions.setSubmitting(false);
              setLoading(false);
            });
          // setTimeout(() => {
          //   actions.setSubmitting(false);
          // }, 100);
        }}
      >
        {(props: FormikProps<SearchLocationParams>) => (
          <Form>
            <fieldset className="border border-black p-4">
              <legend className="float-none w-auto p-2  text-xl">
                Sample Collection Location
              </legend>
              {props.values.locationRectangleBounds && !props.isValid ? (
                <div className="text-red-500">
                  {props.errors.locationRectangleBounds}
                </div>
              ) : null}
              <MyGoogleMap mode="search" />
            </fieldset>
            <div className="text-center mt-2">
              <button
                type="submit"
                className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded"
                disabled={props.isSubmitting}
              >
                SEARCH
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="grid">
        {init && (
          <div className="col-start-1 col-span-12">
            <div className="m-6 text-center">Search Results</div>
          </div>
        )}
        {loading && (
          <div className="col-start-7">
            <Spinner />
          </div>
        )}
        {!loading && (
          <div className="col-start-1 col-span-12">
            {samples.length > 0 &&
              samples.map((sample) => (
                <Link key={sample.id} href={`/search/map/${sample.id}`}>
                  <SampleCard {...sample} />
                </Link>
              ))}
          </div>
        )}
        {!loading && samples.length === 0 && init && (
          <div className="col-start-7">No Results Found</div>
        )}
      </div>
    </div>
  );
}
