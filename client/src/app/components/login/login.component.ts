import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { ToastrService }                      from 'ngx-toastr';
import { AuthService }                        from '../../services/auth.service';
import { User }                               from '../../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private toast: ToastrService
    , private router: Router
    , private formBuilder: FormBuilder
    , private auth: AuthService) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      // Username Input
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15) // Maximum length is 15 characters
      ])],
      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35) // Maximum length is 35 characters
      ])]
    });
  }

  // Function to submit form
  onSubmit(): void {
    let user = new User();
    user.setUsername( this.form.get('username').value );
    user.setPassword( this.form.get('password').value );

    this.auth.login(user).subscribe(
      data => {
        if(!data.success) {
          this.toast.error(data.message, 'Error!');
        }
        else {
          this.toast.success(data.message, 'Success!');
          this.auth.storeUserData(data.result.token, data.result.username);
          setTimeout(() => {
            this.router.navigate(['/clients']);
          }, 1000);
        }
      }
    );
  }

  ngOnInit(): void {
  }

}
