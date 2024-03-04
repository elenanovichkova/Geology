"use client";
import { Field, Formik, Form, FormikProps } from "formik";
import SampleCard from "@/components/samplecard/samplecard.component";
import { useState } from "react";
import { Sample, API, SearchFilterParams } from "@/services/api";
import Link from "next/link";
import SpinnerComponent from "@/components/spinner/spinner.component";

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

  const handleOnDelete = (id: number) => {
    API.deleteSample(id).then(() => {
      alert("successfully deleted");
    });
  };

  return (
    <div className="flex flex-col">
      <div className="items-center justify-between">
        <div className="card hover:shadow-lg">
          <div className="card-body">
            {/** form links */}
            <div className="flex flex-col">
              <div className="flex justify-between md:justify-center w-full">
                <div>
                  <div className="md:m-3">
                    <Link href="/search/map">
                      <button className="text-primary btn border-primary md:border-2 hover:bg-primary hover:text-white fill-current transition ease-out duration-500">
                        <div className="">
                          <span className="">Map Search</span>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="md:m-3">
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
            </div>
            {/** form title */}
            <div className="flex justify-center">
              <div>
                <h1 className="text-center font-bold text-lg px-4">
                  Advanced Filter Search
                </h1>
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full h-full">
              <div>
                <div className="rounded md:min-w-80">
                  <div className="">
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
                          <div className="flex justify-between shadow-sm items-center p-3">
                            <div>
                              <div className="font-bold">filters</div>
                            </div>
                            <div>
                              <button
                                onClick={props.handleReset}
                                className="p-2 border rounded hover:bg-gray-100"
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                          <div className="divide-y divide-gray-200">
                            <div className="px-2 py-2">
                              <div className=" flex flex-row justify-between">
                                Category
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleCategory(!toggleCategory);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>

                              {toggleCategory && (
                                <Field
                                  name="category"
                                  as="select"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                              <div className=" flex flex-row justify-between">
                                Year
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleYear(!toggleYear);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {toggleYear && (
                                <Field
                                  type="text"
                                  name="collectionYear"
                                  placeholder="collection year"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <div className=" flex flex-row justify-between">
                                Collector
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleCollector(!toggleCollector);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {toggleCollector && (
                                <Field
                                  type="text"
                                  name="collectorName"
                                  placeholder="collector name"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <div className=" flex flex-row justify-between">
                                Advisor
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleAdvisor(!toggleAdvisor);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {toggleAdvisor && (
                                <Field
                                  name="advisorName"
                                  as="select"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option value="">select</option>
                                  <option value="Ben">Ben</option>
                                  <option value="Dave">Dave</option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <div className=" flex flex-row justify-between">
                                Reason
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleReason(!toggleReason);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {toggleReason && (
                                <Field
                                  name="collectionReason"
                                  as="select"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option value="">select</option>
                                  <option value="teaching">Teaching</option>
                                  <option value="research">Research</option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <div className=" flex flex-row justify-between">
                                Form
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleForm(!toggleForm);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {toggleForm && (
                                <Field
                                  name="sampleForm"
                                  as="select"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option value="">select</option>
                                  <option value="handSample">
                                    Hand Sample
                                  </option>
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
                              <div className=" flex flex-row justify-between">
                                Type
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleType(!toggleType);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {toggleType && (
                                <Field
                                  name="sampleType"
                                  as="select"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                              <div className=" flex flex-row justify-between">
                                Building
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleBuilding(!toggleBuidling);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {toggleBuidling && (
                                <Field
                                  name="storageBuilding"
                                  as="select"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option value="">select</option>
                                  <option value="CH">CH</option>
                                  <option value="PS">PS</option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <div className=" flex flex-row justify-between">
                                Room
                                <svg
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setToggleRoom(!toggleRoom);
                                  }}
                                >
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                  <g id="SVGRepo_iconCarrier">
                                    <path
                                      d="M6 12H18M12 6V18"
                                      stroke="#d1d5db"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {toggleRoom && (
                                <Field
                                  name="storageRoom"
                                  as="select"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              </div>
              <div className="md:grow">
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
                          <div key={sample.id} className="m-2">
                            <SampleCard
                              sample={sample}
                              onDelete={handleOnDelete}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                  {!loading && samples.length === 0 && init && (
                    <div className="col-start-7">No Results Found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
