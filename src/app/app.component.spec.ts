import { ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ FormsModule, ReactiveFormsModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Mortgage Calculator'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Mortgage Calculator');
  });

  it('should expect mortgage form to be created', () => {
    const app = fixture.componentInstance;
    expect(app.mortgageForm.value).toEqual({
      loanAmount: 100000,
      interestRate: 4.75,
      downPaymentPercent: 20,
      loanTermInYears: 30
    });
  });

  it('should expect mortgage form to be re-setted to default value when reset is clicked', () => {
    const app = fixture.componentInstance;
    app.reset();
    expect(app.mortgageForm.value).toEqual({
      loanAmount: 100000,
      interestRate: 4.75,
      downPaymentPercent: 20,
      loanTermInYears: 30
    });
  });

  it('should calculate montly payment from the given values', () => {
    const app = fixture.componentInstance;
    app.calculateMortgage({
      loanAmount: 100000,
      interestRate: 4.75,
      downPaymentPercent: 20,
      loanTermInYears: 30
    });
    expect(app.monthlyPayment).toEqual('417.32');

    app.calculateMortgage({
      loanAmount: 900000,
      interestRate: 2.5,
      downPaymentPercent: 5,
      loanTermInYears: 25
    });
    expect(app.monthlyPayment).toEqual('3835.67');

    app.calculateMortgage({
      loanAmount: 900000,
      interestRate: 0,
      downPaymentPercent: 5,
      loanTermInYears: 25
    });
    expect(app.monthlyPayment).toBe('NaN');
  });

});
