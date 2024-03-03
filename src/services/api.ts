export interface Sample {
  id?: number;
  sampleId: string;
  category: string;
  collectorName: string;
  advisorName?: string;
  advisorOtherName?: string;
  collectionYear?: number;
  collectionReason?: string[];
  collectionReasonOther?: string;
  collectionLocation?: string[];
  shortDescription?: string;
  longDescription?: string;
  sampleForm?: string[];
  sampleFormOther?: string;
  sampleType?: string[];
  sampleTypeOther?: string;
  sampleImg?: string;
  storageBuilding?: string;
  storageBuildingOther?: string;
  storageRoom?: string;
  storageRoomOther?: string;
  storageDetails?: string;
  storageDuration?: number;
  locationRectangleBounds?: {
    south: number,
    west: number,
    north: number,
    east: number
  } | null;
  locationMarkerlat?: number | null;
  locationMarkerlng?: number | null;
}

export interface SearchFulltextParams {
    searchterm: string;
}

export interface SearchFilterParams {
  category: string;
  collectorName: string;
  advisorName: string;
  collectionYear: string;
  collectionReason: string;
  sampleForm: string;
  sampleType: string;
  storageBuilding: string;
  storageRoom: string;
}

export interface SearchLocationParams {
  locationRectangleBounds?: {
    south: number,
    west: number,
    north: number,
    east: number
  } | null;
}

export class API {
  public static readonly API_URL =
    "https://3d9e678b12.execute-api.us-east-1.amazonaws.com/prod";
  public static readonly API_KEY = "<YOUR_GoogleAPIKey_HERE>";

  private static fetchGetDeleteData<S>(path: string, method: 'GET'|'DELETE'): Promise<S> {
    return fetch(API.API_URL + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
  }

  private static fetchData<T, S>(
    path: string,
    method: string,
    params: T
  ): Promise<S> {
    return fetch(API.API_URL + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
  }

  // search by SearchFilterParams and return Sample[]
  public static searchByFilter(params: SearchFilterParams): Promise<Sample[]> {
    return this.fetchData<SearchFilterParams, Sample[]>(
      "/samples/search/filters",
      "POST",
      params
    );
  }

  // search by SearchLocationParams and return Sample[]
  public static searchByLocation(
    params: SearchLocationParams
  ): Promise<Sample[]> {
    return this.fetchData<SearchLocationParams, Sample[]>(
      "/samples/search/location",
      "POST",
      params
    );
  }

  // search by full text and return Sample[]
  public static searchByText(params: SearchFulltextParams): Promise<Sample[]> {
    return this.fetchData<SearchFulltextParams, Sample[]>("/samples/search/fulltext", "POST", params);
  }

  // get sample by id and return Sample
  public static getSample(id: number): Promise<Sample> {
    return this.fetchGetDeleteData<Sample>(`/samples/${id}`, 'GET');
  }

  // list all samples and return Sample[]
  public static listSamples(): Promise<Sample[]> {
    return this.fetchGetDeleteData<Sample[]>("/samples", 'GET');
  }

  //add sample using POST
  public static addSample(sample: Sample): Promise<Sample> {
    console.log("POST addSample: ", sample);
    console.log("POST addSample as JSON: ", JSON.stringify(sample));
    return this.fetchData<Sample, Sample>("/samples", "POST", sample);
  }

  // delete Sample by id
  public static deleteSample(id: number): Promise<Sample> {
    return this.fetchGetDeleteData<Sample>(`/samples/${id}`, "DELETE");
  }

  // example of batch upload given the provided file that has samples
  public static batchUpload(file: File): Promise<Sample[]> {
    const formData = new FormData();
    formData.append("file", file);
    return fetch(API.API_URL + "/batchupload", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
  }

  // login to get token
  public static login(username: string, password: string): Promise<string> {
    return this.fetchData<{ username: string; password: string }, string>(
      "/login",
      "POST",
      { username, password }
    );
  }
}
