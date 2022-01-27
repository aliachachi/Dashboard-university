
httpRequest = new XMLHttpRequest();
httpRequest.open('GET','/api/number_std_per_year');
httpRequest.onreadystatechange = function()
{
  if (httpRequest.readyState === 4 && httpRequest.status === 200)
  {
    json_nombre = JSON.parse(httpRequest.response);
    Nombre_Etudiant_Par_Année(json_nombre);
  }
};
httpRequest.send();


function Nombre_Etudiant_Par_Année(data_de_bdd){
  
  var label = data_de_bdd.map(function(e){
    return e.annee
  });
  
  var datas = data_de_bdd.map(function(e){
    return e.mat
  });
  
  // Bar chart
  Chart.defaults.global.defaultFontColor ="#191e28";
    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: "Nombre d'étudiants",
            backgroundColor: ['orange','black','brown'],
            borderColor: ["grey","grey","grey"],
            borderWidth:1,
            
            data: datas
          }
        ]
      },
      options: {
        responsive: false,
        legend: { display: false },
        title: {
          display: false,
          text: 'Nombre des étudiants'
        }
      }
  });
} 
/*--------------------------------------line_chart number of student per speciality-------------------------------------------*/ 

httpRequest2 = new XMLHttpRequest();
httpRequest2.open('GET','/api/Evolution_per_spec');
httpRequest2.onreadystatechange = function()
{
  if (httpRequest2.readyState === 4 && httpRequest2.status === 200)
  {
    json_nombre = JSON.parse(httpRequest2.response);
    evolution_specialite_par_annee(json_nombre);
  }
};
httpRequest2.send();



function evolution_specialite_par_annee(datass){
  

  for(d of datass.donnee){
    d.fill = false;				  
    d.borderColor='#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
 		d.radius=1;			
    d.color= "#408ec6" ;
  }


 
  new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: datass.annee,
        datasets: datass.donnee
      },
      options: {
        responsive:false,
        maintainAspectRatio: true,
        color:"#408ec6",
        title: {
          display: false,
          text: 'Evolution du nombre d'+'étudiant de la spécialité',
        }
      }
  });
}


//--------------------------line_chart_losers------------------------------------

httpRequest3 = new XMLHttpRequest();
httpRequest3.open('GET','/api/losers_in_speciality');
httpRequest3.onreadystatechange = function()
{
  if (httpRequest3.readyState === 4 && httpRequest3.status === 200)
  {
    json_nombre = JSON.parse(httpRequest3.response);
    Admis_specialite_par_annee(json_nombre);
  }
};
httpRequest3.send();



function Admis_specialite_par_annee(Admis){
  

  for(d of Admis.donnee){
    d.fill = false;				  
    d.borderColor='#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
 		d.radius=1;			
    d.color= "#408ec6" ;
  }


 
  new Chart(document.getElementById("line-chart2"), {
      type: 'line',
      data: {
        labels: Admis.annee,
        datasets: Admis.donnee
      },
      options: {
        responsive:false,
        maintainAspectRatio: true,
        color:"#408ec6",
        title: {
          display: false,
          text: 'Evolution du nombre d'+'étudiant de la spécialité',
        }
      }
  });
}


/*-----------------------------Actualise butten-----------------------------*/




function actualiser(){
  document.location.reload(true);
}
