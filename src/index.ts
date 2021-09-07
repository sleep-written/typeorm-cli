#! /usr/bin/env node
import { BleedBeliever } from '@bleed-believer/core';
import { AppRoutingModule } from './app-routing.module';

const main = new BleedBeliever(AppRoutingModule);
main.bleed();