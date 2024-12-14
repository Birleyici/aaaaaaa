import { isAndroid } from '@nativescript/core';
import { TextReplacement } from '../models/text-replacement.model';
import { AndroidUtils } from '../utils/android-utils';

export class OverlayService {
    private overlayView: any;
    private textReplacements: TextReplacement[] = [];
    
    addTextReplacement(replacement: TextReplacement) {
        this.textReplacements.push(replacement);
    }

    clearTextReplacements() {
        this.textReplacements = [];
    }
    
    async startOverlay(): Promise<void> {
        if (!isAndroid) {
            console.log('Overlay service is not supported on iOS');
            return;
        }

        const context = AndroidUtils.getContext();
        const windowManager = AndroidUtils.getWindowManager();
        
        this.overlayView = new android.widget.TextView(context);
        this.updateOverlayText();
        this.overlayView.setTextColor(android.graphics.Color.WHITE);
        this.overlayView.setBackgroundColor(android.graphics.Color.parseColor("#80000000"));
        
        const params = AndroidUtils.createOverlayParams();
        windowManager.addView(this.overlayView, params);
    }
    
    private updateOverlayText() {
        if (!this.overlayView || this.textReplacements.length === 0) return;
        
        const replacementText = this.textReplacements
            .map(r => `${r.originalText} → ${r.replacementText}`)
            .join('\n');
        this.overlayView.setText(replacementText);
    }
    
    async stopOverlay(): Promise<void> {
        if (!isAndroid || !this.overlayView) {
            return;
        }

        const windowManager = AndroidUtils.getWindowManager();
        windowManager.removeView(this.overlayView);
        this.overlayView = null;
        this.clearTextReplacements();
    }
}