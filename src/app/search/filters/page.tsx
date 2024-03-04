"use client";
import { Field, Formik, Form, FormikProps } from "formik";
import SampleCard from "@/components/samplecard/samplecard.component";
import { useState } from "react";
import { Sample, API, SearchFilterParams } from "@/services/api";
import Link from "next/link";
import SpinnerComponent from "@/components/spinner/spinner.component";
import SearchOptionButton from "@/components/searchoptionsbutton/searchoptionbutton.component";
import PlusSignToggler from "@/components/plussigntoggler/plussigntoggler.component";

export default function FilterSearch() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [toggleCategory, setToggleCategory] = useState<boolean>(false);
  const [toggleCollector, setToggleCollector] = useState<boolean>(false);
  const [toggleAdvisor, setToggleAdvisor] = useState<boolean>(false);
  const [toggleYear, setToggleYear] = useState<boolean>(false);
  const [toggleReason, setToggleReason] = useState<boolean>(false);
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [toggleType, setToggleType] = useState<boolean>(false);
  const [toggleBuidling, setToggleBuilding] = useState<boolean>(false);
  const [toggleRoom, setToggleRoom] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="items-center justify-between">
        <div className="card hover:shadow-lg">
          <div className="card-body">
            <div className="grid sm:grid-cols-4 md:grid-cols-4 md:gap-4">
              <div className="col-start-1 col-span-6 mb-4 md:mb-0 md:col-start-2 md:col-span-1">
                <div className="text-end">
                  <Link href="/search/map">
                    <SearchOptionButton text="Map Search" />
                  </Link>
                </div>
              </div>
              <div className="col-start-0 col-span-12 mb-4 md:mb-0 md:col-start-3 md:col-span-1">
                <div className="text-start">
                  <Link href="/search/term">
                    <SearchOptionButton text="Text Search" />
                  </Link>
                </div>
              </div>
              <div className="col-span-4 md:col-start-1 md:col-span-4 px-2 py-4">
                <h1 className="text-center font-bold text-lg px-4 shadow-md">
                  Advanced Filter Search
                </h1>
              </div>

              <div className="col-span-4 md:col-start-1 md:col-span-1 border px-1 py-1 rounded">
                <div className="flex flex-col">
                  <Formik
                    initialValues={{
                      category: "",
                      collectorName: "",
                      advisorName: "",
                      collectionYear: "",
                      collectionReason: "",
                      sampleForm: "",
                      sampleType: "",
                      storageBuilding: "",
                      storageRoom: "",
                    }}
                    onSubmit={async (values, actions) => {
                      console.log(values);
                      actions.setSubmitting(true);
                      setLoading(true);
                      if (!init) {
                        setInit(true);
                      }
                      API.searchByFilter(values)
                        .then((result) => {
                          setSamples(result);
                          actions.setSubmitting(false);
                          setLoading(false);
                        })
                        .catch(() => {
                          actions.setSubmitting(false);
                          setLoading(false);
                        });
                    }}
                  >
                    {(props: FormikProps<SearchFilterParams>) => (
                      <Form>
                        <div className="flex justify-between shadow-sm">
                          <div className="font-bold py-2 px-4">filters</div>

                          <button
                            onClick={props.handleReset}
                            className="ml-3 border rounded justify-self-end"
                          >
                            Reset
                          </button>
                        </div>
                        <div className="divide-y divide-gray-200">
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleCategory}
                              setToggle={setToggleCategory}
                              label="Category"
                            />

                            {toggleCategory && (
                              <Field
                                name="category"
                                as="select"
                                className="filter-field"
                              >
                                <option value="">select</option>
                                <option value="singleSpecimen">
                                  Single Specimen
                                </option>
                                <option value="collection">Collection</option>
                              </Field>
                            )}
                          </div>
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleYear}
                              setToggle={setToggleYear}
                              label="Year"
                            />

                            {toggleYear && (
                              <Field
                                type="text"
                                name="collectionYear"
                                placeholder="collection year"
                                className="filter-field"
                              />
                            )}
                          </div>
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleCollector}
                              setToggle={setToggleCollector}
                              label="Collector"
                            />

                            {toggleCollector && (
                              <Field
                                type="text"
                                name="collectorName"
                                placeholder="collector name"
                                className="filter-field"
                              />
                            )}
                          </div>
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleAdvisor}
                              setToggle={setToggleAdvisor}
                              label="Advisor"
                            />

                            {toggleAdvisor && (
                              <Field
                                name="advisorName"
                                as="select"
                                className="filter-field"
                              >
                                <option value="">select</option>
                                <option value="Ben">Ben</option>
                                <option value="Dave">Dave</option>
                              </Field>
                            )}
                          </div>
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleReason}
                              setToggle={setToggleReason}
                              label="Reason"
                            />

                            {toggleReason && (
                              <Field
                                name="collectionReason"
                                as="select"
                                className="filter-field"
                              >
                                <option value="">select</option>
                                <option value="teaching">Teaching</option>
                                <option value="research">Research</option>
                              </Field>
                            )}
                          </div>
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleForm}
                              setToggle={setToggleForm}
                              label="Form"
                            />

                            {toggleForm && (
                              <Field
                                name="sampleForm"
                                as="select"
                                className="filter-field"
                              >
                                <option value="">select</option>
                                <option value="handSample">Hand Sample</option>
                                <option value="mineralSeparate">
                                  Mineral Separate
                                </option>
                                <option value="thinSection">
                                  Thin Section
                                </option>
                              </Field>
                            )}
                          </div>
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleType}
                              setToggle={setToggleType}
                              label="Type"
                            />

                            {toggleType && (
                              <Field
                                name="sampleType"
                                as="select"
                                className="filter-field"
                              >
                                <option value="">select</option>
                                <option value="rock">Rock</option>
                                <option value="mineral">Mineral</option>
                                <option value="fossil">Fossil</option>
                                <option value="soil">Soil</option>
                                <option value="water">Water</option>
                              </Field>
                            )}
                          </div>
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleBuidling}
                              setToggle={setToggleBuilding}
                              label="Building"
                            />

                            {toggleBuidling && (
                              <Field
                                name="storageBuilding"
                                as="select"
                                className="filter-field"
                              >
                                <option value="">select</option>
                                <option value="CH">CH</option>
                                <option value="PS">PS</option>
                              </Field>
                            )}
                          </div>
                          <div className="px-2 py-2">
                            <PlusSignToggler
                              toggle={toggleRoom}
                              setToggle={setToggleRoom}
                              label="Room"
                            />

                            {toggleRoom && (
                              <Field
                                name="storageRoom"
                                as="select"
                                className="filter-field"
                              >
                                <option value="">select</option>
                                <option value="room1">Room1</option>
                                <option value="room2">Room2</option>
                                <option value="room3">Room3</option>
                              </Field>
                            )}
                          </div>
                        </div>
                        <div className="py-2">
                          <button
                            type="submit"
                            className="w-full bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 md:rounded"
                          >
                            Search
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>

              <div className="col-start-0 col-span-12 md:col-start-2 md:col-span-3 lg:col-start-2 lg:col-span-3 background-filter rounded">
                {init && (
                  <div className="col-start-1 col-span-12">
                    <div className="m-6 text-center">Search Results</div>
                  </div>
                )}
                {loading && (
                  <div className="col-start-7">
                    <SpinnerComponent />
                  </div>
                )}
                {!loading && (
                  <div className="col-start-1 col-span-12">
                    {samples.length > 0 &&
                      samples.map((sample) => (
                        <Link
                          key={sample.id}
                          href={`/search/filters/${sample.id}`}
                        >
                          <div className="m-2">
                            <SampleCard {...sample} />
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
                {!loading && samples.length === 0 && init && (
                  <div className="col-start-7">No Results Found</div>
                )}
              </div>

              {/* <div className="">
                      <div className="m-6 text-center">Search Results</div>

                      <div className="col-start-1 col-span-4">
                        {samples.map((sample) => (
                          <div key={sample.sampleId} className="mb-5">
                            <SampleCard {...sample} />
                          </div>
                        ))}
                      </div>
                    </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
