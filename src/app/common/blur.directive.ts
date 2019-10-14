import {Directive, Renderer, ElementRef} from "@angular/core"
@Directive({
  selector: 'input,select',
  host: {'(blur)': 'onBlur($event)'}

})
export class BlurDirective {
  constructor(private elRef:ElementRef, private renderer:Renderer) {}

  onBlur($event:any) {
    console.log("blurdirectiveOnBlur")
    this.renderer.invokeElementMethod(this.elRef.nativeElement,
        'dispatchEvent',
        [new CustomEvent('input-blur', { bubbles: true, cancelable: true })]);
    // or just
    console.log("inside blur")
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }
  onFocus($event:any) {
    console.log("blurdirectiveOnFocus")

    this.renderer.invokeElementMethod(this.elRef.nativeElement,
        'dispatchEvent',
        [new CustomEvent('input-focus', { cancelable: true })]);
    // or just
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }
  onHover($event:any) {
    console.log("blurdirectiveOnHover")

    this.renderer.invokeElementMethod(this.elRef.nativeElement,
        'dispatchEvent',
        [new CustomEvent('input-over', { bubbles: true })]);
    // or just
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }
}
// blur-directive="onInputBlur($event)"
