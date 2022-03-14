#! /usr/bin/env node
import { Commander } from '@bleed-believer/commander';
import { AppRoutingModule } from './app-routing.module';

const main = new Commander(AppRoutingModule);
main.execute();