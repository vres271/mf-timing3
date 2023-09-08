import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'date-time-control',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeComponent),
      multi: true,
    }
  ]  
})

export class DateTimeComponent implements ControlValueAccessor{

  _value: Date | null
    
  writeValue(value: number | null): void {
    this._value = value ? new Date(value) : null
  }

  onDateChange(value: Date) {
    this._value = value;
    this.onChange(this._value.getTime());
  }

  private onChange: (value: number) => void = () => {};
  registerOnChange(onChange: (value: number) => void): void {
    this.onChange = onChange
  }

  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
  
}
