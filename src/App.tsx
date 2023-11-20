import Header from './components/Header';
import Content from './components/Content';

import classes from './App.module.scss';

const App: React.FC = () => (
  <div className={classes.main}>
    <Header />

    <Content />
  </div>
);

export default App;
