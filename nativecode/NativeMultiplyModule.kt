package com.lynx.explorer.modules

import android.content.Context
import com.lynx.jsbridge.LynxMethod
import com.lynx.jsbridge.LynxModule
import com.lynx.tasm.behavior.LynxContext


class NativeMultiplyModule(context: Context) : LynxModule(context) {
  private val PREF_NAME = "MyMultiplyModule"

  private fun getContext(): Context {
    val lynxContext = mContext as LynxContext
    return lynxContext.getContext()
  }

  @LynxMethod
  fun multiply(a: Int, b: Int): Int {
    return a * b;
  }
}
