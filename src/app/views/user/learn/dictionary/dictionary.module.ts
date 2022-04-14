import { MxModule } from '../partials/mx.module';
import { MprepCommonModule } from '../legacy/mprep-common/mprep-common.module';

import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router'
import { DictionaryComponent } from './dictionary.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorMsgModule } from '../shared/error_msg/error_msg.module';
import { PipeModule } from '../pipe/pipe.module';
import { DirectiveModule } from '../legacy/directive/directive.module';
import { DictionaryInfoComponent } from './dictionaryInfo/dictionaryInfo.component';
import { ShortDefComponent } from './shortdefination/shortdef';

const routes: Route[] = [
    {
        path: '',
        component: DictionaryComponent,
    }
]

@NgModule({
    declarations:[DictionaryComponent,DictionaryInfoComponent, ShortDefComponent],
    entryComponents:[],
    exports:[DictionaryComponent,DictionaryInfoComponent, ShortDefComponent],
    imports: [

        IonicModule.forRoot({hardwareBackButton: false}),
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ErrorMsgModule,
        PipeModule,
        DirectiveModule,
        MprepCommonModule,

        MxModule
    ]
})
export class DictionaryModule{

}
