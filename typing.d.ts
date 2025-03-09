
declare let NativeModules: {
    NativeMultiplyModule: {
        multiply(a: number, b: number): number;
    }
    NativeRequestLocationPermissionModule: {
        requestLocationPermission(callback: (result: boolean) => void): void;
        getCurrentLocation(callback: (result: {
            latitude?: number;
            longitude?: number;
            error?: string;
        }) => void): void;
    }
    
}