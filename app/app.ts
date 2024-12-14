import { Application } from '@nativescript/core';
import { AppRootComponent } from './components/app-root/app-root';

Application.run({ create: () => new AppRootComponent().$start() });