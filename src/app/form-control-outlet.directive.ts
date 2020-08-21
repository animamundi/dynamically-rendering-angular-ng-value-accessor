import {
  Directive,
  forwardRef,
  Self,
  Optional,
  OnInit,
  Host,
  SkipSelf,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  Component,
  Injector
} from "@angular/core";
import {
  NgControl,
  ControlContainer,
  Form,
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
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
    @Host() @SkipSelf() private controlContainer: ControlContainer,
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
    this.controlContainer.formDirective.addControl(ngControl);
  }
}
