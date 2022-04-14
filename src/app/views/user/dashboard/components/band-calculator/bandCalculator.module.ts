import { MxModule } from '../partials/mx.module';
import { MprepCommonModule } from 'src/app/legacy/mprep-common/mprep-common.module';

import {  RouterModule,Route } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ErrorMsgModule } from '../shared/error_msg/error_msg.module';
import { bandCalculatorComponent } from './bandCalculator.component';
import { DirectiveModule } from '../legacy/directive/directive.module';

const routes: Route []= [
    { path: "bandCalculator", component: bandCalculatorComponent },
    ]

@NgModule({
    imports: [

        IonicModule.forRoot(),
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        ErrorMsgModule,
        DirectiveModule,
        MprepCommonModule,
        MxModule
    ],
    declarations: [
       bandCalculatorComponent

        ],
    entryComponents:
     [
        bandCalculatorComponent

        ],
    exports:
    [
      bandCalculatorComponent

    ]
})
export class bandCalculatorModule { }
