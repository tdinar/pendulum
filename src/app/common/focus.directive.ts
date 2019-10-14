import {Directive, Renderer, ElementRef} from "@angular/core"
@Directive({
  selector: 'input,select,div',
  host: {
         '(focus)':'onFocus($event)'}

})
export class FocusDirective {
  constructor(private elRef:ElementRef, private renderer:Renderer) {}

  onBlur($event:any) {
    console.log("focusdirectiveOnBlur")
    this.renderer.invokeElementMethod(this.elRef.nativeElement,
        'dispatchEvent',
        [new CustomEvent('input-blur', { bubbles: true, cancelable: true })]);
    // or just
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }
  onFocus($event:any) {
    console.log("focusdirectiveOnFocus")

    this.renderer.invokeElementMethod(this.elRef.nativeElement,
        'dispatchEvent',
        [new CustomEvent('input-focus', { bubbles: true })]);
    // or just
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }
  onHover($event:any) {
    console.log("focusdirectiveOnHover")

    this.renderer.invokeElementMethod(this.elRef.nativeElement,
        'dispatchEvent',
        [new CustomEvent('input-over', { bubbles: true })]);
    // or just
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }
}
// blur-directive="onInputBlur($event)"
