import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mortgage Calculator';

  monthlyPayment!: string;

  mortgageForm!: FormGroup;

  public reset(): void {
    this.mortgageForm = new FormGroup({
      loanAmount: new FormControl(100000),
      interestRate: new FormControl(4.75),
      downPaymentPercent: new FormControl(20),
      loanTermInYears: new FormControl(30),
    });
  }
  constructor(){}

  ngOnInit(): void {
    this.reset();
  }

  calculateMortgage(formValue: any): void {
    let { loanAmount, interestRate, loanTermInYears } = formValue;
    const { downPaymentPercent } = formValue;
    loanTermInYears *= 12;
    loanAmount = loanAmount - ((downPaymentPercent / 100) * loanAmount);
    interestRate = interestRate / (12 * 100); // monthly interest
    const payment =  loanAmount
      * (interestRate * Math.pow((1 + interestRate), loanTermInYears))
      / (Math.pow((1 + interestRate), loanTermInYears) - 1);
    this.monthlyPayment = payment.toFixed(2);
  }

}
