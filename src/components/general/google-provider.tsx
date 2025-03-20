'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { APIProvider } from '@vis.gl/react-google-maps';

export const GoogleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_URL ?? ''}>
      <APIProvider apiKey={process.env.GOOGLE_MAPS_API ?? ''} libraries={['marker']}>
        {children}
      </APIProvider>
    </GoogleOAuthProvider>
  );
};
