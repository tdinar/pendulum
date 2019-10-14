// declare require any;
import { Input, OnDestroy,ElementRef,Component,ComponentFactoryResolver, OnInit,ViewContainerRef, Inject, ViewChild,AfterContentChecked } from '@angular/core';
// import{StoreComponent}    from '../store/store.component'
import{freeFallService} from '../service/freeFall.service'
import {InputQuestionComponent} from '../common/input-question.component'

@Component({
  selector: '[pendulum-view]',
    providers: [freeFallService],
  template:require('./pendulum.component.html'),
  //  styleUrls: ['./layout.component.css']

})

export class pendulumComponent implements OnInit, AfterContentChecked,OnDestroy {
  objectState;
  form
  blurLines   = []
  plotPoints = []
  count = 0
  constructor( public freeFallService:freeFallService) {

  }

  ngOnInit() {
    this.freeFallService.objectState.subscribe((state:any)=>{
          this.objectState = state;
          // console.log(this.objectState)

          this.form = this.freeFallService.form
          this.freeFallService.updateSetUp(this.objectState.questions[0])
          this.count+=1
          this.updatePendulumGeom()
          this.updatePlotLines()
          console.log("updating ll", this.form.status)

    })

  this.form.get('l').valueChanges.debounceTime(300).distinctUntilChanged().subscribe((val) => {
    // this.formattedMessage = `My name is ${val}.`;
    if (this.form.valid){
      console.log("updating l", this.freeFallService.form.valid)

      this.freeFallService.updateSetUp(this.objectState.questions[2])

    }

  });
  this.form.get('thetaO').valueChanges.debounceTime(300).distinctUntilChanged().subscribe((val) => {
    if (this.form.valid){
      this.freeFallService.updateSetUp(this.objectState.questions[3])

      console.log("thetaO",this.form.valid)

    }
  });
  }

  ngAfterContentChecked(){
  }
  ngOnDestroy(){

  }
  animateFall(){
    // console.log('calling animate')
    this.count = 0
    this.objectState.questions[4].value = true
    this.freeFallService.animateFall(this.objectState)

  }
updateValueName(value:string){
  // console.log('sdfjasdfas',value)
  // if (this.form.valid){
  //   this.freeFallService.updateSetUp(value)
  // }


}
updatePlotLines(){
  let nPoints = 200
  if (this.objectState.questions[4].value == false){
    this.blurLines = []
    return
  }
  if (this.plotPoints.length < nPoints){
    let theta = this.objectState.questions[5].value * 25.0 + 50.0
    this.plotPoints.splice(0,0,theta)

  }
  else{
    this.plotPoints.splice(nPoints-1,1)
    let theta = this.objectState.questions[5].value * 25.0 + 50.0
    this.plotPoints.splice(0,0,theta)
  }
}
updatePendulumGeom(){

  let nBlur = 2
  if (this.objectState.questions[4].value == false){
    this.blurLines = []
    return
  }
  if (this.blurLines.length < nBlur){
    this.blurLines.push([this.objectState.questions[0].value,this.objectState.questions[1].value])

  }
  else{
    this.blurLines.splice(nBlur-1,1)
    this.blurLines.splice(0,0,[this.objectState.questions[0].value,this.objectState.questions[1].value])
    // console.log("------------",this.blurLines)
  }
}
stopFall()
{
  this.blurLines = []
  this.plotPoints =[]
  this.objectState.questions[4].value = false
  this.freeFallService.stopFall(this.objectState)
}
}
