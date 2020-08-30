//Wizard Init
$("#wizard").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "none",
    stepsOrientation: "vertical",
    titleTemplate: '<span class="number">#index#</span>',
	onStepChanging: function (event, currentIndex, newIndex) { 
	                          // recupelamos el step actual y su valor
                              let stepName = $("#wizard").steps("getStep", currentIndex);
							  let nameIndex = stepName.content.search("name=") + 6;
							  // si me devuelve 5 No existe name
							  if (nameIndex != 5) {
								  stepName = stepName.content.substr(nameIndex,3);
								  stepName = stepName.replace('"',"");
								  let stepValue = $('input[name="'+ stepName +'"]:checked').val();
								  if (stepValue) {							  
									setChange(stepName, stepValue); 
								  } else {
									return false;
								  }  
							  }
							  return true},
	onFinished: function (event, currentIndex) { 
					getResult();
				},
	onInit: 	function (event, currentIndex) { 
	             // Guardamos el Step3 y lo borramos  
//					gvStep3 = $("#wizard").steps("getStep", 2);
//					$("#wizard").steps("remove", 2);
				},
	
	/* Labels */
    labels: {
        cancel: "Cancel",
        current: "current step:",
        pagination: "Pagination",
        finish: "Calulate",
        next: "Next",
        previous: "Previous",
        loading: "Loading ..."
    }
});

//Form control
/* 
 title "Paso 2 Title"
 "
						<h5 class="bd-wizard-step-title">Paso 2</h5>
						<h2 class="section-heading">Estado de la infrastructura</h2>
						<p>En este paso se procede a determinar el estado actual de la estructura, diferenciando si nos encontramos ante una rehabilitación o una obra nueva. En el caso de encontrarnos ante una rehabilitación será importante indicar si se llevará a cabo una renovación de los firmes.  </p>
						<div class="purpose-radios-wrapper">
							<div class="purpose-radio">
								<input type="radio" name="C5" id="obranueva" class="purpose-radio-input" value="ON">
								<label for="obranueva" class="purpose-radio-label">
									<span class="label-text">Obra nueva</span>
								</label>
							</div>
							<div class="purpose-radio">
								<input type="radio" name="C5" id="rehabilitacion" class="purpose-radio-input" value="RE">
								<label for="rehabilitacion" class="purpose-radio-label">
									<span class="label-text">Rehabilitación</span>
								</label>
							</div>
						</div>
					"
*/

 function setChange(stepName, stepValue) { 
	if (typeof gvStep2 === "undefined") { 
//    Si no está definida la definimos
      gvStep2 = ""; 
	  gvStep3 = ""; 
	  gvStep7 = "";
    }

	$(getVariableName( stepName )).text( stepValue );  
	
	switch (stepName) {
		case "C1":   
		    //Ocultamos paso 2, 3 y 7       
			if (stepValue == "IL" || stepValue == "APART" || stepValue == "CAR")  {
				if  ( gvStep2 == "" ) { 
				    gvStep7 = $("#wizard").steps("getStep", 6);
					$("#wizard").steps("remove", 6);
					$('#C7').text("");
					gvStep3 = $("#wizard").steps("getStep", 2);
					$("#wizard").steps("remove", 2);
					$('#C3').text("");
					gvStep2 = $("#wizard").steps("getStep", 1);
					$("#wizard").steps("remove", 1);
					$('#C2').text("");
				}
			} else if ( gvStep2 ) {
				
			    $("#wizard").steps("insert", 1, gvStep2); 
				gvStep1 = "";
				$("#wizard").steps("insert", 2, gvStep3); 
				gvStep3 = "";
				$("#wizard").steps("insert", 6, gvStep7); 
				gvStep7 = "";
				
			}
			break;
		case "C5":   	
			//Ocultamos paso 3
			if (stepValue == "ON")  {
				if  ( gvStep3 == "" ) { 
					gvStep3 = $("#wizard").steps("getStep", 2);
					$("#wizard").steps("remove", 2);
					$('#C3').text("");
				}
			} else if ( gvStep3 ) {
			    $("#wizard").steps("insert", 2, gvStep3); 
				gvStep3 = "";
			}
			break;
		case "C5B":   	
		    $('#C5').text(stepValue); // Machacamos el elemento C5 con el C5B
			
			//Ocultamos paso 7
			if (stepValue == "RCF")  {
				if  ( gvStep7 == "" ) { 
					gvStep7 = $("#wizard").steps("getStep", 6);
					$("#wizard").steps("remove", 6);
					$('#C7').text("");
				}
			} else if ( gvStep7 ) {
			    $("#wizard").steps("insert", 6, gvStep7); 
				gvStep7 = "";
			}
			
			break;			
		
	}

}
	
