import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SuccessComponent() {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex flex-col">
      <div className="items-center justify-between">
        <div className="grid md:grid-cols-6 md:gap-4">
          <div className="col-start-0 col-span-12">
            <div className="card hover:shadow-lg">
              <div className="card-body">
                <div
                  id="alert-additional-content-3"
                  className="p-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                  role="alert"
                >
                  <div className="">
                    <div className="flex flex-row items-center justify-center">
                      <h3 className="text-lg font-medium">
                        The file was successfully uploaded
                      </h3>
                    </div>
                  </div>
                  <div className="mt-2 mb-4 text-sm">
                    More info about this info success goes here. This example
                    text is going to run a bit longer so that you can see how
                    spacing within an alert works with this kind of content.
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={onDismiss}
                      className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      UPLOAD ANOTHER FILE
                    </button>
                    <button
                      type="button"
                      className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
                      data-dismiss-target="#alert-additional-content-3"
                      aria-label="Close"
                    >
                      <Link href="/">GO HOME PAGE</Link>
                    </button>
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
