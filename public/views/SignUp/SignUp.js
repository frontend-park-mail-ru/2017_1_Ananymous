import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import View from '../../modules/View/View';

class SignUp extends View {
  constructor() {
    super();
  }

  init(options = {}) {
    const form = this._createForm();
    form.renderTo(this._el);
    document.body.appendChild(this._el);
  }

  _createForm() {
    return new Form([{
      element: 'title',
      text: 'Sign Up',
    }, {
      name: 'login',
      type: 'text',
      placeholder: 'Login',
    }, {
      name: 'email',
      type: 'email',
      placeholder: 'Email address'
    }, {
      name: 'password1',
      type: 'password',
      placeholder: 'Password',
    }, {
      name: 'password2',
      type: 'password',
      placeholder: 'Repeat Password',
    }, {
      text: 'Sign Up'
    }, {
      action: (this.showMain.bind(this)),
    }]);
  }

  showMain() {
    this.getRouter().go('/');
  }
}

export default SignUp;
