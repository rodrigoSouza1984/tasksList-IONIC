import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  authProviders = AuthProvider;

  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };

  private nameControl = new FormControl('',[Validators.required, Validators.minLength(3)]);

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    private overlayService : OverlayService,
    private navCtrl: NavController,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  

  get name(): FormControl{
    return this.authForm.get('name') as FormControl ;
  }

  get email(): FormControl{
    return this.authForm.get('email') as FormControl ;
  }

  get password(): FormControl{
    return this.authForm.get('password') as FormControl;
  }


  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'Already have an account';
    //!isSignIn ? this.authForm.addControl('name', this.nameControl) : this.authForm.removeControl('name');
    if(!isSignIn){
      this.authForm.addControl('name', this.nameControl);
    }else{
      this.authForm.removeControl('name');
    }
    }


  private createForm(): void{
    this.authForm = this.fb.group({//poderia escolher entre group array ou control
      email: ['', [Validators.required, Validators.email]],//primero posicao array é o valor inicial do input email,
    //2 posicao array é um array com  validadores sincrones, e ainda na terceira pode se por os validadores assincronos
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(provider : AuthProvider): Promise<void>{
    const loading = await this.overlayService.loading();
    try{
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/tasks');
    }catch(error){
      console.log('Auth error: ', error)
      await this.overlayService.toast({
        message: error.message
      })
    } finally {
      loading.dismiss();
    }
  }
}

//Validators.required => campo obrigadtorio
//Validators.email => tem que ser um email valido
//Validators.minLength(6) => tem que ter no minimo 6 caracteres
