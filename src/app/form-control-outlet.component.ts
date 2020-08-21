import {
  Component,
  ComponentFactoryResolver,
  forwardRef,
  Host,
  Injector,
  SkipSelf,
  ViewContainerRef
} from "@angular/core";
import { ControlContainer, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";

import { CustomInputComponent } from "./custom-input.component";

@Component({
  selector: "app-form-control-outlet",
  template: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlOutletComponent),
      multi: true
    }
  ]
})
export class FormControlOutletComponent {
  constructor(
    public injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      CustomInputComponent
    );

    const componentRef = this.viewContainerRef.createComponent(
      componentFactory
    );

    ngControl.valueAccessor = componentRef.instance;
  }
}
