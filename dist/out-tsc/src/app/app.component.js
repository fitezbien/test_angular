import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
let AppComponent = class AppComponent {
    constructor(api) {
        this.api = api;
        this.interventions = [{ libelle: '', description: '', intervenant: '', lieu: '', date: '' }];
        this.selectedIntervention = {};
        this.getInterventions = () => {
            this.api.getAllInterventions().subscribe(data => {
                this.interventions = data;
            }, error => {
                console.log(error);
            });
        };
        this.interventionClicked = (intervention) => {
            this.api.getOneInterventions(intervention.id).subscribe(data => {
                this.selectedIntervention = data;
                console.log(data);
            }, error => {
                console.log(error);
            });
        };
        this.updateIntervention = () => {
            this.api.updateIntervention(this.selectedIntervention).subscribe(data => {
                this.selectedIntervention = data;
                console.log(data);
            }, error => {
                console.log(error);
            });
        };
        this.createIntervention = () => {
            this.api.createIntervention(this.selectedIntervention).subscribe(data => {
                this.interventions.push(data);
                console.log(data);
            }, error => {
                console.log(error);
            });
        };
        this.getInterventions();
        this.selectedIntervention = { id: -1, libelle: '', intervenant: '', description: '', lieu: '', date: '' };
        this.addIntervention = { id: -1, libelle: '', intervenant: '', description: '', lieu: '', date: '' };
        this.f.invalid;
    }
    ngOnInit() {
        this.intervention = {
            libelle: ""
        };
    }
    onSubmit() {
        console.log(this.f.value);
    }
    addClicked() {
        this.selectedIntervention = this.addIntervention;
    }
};
__decorate([
    ViewChild('f', null)
], AppComponent.prototype, "f", void 0);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        providers: [ApiService]
    })
], AppComponent);
export { AppComponent };
export class intervention {
}
//# sourceMappingURL=app.component.js.map