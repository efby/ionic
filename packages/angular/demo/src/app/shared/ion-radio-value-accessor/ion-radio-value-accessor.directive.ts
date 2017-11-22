import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

// NOTE: this is just a sample. It really belongs in @ionic/angular and not at all int his app here
@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'ion-radio',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IonRadioValueAccessorDirective,
      multi: true
    }
  ]
})
export class IonRadioValueAccessorDirective implements ControlValueAccessor {
  @Input() value: any;
  @Input() name: string;

  onChange: (value: any) => void;
  onTouched: () => void;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.onChange = () => {};
    this.onTouched = () => {};
  }

  writeValue(value: any) {
    this.renderer.setProperty(
      this.element.nativeElement,
      'checked',
      value === this.value
    );
  }

  @HostListener('ionSelect', ['$event.target.checked'])
  _handleIonSelect(value: any) {
    this.onChange(value);
  }

  @HostListener('ionBlur')
  _handleBlurEvent() {
    this.onTouched();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = () => {
      fn(this.value);
    };
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.element.nativeElement,
      'disabled',
      isDisabled
    );
  }
}