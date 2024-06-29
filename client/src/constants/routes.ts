enum RoutesEnum {
  // login = 'login',
  // register = 'register',
  home = 'home',
  // recoverPassword = 'recoverPassword',
  // resetPassword = 'resetPassword',
}

type Routes = {
  [route in RoutesEnum]: string
}

export const routes: Routes = {
  // login: '/iniciar-sesion',
  // register: '/registro',
  home: '/',
  // recoverPassword: '/recuperar-contraseña',
  // resetPassword: '/reestablecer-contraseña',
}
