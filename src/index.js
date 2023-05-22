import './styles.scss'
import { install } from './sidebar.js';

window.$docsify.plugins = [].concat(install, window.$docsify.plugins);