$('.purpose-radio-input').on('change', function(e) {

 

    });


/* Datos */
 function getVariableName(name) { 
	return "#" + name; 
	}
					
 function getResult() { 
 
    let lt_Result = { 
"ILINFCFDBT":["Cuneta verde","Depósito de infiltración"],
"ILINFCFDAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"ILINFESNBT":["Cuneta verde","Depósito de infiltración"],
"ILINFESNAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"ILINFCSABT":["Cuneta verde","Depósito de infiltración"],
"ILINFCSAAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"ILINFCSBBT":["Cuneta verde","Depósito de infiltración"],
"ILINFCSBAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"ILINFBSKBT":["Cuneta verde","Depósito de infiltración"],
"ILINFBSKAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"ILINFESSBT":["Cuneta verde","Depósito de infiltración"],
"ILINFESSAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"ILREUCFDBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"ILREUCFDAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"ILREUESNBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"ILREUESNAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"ILREUCSABT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILREUCSAAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILREUCSBBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILREUCSBAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILREUBSKBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILREUBSKAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILREUESSBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILREUESSAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILVCNCFDBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"ILVCNCFDAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"ILVCNESNBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"ILVCNESNAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"ILVCNCSABT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILVCNCSAAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILVCNCSBBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILVCNCSBAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILVCNBSKBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILVCNBSKAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILVCNESSBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"ILVCNESSAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTINFCFDBT":["Cuneta verde","Depósito de infiltración"],
"APARTINFCFDAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"APARTINFESNBT":["Cuneta verde","Depósito de infiltración"],
"APARTINFESNAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"APARTINFCSABT":["Cuneta verde","Depósito de infiltración"],
"APARTINFCSAAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"APARTINFCSBBT":["Cuneta verde","Depósito de infiltración"],
"APARTINFCSBAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"APARTINFBSKBT":["Cuneta verde","Depósito de infiltración"],
"APARTINFBSKAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"APARTINFESSBT":["Cuneta verde","Depósito de infiltración"],
"APARTINFESSAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"APARTREUCFDBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"APARTREUCFDAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"APARTREUESNBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"APARTREUESNAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"APARTREUCSABT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTREUCSAAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTREUCSBBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTREUCSBAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTREUBSKBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTREUBSKAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTREUESSBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTREUESSAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTVCNCFDBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"APARTVCNCFDAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"APARTVCNESNBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"APARTVCNESNAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"APARTVCNCSABT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTVCNCSAAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTVCNCSBBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTVCNCSBAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTVCNBSKBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTVCNBSKAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTVCNESSBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"APARTVCNESSAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARINFCFDBT":["Cuneta verde","Depósito de infiltración"],
"CARINFCFDAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"CARINFESNBT":["Cuneta verde","Depósito de infiltración"],
"CARINFESNAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"CARINFCSABT":["Cuneta verde","Depósito de infiltración"],
"CARINFCSAAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"CARINFCSBBT":["Cuneta verde","Depósito de infiltración"],
"CARINFCSBAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"CARINFBSKBT":["Cuneta verde","Depósito de infiltración"],
"CARINFBSKAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"CARINFESSBT":["Cuneta verde","Depósito de infiltración"],
"CARINFESSAT":["Cuneta verde","Depósito de infiltración","Estanque de detención (seco)"],
"CARREUCFDBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"CARREUCFDAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"CARREUESNBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"CARREUESNAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"CARREUCSABT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARREUCSAAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARREUCSBBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARREUCSBAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARREUBSKBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARREUBSKAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARREUESSBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARREUESSAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARVCNCFDBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"CARVCNCFDAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"CARVCNESNBT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"CARVCNESNAT":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"CARVCNCSABT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARVCNCSAAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARVCNCSBBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARVCNCSBAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARVCNBSKBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARVCNBSKAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARVCNESSBT":["Zanja de infiltración ","Estanque de detención (seco)"],
"CARVCNESSAT":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMINFCFDBTON":["Pavimento permeable","Área de biorretención"],
"TMINFCFDATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFESNBTON":["Pavimento permeable","Área de biorretención"],
"TMINFESNATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFCSABTON":["Pavimento permeable","Depósito de infiltración"],
"TMINFCSAATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFCSBBTON":["Pavimento permeable","Depósito de infiltración"],
"TMINFCSBATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFBSKBTON":["Pavimento permeable","Depósito de infiltración"],
"TMINFBSKATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFESSBTON":["Pavimento permeable","Depósito de infiltración"],
"TMINFESSATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUCFDBTON":["Pavimento permeable","Estanque de detención (húmedo)"],
"TMREUCFDATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUESNBTON":["Pavimento permeable","Estanque de detención (húmedo)"],
"TMREUESNATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUCSABTON":["Pavimento permeable","Depósito (Aljibe)"],
"TMREUCSAATON":["Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"TMREUCSBBTON":["Pavimento permeable","Depósito (Aljibe)"],
"TMREUCSBATON":["Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"TMREUBSKBTON":["Pavimento permeable","Depósito (Aljibe)"],
"TMREUBSKATON":["Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"TMREUESSBTON":["Pavimento permeable","Depósito (Aljibe)"],
"TMREUESSATON":["Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"TMVCNCFDBTON":["Pavimento permeable","Estanque de detención (húmedo)"],
"TMVCNCFDATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNESNBTON":["Pavimento permeable","Estanque de detención (húmedo)"],
"TMVCNESNATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNCSABTON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNCSAATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNCSBBTON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNCSBATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNBSKBTON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNBSKATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNESSBTON":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNESSATON":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFCFDBTRCF":["Pavimento permeable","Área de biorretención"],
"TMINFCFDATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFESNBTRCF":["Pavimento permeable","Área de biorretención"],
"TMINFESNATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFCSABTRCF":["Pavimento permeable","Alcorque estructural "],
"TMINFCSAATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFCSBBTRCF":["Pavimento permeable","Alcorque estructural "],
"TMINFCSBATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFBSKBTRCF":["Pavimento permeable","Alcorque estructural "],
"TMINFBSKATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFESSBTRCF":["Pavimento permeable","Alcorque estructural "],
"TMINFESSATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUCFDBTRCF":["Pavimento permeable"],
"TMREUCFDATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUESNBTRCF":["Pavimento permeable"],
"TMREUESNATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUCSABTRCF":["Pavimento permeable"],
"TMREUCSAATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUCSBBTRCF":["Pavimento permeable"],
"TMREUCSBATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUBSKBTRCF":["Pavimento permeable"],
"TMREUBSKATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMREUESSBTRCF":["Pavimento permeable"],
"TMREUESSATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNCFDBTRCF":["Pavimento permeable"],
"TMVCNCFDATRCF":["Pavimento permeable","Estanque de detención (húmedo)"],
"TMVCNESNBTRCF":["Pavimento permeable"],
"TMVCNESNATRCF":["Pavimento permeable","Estanque de detención (húmedo)"],
"TMVCNCSABTRCF":["Pavimento permeable"],
"TMVCNCSAATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNCSBBTRCF":["Pavimento permeable"],
"TMVCNCSBATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNBSKBTRCF":["Pavimento permeable"],
"TMVCNBSKATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMVCNESSBTRCF":["Pavimento permeable"],
"TMVCNESSATRCF":["Pavimento permeable","Estanque de detención (seco)"],
"TMINFCFDBTRSFCE":["Cuneta verde","Área de biorretención"],
"TMINFCFDATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMINFESNBTRSFCE":["Cuneta verde","Área de biorretención"],
"TMINFESNATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMINFCSABTRSFCE":["Cuneta verde","Alcorque estructural ","Depósito de infiltración"],
"TMINFCSAATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMINFCSBBTRSFCE":["Cuneta verde","Alcorque estructural ","Depósito de infiltración"],
"TMINFCSBATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMINFBSKBTRSFCE":["Cuneta verde","Alcorque estructural ","Depósito de infiltración"],
"TMINFBSKATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMINFESSBTRSFCE":["Cuneta verde","Alcorque estructural ","Depósito de infiltración"],
"TMINFESSATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMREUCFDBTRSFCE":["Cuneta verde","Estanque de detención (húmedo)"],
"TMREUCFDATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMREUESNBTRSFCE":["Cuneta verde","Estanque de detención (húmedo)"],
"TMREUESNATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMREUCSABTRSFCE":["Cuneta verde","Depósito (Aljibe)"],
"TMREUCSAATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMREUCSBBTRSFCE":["Cuneta verde","Depósito (Aljibe)"],
"TMREUCSBATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMREUBSKBTRSFCE":["Cuneta verde","Depósito (Aljibe)"],
"TMREUBSKATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMREUESSBTRSFCE":["Cuneta verde","Depósito (Aljibe)"],
"TMREUESSATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMVCNCFDBTRSFCE":["Cuneta verde"],
"TMVCNCFDATRSFCE":["Cuneta verde","Estanque de detención (húmedo)"],
"TMVCNESNBTRSFCE":["Cuneta verde"],
"TMVCNESNATRSFCE":["Cuneta verde","Estanque de detención (húmedo)"],
"TMVCNCSABTRSFCE":["Cuneta verde"],
"TMVCNCSAATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMVCNCSBBTRSFCE":["Cuneta verde"],
"TMVCNCSBATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMVCNBSKBTRSFCE":["Cuneta verde"],
"TMVCNBSKATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMVCNESSBTRSFCE":["Cuneta verde"],
"TMVCNESSATRSFCE":["Cuneta verde","Estanque de detención (seco)"],
"TMINFCFDBTRSFSE":["Zanja de infiltración ","Área de biorretención"],
"TMINFCFDATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMINFESNBTRSFSE":["Zanja de infiltración ","Área de biorretención"],
"TMINFESNATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMINFCSABTRSFSE":["Zanja de infiltración ","Alcorque estructural "],
"TMINFCSAATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMINFCSBBTRSFSE":["Zanja de infiltración ","Alcorque estructural "],
"TMINFCSBATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMINFBSKBTRSFSE":["Zanja de infiltración ","Alcorque estructural "],
"TMINFBSKATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMINFESSBTRSFSE":["Zanja de infiltración ","Alcorque estructural "],
"TMINFESSATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMREUCFDBTRSFSE":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"TMREUCFDATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMREUESNBTRSFSE":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"TMREUESNATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMREUCSABTRSFSE":["Zanja de infiltración ","Depósito (Aljibe)"],
"TMREUCSAATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMREUCSBBTRSFSE":["Zanja de infiltración ","Depósito (Aljibe)"],
"TMREUCSBATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMREUBSKBTRSFSE":["Zanja de infiltración ","Depósito (Aljibe)"],
"TMREUBSKATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMREUESSBTRSFSE":["Zanja de infiltración ","Depósito (Aljibe)"],
"TMREUESSATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMVCNCFDBTRSFSE":["Zanja de infiltración "],
"TMVCNCFDATRSFSE":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"TMVCNESNBTRSFSE":["Zanja de infiltración "],
"TMVCNESNATRSFSE":["Zanja de infiltración ","Estanque de detención (húmedo)"],
"TMVCNCSABTRSFSE":["Zanja de infiltración "],
"TMVCNCSAATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMVCNCSBBTRSFSE":["Zanja de infiltración "],
"TMVCNCSBATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMVCNBSKBTRSFSE":["Zanja de infiltración "],
"TMVCNBSKATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"TMVCNESSBTRSFSE":["Zanja de infiltración "],
"TMVCNESSATRSFSE":["Zanja de infiltración ","Estanque de detención (seco)"],
"ESINFCFDBTON":["Cubierta verde intensiva ","Pavimento permeable","Área de biorretención"],
"ESINFCFDATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESINFESNBTON":["Cubierta verde intensiva ","Pavimento permeable","Área de biorretención"],
"ESINFESNATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESINFCSABTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito de infiltración"],
"ESINFCSAATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESINFCSBBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito de infiltración"],
"ESINFCSBATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESINFBSKBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito de infiltración"],
"ESINFBSKATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESINFESSBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito de infiltración"],
"ESINFESSATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESREUCFDBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (húmedo)"],
"ESREUCFDATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESREUESNBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (húmedo)"],
"ESREUESNATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESREUCSABTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)"],
"ESREUCSAATON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"ESREUCSBBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)"],
"ESREUCSBATON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"ESREUBSKBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)"],
"ESREUBSKATON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"ESREUESSBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)"],
"ESREUESSATON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"ESVCNCFDBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (húmedo)"],
"ESVCNCFDATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNESNBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (húmedo)"],
"ESVCNESNATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNCSABTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNCSAATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNCSBBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNCSBATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNBSKBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNBSKATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNESSBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNESSATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"ESINFCFDBTRCF":["Cubierta verde extensiva","Pavimento permeable","Área de biorretención"],
"ESINFCFDATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESINFESNBTRCF":["Cubierta verde extensiva","Pavimento permeable","Área de biorretención"],
"ESINFESNATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESINFCSABTRCF":["Cubierta verde extensiva","Pavimento permeable","Alcorque estructural "],
"ESINFCSAATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESINFCSBBTRCF":["Cubierta verde extensiva","Pavimento permeable","Alcorque estructural "],
"ESINFCSBATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESINFBSKBTRCF":["Cubierta verde extensiva","Pavimento permeable","Alcorque estructural "],
"ESINFBSKATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESINFESSBTRCF":["Cubierta verde extensiva","Pavimento permeable","Alcorque estructural "],
"ESINFESSATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESREUCFDBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESREUCFDATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESREUESNBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESREUESNATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESREUCSABTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESREUCSAATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESREUCSBBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESREUCSBATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESREUBSKBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESREUBSKATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESREUESSBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESREUESSATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNCFDBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESVCNCFDATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (húmedo)"],
"ESVCNESNBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESVCNESNATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (húmedo)"],
"ESVCNCSABTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESVCNCSAATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNCSBBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESVCNCSBATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNBSKBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESVCNBSKATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESVCNESSBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"ESVCNESSATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"ESINFCFDBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Área de biorretención"],
"ESINFCFDATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESINFESNBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Área de biorretención"],
"ESINFESNATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESINFCSABTRSFCE":["Cubierta verde extensiva","Cuneta verde","Alcorque estructural "],
"ESINFCSAATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESINFCSBBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Alcorque estructural "],
"ESINFCSBATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESINFBSKBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Alcorque estructural "],
"ESINFBSKATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESINFESSBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Alcorque estructural "],
"ESINFESSATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESREUCFDBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"ESREUCFDATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"ESREUESNBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"ESREUESNATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"ESREUCSABTRSFCE":["Cubierta verde extensiva","Cuneta verde","Depósito (Aljibe)"],
"ESREUCSAATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESREUCSBBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Depósito (Aljibe)"],
"ESREUCSBATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESREUBSKBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Depósito (Aljibe)"],
"ESREUBSKATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESREUESSBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Depósito (Aljibe)"],
"ESREUESSATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESVCNCFDBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"ESVCNCFDATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"ESVCNESNBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"ESVCNESNATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"ESVCNCSABTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"ESVCNCSAATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESVCNCSBBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"ESVCNCSBATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESVCNBSKBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"ESVCNBSKATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESVCNESSBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"ESVCNESSATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"ESINFCFDBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Área de biorretención"],
"ESINFCFDATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESINFESNBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Área de biorretención"],
"ESINFESNATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESINFCSABTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Alcorque estructural "],
"ESINFCSAATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESINFCSBBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Alcorque estructural "],
"ESINFCSBATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESINFBSKBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Alcorque estructural "],
"ESINFBSKATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESINFESSBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Alcorque estructural "],
"ESINFESSATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESREUCFDBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (húmedo)"],
"ESREUCFDATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESREUESNBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (húmedo)"],
"ESREUESNATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESREUCSABTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Depósito (Aljibe)"],
"ESREUCSAATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESREUCSBBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Depósito (Aljibe)"],
"ESREUCSBATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESREUBSKBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Depósito (Aljibe)"],
"ESREUBSKATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESREUESSBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Depósito (Aljibe)"],
"ESREUESSATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESVCNCFDBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"ESVCNCFDATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (húmedo)"],
"ESVCNESNBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"ESVCNESNATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (húmedo)"],
"ESVCNCSABTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"ESVCNCSAATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESVCNCSBBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"ESVCNCSBATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESVCNBSKBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"ESVCNBSKATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"ESVCNESSBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"ESVCNESSATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEINFCFDBTON":["Cubierta verde intensiva ","Pavimento permeable","Área de biorretención"],
"APEINFCFDATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEINFESNBTON":["Cubierta verde intensiva ","Pavimento permeable","Área de biorretención"],
"APEINFESNATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEINFCSABTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito de infiltración"],
"APEINFCSAATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEINFCSBBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito de infiltración"],
"APEINFCSBATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEINFBSKBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito de infiltración"],
"APEINFBSKATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEINFESSBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito de infiltración"],
"APEINFESSATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEREUCFDBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (húmedo)"],
"APEREUCFDATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEREUESNBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (húmedo)"],
"APEREUESNATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEREUCSABTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)"],
"APEREUCSAATON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"APEREUCSBBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)"],
"APEREUCSBATON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"APEREUBSKBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)"],
"APEREUBSKATON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"APEREUESSBTON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)"],
"APEREUESSATON":["Cubierta verde intensiva ","Pavimento permeable","Depósito (Aljibe)","Estanque de detención (seco)"],
"APEVCNCFDBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (húmedo)"],
"APEVCNCFDATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNESNBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (húmedo)"],
"APEVCNESNATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNCSABTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNCSAATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNCSBBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNCSBATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNBSKBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNBSKATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNESSBTON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNESSATON":["Cubierta verde intensiva ","Pavimento permeable","Estanque de detención (seco)"],
"APEINFCFDBTRCF":["Cubierta verde extensiva","Pavimento permeable","Área de biorretención"],
"APEINFCFDATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEINFESNBTRCF":["Cubierta verde extensiva","Pavimento permeable","Área de biorretención"],
"APEINFESNATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEINFCSABTRCF":["Cubierta verde extensiva","Pavimento permeable","Alcorque estructural "],
"APEINFCSAATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEINFCSBBTRCF":["Cubierta verde extensiva","Pavimento permeable","Alcorque estructural "],
"APEINFCSBATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEINFBSKBTRCF":["Cubierta verde extensiva","Pavimento permeable","Alcorque estructural "],
"APEINFBSKATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEINFESSBTRCF":["Cubierta verde extensiva","Pavimento permeable","Alcorque estructural "],
"APEINFESSATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEREUCFDBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEREUCFDATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEREUESNBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEREUESNATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEREUCSABTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEREUCSAATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEREUCSBBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEREUCSBATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEREUBSKBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEREUBSKATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEREUESSBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEREUESSATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNCFDBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEVCNCFDATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (húmedo)"],
"APEVCNESNBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEVCNESNATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (húmedo)"],
"APEVCNCSABTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEVCNCSAATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNCSBBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEVCNCSBATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNBSKBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEVCNBSKATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEVCNESSBTRCF":["Cubierta verde extensiva","Pavimento permeable"],
"APEVCNESSATRCF":["Cubierta verde extensiva","Pavimento permeable","Estanque de detención (seco)"],
"APEINFCFDBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Área de biorretención"],
"APEINFCFDATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEINFESNBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Área de biorretención"],
"APEINFESNATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEINFCSABTRSFCE":["Cubierta verde extensiva","Cuneta verde","Alcorque estructural "],
"APEINFCSAATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEINFCSBBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Alcorque estructural "],
"APEINFCSBATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEINFBSKBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Alcorque estructural "],
"APEINFBSKATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEINFESSBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Alcorque estructural "],
"APEINFESSATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEREUCFDBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"APEREUCFDATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"APEREUESNBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"APEREUESNATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"APEREUCSABTRSFCE":["Cubierta verde extensiva","Cuneta verde","Depósito (Aljibe)"],
"APEREUCSAATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEREUCSBBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Depósito (Aljibe)"],
"APEREUCSBATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEREUBSKBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Depósito (Aljibe)"],
"APEREUBSKATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEREUESSBTRSFCE":["Cubierta verde extensiva","Cuneta verde","Depósito (Aljibe)"],
"APEREUESSATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEVCNCFDBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"APEVCNCFDATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"APEVCNESNBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"APEVCNESNATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (húmedo)"],
"APEVCNCSABTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"APEVCNCSAATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEVCNCSBBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"APEVCNCSBATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEVCNBSKBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"APEVCNBSKATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEVCNESSBTRSFCE":["Cubierta verde extensiva","Cuneta verde"],
"APEVCNESSATRSFCE":["Cubierta verde extensiva","Cuneta verde","Estanque de detención (seco)"],
"APEINFCFDBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Área de biorretención"],
"APEINFCFDATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEINFESNBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Área de biorretención"],
"APEINFESNATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEINFCSABTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Alcorque estructural "],
"APEINFCSAATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEINFCSBBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Alcorque estructural "],
"APEINFCSBATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEINFBSKBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Alcorque estructural "],
"APEINFBSKATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEINFESSBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Alcorque estructural "],
"APEINFESSATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEREUCFDBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (húmedo)"],
"APEREUCFDATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEREUESNBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (húmedo)"],
"APEREUESNATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEREUCSABTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Depósito (Aljibe)"],
"APEREUCSAATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEREUCSBBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Depósito (Aljibe)"],
"APEREUCSBATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEREUBSKBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Depósito (Aljibe)"],
"APEREUBSKATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEREUESSBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Depósito (Aljibe)"],
"APEREUESSATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEVCNCFDBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"APEVCNCFDATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (húmedo)"],
"APEVCNESNBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"APEVCNESNATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (húmedo)"],
"APEVCNCSABTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"APEVCNCSAATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEVCNCSBBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"APEVCNCSBATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEVCNBSKBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"APEVCNBSKATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"],
"APEVCNESSBTRSFSE":["Cubierta verde extensiva","Zanja de infiltración "],
"APEVCNESSATRSFSE":["Cubierta verde extensiva","Zanja de infiltración ","Estanque de detención (seco)"]
	};
	
    let lv_key =  $('#C1').text() + $('#C2').text() + $('#C3').text() + $('#C4').text() + $('#C5').text() + $('#C6').text() ;
 
	if (lv_key in lt_Result) {	
		lt_Result[lv_key].forEach(setPrint); // Recorremos el Array de resultados.	
	} else {
			$("#R1").text("Key not found")	
		}	
	}
	
function setPrint(item, index, arr) { 
	  let name = "#R" + (index + 1); //debido a que coienza en 0
	  $(name).text(item);	
	}
	
	

