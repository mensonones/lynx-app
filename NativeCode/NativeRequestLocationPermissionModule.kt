package com.lynx.explorer.modules

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.location.LocationManager
import android.location.Location
import com.lynx.jsbridge.Arguments

import android.util.Log

import com.lynx.jsbridge.LynxMethod
import com.lynx.jsbridge.LynxModule
import com.lynx.react.bridge.Callback
import com.lynx.tasm.behavior.LynxContext

class NativeRequestLocationPermissionModule(context: Context) : LynxModule(context) {
  private val PREF_NAME = "MyRequestLocationPermissionModule"
  private val LOCATION_PERMISSION_REQUEST_CODE = 100
  private var permissionCallback: Callback? = null

  private fun getContext(): Context {
    val lynxContext = mContext as LynxContext
    return lynxContext.getContext()
  }

  private fun getActivity(): Activity? {
    val lynxContext = mContext as LynxContext
    return lynxContext.activity
  }
  
  fun handlePermissionResult(requestCode: Int, grantResults: IntArray) {
    if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
      if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        permissionCallback?.invoke("Permission granted")
      } else {
        permissionCallback?.invoke("Permission denied")
      }
      permissionCallback = null
    }
  }

  @LynxMethod
  fun requestLocationPermission(callback: Callback) {
    val activity = getActivity()
    if (activity == null) {
      callback.invoke(false)
      return
    }

    permissionCallback = callback

    if (ContextCompat.checkSelfPermission(
        activity,
        Manifest.permission.ACCESS_FINE_LOCATION
      ) == PackageManager.PERMISSION_GRANTED
    ) {
      Log.d("Location", "Permission already granted")
      permissionCallback?.invoke(true)  // Permissão concedida = true
      permissionCallback = null
    } else {
      ActivityCompat.requestPermissions(
        activity,
        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
        LOCATION_PERMISSION_REQUEST_CODE
      )
      Log.d("Location", "Permission request sent")
    }
  }

  @LynxMethod
  fun getCurrentLocation(callback: Callback) {
    val activity = getActivity()
    if (activity == null) {
      callback.invoke(mapOf("error" to "Activity not found"))
      return
    }
    
    if (ContextCompat.checkSelfPermission(
        activity,
        Manifest.permission.ACCESS_FINE_LOCATION
      ) != PackageManager.PERMISSION_GRANTED
    ) {
      callback.invoke(mapOf("error" to "Location permission not granted"))
      return
    }

    val locationManager = activity.getSystemService(Context.LOCATION_SERVICE) as LocationManager

    try {
      val lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER)
        ?: locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER)

      if (lastKnownLocation != null) {
        Log.d("Location", "Latitude: ${lastKnownLocation.latitude}, Longitude: ${lastKnownLocation.longitude}")
        val resultMap = Arguments.createMap()
        resultMap.putDouble("latitude", lastKnownLocation.latitude)
        resultMap.putDouble("longitude", lastKnownLocation.longitude)
        callback.invoke(resultMap)
      } else {
        val errorMap = Arguments.createMap()
        errorMap.putString("error", "Location not available")
        callback.invoke(errorMap)
      }
    } catch (e: Exception) {
      Log.d("Location", "Error getting location: ${e.message}")
      val errorMap = Arguments.createMap()
      errorMap.putString("error", "Error getting location: ${e.message}")
      callback.invoke(errorMap)
    }
  }
}
