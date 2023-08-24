import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{

    //below code closes dropdown only on clicking dropdown
// @HostBinding('class.open') isOpen = false;
//     @HostListener('click') toggleOpen(){
//         this.isOpen = !this.isOpen;
//     }



//below code will close dropdown by clicking anywhere on the document
    @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}

