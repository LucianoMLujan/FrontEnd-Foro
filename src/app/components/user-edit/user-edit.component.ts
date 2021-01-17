import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service'; 
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url;

  constructor(
    private _userService: UserService, 
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title = 'Ajustes de usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .jpeg, .png, .gif",
      maxSize: "50",
      uploadAPI: {
        url: this.url+"upload-avatar",
        headers: {
          "Authorization": this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Seleccionar Imagen',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Seleccionar Imagen',
        afterUploadMsg_success: 'Imagen subida correctamente',
        afterUploadMsg_error: 'Error al subir imagen',
        sizeLimit: 'Tamaño limite 50mb'
      }
    };
  }

  ngOnInit() {
  }

  avatarUpload(data) {
    let data_obj = data.body.user;
    this.user.image = data_obj.image;
  }

  onSubmit() {
    this._userService.update(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';  
        }else{
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

}
