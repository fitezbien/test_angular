import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const optionRequete = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Access-Control-Allow-Origin':'*','Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllInterventions(): Observable<any> {
    return this.http.get(this.baseurl + '/interventions/',
    optionRequete);
  }
 getOneInterventions(id): Observable<any> {
    return this.http.get(this.baseurl + '/interventions/' + id + '/',
    {headers: this.httpHeaders});
  }
 
  updateIntervention(intervention): Observable<any> {

    const body = {libelle: intervention.libelle , description: intervention.description, intervenant: intervention.intervenant, lieu: intervention.lieu, date: intervention.date, statut: intervention.statut };
    return this.http.put(this.baseurl + '/interventions/' + intervention.id + '/', body,
    {headers: this.httpHeaders});

  }
  
  createIntervention(intervention): Observable<any> {

    const body = {libelle: intervention.libelle , description: intervention.description, intervenant: intervention.intervenant, lieu: intervention.lieu, date: intervention.date, statut: intervention.statut };
    return this.http.post(this.baseurl + '/interventions/', body,
    {headers: this.httpHeaders});


  }

  deleteIntervention(id): Observable<any> {

    return this.http.delete(this.baseurl + '/interventions/' + id + '/',
    {headers: this.httpHeaders});
  }


}