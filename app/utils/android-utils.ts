import { isAndroid } from '@nativescript/core';
import { android as androidApp } from '@nativescript/core/application';

export class AndroidUtils {
    static getContext() {
        if (!isAndroid) {
            throw new Error('This method can only be called on Android');
        }
        return androidApp.context;
    }

    static getWindowManager() {
        const context = this.getContext();
        return context.getSystemService(android.content.Context.WINDOW_SERVICE);
    }

    static createOverlayParams() {
        return new android.view.WindowManager.LayoutParams(
            android.view.WindowManager.LayoutParams.WRAP_CONTENT,
            android.view.WindowManager.LayoutParams.WRAP_CONTENT,
            android.os.Build.VERSION.SDK_INT >= 26
                ? android.view.WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                : android.view.WindowManager.LayoutParams.TYPE_PHONE,
            android.view.WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            android.graphics.PixelFormat.TRANSLUCENT
        );
    }
}