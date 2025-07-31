
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-search',
  imports: [CommonModule,FormsModule],
  templateUrl: './vehicle-search.component.html',
  styleUrl: './vehicle-search.component.scss'
})
export class VehicleSearchComponent implements OnInit {

  selectedMake:any
  selectedModel:any
  selectedEngine:any
  selectedYear:any
  vehicleDetails :any
  prices:any = []

  allmakes= []
  allModels = []
  allYears = []
  allEngines = []
  stage = 1

  vin: any

  constructor(private http:HttpClient){}


  ngOnInit(): void {
    this.fetchAllvehicleMakes()
    this.fetchAllModelByMake('kia')
  }

  goToSelectedItemPage(page:any){
    this.stage = page
    this.fetchPurchaseDetailsWithVin(this.vehicleDetails?.vin)
  }


  submitVin(){
    this.fetchDetailsByVin(this.vin)
  }

fetchAllvehicleMakes(){
 this.http.get('http://localhost:3000/makes').subscribe({
  next:(res:any)=>{
    console.log("success:",res)
    this.allmakes =  res?.data
  }
 })
}

fetchAllModelByMake(make:string){
  this.http.get(`http://localhost:3000/models/${make}`).subscribe({
   next:(res:any)=>{
     console.log("success:",res)
     this.allModels =  res?.data
   }
  })
 }

 fetchEngine(){
  this.http.get(`http://localhost:3000/engines/${this.selectedMake}/${this.selectedModel}`).subscribe({
   next:(res:any)=>{
     console.log("success:",res)
     this.allEngines = res?.data
   }
  })
 }

 fetchYears(){
  this.http.get(`http://localhost:3000/years/${this.selectedMake}/${this.selectedModel}`).subscribe({
   next:(res:any)=>{
     console.log("success:",res)
     this.allYears = res?.data
   }
  })
 }

 fetchDetails(){
  this.http.get(`http://localhost:3000/vehicle/${this.selectedMake}/${this.selectedModel}/${this.selectedEngine}/${this.selectedYear}`).subscribe({
   next:(res:any)=>{
     console.log("success:",res)
     this.vehicleDetails = res?.data
   }
  })
 }

 fetchDetailsByVin(vin:any){
  this.http.get(`http://localhost:3000/vehicle/vin/${vin}`).subscribe({
   next:(res:any)=>{
     console.log("success:",res)
     this.selectedEngine  = res?.data?.engdesc
     this.selectedMake = res?.data?.make
     this.selectedModel = res?.data?.model
     this.selectedYear = res?.data?.engdesc
     this.vehicleDetails = res?.data?.year
     this.stage = 2
     this.fetchPurchaseDetailsWithVin(res?.data?.vin)
   }
  })
 }

 fetchPurchaseDetailsWithVin(vin:any){
  this.http.get(`http://localhost:3000/hunter/vin/${vin}`).subscribe({
   next:(res:any)=>{
     console.log("success:",res)
     this.prices = res?.data
    //  this.selectedEngine  = res?.data?.engdesc
    //  this.selectedMake = res?.data?.make
    //  this.selectedModel = res?.data?.model
    //  this.selectedYear = res?.data?.engdesc
    //  this.vehicleDetails = res?.data?.year
    //  this.stage = 2
   }
  })
 }


}
