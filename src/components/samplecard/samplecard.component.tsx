import Link from "next/link";
import { Sample } from "../../services/api";

type SamplCardProp = {
  sample: Sample;
  onDelete: (id: number) => void;
};

export default function samplecard({ sample, onDelete }: SamplCardProp) {
  return (
    <div className="mb-3 bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex items-stretch">
        <div className="basis-full">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
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
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
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
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
                  </div>
                  <div className="basis-full">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <span className="font-thin">Description: </span>
                      <span>{sample.longDescription}</span>
                    </p>
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
