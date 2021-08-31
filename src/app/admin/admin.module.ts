import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { AdminProductService } from './services/admin-product.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                children: [
                    {
                        path: 'product',
                        component: ProductComponent,
                        children: [
                            {
                                path: 'list',
                                component: ProductListComponent
                            },
                            {
                                path: 'create',
                                component: ProductCreateComponent
                            },
                            {
                                path: 'edit/:id',
                                component: ProductEditComponent
                            },
                            {
                                path: '',
                                redirectTo: 'list',
                                pathMatch: 'full'
                            }
                        ]
                    },
                    {
                        path: '',
                        redirectTo: 'product',
                        pathMatch: 'full'
                    }
                ]
            }
        ])
    ],
    declarations: [
        AdminComponent,
        ProductComponent,
        ProductListComponent,
        ProductCreateComponent,
        ProductEditComponent
    ],
    providers: [AdminProductService]
})
export class AdminModule { }