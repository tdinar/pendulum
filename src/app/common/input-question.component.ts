
import { Component, OnDestroy, Input,Output,Injectable ,EventEmitter,ViewChild,ViewContainerRef} from '@angular/core';
import { FormGroup , FormsModule} from '@angular/forms';
import { QuestionBase }     from './question-base';
import{BlurDirective} from './blur.directive'
import{FocusDirective} from './focus.directive'

@Component({
  selector: '[input-question]',
    templateUrl: './input-quesion.component.html',
    host: {
               '(input-focus)':'onFocus($event)',
               '(input-blur)':'onBlur($event)',
               '(input-hover)':'onHover($event)',
           },

})



export class InputQuestionComponent implements OnDestroy {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Input() Questiontype : string ="string"
  @Input() shape : string;
  @Output() updateValue = new EventEmitter();
  @ViewChild('inputbox',{read:ViewContainerRef}) inputbox:any;

  edit:boolean = false;
  constructor(){}
  ngOnInit(){
        console.log("Zzzzzzzzz1", this.form)
        !this.shape ? this.shape = 'pill' : null;
  }
  get isValid() { return this.form.controls[this.question.key].valid; }

  over(){

    this.edit= true;
//    this.form.validator.
  }
notOver(){
  console.log("Zzzzzzzzz")
  this.edit= false;
}
ngOnDestroy(){

 }


onFocus($event:any) {
  // this.form.control.markAsUntouched(false);

  console.log("onfocusfocusfocus", this.form, this.question.defaultWord, this.question.label)
  console.log("mmmmmmonFocus1", this.form.controls[this.question.key].value)

 if (this.question.defaultWord == this.question.value){
   let length = this.form.controls[this.question.key].value.length

     this.inputbox.element.nativeElement.setSelectionRange(0,length);
 }
  this.textInit()
    // $event.stop()
}

onBlur($event:any) {
  this.textInit()
  console.log("mmmmmmonBlur", this.form.controls[this.question.key].value)
  if(this.form.controls[this.question.key].valid && !this.form.controls[this.question.key].pristine){
    console.log("updatingvalue")
    // {'key':this.question.key, }
    this.updateValue.emit(this.question);
 }
}
onHover($event:any) {
  console.log("mmmmmmonBlur", this.form.controls[this.question.key].value)

this.textInit()


}
textInit(){
  console.log("mmmmmmonTextInit", this.inputbox)
  let length = this.form.controls[this.question.key].value.length

}
 get value() {
   let m = this.form.get(this.question.key);
   return m }
//   }

}
