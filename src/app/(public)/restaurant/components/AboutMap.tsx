'use client';
import { Branch } from '@/lib/types';
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import defaultImage from '@/assets/images/restaurant.png';

interface Props {
  branch: Branch;
}

export const AboutMap: React.FC<Props> = ({ branch }) => {
  return (
    <div className="flex-col hidden md:flex w-full items-end gap-3">
      {branch.latitude && branch.longitude && (
        <div className="hidden md:block w-full h-64 rounded-lg overflow-hidden border">
          <Map
            mapId="d34c272a99808261"
            defaultZoom={15}
            defaultCenter={{
              lat: branch.latitude,
              lng: branch.longitude,
            }}
            gestureHandling={'greedy'}
          >
            <AdvancedMarker position={{ lat: branch.latitude, lng: branch.longitude }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                className="fill-red-600"
              >
                <path
                  fillRule="evenodd"
                  d="m23.08 44.702l.14.08l.056.032a1.52 1.52 0 0 0 1.446 0l.056-.03l.142-.082q.182-.106.51-.305c.434-.266 1.048-.66 1.78-1.178a39.2 39.2 0 0 0 5.364-4.564c3.888-3.98 7.926-9.96 7.926-17.654a16.5 16.5 0 0 0-33 0c0 7.694 4.038 13.674 7.926 17.654a39.2 39.2 0 0 0 5.364 4.564a34 34 0 0 0 2.29 1.484M24 27a6 6 0 1 0 0-12a6 6 0 0 0 0 12"
                  clipRule="evenodd"
                />
                <defs>
                  <clipPath id="circleView">
                    <circle cx="24" cy="21" r="14" />
                  </clipPath>
                </defs>
                <image
                  href={branch.logo ?? defaultImage}
                  x="8"
                  y="6"
                  className="w-8 h-8"
                  clipPath="url(#circleView)"
                />
              </svg>
            </AdvancedMarker>
          </Map>
        </div>
      )}
    </div>
  );
};
