import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
const optionRequete = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    })
};
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
        this.baseurl = "http://127.0.0.1:8000";
        this.httpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
    }
    getAllInterventions() {
        return this.http.get(this.baseurl + '/interventions/', optionRequete);
    }
    getOneInterventions(id) {
        return this.http.get(this.baseurl + '/interventions/' + id + '/', { headers: this.httpHeaders });
    }
    updateIntervention(intervention) {
        console.log(intervention);
        const body = { libelle: intervention.libelle, description: intervention.description, intervenant: intervention.intervenant, lieu: intervention.lieu, date: intervention.date };
        return this.http.put(this.baseurl + '/interventions/' + intervention.id + '/', body, { headers: this.httpHeaders });
    }
    createIntervention(intervention) {
        console.log(intervention);
        const body = { libelle: intervention.libelle, description: intervention.description, intervenant: intervention.intervenant, lieu: intervention.lieu, date: intervention.date };
        return this.http.post(this.baseurl + '/interventions/', body, { headers: this.httpHeaders });
    }
};
ApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map