import { Observable } from '@nativescript/core';
import { TextReplacement } from '../../models/text-replacement.model';
import { OverlayService } from '../../services/overlay.service';
import { PermissionsService } from '../../services/permissions.service';

export class HomeViewModel extends Observable {
    private overlayService: OverlayService;
    private permissionsService: PermissionsService;
    private replacements: TextReplacement[] = [];
    
    constructor() {
        super();
        
        this.overlayService = new OverlayService();
        this.permissionsService = new PermissionsService();
        
        this.set('originalText', '');
        this.set('replacementText', '');
        this.set('replacements', this.replacements);
    }
    
    async requestPermissions() {
        try {
            const granted = await this.permissionsService.requestOverlayPermission();
            if (granted) {
                console.log('Permissions granted');
            } else {
                console.log('Permissions denied');
            }
        } catch (error) {
            console.error('Permission request failed:', error);
        }
    }
    
    addReplacement() {
        const originalText = this.get('originalText');
        const replacementText = this.get('replacementText');
        
        if (!originalText || !replacementText) return;
        
        const replacement: TextReplacement = { originalText, replacementText };
        this.replacements.push(replacement);
        this.overlayService.addTextReplacement(replacement);
        
        this.set('originalText', '');
        this.set('replacementText', '');
        this.notifyPropertyChange('replacements', this.replacements);
    }
    
    async startOverlay() {
        try {
            await this.overlayService.startOverlay();
            console.log('Overlay service started');
        } catch (error) {
            console.error('Failed to start overlay:', error);
        }
    }
    
    async stopOverlay() {
        try {
            await this.overlayService.stopOverlay();
            this.replacements = [];
            this.notifyPropertyChange('replacements', this.replacements);
            console.log('Overlay service stopped');
        } catch (error) {
            console.error('Failed to stop overlay:', error);
        }
    }
}