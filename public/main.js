var policyYear = 0;
var remainingTermYears;
function onSubmit() {
  // alert("YOU CLICKED ME!");
  // document.getElementById('combinedLifeInsuranceCoverage').value = Number(document.getElementById('applicantLifeInsuranceCoverage').value) + 
  //                                  Number(document.getElementById('spouseLifeInsuranceCoverage').value);

  // document.getElementById('applicantTotalMonthlyPremium').value = Number(document.getElementById('applicantTotalMonthlyPremium').value) + 
  //                                  Number(document.getElementById('spouseTotalMonthlyPremium').value);


  var age = document.getElementById('applicantAge').value;
  var termYear = document.getElementById('termYear').value;

  document.getElementById("tableData").style.visibility = "visible";


}

$(function() {

       $("#submitButton").click(function() {
        if(document.getElementById('applicantAge').value.length == 0) {
          alert("Age cannot be empty");
          location.reload();
        }
        document.getElementById('combinedTotalMonthlyAmount').value = (Number(document.getElementById('applicantTotalMonthlyPremium').value) + 
                                    Number(document.getElementById('combinedTotalMonthlyInvestment').value)).toFixed(2);
        var age = document.getElementById('applicantAge').value;
        var termYear = document.getElementById('termYear').value;
        var combinedTotalMonthlyAmount = document.getElementById('combinedTotalMonthlyAmount').value;
        var applicantTotalMonthlyPremium = document.getElementById('applicantTotalMonthlyPremium').value;
        var combinedTotalMonthlyInvestment = document.getElementById('combinedTotalMonthlyInvestment').value;
        var rateOfInterest = document.getElementById('rateOfInterest').value;
        var table = $("#resultTable");
        // var rowNum = parseInt($("#table-row-num").val(), 10);
        var resultHtml = '';
        resultHtml = "<h3>First " + termYear + " years: </h3><tr><th>Policy Year</th><th>Age</th><th>Annual Payment</th><th>Annual Insurance Cost</th><th>Amount Invested</th><th>Growth</th><th>Total Value</th></tr>";
        
        var annualAmount = parseInt(0);
        var newAmount = parseInt(0);
        var growth = parseInt(0);
        var totalInterest = parseInt(0);
        var interest = parseInt(0);
        var yearlyInterest = parseInt(0);
        var addGrowth = parseInt(0);
        var months = termYear * 12;

        for(var i = 1; i <= months; i++) {
            
            
            annualAmount = (Number(combinedTotalMonthlyInvestment) * i) + totalInterest;

            // alert(i + " annual ammount " + annualAmount)
            // if(i != 1){
              // newAmount = annualAmount + interest;
              interest = (annualAmount*rateOfInterest/100)/12
              newAmount = annualAmount + interest;
              totalInterest += interest;
              if(i%11){
                yearlyInterest = totalInterest;
              }
            // }

            if(i%12 === 0){
              resultHtml += ["<tr>", 
              '<td>',
              1 + policyYear++,
              '</td>',
             '<td>',
             parseInt(age) + i/12,
             '</td>',
             '<td>',
             '$' + numberWithCommas(parseFloat(combinedTotalMonthlyAmount * 12).toFixed(2)),
             '</td>',
             '<td>',
             '$' + numberWithCommas(parseFloat(applicantTotalMonthlyPremium * 12).toFixed(2)),
             '</td>',
             '<td>',
             '$' + numberWithCommas((parseFloat(combinedTotalMonthlyAmount * 12) - parseFloat(applicantTotalMonthlyPremium * 12)).toFixed(2)),
             '</td>',
             '<td>',
             '$' + numberWithCommas(totalInterest.toFixed(2)),
             '</td>',
             '<td>',
             '$' + numberWithCommas(annualAmount.toFixed(2)),
             '</td>',
             '</tr>'].join("\n");
            }
            // var multiplyByTwelve;
      }  
      // resultHtml += "<input type=\"submit\" value=\"Submit\" id=\"submitButton2\" />";
      table.html(resultHtml);
      policyYear = 0;

      document.getElementById("submitButton2").style.visibility = "visible";
      document.getElementById("txtTotalPremiumPaid1").style.visibility = "visible";
      document.getElementById('txtTotalPremiumPaid1').innerHTML = "Total Premium Paid: $" + numberWithCommas(parseFloat(combinedTotalMonthlyAmount * 12 * termYear).toFixed(2));
      document.getElementById('txtTotalPremiumPaid1').style.visibility = "visible";
        return false; 
    });
     });

