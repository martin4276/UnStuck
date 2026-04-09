package expo.modules.strictmode

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.view.WindowManager
import android.app.Activity
import android.app.ActivityManager
import android.content.Context
import android.os.Build
import android.view.View
import android.content.Intent
import android.app.usage.UsageStatsManager
import java.util.*

class StrictModeModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("StrictMode")

    Function("enableStrictMode") {
      val activity = appContext.currentActivity ?: return@Function
      activity.runOnUiThread {
        activity.window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            activity.window.setDecorFitsSystemWindows(false)
        } else {
            @Suppress("DEPRECATION")
            activity.window.decorView.systemUiVisibility = (
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
            )
        }
      }
    }

    Function("disableStrictMode") {
      val activity = appContext.currentActivity ?: return@Function
      activity.runOnUiThread {
        activity.window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            activity.window.setDecorFitsSystemWindows(true)
        } else {
            @Suppress("DEPRECATION")
            activity.window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_VISIBLE
        }
      }
    }

    Function("isAppInForeground") {
      val context = appContext.reactContext ?: return@Function false
      val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
      val runningAppProcesses = activityManager.runningAppProcesses ?: return@Function false
      val packageName = context.packageName
      for (appProcess in runningAppProcesses) {
        if (appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND && appProcess.processName == packageName) {
          return@Function true
        }
      }
      return@Function false
    }
  }
}
