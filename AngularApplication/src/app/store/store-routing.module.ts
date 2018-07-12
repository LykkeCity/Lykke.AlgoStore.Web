import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { AuthGuard } from '../services/auth-guard';
import { MyAlgosComponent } from './my-algos/my-algos.component';
import { AlgoRunComponent } from './algo-run/algo-run.component';
import { AlgoInstanceComponent } from './algo-instance/algo-instance.component';
import { ACLGuard } from '../services/acl.guard';
import Permissions from './models/permissions';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { AlgoCreateComponent } from './algo-create/algo-create.component';
import { MyInstancesComponent } from './my-instances/my-instances.component';


const routes: Routes = [
  {
    path: '', component: StoreComponent, children: [
      { path: 'my-algos', component: MyAlgosComponent, canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_USER_ALGOS] } },
      { path: 'algo-list', component: AlgoListComponent, canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_ALL_ALGOS] } },
      {
        path: 'algo-create',
        component: AlgoCreateComponent,
        canActivate: [AuthGuard, ACLGuard],
        data: { acl: [Permissions.CREATE_ALGO] }
      },
      {
        path: 'algo-edit/:clientId/:algoId',
        component: AlgoEditComponent,
        canActivate: [AuthGuard, ACLGuard],
        data: { acl: [Permissions.GET_ALGO_METADATA, Permissions.EDIT_ALGO, Permissions.GET_UPLOAD_STRING] }
      },
      {
        path: 'algo-details/:clientId/:algoId', component: AlgoDetailsComponent,
        canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_UPLOAD_STRING, Permissions.GET_ALGO_METADATA] }
      },
      {
        path: 'algo-run/:clientId/:algoId',
        component: AlgoRunComponent,
        canActivate: [AuthGuard, ACLGuard],
        data: {
          acl: [Permissions.GET_UPLOAD_STRING, Permissions.GET_ALGO_METADATA,
            Permissions.SAVE_ALGO_INSTANCE_DATA]
        }
      },
      {
        path: 'algo-instance/:clientId/:algoId/:instanceId', component: AlgoInstanceComponent,
        canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_ALGO_INSTANCE_DATA, Permissions.GET_UPLOAD_STRING] }
      },
      {
        path: 'my-instances', component: MyInstancesComponent,
        canActivate: [AuthGuard, ACLGuard], data: { acl: [Permissions.GET_USER_INSTANCES] }
      }
    ]
  },
];

export const StoreRouting: ModuleWithProviders = RouterModule.forChild(routes);
