import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { AppComponent } from './app.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            BrowserModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule
        ],
        providers: [NgForm],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map