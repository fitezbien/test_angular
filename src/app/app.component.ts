import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { DatePipe } from '@angular/common';
 
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, DatePipe]
})



export class AppComponent implements OnInit{

  interventions = [{libelle: '', description: '', intervenant:'' , lieu: '', date:'', statut:''}];
  selectedIntervention: any = {};
  addIntervention
  Date = new Date();

  constructor(private api: ApiService, private datePipe: DatePipe) {
    this.getInterventions();
    this.selectedIntervention = {id: -1, libelle: "" , intervenant:"" ,description: "", lieu: "", date:"", statut:'' };
    this.addIntervention = {id: -1, libelle: "" , intervenant:"" ,description: "", lieu: "", date:"", statut:'' };
  }


  //Actions CRUD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  getInterventions = () => {
    this.api.getAllInterventions().subscribe(
      data => {
         this.interventions = data 
      },
      error => {
        console.log(error);
      }
    );
  }

  updateIntervention = () => {

    this.checkifValide();
    this.checkIfEmpty()
    this.checkIfTermine();

      this.api.updateIntervention(this.selectedIntervention).subscribe(
        data => {
          this.selectedIntervention = data;
          this.getInterventions()
          console.log(data)
        },
        error => {
          console.log(error);
        }
      );
  }

  createIntervention = () => {

    this.checkifValide();
    this.checkIfEmpty()

     console.log(this.selectedIntervention.statut)
   
    this.api.createIntervention(this.selectedIntervention).subscribe(
      data => {
        this.interventions.push(data);
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }
 
  deleteIntervention= () => {

    this.api.deleteIntervention(this.selectedIntervention.id).subscribe(
      data => {
        this.getInterventions();
      },
      error => {
        console.log(error);
      }
    );
  }

  checkifValide(){

    this.selectedIntervention.statut = "Brouillon"

    if(this.selectedIntervention.libelle != "" && this.selectedIntervention.libelle != "à renseigner"){

      if(this.selectedIntervention.description != "" && this.selectedIntervention.description != "à renseigner"){

          if(this.selectedIntervention.intervenant != "" && this.selectedIntervention.intervenant != "à renseigner"){
            
            if(this.selectedIntervention.lieu != "" && this.selectedIntervention.lieu != "à renseigner"){

              if(this.selectedIntervention.date != "" && this.selectedIntervention.date != "01/01/9999"){

                this.selectedIntervention.statut = "Validé"
              }
            }
          }
        }
      }
  }

  checkIfEmpty(){

      if(this.selectedIntervention.libelle == "")
      this.selectedIntervention.libelle ="à renseigner"
      if(this.selectedIntervention.description == "")
        this.selectedIntervention.description ="à renseigner"
      if(this.selectedIntervention.intervenant == "")
        this.selectedIntervention.intervenant ="à renseigner"
      if(this.selectedIntervention.lieu == "")
        this.selectedIntervention.lieu ="à renseigner"
      if(this.selectedIntervention.date == "")
      this.selectedIntervention.date ="9999-01-01"
  }

  checkIfTermine(){

    var today
    var dateIntervention

    dateIntervention = this.datePipe.transform(this.selectedIntervention.date, 'yyyyMMdd');
    today = this.datePipe.transform(this.Date, 'yyyyMMdd');

    if(dateIntervention < today)
    this.selectedIntervention.statut = "Terminé"

    console.log(today+" "+dateIntervention)

  }
  //Actions OnClick >>>>>>>>>>>>>>>>>>>>>>>>>>

  interventionClicked = (intervention) => {

    this.api.getOneInterventions(intervention.id).subscribe(
      data => {
        this.selectedIntervention = data
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  addClicked(){

    this.selectedIntervention = this.addIntervention

  }

// Actions boutons Date : croissant et décroissant

  ngOnInit() {

    $("#croissant").click(function(){
      var nbRows = $(".row").length
      var arraydates = []

      for(var i =0; i<nbRows; i++){

        //arraydates.push($('.date').index(i).text()) 
        arraydates.push($('.date').eq(i).text())

      }

      arraydates.sort(SortByDate)

      for(var j =0; j<arraydates.length; j++){

        for(var i =0; i<nbRows; i++){

            if($('.date').eq(i).text() == arraydates[j]){

                $('#tbody1').append($('.date').eq(i).parent("tr"))
            }

        }
      }
      reorderNumbers(nbRows)
    })

    $("#decroissant").click(function(){

      var nbRows = $(".row").length
      var arraydates = []

      for(var i =0; i<nbRows; i++){

        //arraydates.push($('.date').index(i).text()) 
        arraydates.push($('.date').eq(i).text())

      }

      arraydates.sort(SortByDate)

      for(var j =arraydates.length; j>0; j--){
          console.log(arraydates[j-1])
        for(var i =0; i<nbRows; i++){

            if($('.date').eq(i).text() == arraydates[j-1]){

                $('#tbody1').append($('.date').eq(i).parent("tr"))

            }
        }
      }
      reorderNumbers(nbRows)
    })

    function reorderNumbers(nbRows){

      for(var i =0; i<nbRows; i++){

        $(".row").eq(i).text(i+1)

      }
    }

    function SortByDate(a, b){
      var amyDate = a.split("/");
      var aNewDate=new Date(amyDate[1]+","+amyDate[0]+","+amyDate[2]).getTime();
      var bmyDate = b.split("/");
      var bNewDate=new Date(bmyDate[1]+","+bmyDate[0]+","+bmyDate[2]).getTime();
      return ((aNewDate < bNewDate) ? -1 : ((aNewDate > bNewDate) ? 1 : 0));
   }

}

}