$(function() {
       $("#submitButton2").click(function() {
        var termYear = document.getElementById('termYear').value;
        var carryForwardPolicyYear = document.getElementById("resultTable").rows[termYear].cells[0].innerHTML;
        var totalAmountForRestTerm = document.getElementById("resultTable").rows[termYear].cells[6].innerHTML;
        var value = totalAmountForRestTerm.replace('$', '');

        var age = document.getElementById('applicantAge').value;
        var applicantTotalMonthlyPremium = document.getElementById('applicantTotalMonthlyPremium').value;
        var rateOfInterest = document.getElementById('rateOfInterest').value;
        remainingTermYears = 35 - termYear;
        var table = $("#resultTable2");
        // var rowNum = parseInt($("#table-row-num").val(), 10);
        var resultHtml = '';
        resultHtml = "<h3>Rest of " + remainingTermYears + " years: </h3><tr><th>Policy Year</th><th>Age</th><th>Annual Payment</th><th>Annual Insurance Cost</th><th>Amount Invested</th><th>Growth</th><th>Total Value (AI + Growth)</th></tr>";
        
        var totalGrowth = 0;
        var annualInsurancePayment = applicantTotalMonthlyPremium * 12;
        var annualAmount1 = parseInt(value.replace(',',''));


        var annualAmount2 = annualAmount1 - annualInsurancePayment;

        for(var i = 0 ; i < remainingTermYears ; i++) {
          var annualAmount = (annualAmount1 + totalGrowth) - annualInsurancePayment;
          var growth = annualAmount * (rateOfInterest/100);
          totalGrowth = annualAmount + growth;
     
          resultHtml += ["<tr>", 
          '<td>',
          1 + carryForwardPolicyYear++,
          '</td>',
         '<td>',
         parseInt(termYear)+parseInt(age)+i+1,
         '</td>',
         '<td>',
         '$' + 0,
         '</td>',
         '<td>',
         '$' + numberWithCommas(parseFloat(annualInsurancePayment).toFixed(2)),
         '</td>',
         '<td>',
         '$' + numberWithCommas(annualAmount.toFixed(2)),
         '</td>',
         '<td>',
         '$' + numberWithCommas(growth.toFixed(2)),
         '</td>',
         '<td>',
         '$' + numberWithCommas(totalGrowth.toFixed(2)),
         '</td>',
         '</tr>'].join("\n");
         annualAmount1 = 0;
      }
      table.html(resultHtml);
      policyYear = 0;
      document.getElementById("submitButton3").style.visibility = "visible";
      document.getElementById("txtTotalPremiumPaid2").style.visibility = "visible";
      document.getElementById('txtTotalPremiumPaid2').innerHTML = "Total Premium Paid: $" + 0;
      document.getElementById('txtTotalPremiumPaid2').style.visibility = "visible";
        return false; 
    });
});
$(function() {
       $("#submitButton3").click(function() {
        var termYear = document.getElementById('termYear').value;
        var carryForwardPolicyYear = document.getElementById("resultTable2").rows[remainingTermYears].cells[0].innerHTML;
        var totalAmountForRestTerm = document.getElementById("resultTable2").rows[remainingTermYears].cells[6].innerHTML;
        var finalAge;
        if(remainingTermYears === 20){
          finalAge = document.getElementById("resultTable2").rows[20].cells[1].innerHTML;  
        } else if(remainingTermYears === 15){
          finalAge = document.getElementById("resultTable2").rows[15].cells[1].innerHTML;  
        } else if(remainingTermYears === 10){
          finalAge = document.getElementById("resultTable2").rows[10].cells[1].innerHTML;  
        } else if(remainingTermYears === 5){
          finalAge = document.getElementById("resultTable2").rows[5].cells[1].innerHTML;  
        } else if(remainingTermYears === 0){
          finalAge = document.getElementById("resultTable").rows[35].cells[1].innerHTML;  
        }
        var value = totalAmountForRestTerm.replace('$', '');

        var age = document.getElementById('applicantAge').value;
        var applicantTotalMonthlyPremium = document.getElementById('applicantTotalMonthlyPremium').value;
        var rateOfInterest = document.getElementById('rateOfInterest').value;
        var remainingTermYears1 = 100 - finalAge;
        var table = $("#resultTable3");
        // var rowNum = parseInt($("#table-row-num").val(), 10);
        var resultHtml = '';
        resultHtml = "<h3>Rest of " + remainingTermYears1 + " years: </h3><tr><th>Policy Year</th><th>Age</th><th>Annual Payment</th><th>Annual Insurance Cost</th><th>Amount Invested</th><th>Growth</th><th>Total Value (AI + Growth)</th></tr>";
        
        var totalGrowth = 0;
        var annualInsurancePayment = applicantTotalMonthlyPremium * 12;
        var annualAmount1 = parseInt(value.replace(',',''));


        for(var i = 0 ; i < remainingTermYears1 ; i++) {
          var annualAmount = annualAmount1 + totalGrowth;
          var growth = annualAmount * (rateOfInterest/100);
          totalGrowth = annualAmount + growth;
     
          resultHtml += ["<tr>", 
          '<td>',
          "-",
          '</td>',
         '<td>',
         parseInt(termYear) + parseInt(age) + remainingTermYears +i+1,
         '</td>',
         '<td>',
         '$' + 0,
         '</td>',
         '<td>',
         '$' + 0,
         '</td>',
         '<td>',
         '$' + numberWithCommas(annualAmount.toFixed(2)),
         '</td>',
         '<td>',
         '$' + numberWithCommas(growth.toFixed(2)),
         '</td>',
         '<td>',
         '$' + numberWithCommas(totalGrowth.toFixed(2)),
         '</td>',
         '</tr>'].join("\n");
         annualAmount1 = 0;
      }
      table.html(resultHtml);
      policyYear = 0;
      document.getElementById("txtTotalPremiumPaid3").style.visibility = "visible";
      document.getElementById('txtTotalPremiumPaid3').innerHTML = "Total Premium Paid: $" + 0;
      document.getElementById('txtTotalPremiumPaid3').style.visibility = "visible";
        return false; 
    });
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function validateFloatKeyPress(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
         return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    return true;
}

//thanks: http://javascript.nwbox.com/cursor_position/
function getSelectionStart(o) {
  if (o.createTextRange) {
    alert("inside")
    var r = document.selection.createRange().duplicate()
    r.moveEnd('character', o.value.length)
    if (r.text == '') return o.value.length
    return o.value.lastIndexOf(r.text)
  } else return o.selectionStart
}