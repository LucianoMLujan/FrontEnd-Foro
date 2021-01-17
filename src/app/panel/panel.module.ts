import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { panelRoutingModule } from './panel-routing.module';
import { MomentModule } from 'angular2-moment';

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

import { UserService } from '../services/user.service';
import { UserGuard } from '../services/user.guard';


@NgModule({
    declarations: [
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        panelRoutingModule,
        MomentModule
    ],
    exports: [
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    providers: [
        UserService, 
        UserGuard
    ]
})

export class PanelModule { }