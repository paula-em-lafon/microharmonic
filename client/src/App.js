import React from 'react';
import _ from 'lodash';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css';
import Composer from './Composer';
import Footer from './Footer';
import Header from './Header';
import Keyboard from './Keyboard';
import Settings from './Settings';
import Tutorial from './Tutorial';
import { CENTS_IN_OCTAVE } from './noteHelpers';

const GAIN_VALUE = 0.1;

function SettingsWrapper(props) {
  return (
    <div className="container">
      <div className="my-3">
        <Settings
          config={props.config}
          setConfig={props.setConfig}
        />
      </div>

      <div className="mt-3">
        {props.children}
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        useCustomCentValues: false,
        // TODO: make this be in sync with CustomSettings preset
        customCentValues: _.range(0, CENTS_IN_OCTAVE, 100),
        minFrequency: 220,
        numOctaves: 1,
        numSteps: 12,
        selectedNotes: {},
      },
    };
  }

  setConfig = (config) => {
    this.setState({
      config: Object.assign({}, this.state.config, config),
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" render={() => (
            <SettingsWrapper config={this.state.config} setConfig={this.setConfig}>
              <Keyboard
                config={this.state.config}
                gain={GAIN_VALUE}
              />
            </SettingsWrapper>
          )} />
          <Route exact path="/composer" render={() => (
            <SettingsWrapper config={this.state.config} setConfig={this.setConfig}>
              <Composer
                config={this.state.config}
                gain={GAIN_VALUE}
              />
            </SettingsWrapper>
          )} />
          <Route exact path="/composer/:shortID" render={(props) => (
            <SettingsWrapper config={this.state.config} setConfig={this.setConfig}>
              <Composer
                config={this.state.config}
                gain={GAIN_VALUE}
                shortID={props.match.params.shortID}
              />
            </SettingsWrapper>
          )} />
          <Route exact path="/tutorial" render={() => (
            <Tutorial gain={GAIN_VALUE} />
          )} />
          <Footer className="mt-3" />
        </div>
      </Router>
    );
  }
}

export default App;
