//API_KEY: AIzaSyCK7obmyQyE1pnxCDG7XbwFSzGjQ2UOXZ0

import {
  GoogleMap,
  DrawingManager,
  useJsApiLoader,
  Libraries,
  Marker,
  Rectangle,
} from "@react-google-maps/api";
import React, { useState, memo, useCallback } from "react";
import { useFormikContext } from "formik";

const containerStyle = {
  width: "700px",
  height: "600px",
};

const POCATELLO = {
  lat: 42.880363,
  lng: -112.452911,
};

const googleApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  : "";

export default memo(function MyGoogleMap(): JSX.Element {
  const { values, setFieldValue } = useFormikContext();

  const [libraries] = useState<Libraries>(["drawing"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleApiKey,
    libraries: libraries,
  });
  const [overlay, setOverlay] =
    useState<google.maps.drawing.OverlayCompleteEvent>();
  const [map, setMap] = useState<google.maps.Map>();
  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager>();
  const onMapLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance
    setMap(map);
  }, []);

  const onDrawingManagerLoad = useCallback(function callback(
    drawingManager: google.maps.drawing.DrawingManager
  ) {
    // This is just an example of getting and using the drawingManager instance
    if (drawingManager == null) {
      return;
    }
    setDrawingManager(drawingManager);
  },
  []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(undefined);
  }, []);

  const handleOnRectangleComplete = (rectangle: google.maps.Rectangle) => {
    console.log("##################", rectangle.getBounds());
    setFieldValue("locationMarkerlat", null);
    setFieldValue("locationMarkerlng", null);
    setFieldValue("locationRectangleBounds", rectangle.getBounds());
  };

  const handleOnMarkerComplete = (marker: google.maps.Marker) => {
    let lat = marker.getPosition()?.lat();
    let lng = marker.getPosition()?.lng();

    if (lat && lng) {
      setFieldValue("locationMarkerlat", lat);
      setFieldValue("locationMarkerlng", lng);
      setFieldValue("locationRectangleBounds", null);
      // console.log("formik values", values);
      // props.onMarkerSet(lat, lng);
    }
  };

  const handleOverlayComplete = (
    e: google.maps.drawing.OverlayCompleteEvent
  ) => {
    if (overlay) overlay.overlay?.setMap(null);
    setOverlay(e);
  };

  const deleteOverlay = () => {
    setFieldValue("locationMarkerlat", null);
    setFieldValue("locationMarkerlng", null);
    setFieldValue("locationRectangleBounds", null);
    if (overlay) overlay.overlay?.setMap(null);
  };

  return isLoaded ? (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <label htmlFor="collectionLocation">Location Coordinates</label>
        </div>
        <div>
          <button
            type="button"
            onClick={deleteOverlay}
            className=" bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded"
          >
            Clear Location
          </button>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={POCATELLO}
        zoom={10}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker
          key={123}
          position={{
            lat: 42.880363,
            lng: -112.452911,
          }}
        />
        <Rectangle
        // bounds= {
        //   zh
        //   north: 33.685,
        //   south: 33.671,
        //   east: -116.224,
        //   west: -116.251
        // }
        />
        <DrawingManager
          drawingMode={google.maps.drawing?.OverlayType.RECTANGLE}
          onRectangleComplete={handleOnRectangleComplete}
          onMarkerComplete={handleOnMarkerComplete}
          onOverlayComplete={handleOverlayComplete}
          onLoad={onDrawingManagerLoad}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              drawingModes: [
                google.maps.drawing?.OverlayType.RECTANGLE,
                google.maps.drawing?.OverlayType.MARKER,
              ],
            },
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
});
