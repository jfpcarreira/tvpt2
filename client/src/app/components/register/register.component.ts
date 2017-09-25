import { Component, OnInit, OnDestroy }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { Subscription }                       from 'rxjs/Subscription';
import { validateUsername, validateEmail, validatePassword, matchingPasswords }  from '../../tools/FormValidators';
import { AuthService }                        from '../../services/auth.service';
import { User }                               from '../../classes/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public message;
  public messageClass;
  public processing = false;
  public emailValid;
  public emailMessage;
  public usernameValid;
  public usernameMessage;
  private subscription_create: Subscription;
  private subscription_checkEmail: Subscription;
  private subscription_checkUser: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm(): void {
    this.form = this.formBuilder.group({
      // Name Input
      name: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5) // Minimum length is 5 characters
      ])],
      // Username Input
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        validateUsername // Custom validation
      ])],
      // Email Input
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        validateEmail // Custom validation
      ])],
      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        validatePassword // Custom validation
      ])],
      // Confirm Password Input
      confirm: ['', Validators.required] // Field is required
    }, { validator: matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
  }

  // Function to disable the registration form
  disableForm(): void {
    this.form.controls['name'].disable();
    this.form.controls['username'].disable();
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  // Function to enable the registration form
  enableForm(): void {
    this.form.controls['name'].enable();
    this.form.controls['username'].enable();
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  // Function to submit form
  onSubmit(): void {
    this.processing = true;
    this.disableForm();

    const user = new User();
    user.setName( this.form.get('name').value);
    user.setUsername( this.form.get('username').value );
    user.setEmail( this.form.get('email').value );
    user.setPassword( this.form.get('password').value );

    // Function from authentication service to register user
    this.subscription_create = this.authService.create(user).subscribe(
      data => this.handleSuccess(data),
      error => console.log(error),
      () => console.log('Request complete!')
    );
  }

  handleSuccess(data): void {
    if (data.success) {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirect to login view after 2 second timeout
      }, 2000);
    } else {
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    }
  }

  // Function to check if e-mail is taken
  checkEmail(): void {
    this.subscription_checkEmail = this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      this.emailValid = data.success;
      this.emailMessage = data.message;
    });
  }

  // Function to check if username is available
  checkUsername(): void {
    this.subscription_checkUser = this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
      this.usernameValid = data.success;
      this.usernameMessage = data.message;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(typeof this.subscription_create != "undefined") this.subscription_create.unsubscribe();
    if(typeof this.subscription_checkEmail != "undefined") this.subscription_checkEmail.unsubscribe();
    if(typeof this.subscription_checkUser != "undefined") this.subscription_checkUser.unsubscribe();
  }
}
