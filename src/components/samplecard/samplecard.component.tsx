"use client";
import Link from "next/link";
import { Sample } from "../../services/api";
import IconButton from "../iconbutton/iconbutton.component";
import { useState } from "react";
import ConfirmDialog from "@/components/confirm/confirm.component";

type SamplCardProp = {
  sample: Sample;
  onDelete: (id: number) => void;
  context: string;
};

export default function samplecard({
  sample,
  onDelete,
  context,
}: SamplCardProp) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="mb-3 bg-white border border-gray-200 rounded-lg shadow   dark:border-gray-700 dark:bg-gray-800 ">
      <div className="flex items-stretch">
        <div className="basis-full">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="">
              <img
                className="object-cover w-full rounded-t-lg hidden md:block h-10 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src="/sample_image.jpg"
                alt=""
              />
            </div>
            <div className="basis-full">
              <div className="flex flex-col justify-end h-full p-3">
                <div className="flex-1">
                  <div className="basis-full">
                    <div className="flex justify-between">
                      <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          <span className="font-thin">ID: </span>
                          <span>{sample.sampleId}</span>
                        </h5>
                      </div>
                      <div>
                        <div className="w-8 h-8">
                          <div>
                            <IconButton
                              aria-label="delete"
                              onClick={() => setConfirmOpen(true)}
                            >
                              <div className="flex justify-center items-center w-full h-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 cursor-pointer hover:h-8 hover:w-8"
                                  // onClick={() => {
                                  //   if (sample.id) return onDelete(sample.id);
                                  //   return;
                                  // }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            </IconButton>
                            <ConfirmDialog
                              title="Delete Post?"
                              open={confirmOpen}
                              onClose={() => setConfirmOpen(false)}
                              onConfirm={() => {
                                console.log("about to delete the item");
                                // if (sample.id) return onDelete(sample.id);
                                return;
                              }}
                            >
                              Are you sure you want to delete this post?
                            </ConfirmDialog>
                          </div>
                          {/* <div className="flex justify-center items-center w-full h-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 cursor-pointer hover:h-8 hover:w-8"
                              onClick={() => {
                                if (sample.id) return onDelete(sample.id);
                                return;
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basis-full">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <span className="font-thin">Category: </span>
                      <span>{sample.category}</span>
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="basis-full">
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 m-2"></hr>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <span className="font-thin">Description: </span>
                        <span>{sample.longDescription}</span>
                      </p>
                    </div>
                    <div>
                      <Link href={`${context}${sample.id}`}>
                        <button
                          type="button"
                          className="w-full bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-1 px-2 md:rounded"
                        >
                          DETAIL
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
