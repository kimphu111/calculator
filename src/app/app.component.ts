// src/app/components/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addition,
  subtraction,
  multiplication,
  division,
} from './actions/calculator.action'; // Đảm bảo đường dẫn đúng

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'calculator';
  result$: Observable<number>;
  private currentInput: string = ''; // Để lưu số hiện tại
  private num1: number | null = null; // Để lưu số đầu tiên
  private num2: number | null = null; // Để lưu số thứ hai
  private operator: string | null = null; // Để lưu phép toán

  constructor(private store: Store<{ calculate: number }>) {
    this.result$ = this.store.select('calculate');
  }

  add(num1: number, num2: number) {
    this.store.dispatch(addition({ num1, num2 }));
  }

  subtract(num1: number, num2: number) {
    this.store.dispatch(subtraction({ num1, num2 }));
  }

  multiply(num1: number, num2: number) {
    this.store.dispatch(multiplication({ num1, num2 }));
  }

  divide(num1: number, num2: number) {
    this.store.dispatch(division({ num1, num2 }));
  }

  onNumberClick(value: string) {
    // Thêm số hoặc dấu phẩy vào currentInput
    if (value === ',' && !this.currentInput.includes(',')) {
      this.currentInput += value;
    } else if (value !== ',') {
      this.currentInput += value;
    }
    this.updateScreen(this.currentInput);
  }

  // onNumberClick(value: string) {
  //   if (this.operator) {
  //     this.num2 = this.num2 !== null ? parseFloat('' + this.num2 + value) : parseFloat(value);
  //   } else {
  //     this.num1 = this.num1 !== null ? parseFloat('' + this.num1 + value) : parseFloat(value);
  //   }
  //   this.updateScreen(this.currentInput);
  // }

  //hàm onNumberClick  nhận các giá trị và thực hiện các phép toán cơ bản

  onCalculateClick(op: string) {
    if (op === 'C') {
      // Reset trạng thái
      this.reset();
    } else if (op === '=') {
      // Thực hiện phép toán và reset
      if (this.num1 !== null && this.operator !== null && this.currentInput) {
        const num2 = parseFloat(this.currentInput.replace(',', '.')); // Chuyển đổi dấu phẩy thành dấu chấm
        this.performCalculation(num2);
      }
    } else {
      // Cập nhật số đầu tiên và phép toán
      this.num1 = parseFloat(this.currentInput.replace(',', '.')); // Chuyển đổi dấu phẩy thành dấu chấm
      this.operator = op;
      this.currentInput = '';
    }
  }

  private performCalculation(num2: number) {
    if (this.num1 !== null && this.operator) {
      switch (this.operator) {
        case '+':
          this.store.dispatch(addition({ num1: this.num1, num2 }));
          break;
        case '-':
          this.store.dispatch(subtraction({ num1: this.num1, num2 }));
          break;
        case '*':
          this.store.dispatch(multiplication({ num1: this.num1, num2 }));
          break;
        case '/':
          if (num2 !== 0) {
            this.store.dispatch(division({ num1: this.num1, num2 }));
          } else {
            // Xử lý lỗi chia cho 0
            alert('Cannot divide by zero');
          }
          break;
        default:
          break;
      }
      this.num1 = null;
      this.num2 = null;
      this.operator = null;
      this.updateScreen(this.currentInput);
      // Sau khi tính toán, reset các giá trị
      this.reset();
    }
  }

  private reset() {
    // Đặt lại các giá trị
    this.currentInput = '';
    this.num1 = null;
    this.num2 = null;
    this.operator = null;
    this.updateScreen('0');
  }

  private updateScreen(value: string) {
    // Cập nhật màn hình hiển thị
    const screen = document.getElementById('screen-calculator');
    if (screen) {
      screen.textContent = value;
    }
  }

  protected readonly Number = Number;
}
