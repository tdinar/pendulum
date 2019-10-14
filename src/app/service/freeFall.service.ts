import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs/BehaviorSubject'
import { HttpClient,HttpParams, HttpHeaders  } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase }     from '../common/question-base';

export interface ObjectState
{
  questions : QuestionBase<number>[],
  keys : string[]
}
const initialObjectState  = {
'questions' :
  [ new QuestionBase({value:50,key:'cx', defaultWord:' x Posistion' }),
    new QuestionBase({value:100,key:'cy', defaultWord: 'y Position'}),
    new QuestionBase({value:100,key:'l', defaultWord: 'unit length %', min:10, max:100}),
    new QuestionBase({value:30,key:'thetaO', defaultWord: 'initial angle',min:1, max:30}),
    new QuestionBase({value:false,key:'animate', defaultWord: 'animate'}),
    new QuestionBase({value:15,key:'theta', defaultWord: 'theta'}),
  ],
'keys' :
   [  'cx' ,'cy' ,'l' ,'thetaO', 'animate','theta']
}




const ObjectState = new BehaviorSubject<any>(initialObjectState);
@Injectable()
export class freeFallService   {
objectState = ObjectState
index  =   0
form;
timer;
constructor (private http: HttpClient){
     this.createQuestionGroup()
     this.animateFall(this.objectState.value)

}

ngOnInit() {
}


createQuestionGroup(){
  let group = {};
  initialObjectState.questions.forEach((question, index) =>{
    if (question.min != null){
        group[question.key] =  new FormControl(question.value,[Validators.required ,Validators.min(question.min) ,Validators.max(question.max)] )
    }
    else{
      group[question.key] =  new FormControl(question.value,Validators.required  )

    }

         // Use `key` and `value`
  })
       this.form = new FormGroup(group);
}


updateSetUp(question:any){


  switch(question.key) {
     case 'l': {
        //statements;
        this.objectState.value.questions[2].value = question.value
        this.updateValues()
        break;
     }
     case 'thetaO':{
        this.objectState.value.questions[3].value = question.value
        this.updateValues()
        break;
     }
     default: {
        break;
     }
  }


}
updateValues(){
  // this.timer.clearTimeout()
  this.objectState.value.questions[4].value = false
  let cy = this.objectState.value.questions[2].value  * Math.cos(this.objectState.value.questions[3].value * Math.PI / 180)
  let cx = this.objectState.value.questions[2].value  * Math.sin(this.objectState.value.questions[3].value * Math.PI / 180)
  this.objectState.value.questions[1].value = cy
  this.objectState.value.questions[0].value = cx
  this.objectState.next(this.objectState.value)
   clearTimeout(this.timer)
  this.animateFall(this.objectState.value)

}
stopFall(ObjectState){
     clearTimeout(this.timer)
}
animateFall(ObjectState){
  let counter = 0
  let cy = ObjectState.questions[0].value
  let cx = ObjectState.questions[1].value
  let h  = cy
  let distance  = 0
  let r = ObjectState.questions[2].value
  let d = ObjectState.questions[3].value
  // let g = ObjectState.questions[4].value
  let t = 0.0
  let thetaO = this.objectState.value.questions[3].value * Math.PI / 180
  let l = this.objectState.value.questions[2].value
  let T = 2.0 * Math.sqrt(l/9.8)
  let delT = T/ 10000.0
  this.timer = setInterval((ObjectState) => {

                     counter = counter +  1
                     t = t + delT
                     let num = 1.0 - Math.sqrt(Math.cos(thetaO / 2.0))
                     let den = 2.0 + 2.0 *  Math.sqrt(Math.cos(thetaO / 2.0))
                     let eps = num / den
                     let q = eps + 2.0 * Math.pow(eps,5) + 15.0 *  Math.pow(eps,9) + 150.0 * Math.pow(eps,13) + 1707.0  * Math.pow(eps,17)

                     let omega = 2.0 * Math.PI / T
                     let sum = 0.0
                     for (let i=0;i<20;i++){
                       let num = Math.pow(-1,i) * Math.pow(q,(i+0.5))
                       let den = (2.0 * i + 1) * (1.0 + Math.pow(q, (2 * i + 1)))
                       sum = sum + 8.0 * num * Math.cos((2.0 * l + 1.0) * omega * t)  / den
                       // console.log("=====", num, den, sum)

                     }
                     cy =  l * Math.cos(sum)
                     cx =  l * Math.sin(sum) + 50.0
                     // console.log("here it is", this.objectState.value.questions[4].value)
                     this.objectState.value.questions[1].value = cy
                     this.objectState.value.questions[0].value = cx
                     this.objectState.value.questions[5].value = sum / thetaO
                     this.objectState.next(this.objectState.value)
                     if (this.objectState.value.questions[4].value == false){
                          // this.objectState.value.questions[4].value = false
                           clearTimeout(this.timer)
                     }
             },Math.max(40, delT));

  }
}
