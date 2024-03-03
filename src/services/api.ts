import axios from 'axios';

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

export interface MapSearchLocationParams {
  locationRectangleBounds?: {
    Jh: {
      lo: number;
      hi: number;
    },
    Zh: {
      lo: number;
      hi: number;
    },
  } | null;
}

export interface FileUpload {
  file?: File | undefined;
}

export interface ResultStatus {
    success: boolean,
    message: string
}

export interface PresignedURL {
    url: string;
    sourceFileName: string;
    destS3FileName: string;
}

export interface FileParams {
    name: string;
    contentType: string;
}

export class API {
    public static readonly API_URL = "https://3d9e678b12.execute-api.us-east-1.amazonaws.com/prod";
    private static AUTH_TOKEN = "";

    private static fetchGetDeleteData<S>(path: string, method: 'GET' | 'DELETE'): Promise<S> {
        return fetch(API.API_URL + path, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${API.AUTH_TOKEN}`
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
                'Authorization': `Bearer ${API.AUTH_TOKEN}`
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
    public static addSample(sample: Sample): Promise<ResultStatus> {
        return this.fetchData<Sample, ResultStatus>("/samples", "POST", sample);
    }

    // delete Sample by id
    public static deleteSample(id: number): Promise<ResultStatus> {
        return this.fetchGetDeleteData<ResultStatus>(`/samples/${id}`, "DELETE");
    }

    public static uploadFile(file: File, presignedUrl: PresignedURL): Promise<ResultStatus> {
        return axios.put(presignedUrl.url, file, {
            headers: {
                'Content-Type': file.type,
            },
        })
            .then((response) => {
                console.log(response);
                return { success: true, message: "" };
            });
    }
    
    public static getPresignedUrl(file: File): Promise<PresignedURL> {
        const fileParams: FileParams = { name: file.name, contentType: file.type };
        return this.fetchData<{ contentType: string }, PresignedURL>(
            "/presigned-url",
            "POST",
            fileParams
        );
    }

    public static batchUpload(presignedURL: PresignedURL): Promise<ResultStatus> {
        return this.fetchData<PresignedURL, ResultStatus>(
            "/samples/upload/batch",
            "POST",
            presignedURL
        );
    }

    // login to get token
    public static login(username: string, password: string): Promise<string> {
        return this.fetchData<{ username: string; password: string }, string>(
            "/login",
            "POST",
            { username: username, password: password }
        );
    }

    public static retrieveAuthToken(accessCode: string) {
        return this.fetchGetDeleteData<string>(`/id_token/${accessCode}`, 'GET')
        .then(token => {
            API.AUTH_TOKEN = token;
        });
    }
}
