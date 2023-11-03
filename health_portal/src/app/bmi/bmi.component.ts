import { Component } from '@angular/core';
import { BmiCalculator } from '../model/bmi-calculator';
import { Router } from '@angular/router';
import { BmiCalculatorServiceService } from '../service/bmi-calculator-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BmiComponent {

  bmi:BmiCalculator[]=[];
  bmiCalci:BmiCalculator=new BmiCalculator(0,'',0,'',0,0,0,'','');

  constructor(private service:BmiCalculatorServiceService, private route:Router, private builder:FormBuilder, private toster:ToastrService){}

  bmiCal=this.builder.group({
    id:[0, ],
    empName:['', [Validators.required]],
    age:[0, [Validators.required]],
    gender:['', [Validators.required]],
    weight:[0, [Validators.required]],
    height:[0, [Validators.required]],
    bmi:[0, [Validators.required]],
    password:['', [Validators.required]],
    mail:['', [Validators.required]],
   });

   getBmiCategory(bmi: number): string {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 25) {
      return "Normal Weight";
    } else if (bmi < 30) {
      return "Overweight";
    } else {
      return "Obesity";
    }
  }
  

   postBMI(){
    if(this.bmiCal.valid){
      const emp:BmiCalculator={
        id: this.bmiCal.get('id')?.value ?? 0,
        empName: this.bmiCal.get('empName')?.value ?? '',
        age: this.bmiCal.get('age')?.value ?? 0,
        gender: this.bmiCal.get('gender')?.value ?? '',
        weight: this.bmiCal.get('weight')?.value ?? 0,
        height: this.bmiCal.get('height')?.value ?? 0,
        bmi: this.bmiCal.get('bmi')?.value ?? 0,
        password: this.bmiCal.get('password')?.value ?? '',
        mail:this.bmiCal.get('mail')?.value ?? ''
      };
      this.service.postData(emp).subscribe(
        (res) => {
          this.bmiCalci = res; 

          const bmiCategory = this.getBmiCategory(this.bmiCalci.bmi);
          this.toster.success(`Your BMI is: ${this.bmiCalci.bmi} (${bmiCategory})`);
          
        },
        (error) => {
          this.toster.warning('Error while calculating BMI. Please provide proper details.');
        }
      );
    }
   }


   public chart: any
   showFiller = true;

   createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['BMI'], 
         datasets: [
          {
            // label: "BMI Calculator",
            // data: ['Underweight'],
            // backgroundColor: 'blue'

            label: "BMI Calculator",
            data: [this.getBmiCategory], // Example data, you can replace with actual data
            backgroundColor: ['blue', 'green', 'yellow', 'red']
          }, 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  
    
  

  }}
