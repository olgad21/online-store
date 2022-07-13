import { App } from './components/app';
import './global.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { items } from './components/itemsData';


const app = new App();
app.start(items);