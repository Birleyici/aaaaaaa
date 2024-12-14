import { android as androidApp } from '@nativescript/core/application';
import { isAndroid } from '@nativescript/core';

export class PermissionsService {
    async requestOverlayPermission(): Promise<boolean> {
        if (!isAndroid) {
            console.log('Overlay permissions are not supported on iOS');
            return false;
        }

        const context = androidApp.context;
        const Settings = android.provider.Settings;
        
        if (!Settings.canDrawOverlays(context)) {
            const intent = new android.content.Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                android.net.Uri.parse("package:" + context.getPackageName())
            );
            
            context.startActivity(intent);
        }
        
        return Settings.canDrawOverlays(context);
    }
}