import { root, useCallback, useEffect, useState } from '@lynx-js/react'

import './App.css'
import lynxLogo from './assets/lynx-logo.png'
import reactLynxLogo from './assets/react-logo.png'

const COLORS = {
  primary: "#4a6cf7",
  secondary: "#00a86b",
  accent: "#67e8f9",
  background: "#f8fafc",
  darkBg: "#1e293b",
  text: "#2d3748",
  lightText: "#94a3b8",
  white: "#ffffff"
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    padding: "20px",
    width: "100%",
    height: "100%",
  },
  card: {
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    margin: "12px",
  },
  header: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: "32px",
  },
  logoContainer: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    width: "120px",
    height: "120px",
    backgroundColor: COLORS.darkBg,
    borderRadius: "60px",
    padding: "16px",
    margin: "0 auto 20px auto",
  },
  logo: {
    width: "100%",
    height: "100%",
    transition: "all 0.5s ease",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold" as "bold",
    color: COLORS.primary,
    textAlign: "center" as "center",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "18px",
    color: COLORS.lightText,
    textAlign: "center" as "center",
    marginBottom: "24px",
  },
  button: {
    padding: "16px",
    backgroundColor: COLORS.primary,
    borderRadius: "12px",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    boxShadow: "0 6px 12px rgba(74, 108, 247, 0.3)",
    transition: "all 0.3s ease",
    marginBottom: "16px",
  },
  buttonText: {
    fontSize: "18px",
    fontWeight: "bold" as "bold",
    color: COLORS.white,
  },
  infoText: {
    fontSize: "16px",
    color: COLORS.text,
    textAlign: "center" as "center",
    marginTop: "20px",
  },
  infoTextBold: {
    fontSize: "16px",
    color: COLORS.white,
    textAlign: "center" as "center",
    marginTop: "20px",
    fontWeight: "bold" as "bold",
  },
  locationInfo: {
    fontSize: "16px",
    color: COLORS.primary,
    textAlign: "center" as "center",
    marginTop: "20px",
    padding: "12px",
    borderRadius: "8px",
  },
  errorText: {
    color: COLORS.secondary,
    fontSize: "16px",
    textAlign: "center" as "center",
    marginTop: "12px",
  }
}

export function App() {
  const [alterLogo, setAlterLogo] = useState(false)
  const [permission, setPermission] = useState<boolean | null>(null)
  const [location, setLocation] = useState<{ latitude?: number; longitude?: number; error?: string } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    console.info('Hello, ReactLynx Location App')
  }, [])

  const onTap = useCallback(() => {
    setAlterLogo(!alterLogo)
  }, [alterLogo])

  const requetsLocationPermission = () => {
    setLocationError(null);
    NativeModules.NativeRequestLocationPermissionModule.requestLocationPermission((result: boolean) => {
      setPermission(result);
    })
  }

  const getCurrentLocation = () => {
    setLocationError(null);
    NativeModules.NativeRequestLocationPermissionModule.getCurrentLocation((result: any) => {
      console.log(result);
      
      if (result.error) {
        setLocationError(result.error);
        setLocation(null);
      } else {
        setLocation({
          latitude: result.latitude,
          longitude: result.longitude
        });
      }
    });
  }

  return (
    <view style={styles.container}>
      <view style={styles.card}>
        <view style={styles.header}>
          <view style={styles.logoContainer} bindtap={onTap}>
            {alterLogo ? (
              <image
                src={reactLynxLogo}
                style={styles.logo}
                className="logo-animation"
              />
            ) : (
              <image
                src={lynxLogo}
                style={styles.logo}
                className="logo-animation"
              />
            )}
          </view>
          <text style={styles.title}>Native Module</text>
          <text style={styles.subtitle}>Access device location</text>
        </view>

        {!permission && (<view
          style={styles.button}
          bindtap={requetsLocationPermission}
        >
          <text style={styles.buttonText}>Request Permission</text>
        </view> )}

        {permission && (<view
          style={{
            ...styles.button,
            backgroundColor: COLORS.secondary,
          }}
          bindtap={getCurrentLocation}
        >
          <text style={styles.buttonText}>Get Location</text>
        </view> )}

        {locationError && (
          <view>
            <text style={styles.errorText}>
              Error: {locationError}
            </text>
          </view>
        )}

        {location && (
          <view style={styles.locationInfo}>
            <text style={styles.infoTextBold}>
              Lat: {location.latitude}
            </text>
            <text style={styles.infoTextBold}>
              Lng: {location.longitude}
            </text>
          </view>
        )}

        {!location && !locationError && (
          <text style={styles.infoTextBold}>
            No location available
          </text>
        )}
      </view>
    </view>
  );
}