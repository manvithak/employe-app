import App from '@/app';
import IndexRoute from '@routes/index.route';
import EmployeRoute from '@/routes/employe.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new EmployeRoute()]);

app.listen();
